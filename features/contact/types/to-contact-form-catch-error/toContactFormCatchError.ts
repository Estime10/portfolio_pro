import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import { readObjectNumberProperty } from "@/features/contact/lib/read-object-number-property/readObjectNumberProperty";
import { readObjectStringProperty } from "@/features/contact/lib/read-object-string-property/readObjectStringProperty";
import type { ContactFormCatchError } from "@/features/contact/types/contact-form-catch-error/contactFormCatchError";

/** Frontière EmailJS / Promise — seul point d’entrée pour les erreurs externes. */
export function toContactFormCatchError(
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière EmailJS
  value: unknown,
): ContactFormCatchError {
  if (value instanceof ContactFormEmailSendError || value instanceof Error) {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const text = readObjectStringProperty(value, "text");

    if (text) {
      return {
        status: readObjectNumberProperty(value, "status") ?? 0,
        text,
      };
    }
  }

  return new ContactFormEmailSendError("EMAILJS_SEND_FAILED");
}
