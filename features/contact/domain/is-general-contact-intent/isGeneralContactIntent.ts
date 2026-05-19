import {
  GENERAL_CONTACT_INTENT_ID,
  type ContactIntentId,
} from "@/features/contact/types/contactIntentId";

export function isGeneralContactIntent(intentId: ContactIntentId): boolean {
  return intentId === GENERAL_CONTACT_INTENT_ID;
}
