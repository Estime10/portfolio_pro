import { buildFormspreeSubmissionBody } from "@/features/contact-screen/services/build-formspree-submission-body/buildFormspreeSubmissionBody";
import { parseFormspreeResponseError } from "@/features/contact-screen/services/parse-formspree-response-error/parseFormspreeResponseError";
import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import type { ContactFormSubmissionPayload } from "@/features/contact-screen/types/contactFormSubmissionPayload";
import { toContactFormCatchError } from "@/features/contact-screen/types/to-contact-form-catch-error/toContactFormCatchError";
import type { ContactFormSubmissionConfig } from "@/lib/config/contact-form/contactFormApiPath";

async function readFormspreeFailureMessage(response: Response): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière JSON Formspree
    const payload: unknown = await response.json();
    return parseFormspreeResponseError(toContactFormCatchError(payload));
  } catch {
    return response.statusText || "Form submission failed";
  }
}

export async function sendContactFormSubmission(
  payload: ContactFormSubmissionPayload,
  config: ContactFormSubmissionConfig,
): Promise<void> {
  const body = buildFormspreeSubmissionBody(payload);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return;
    }

    const message = await readFormspreeFailureMessage(response);
    throw new ContactFormSendError("FORM_SEND_FAILED", {
      cause: new Error(message),
    });
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière fetch / Formspree
  } catch (value: unknown) {
    const error = toContactFormCatchError(value);

    if (error instanceof ContactFormSendError) {
      throw error;
    }

    throw new ContactFormSendError("FORM_SEND_FAILED", {
      cause: error instanceof Error ? error : undefined,
    });
  }
}
