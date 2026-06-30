import { getContactFieldsForIntent } from "@/features/contact-screen/config/get-contact-fields-for-intent/getContactFieldsForIntent";
import { mapContactField } from "@/features/contact-screen/map-contact-field/mapContactField";
import type { ContactFieldViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";
import type { ContactTranslator } from "@/features/contact-screen/types/contactTranslator";

export function mapContactFieldsForIntent(
  t: ContactTranslator,
  intentId: ContactIntentId,
): readonly ContactFieldViewModel[] {
  return getContactFieldsForIntent(intentId).map((definition) => mapContactField(t, definition));
}
