import type { ContactFormCatchError } from "@/features/contact-screen/types/contact-form-catch-error/contactFormCatchError";

export function parseFormspreeResponseError(error: ContactFormCatchError): string {
  if (error instanceof Error) {
    return error.message;
  }

  if ("message" in error && error.message.length > 0) {
    return error.message;
  }

  if ("text" in error && error.text.length > 0) {
    return error.text;
  }

  return "Form submission failed";
}
