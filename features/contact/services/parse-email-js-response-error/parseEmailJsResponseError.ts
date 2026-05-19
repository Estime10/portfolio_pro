import type { ContactFormCatchError } from "@/features/contact/types/contactFormCatchError";

export function parseEmailJsResponseError(error: ContactFormCatchError): string {
  if (error instanceof Error) {
    return error.message;
  }

  return error.text;
}
