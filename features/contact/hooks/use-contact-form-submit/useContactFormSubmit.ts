"use client";

import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import type { ContactFormPhase } from "@/features/contact/hooks/use-contact-form/types/contactFormPhase";
import type { ContactFormStatus } from "@/features/contact/hooks/use-contact-form/types/contactFormPhase";
import { isContactFormSubmitEnabled } from "@/features/contact/lib/is-contact-form-submit-enabled/isContactFormSubmitEnabled";
import { getContactFormEmailSendErrorCode } from "@/features/contact/services/get-contact-form-email-send-error-code/getContactFormEmailSendErrorCode";
import { logContactFormEmailError } from "@/features/contact/services/log-contact-form-email-error/logContactFormEmailError";
import { sendContactFormEmail } from "@/features/contact/services/send-contact-form-email/sendContactFormEmail";
import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import type {
  ContactFieldViewModel,
  ContactFormViewModel,
  ContactIntentOptionViewModel,
} from "@/features/contact/types/contactFormViewModel";
import { toContactFormCatchError } from "@/features/contact/types/to-contact-form-catch-error/toContactFormCatchError";
import type { ContactFormValidationErrorCode } from "@/features/contact/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ContactFormValidationErrors } from "@/features/contact/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import { validateContactFormValues } from "@/features/contact/validation/validate-contact-form-values/validateContactFormValues";
import { useCallback, useMemo, useState } from "react";

export type UseContactFormSubmitParams = Readonly<{
  activeFields: readonly ContactFieldViewModel[];
  emailJs: ContactFormViewModel["emailJs"];
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
  emailJs,
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

    if (!emailJs) {
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
      emailJs,
    )
      .then(() => {
        onSubmitSuccess();
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
  }, [activeFields, emailJs, intentId, onSubmitSuccess, selectedIntent, setErrors, values]);

  return {
    clearSubmitFeedback,
    isSubmitEnabled,
    status,
    submit,
    submitError,
  };
}
