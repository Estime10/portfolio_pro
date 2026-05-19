import type {
  ContactFormViewModel,
  ContactIntentOptionViewModel,
} from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";

export function findContactIntentById(
  intents: ContactFormViewModel["intents"],
  intentId: ContactIntentId | null,
): ContactIntentOptionViewModel | null {
  if (!intentId) {
    return null;
  }

  return intents.find((intent) => intent.id === intentId) ?? null;
}
