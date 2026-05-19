import type { ContactFormViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";

export function getActiveContactFields(
  fieldsByIntent: ContactFormViewModel["fieldsByIntent"],
  intentId: ContactIntentId | null,
): ContactFormViewModel["fieldsByIntent"][ContactIntentId] {
  if (!intentId) {
    return [];
  }

  return fieldsByIntent[intentId];
}
