import { CONTACT_FIELD_DEFINITIONS } from "@/features/contact/config/contactFieldDefinition";
import { CONTACT_FORM_FIELD_IDS } from "@/features/contact/config/contactWizardRevealSteps";
import { isGeneralContactIntent } from "@/features/contact/domain/is-general-contact-intent/isGeneralContactIntent";
import type { ContactFieldDefinition } from "@/features/contact/config/contactFieldDefinition";
import type { ContactIntentId } from "@/features/contact/types/contactIntentId";

export function getContactFieldsForIntent(
  intentId: ContactIntentId,
): readonly ContactFieldDefinition[] {
  if (isGeneralContactIntent(intentId)) {
    return [];
  }

  return CONTACT_FORM_FIELD_IDS.map((fieldId) => CONTACT_FIELD_DEFINITIONS[fieldId]);
}
