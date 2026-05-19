import type { ContactFieldId } from "@/features/contact/types/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contactIntentId";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormValidationErrorCode =
  | "intentRequired"
  | "fieldRequired"
  | "emailInvalid"
  | "submitFailed"
  | "submitNotConfigured";

export type ContactFormValidationErrors = Partial<
  Record<ContactFieldId | "intent", ContactFormValidationErrorCode>
>;

export function validateContactFormValues(
  intentId: ContactIntentId | null,
  fields: readonly ContactFieldViewModel[],
  values: Readonly<Partial<Record<ContactFieldId, string>>>,
): ContactFormValidationErrors {
  const errors: ContactFormValidationErrors = {};

  if (!intentId) {
    errors.intent = "intentRequired";
    return errors;
  }

  for (const field of fields) {
    const value = values[field.id]?.trim() ?? "";

    if (field.required && value.length === 0) {
      errors[field.id] = "fieldRequired";
      continue;
    }

    if (field.id === "email" && value.length > 0 && !EMAIL_PATTERN.test(value)) {
      errors.email = "emailInvalid";
    }
  }

  return errors;
}
