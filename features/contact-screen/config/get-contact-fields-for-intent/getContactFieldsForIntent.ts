import { CONTACT_FIELD_DEFINITIONS } from "@/features/contact-screen/config/contact-field-definition/contactFieldDefinition";
import type { ContactFieldDefinition } from "@/features/contact-screen/config/contact-field-definition/contactFieldDefinition";
import { isGeneralContactIntent } from "@/features/contact-screen/domain/is-general-contact-intent/isGeneralContactIntent";
import { CONTACT_FIELD_IDS } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";

export function getContactFieldsForIntent(
  intentId: ContactIntentId,
): readonly ContactFieldDefinition[] {
  if (isGeneralContactIntent(intentId)) {
    return [];
  }

  return CONTACT_FIELD_IDS.map((fieldId) => CONTACT_FIELD_DEFINITIONS[fieldId]);
}
