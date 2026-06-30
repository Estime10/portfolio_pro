"use client";

import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import type { ContactFormPhase } from "@/features/contact-screen/hooks/use-contact-form/types/contactFormPhase";
import type { ContactFormStatus } from "@/features/contact-screen/hooks/use-contact-form/types/contactFormPhase";
import { isContactFormSubmitEnabled } from "@/features/contact-screen/lib/is-contact-form-submit-enabled/isContactFormSubmitEnabled";
import { getContactFormSendErrorCode } from "@/features/contact-screen/services/get-contact-form-send-error-code/getContactFormSendErrorCode";
import { logContactFormSubmissionError } from "@/features/contact-screen/services/log-contact-form-submission-error/logContactFormSubmissionError";
import { sendContactFormSubmission } from "@/features/contact-screen/services/send-contact-form-submission/sendContactFormSubmission";
import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";
import type {
  ContactFieldViewModel,
  ContactFormViewModel,
  ContactIntentOptionViewModel,
} from "@/features/contact-screen/types/contactFormViewModel";
import { toContactFormCatchError } from "@/features/contact-screen/types/to-contact-form-catch-error/toContactFormCatchError";
import type { ContactFormValidationErrorCode } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ContactFormValidationErrors } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import { validateContactFormValues } from "@/features/contact-screen/validation/validate-contact-form-values/validateContactFormValues";
import { useCallback, useMemo, useState } from "react";

export type UseContactFormSubmitParams = Readonly<{
  activeFields: readonly ContactFieldViewModel[];
  submission: ContactFormViewModel["submission"];
  intentId: ContactIntentId | null;
  onSubmitSuccess: () => void;
  phase: ContactFormPhase;
  revealedStepIndex: number;
  selectedIntent: ContactIntentOptionViewModel | null;
  setErrors: (errors: ContactFormValidationErrors) => void;
  values: Record<ContactFieldId, string>;
}>;

export type UseContactFormSubmitReturn = Readonly<{
  clearSubmitFeedback: () => void;
  isSubmitEnabled: boolean;
  status: ContactFormStatus;
  submit: () => void;
  submitError: ContactFormValidationErrorCode | null;
}>;

export function useContactFormSubmit({
  activeFields,
  submission,
  intentId,
  onSubmitSuccess,
  phase,
  revealedStepIndex,
  selectedIntent,
  setErrors,
  values,
}: UseContactFormSubmitParams): UseContactFormSubmitReturn {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [submitError, setSubmitError] = useState<ContactFormValidationErrorCode | null>(null);

  const clearSubmitFeedback = useCallback(() => {
    setSubmitError(null);
    setStatus("idle");
  }, []);

  const isSubmitEnabled = useMemo(
    () =>
      isContactFormSubmitEnabled({
        activeFields,
        intentId,
        phase,
        revealedStepIndex,
        values,
      }),
    [activeFields, intentId, phase, revealedStepIndex, values],
  );

  const submit = useCallback(() => {
    const nextErrors = validateContactFormValues(intentId, activeFields, values);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0 || !intentId || !selectedIntent) {
      return;
    }

    if (!submission) {
      logContactFormSubmissionError(new ContactFormSendError("FORM_NOT_CONFIGURED"));
      setSubmitError("submitNotConfigured");
      return;
    }

    setStatus("submitting");

    void sendContactFormSubmission(
      {
        intentId,
        intentLabel: selectedIntent.label,
        values,
      },
      submission,
    )
      .then(() => {
        onSubmitSuccess();
        setStatus("idle");
        setSubmitError(null);
      })
      // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière Promise
      .catch((error: unknown) => {
        const caught = toContactFormCatchError(error);
        logContactFormSubmissionError(caught);
        setSubmitError(getContactFormSendErrorCode(caught));
        setStatus("idle");
      });
  }, [activeFields, submission, intentId, onSubmitSuccess, selectedIntent, setErrors, values]);

  return {
    clearSubmitFeedback,
    isSubmitEnabled,
    status,
    submit,
    submitError,
  };
}
