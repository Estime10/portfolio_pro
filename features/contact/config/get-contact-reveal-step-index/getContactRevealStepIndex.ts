import { CONTACT_WIZARD_REVEAL_STEPS } from "@/features/contact/config/contact-wizard-reveal-steps/contactWizardRevealSteps";
import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";

export function getContactRevealStepIndex(fieldId: ContactFieldId): number {
  return CONTACT_WIZARD_REVEAL_STEPS.findIndex((stepFieldIds) => stepFieldIds.includes(fieldId));
}
