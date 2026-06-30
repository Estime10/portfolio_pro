import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import { parseFormspreeResponseError } from "@/features/contact-screen/services/parse-formspree-response-error/parseFormspreeResponseError";
import type { ContactFormCatchError } from "@/features/contact-screen/types/contact-form-catch-error/contactFormCatchError";

export function logContactFormSubmissionError(error: ContactFormCatchError): void {
  if (error instanceof ContactFormSendError && error.code === "FORM_NOT_CONFIGURED") {
    console.error("[contact-form] FORM_NOT_CONFIGURED");
    return;
  }

  if (error instanceof ContactFormSendError) {
    console.error("[contact-form] FORM_SEND_FAILED", error);
    return;
  }

  console.error("[contact-form] FORM_SEND_FAILED", parseFormspreeResponseError(error));
}
