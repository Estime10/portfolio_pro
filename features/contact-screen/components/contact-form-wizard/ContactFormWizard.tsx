"use client";

import { CtaButton, CtaOutlineButton } from "@/components/button";
import { ContactFormField } from "@/features/contact-screen/components/contact-form-field/ContactFormField";
import { ContactSelectedIntentCard } from "@/features/contact-screen/components/contact-selected-intent-card/ContactSelectedIntentCard";
import { CONTACT_WIZARD_REVEAL_STEPS } from "@/features/contact-screen/config/contact-wizard-reveal-steps/contactWizardRevealSteps";
import { useContactFormFieldRevealAnimation } from "@/features/contact-screen/hooks/use-contact-form-field-reveal-animation/useContactFormFieldRevealAnimation";
import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactFormViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactIntentOptionViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactFormValidationErrorCode } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ContactFormValidationErrors } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ContactFieldViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import { useMemo } from "react";

export type ContactFormWizardProps = Readonly<{
  activeFields: readonly ContactFieldViewModel[];
  cancelLabel: string;
  errors: ContactFormValidationErrors;
  getErrorMessage: (code: ContactFormValidationErrorCode) => string;
  handleFieldBlur: (fieldId: ContactFieldId) => void;
  handleFieldChange: (fieldId: ContactFieldId, value: string) => void;
  isSubmitEnabled: boolean;
  labels: ContactFormViewModel["labels"];
  onCancel: () => void;
  revealedStepIndex: number;
  selectedIntent: ContactIntentOptionViewModel;
  status: "idle" | "submitting";
  submitErrorMessage: string;
  values: Record<ContactFieldId, string>;
}>;

export function ContactFormWizard({
  activeFields,
  cancelLabel,
  errors,
  getErrorMessage,
  handleFieldBlur,
  handleFieldChange,
  isSubmitEnabled,
  labels,
  onCancel,
  revealedStepIndex,
  selectedIntent,
  status,
  submitErrorMessage,
  values,
}: ContactFormWizardProps) {
  useContactFormFieldRevealAnimation(revealedStepIndex);

  const fieldById = useMemo(
    () => new Map(activeFields.map((field) => [field.id, field])),
    [activeFields],
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-6">
      <ContactSelectedIntentCard
        cancelLabel={cancelLabel}
        intent={selectedIntent}
        onCancel={onCancel}
      />

      <div className="contact-form-fields flex flex-col gap-6">
        {CONTACT_WIZARD_REVEAL_STEPS.map((stepFieldIds, stepIndex) => {
          if (stepIndex > revealedStepIndex) {
            return null;
          }

          return (
            <div
              key={stepFieldIds.join("-")}
              className="flex flex-col gap-6"
              data-contact-reveal-step={stepIndex}
            >
              {stepFieldIds.map((fieldId) => {
                const field = fieldById.get(fieldId);
                if (!field) {
                  return null;
                }

                const fieldError = errors[field.id];

                return (
                  <div key={field.id} data-contact-field data-contact-field-id={field.id}>
                    <ContactFormField
                      errorCode={fieldError}
                      errorMessage={fieldError ? getErrorMessage(fieldError) : ""}
                      field={field}
                      onBlur={() => {
                        handleFieldBlur(field.id);
                      }}
                      onChange={(value) => {
                        handleFieldChange(field.id, value);
                      }}
                      requiredMark={labels.requiredMark}
                      value={values[field.id]}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {submitErrorMessage ? (
        <p className="text-small text-[color:var(--color-destructive,#dc2626)]" role="alert">
          {submitErrorMessage}
        </p>
      ) : null}

      <div className="contact-form-actions flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap sm:items-stretch">
        <CtaButton
          className="w-full sm:w-auto"
          disabled={!isSubmitEnabled || status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? labels.submitting : labels.submit}
        </CtaButton>
        <CtaOutlineButton className="w-full sm:w-auto" onClick={onCancel} type="button">
          {cancelLabel}
        </CtaOutlineButton>
      </div>
    </div>
  );
}
