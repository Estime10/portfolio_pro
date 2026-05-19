import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isContactFieldSatisfied(
  field: ContactFieldViewModel,
  value: string,
): boolean {
  const trimmed = value.trim();

  if (field.id === "email") {
    return trimmed.length > 0 && EMAIL_PATTERN.test(trimmed);
  }

  if (field.required) {
    return trimmed.length > 0;
  }

  return true;
}
