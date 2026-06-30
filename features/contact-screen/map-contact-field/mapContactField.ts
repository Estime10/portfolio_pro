import type { ContactFieldDefinition } from "@/features/contact-screen/config/contact-field-definition/contactFieldDefinition";
import type { ContactFieldViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactTranslator } from "@/features/contact-screen/types/contactTranslator";

export function mapContactField(
  t: ContactTranslator,
  definition: ContactFieldDefinition,
): ContactFieldViewModel {
  const fieldId = definition.id;
  const label = t(`form.fields.${fieldId}.label`);
  const placeholderKey = `form.fields.${fieldId}.placeholder` as const;
  const hintKey = `form.fields.${fieldId}.hint` as const;

  return {
    id: fieldId,
    label,
    placeholder: t.has(placeholderKey) ? t(placeholderKey) : undefined,
    hint: t.has(hintKey) ? t(hintKey) : undefined,
    controlType: definition.controlType,
    required: definition.required,
    autocomplete: definition.autocomplete,
    inputMode: definition.inputMode,
    enterKeyHint: definition.enterKeyHint,
    rows: definition.rows,
  };
}
