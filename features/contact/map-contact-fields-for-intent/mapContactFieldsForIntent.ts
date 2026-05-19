import { getContactFieldsForIntent } from "@/features/contact/config/get-contact-fields-for-intent/getContactFieldsForIntent";
import { mapContactField } from "@/features/contact/map-contact-field/mapContactField";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import type { ContactTranslator } from "@/features/contact/types/contactTranslator";

export function mapContactFieldsForIntent(
  t: ContactTranslator,
  intentId: ContactIntentId,
): readonly ContactFieldViewModel[] {
  return getContactFieldsForIntent(intentId).map((definition) => mapContactField(t, definition));
}
