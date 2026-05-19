import type { ContactFormCatchError } from "@/features/contact/types/contact-form-catch-error/contactFormCatchError";

export function parseEmailJsResponseError(error: ContactFormCatchError): string {
  if (error instanceof Error) {
    return error.message;
  }

  return error.text;
}
