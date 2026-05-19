import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import type {
  ContactFormValidationErrorCode,
  ContactFormValidationErrors,
} from "@/features/contact/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import { isValidContactEmail } from "@/features/contact/validation/is-valid-contact-email/isValidContactEmail";

export type { ContactFormValidationErrorCode, ContactFormValidationErrors };

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

    if (field.id === "email" && value.length > 0 && !isValidContactEmail(value)) {
      errors.email = "emailInvalid";
    }
  }

  return errors;
}
