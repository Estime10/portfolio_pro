import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";

export type ContactFormValidationErrorCode =
  "intentRequired" | "fieldRequired" | "emailInvalid" | "submitFailed" | "submitNotConfigured";

export type ContactFormValidationErrors = Partial<
  Record<ContactFieldId | "intent", ContactFormValidationErrorCode>
>;
