import { CONTACT_FIELD_DEFINITIONS } from "@/features/contact/config/contact-field-definition/contactFieldDefinition";
import type { ContactFieldDefinition } from "@/features/contact/config/contact-field-definition/contactFieldDefinition";
import { isGeneralContactIntent } from "@/features/contact/domain/is-general-contact-intent/isGeneralContactIntent";
import { CONTACT_FIELD_IDS } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";

export function getContactFieldsForIntent(
  intentId: ContactIntentId,
): readonly ContactFieldDefinition[] {
  if (isGeneralContactIntent(intentId)) {
    return [];
  }

  return CONTACT_FIELD_IDS.map((fieldId) => CONTACT_FIELD_DEFINITIONS[fieldId]);
}
