"use client";

import {
  CONTACT_WIZARD_REVEAL_STEPS,
  getContactRevealStepIndex,
  shouldAdvanceContactRevealStep,
} from "@/features/contact/config/contactWizardRevealSteps";
import type { ContactFormViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactFieldId } from "@/features/contact/types/contactFieldId";
import type { ContactIntentId } from "@/features/contact/types/contactIntentId";
import type { ContactIntentOptionViewModel } from "@/features/contact/types/contactFormViewModel";
import { isContactFieldSatisfied } from "@/features/contact/validation/isContactFieldSatisfied";
import { createEmptyContactFormValues } from "@/features/contact/validation/createEmptyContactFormValues";
import { getContactFormEmailSendErrorCode } from "@/features/contact/services/get-contact-form-email-send-error-code/getContactFormEmailSendErrorCode";
import { logContactFormEmailError } from "@/features/contact/services/log-contact-form-email-error/logContactFormEmailError";
import { sendContactFormEmail } from "@/features/contact/services/send-contact-form-email/sendContactFormEmail";
import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import { toContactFormCatchError } from "@/features/contact/types/contactFormCatchError";
import {
  validateContactFormValues,
  type ContactFormValidationErrorCode,
  type ContactFormValidationErrors,
} from "@/features/contact/validation/validateContactFormValues";
import { useCallback, useMemo, useState } from "react";

export type ContactFormPhase = "intent-selection" | "direct-channels" | "wizard" | "success";

export type ContactFormStatus = "idle" | "submitting";

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
  const [phase, setPhase] = useState<ContactFormPhase>("intent-selection");
  const [intentId, setIntentId] = useState<ContactIntentId | null>(null);
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);
  const [values, setValues] = useState(createEmptyContactFormValues);
  const [errors, setErrors] = useState<ContactFormValidationErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [submitError, setSubmitError] = useState<ContactFormValidationErrorCode | null>(null);

  const selectedIntent = useMemo(() => {
    if (!intentId) {
      return null;
    }
    return form.intents.find((intent) => intent.id === intentId) ?? null;
  }, [form.intents, intentId]);

  const activeFields = useMemo(() => {
    if (!intentId) {
      return [];
    }
    return form.fieldsByIntent[intentId];
  }, [form.fieldsByIntent, intentId]);

  const getErrorMessage = useCallback(
    (code: ContactFormValidationErrorCode): string => {
      if (code === "intentRequired") {
        return form.labels.errors.intentRequired;
      }
      if (code === "emailInvalid") {
        return form.labels.errors.emailInvalid;
      }
      if (code === "submitFailed") {
        return form.labels.errors.submitFailed;
      }
      if (code === "submitNotConfigured") {
        return form.labels.errors.submitNotConfigured;
      }
      return form.labels.errors.fieldRequired;
    },
    [form.labels.errors],
  );

  const tryAdvanceRevealStep = useCallback(
    (fieldId: ContactFieldId, fieldValue: string) => {
      if (!shouldAdvanceContactRevealStep(fieldId)) {
        return;
      }

      const field = activeFields.find((activeField) => activeField.id === fieldId);
      if (!field || !isContactFieldSatisfied(field, fieldValue)) {
        return;
      }

      const stepIndex = getContactRevealStepIndex(fieldId);
      if (stepIndex < 0) {
        return;
      }

      setRevealedStepIndex((current) =>
        Math.min(CONTACT_WIZARD_REVEAL_STEPS.length - 1, Math.max(current, stepIndex + 1)),
      );
    },
    [activeFields],
  );

  const openDirectChannels = useCallback((nextIntentId: ContactIntentId) => {
    setIntentId(nextIntentId);
    setErrors({});
    setStatus("idle");
    setPhase("direct-channels");
  }, []);

  const startWizard = useCallback((nextIntentId: ContactIntentId) => {
    setIntentId(nextIntentId);
    setValues(createEmptyContactFormValues());
    setErrors({});
    setRevealedStepIndex(0);
    setStatus("idle");
    setPhase("wizard");
  }, []);

  const cancelWizard = useCallback(() => {
    setPhase("intent-selection");
    setIntentId(null);
    setValues(createEmptyContactFormValues());
    setErrors({});
    setRevealedStepIndex(0);
    setStatus("idle");
  }, []);

  const cancelDirectChannels = useCallback(() => {
    setPhase("intent-selection");
    setIntentId(null);
    setStatus("idle");
  }, []);

  const handleFieldChange = useCallback(
    (fieldId: ContactFieldId, value: string) => {
      setValues((current) => ({ ...current, [fieldId]: value }));
      setErrors((current) => ({ ...current, [fieldId]: undefined }));
      setStatus("idle");
      tryAdvanceRevealStep(fieldId, value);
    },
    [tryAdvanceRevealStep],
  );

  const handleFieldBlur = useCallback(
    (fieldId: ContactFieldId) => {
      tryAdvanceRevealStep(fieldId, values[fieldId]);
    },
    [tryAdvanceRevealStep, values],
  );

  const submit = useCallback(() => {
    const nextErrors = validateContactFormValues(intentId, activeFields, values);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0 || !intentId || !selectedIntent) {
      return;
    }

    if (!form.emailJs) {
      logContactFormEmailError(new ContactFormEmailSendError("EMAILJS_NOT_CONFIGURED"));
      setSubmitError("submitNotConfigured");
      return;
    }

    setStatus("submitting");

    void sendContactFormEmail(
      {
        intentId,
        intentLabel: selectedIntent.label,
        values,
      },
      form.emailJs,
    )
      .then(() => {
        setPhase("success");
        setStatus("idle");
        setSubmitError(null);
      })
      // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière Promise
      .catch((error: unknown) => {
        const caught = toContactFormCatchError(error);
        logContactFormEmailError(caught);
        setSubmitError(getContactFormEmailSendErrorCode(caught));
        setStatus("idle");
      });
  }, [activeFields, form.emailJs, intentId, selectedIntent, values]);

  const isSubmitEnabled = useMemo(() => {
    if (phase !== "wizard" || activeFields.length === 0) {
      return false;
    }

    const allStepsRevealed = revealedStepIndex >= CONTACT_WIZARD_REVEAL_STEPS.length - 1;
    const allValid = validateContactFormValues(intentId, activeFields, values);
    return allStepsRevealed && Object.keys(allValid).length === 0;
  }, [activeFields, intentId, phase, revealedStepIndex, values]);

  return {
    activeFields,
    cancelDirectChannels,
    cancelWizard,
    errors,
    getErrorMessage,
    handleFieldBlur,
    handleFieldChange,
    intentId,
    isSubmitEnabled,
    openDirectChannels,
    phase,
    revealedStepIndex,
    selectedIntent,
    startWizard,
    status,
    submit,
    submitError,
    values,
  };
}
