"use client";

import { useContactFormPhase } from "@/features/contact-screen/hooks/use-contact-form-phase/useContactFormPhase";
import { useContactFormReveal } from "@/features/contact-screen/hooks/use-contact-form-reveal/useContactFormReveal";
import { useContactFormSubmit } from "@/features/contact-screen/hooks/use-contact-form-submit/useContactFormSubmit";
import { useContactFormValues } from "@/features/contact-screen/hooks/use-contact-form-values/useContactFormValues";
import type {
  ContactFormPhase,
  ContactFormStatus,
} from "@/features/contact-screen/hooks/use-contact-form/types/contactFormPhase";
import { createContactFormPhaseActions } from "@/features/contact-screen/lib/create-contact-form-phase-actions/createContactFormPhaseActions";
import { findContactIntentById } from "@/features/contact-screen/lib/find-contact-intent-by-id/findContactIntentById";
import { getActiveContactFields } from "@/features/contact-screen/lib/get-active-contact-fields/getActiveContactFields";
import { getContactFormErrorMessage } from "@/features/contact-screen/lib/get-contact-form-error-message/getContactFormErrorMessage";
import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";
import type {
  ContactFormViewModel,
  ContactIntentOptionViewModel,
} from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactFormValidationErrorCode } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ContactFormValidationErrors } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

export type { ContactFormPhase, ContactFormStatus };

export type UseContactFormReturn = Readonly<{
  activeFields: ContactFormViewModel["fieldsByIntent"][ContactIntentId];
  cancelDirectChannels: () => void;
  cancelWizard: () => void;
  errors: ContactFormValidationErrors;
  getErrorMessage: (code: ContactFormValidationErrorCode) => string;
  handleFieldBlur: (fieldId: ContactFieldId) => void;
  handleFieldChange: (fieldId: ContactFieldId, value: string) => void;
  intentId: ContactIntentId | null;
  isSubmitEnabled: boolean;
  openDirectChannels: (intentId: ContactIntentId) => void;
  phase: ContactFormPhase;
  revealedStepIndex: number;
  selectedIntent: ContactIntentOptionViewModel | null;
  startWizard: (intentId: ContactIntentId) => void;
  status: ContactFormStatus;
  submit: () => void;
  submitError: ContactFormValidationErrorCode | null;
  values: Record<ContactFieldId, string>;
}>;

export function useContactForm(form: ContactFormViewModel): UseContactFormReturn {
  const { intentId, phase, setIntentId, setPhase } = useContactFormPhase();
  const onFieldInteractionRef = useRef<() => void>(() => {});

  const selectedIntent = useMemo(
    () => findContactIntentById(form.intents, intentId),
    [form.intents, intentId],
  );

  const activeFields = useMemo(
    () => getActiveContactFields(form.fieldsByIntent, intentId),
    [form.fieldsByIntent, intentId],
  );

  const { advanceRevealForField, resetReveal, revealedStepIndex } =
    useContactFormReveal(activeFields);

  const { errors, handleFieldBlur, handleFieldChange, resetValues, setErrors, values } =
    useContactFormValues({
      advanceRevealForField,
      onFieldInteractionRef,
    });

  const resetWizardFields = useCallback(() => {
    resetValues();
    resetReveal();
  }, [resetReveal, resetValues]);

  const phaseActions = useMemo(
    () =>
      createContactFormPhaseActions({
        resetWizardFields,
        setIntentId,
        setPhase,
      }),
    [resetWizardFields, setIntentId, setPhase],
  );

  const submitState = useContactFormSubmit({
    activeFields,
    formspree: form.formspree,
    intentId,
    onSubmitSuccess: () => {
      setPhase("success");
    },
    phase,
    revealedStepIndex,
    selectedIntent,
    setErrors,
    values,
  });

  useLayoutEffect(() => {
    onFieldInteractionRef.current = submitState.clearSubmitFeedback;
  }, [submitState.clearSubmitFeedback]);

  const getErrorMessage = useCallback(
    (code: ContactFormValidationErrorCode): string =>
      getContactFormErrorMessage(code, form.labels.errors),
    [form.labels.errors],
  );

  return {
    activeFields,
    cancelDirectChannels: phaseActions.cancelDirectChannels,
    cancelWizard: phaseActions.cancelWizard,
    errors,
    getErrorMessage,
    handleFieldBlur,
    handleFieldChange,
    intentId,
    isSubmitEnabled: submitState.isSubmitEnabled,
    openDirectChannels: phaseActions.openDirectChannels,
    phase,
    revealedStepIndex,
    selectedIntent,
    startWizard: phaseActions.startWizard,
    status: submitState.status,
    submit: submitState.submit,
    submitError: submitState.submitError,
    values,
  };
}
