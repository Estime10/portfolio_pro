import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import type { ContactFormCatchError } from "@/features/contact-screen/types/contact-form-catch-error/contactFormCatchError";
import type { ContactFormValidationErrorCode } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";

export function getContactFormSendErrorCode(
  error: ContactFormCatchError,
): Extract<ContactFormValidationErrorCode, "submitFailed" | "submitNotConfigured"> {
  if (error instanceof ContactFormSendError && error.code === "FORM_NOT_CONFIGURED") {
    return "submitNotConfigured";
  }

  return "submitFailed";
}
