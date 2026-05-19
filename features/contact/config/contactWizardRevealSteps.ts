import type { ContactFieldId } from "@/features/contact/types/contactFieldId";

export const CONTACT_FORM_FIELD_IDS: readonly ContactFieldId[] = [
  "name",
  "email",
  "company",
  "message",
];

export const CONTACT_WIZARD_REVEAL_STEPS: readonly (readonly ContactFieldId[])[] = [
  ["name"],
  ["email"],
  ["company", "message"],
];

const CONTACT_REVEAL_PROGRESSION_FIELD_IDS: ReadonlySet<ContactFieldId> = new Set([
  "name",
  "email",
]);

export function getContactRevealStepIndex(fieldId: ContactFieldId): number {
  return CONTACT_WIZARD_REVEAL_STEPS.findIndex((stepFieldIds) => stepFieldIds.includes(fieldId));
}

export function shouldAdvanceContactRevealStep(fieldId: ContactFieldId): boolean {
  return CONTACT_REVEAL_PROGRESSION_FIELD_IDS.has(fieldId);
}
