"use client";

import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactFormValidationErrors } from "@/features/contact-screen/validation/contact-form-validation-error-code/contactFormValidationErrorCode";
import { createEmptyContactFormValues } from "@/features/contact-screen/validation/create-empty-contact-form-values/createEmptyContactFormValues";
import { useCallback, useState, type RefObject } from "react";

export type UseContactFormValuesParams = Readonly<{
  advanceRevealForField: (fieldId: ContactFieldId, fieldValue: string) => void;
  onFieldInteractionRef: RefObject<() => void>;
}>;

export type UseContactFormValuesReturn = Readonly<{
  clearFieldError: (fieldId: ContactFieldId) => void;
  errors: ContactFormValidationErrors;
  handleFieldBlur: (fieldId: ContactFieldId) => void;
  handleFieldChange: (fieldId: ContactFieldId, value: string) => void;
  resetValues: () => void;
  setErrors: (errors: ContactFormValidationErrors) => void;
  values: Record<ContactFieldId, string>;
}>;

export function useContactFormValues({
  advanceRevealForField,
  onFieldInteractionRef,
}: UseContactFormValuesParams): UseContactFormValuesReturn {
  const [values, setValues] = useState(createEmptyContactFormValues);
  const [errors, setErrors] = useState<ContactFormValidationErrors>({});

  const resetValues = useCallback(() => {
    setValues(createEmptyContactFormValues());
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldId: ContactFieldId) => {
    setErrors((current) => ({ ...current, [fieldId]: undefined }));
  }, []);

  const handleFieldChange = useCallback(
    (fieldId: ContactFieldId, value: string) => {
      setValues((current) => ({ ...current, [fieldId]: value }));
      clearFieldError(fieldId);
      onFieldInteractionRef.current();
      advanceRevealForField(fieldId, value);
    },
    [advanceRevealForField, clearFieldError, onFieldInteractionRef],
  );

  const handleFieldBlur = useCallback(
    (fieldId: ContactFieldId) => {
      advanceRevealForField(fieldId, values[fieldId]);
    },
    [advanceRevealForField, values],
  );

  return {
    clearFieldError,
    errors,
    handleFieldBlur,
    handleFieldChange,
    resetValues,
    setErrors,
    values,
  };
}
