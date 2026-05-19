import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import type { ContactFormCatchError } from "@/features/contact/types/contact-form-catch-error/contactFormCatchError";
import type { ContactFormValidationErrorCode } from "@/features/contact/validation/contact-form-validation-error-code/contactFormValidationErrorCode";

export function getContactFormEmailSendErrorCode(
  error: ContactFormCatchError,
): Extract<ContactFormValidationErrorCode, "submitFailed" | "submitNotConfigured"> {
  if (error instanceof ContactFormEmailSendError && error.code === "EMAILJS_NOT_CONFIGURED") {
    return "submitNotConfigured";
  }

  return "submitFailed";
}
