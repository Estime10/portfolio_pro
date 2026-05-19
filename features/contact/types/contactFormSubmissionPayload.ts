import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";

export type ContactFormSubmissionPayload = Readonly<{
  intentId: ContactIntentId;
  intentLabel: string;
  values: Record<ContactFieldId, string>;
}>;
