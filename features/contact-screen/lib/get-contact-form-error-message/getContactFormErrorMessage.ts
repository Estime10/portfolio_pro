import type { ContactFormViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactFormValidationErrorCode } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";

export function getContactFormErrorMessage(
  code: ContactFormValidationErrorCode,
  errors: ContactFormViewModel["labels"]["errors"],
): string {
  if (code === "intentRequired") {
    return errors.intentRequired;
  }
  if (code === "emailInvalid") {
    return errors.emailInvalid;
  }
  if (code === "submitFailed") {
    return errors.submitFailed;
  }
  if (code === "submitNotConfigured") {
    return errors.submitNotConfigured;
  }
  return errors.fieldRequired;
}
