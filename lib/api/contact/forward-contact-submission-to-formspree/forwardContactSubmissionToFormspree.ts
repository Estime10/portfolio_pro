import type { ContactSubmissionApiBody } from "@/features/contact-screen/validation/contact-submission-api-schema/contactSubmissionApiSchema";
import type { FormspreeServerConfig } from "@/lib/config/formspree/getFormspreeServerConfig";

export type ForwardContactSubmissionResult = Readonly<{
  ok: boolean;
  status: number;
  message: string;
}>;

async function readFormspreeErrorMessage(response: Response): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière JSON Formspree
    const payload: unknown = await response.json();

    if (typeof payload === "object" && payload !== null && "error" in payload) {
      const error = payload.error;
      if (typeof error === "string" && error.length > 0) {
        return error;
      }
    }
  } catch {
    // ignore JSON parse errors
  }

  return response.statusText || "Form submission failed";
}

export async function forwardContactSubmissionToFormspree(
  body: ContactSubmissionApiBody,
  config: FormspreeServerConfig,
): Promise<ForwardContactSubmissionResult> {
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return {
      ok: true,
      status: response.status,
      message: "ok",
    };
  }

  const message = await readFormspreeErrorMessage(response);

  return {
    ok: false,
    status: response.status,
    message,
  };
}
