import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import { readObjectNumberProperty } from "@/features/contact-screen/lib/read-object-number-property/readObjectNumberProperty";
import { readObjectStringProperty } from "@/features/contact-screen/lib/read-object-string-property/readObjectStringProperty";
import type { ContactFormCatchError } from "@/features/contact-screen/types/contact-form-catch-error/contactFormCatchError";

/** Frontière fetch / Formspree — seul point d’entrée pour les erreurs externes. */
export function toContactFormCatchError(
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière Formspree
  value: unknown,
): ContactFormCatchError {
  if (value instanceof ContactFormSendError || value instanceof Error) {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const error = readObjectStringProperty(value, "error");

    if (error) {
      return {
        status: readObjectNumberProperty(value, "status") ?? 0,
        message: error,
      };
    }

    const text = readObjectStringProperty(value, "text");

    if (text) {
      return {
        status: readObjectNumberProperty(value, "status") ?? 0,
        text,
      };
    }
  }

  return new ContactFormSendError("FORM_SEND_FAILED");
}
