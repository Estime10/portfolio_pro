import { CONTACT_WIZARD_REVEAL_STEPS } from "@/features/contact-screen/config/contact-wizard-reveal-steps/contactWizardRevealSteps";
import { getContactRevealStepIndex } from "@/features/contact-screen/config/get-contact-reveal-step-index/getContactRevealStepIndex";
import { shouldAdvanceContactRevealStep } from "@/features/contact-screen/config/should-advance-contact-reveal-step/shouldAdvanceContactRevealStep";
import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import { isContactFieldSatisfied } from "@/features/contact-screen/validation/is-contact-field-satisfied/isContactFieldSatisfied";

export function computeNextContactRevealStepIndex(
  currentIndex: number,
  fieldId: ContactFieldId,
  fieldValue: string,
  activeFields: readonly ContactFieldViewModel[],
): number {
  if (!shouldAdvanceContactRevealStep(fieldId)) {
    return currentIndex;
  }

  const field = activeFields.find((activeField) => activeField.id === fieldId);
  if (!field || !isContactFieldSatisfied(field, fieldValue)) {
    return currentIndex;
  }

  const stepIndex = getContactRevealStepIndex(fieldId);
  if (stepIndex < 0) {
    return currentIndex;
  }

  return Math.min(CONTACT_WIZARD_REVEAL_STEPS.length - 1, Math.max(currentIndex, stepIndex + 1));
}
