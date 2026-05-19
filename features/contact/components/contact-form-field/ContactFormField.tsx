"use client";

import { FormField } from "@/components/form/form-field/FormField";
import { getFormFieldDescribedBy } from "@/components/form/form-field/getFormFieldDescribedBy";
import { FormTextInput } from "@/components/form/form-text-input/FormTextInput";
import { FormTextarea } from "@/components/form/form-textarea/FormTextarea";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactFormValidationErrorCode } from "@/features/contact/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import type { ChangeEvent } from "react";

export type ContactFormFieldProps = Readonly<{
  errorCode?: ContactFormValidationErrorCode;
  errorMessage: string;
  field: ContactFieldViewModel;
  onBlur: () => void;
  onChange: (value: string) => void;
  requiredMark: string;
  value: string;
}>;

export function ContactFormField({
  errorCode,
  errorMessage,
  field,
  onBlur,
  onChange,
  requiredMark,
  value,
}: ContactFormFieldProps) {
  const fieldId = `contact-${field.id}`;
  const hasError = Boolean(errorCode);
  const describedBy = getFormFieldDescribedBy(fieldId, Boolean(field.hint), hasError);

  const sharedProps = {
    id: fieldId,
    name: field.id,
    value,
    required: field.required,
    autoComplete: field.autocomplete,
    inputMode: field.inputMode,
    enterKeyHint: field.enterKeyHint,
    placeholder: field.placeholder,
    "aria-describedby": describedBy,
    onBlur,
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    onChange(event.target.value);
  };

  return (
    <FormField
      error={hasError ? errorMessage : undefined}
      fieldId={fieldId}
      hint={field.hint}
      label={field.label}
      required={field.required}
      requiredMark={requiredMark}
    >
      {field.controlType === "textarea" ? (
        <FormTextarea {...sharedProps} invalid={hasError} onChange={handleChange} rows={field.rows} />
      ) : (
        <FormTextInput
          {...sharedProps}
          invalid={hasError}
          onChange={handleChange}
          type={field.controlType}
        />
      )}
    </FormField>
  );
}
