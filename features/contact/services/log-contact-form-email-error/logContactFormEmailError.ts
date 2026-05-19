import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import { parseEmailJsResponseError } from "@/features/contact/services/parse-email-js-response-error/parseEmailJsResponseError";
import type { ContactFormCatchError } from "@/features/contact/types/contact-form-catch-error/contactFormCatchError";

export function logContactFormEmailError(error: ContactFormCatchError): void {
  if (error instanceof ContactFormEmailSendError) {
    console.error(`[contact-form] ${error.code}`, error.cause ?? error);
    return;
  }

  if (error instanceof Error) {
    console.error("[contact-form] EMAILJS_SEND_FAILED", error);
    return;
  }

  console.error("[contact-form] EMAILJS_SEND_FAILED", parseEmailJsResponseError(error));
}
