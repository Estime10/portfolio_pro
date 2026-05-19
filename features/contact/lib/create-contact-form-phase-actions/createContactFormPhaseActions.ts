import type { ContactFormPhase } from "@/features/contact/hooks/use-contact-form/types/contactFormPhase";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";

export type ContactFormPhaseSetters = Readonly<{
  resetWizardFields: () => void;
  setIntentId: (intentId: ContactIntentId | null) => void;
  setPhase: (phase: ContactFormPhase) => void;
}>;

export type ContactFormPhaseActions = Readonly<{
  cancelDirectChannels: () => void;
  cancelWizard: () => void;
  openDirectChannels: (intentId: ContactIntentId) => void;
  startWizard: (intentId: ContactIntentId) => void;
}>;

export function createContactFormPhaseActions(
  setters: ContactFormPhaseSetters,
): ContactFormPhaseActions {
  return {
    openDirectChannels: (intentId) => {
      setters.setIntentId(intentId);
      setters.setPhase("direct-channels");
    },
    startWizard: (intentId) => {
      setters.setIntentId(intentId);
      setters.resetWizardFields();
      setters.setPhase("wizard");
    },
    cancelWizard: () => {
      setters.resetWizardFields();
      setters.setIntentId(null);
      setters.setPhase("intent-selection");
    },
    cancelDirectChannels: () => {
      setters.setIntentId(null);
      setters.setPhase("intent-selection");
    },
  };
}
