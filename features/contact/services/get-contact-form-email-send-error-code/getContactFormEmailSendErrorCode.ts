import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import type { ContactFormValidationErrorCode } from "@/features/contact/validation/validateContactFormValues";
import type { ContactFormCatchError } from "@/features/contact/types/contactFormCatchError";

export function getContactFormEmailSendErrorCode(
  error: ContactFormCatchError,
): Extract<ContactFormValidationErrorCode, "submitFailed" | "submitNotConfigured"> {
  if (error instanceof ContactFormEmailSendError && error.code === "EMAILJS_NOT_CONFIGURED") {
    return "submitNotConfigured";
  }

  return "submitFailed";
}
