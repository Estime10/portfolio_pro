import { CONTACT_WIZARD_REVEAL_STEPS } from "@/features/contact/config/contact-wizard-reveal-steps/contactWizardRevealSteps";
import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import type { ContactFormPhase } from "@/features/contact/hooks/use-contact-form/types/contactFormPhase";
import { validateContactFormValues } from "@/features/contact/validation/validate-contact-form-values/validateContactFormValues";

export function isContactFormSubmitEnabled(params: {
  activeFields: readonly ContactFieldViewModel[];
  intentId: ContactIntentId | null;
  phase: ContactFormPhase;
  revealedStepIndex: number;
  values: Record<ContactFieldId, string>;
}): boolean {
  if (params.phase !== "wizard" || params.activeFields.length === 0) {
    return false;
  }

  const allStepsRevealed = params.revealedStepIndex >= CONTACT_WIZARD_REVEAL_STEPS.length - 1;
  const validationErrors = validateContactFormValues(
    params.intentId,
    params.activeFields,
    params.values,
  );

  return allStepsRevealed && Object.keys(validationErrors).length === 0;
}
