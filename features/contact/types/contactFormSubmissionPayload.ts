import type { ContactFieldId } from "@/features/contact/types/contactFieldId";
import type { ContactIntentId } from "@/features/contact/types/contactIntentId";

export type ContactFormSubmissionPayload = Readonly<{
  intentId: ContactIntentId;
  intentLabel: string;
  values: Record<ContactFieldId, string>;
}>;
