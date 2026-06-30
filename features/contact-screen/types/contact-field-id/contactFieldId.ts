export const CONTACT_FIELD_IDS = ["name", "email", "company", "message"] as const;

export type ContactFieldId = (typeof CONTACT_FIELD_IDS)[number];
