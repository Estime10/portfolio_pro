import { NextResponse } from "next/server";
import { forwardContactSubmissionToFormspree } from "@/lib/api/contact/forward-contact-submission-to-formspree/forwardContactSubmissionToFormspree";
import { getClientIp } from "@/lib/api/contact/get-client-ip/getClientIp";
import { parseContactSubmissionRequest } from "@/lib/api/contact/parse-contact-submission-request/parseContactSubmissionRequest";
import { checkContactSubmissionRateLimit } from "@/lib/api/contact/rate-limit/checkContactSubmissionRateLimit";
import { getFormspreeServerConfig } from "@/lib/config/formspree/getFormspreeServerConfig";

export async function POST(request: Request): Promise<NextResponse> {
  const formspreeConfig = getFormspreeServerConfig();

  if (!formspreeConfig) {
    return NextResponse.json({ error: "Contact form not configured" }, { status: 503 });
  }

  const rateLimit = checkContactSubmissionRateLimit(getClientIp(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers:
          rateLimit.retryAfterSeconds !== undefined
            ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
            : undefined,
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière JSON HTTP
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseContactSubmissionRequest(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  const forwardResult = await forwardContactSubmissionToFormspree(parsed.body, formspreeConfig);

  if (!forwardResult.ok) {
    return NextResponse.json({ error: forwardResult.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
