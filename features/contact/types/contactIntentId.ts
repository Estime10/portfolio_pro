export const GENERAL_CONTACT_INTENT_ID = "general-contact" as const;

export const CONTACT_INTENT_IDS = [
  "marketing-site",
  "business-app",
  "product-redesign",
  GENERAL_CONTACT_INTENT_ID,
] as const;

export type ContactIntentId = (typeof CONTACT_INTENT_IDS)[number];
