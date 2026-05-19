import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import { isValidContactEmail } from "@/features/contact/validation/is-valid-contact-email/isValidContactEmail";

export function isContactFieldSatisfied(
  field: ContactFieldViewModel,
  value: string,
): boolean {
  const trimmed = value.trim();

  if (field.id === "email") {
    return trimmed.length > 0 && isValidContactEmail(trimmed);
  }

  if (field.required) {
    return trimmed.length > 0;
  }

  return true;
}
