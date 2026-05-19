import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";

export const CONTACT_WIZARD_REVEAL_STEPS: readonly (readonly ContactFieldId[])[] = [
  ["name"],
  ["email"],
  ["company", "message"],
];
