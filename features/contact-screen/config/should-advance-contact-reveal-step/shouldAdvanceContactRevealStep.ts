import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";

const CONTACT_REVEAL_PROGRESSION_FIELD_IDS: ReadonlySet<ContactFieldId> = new Set([
  "name",
  "email",
]);

export function shouldAdvanceContactRevealStep(fieldId: ContactFieldId): boolean {
  return CONTACT_REVEAL_PROGRESSION_FIELD_IDS.has(fieldId);
}
