import { CONTACT_FIELD_DEFINITIONS } from "@/features/contact-screen/config/contact-field-definition/contactFieldDefinition";
import { CONTACT_FIELD_IDS } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact-screen/types/contactFormViewModel";

export function createWizardContactFieldViewModels(): readonly ContactFieldViewModel[] {
  return CONTACT_FIELD_IDS.map((fieldId) => {
    const definition = CONTACT_FIELD_DEFINITIONS[fieldId];

    return {
      id: definition.id,
      label: fieldId,
      required: definition.required,
      controlType: definition.controlType,
    };
  });
}

export const validWizardFormValues = {
  name: "Estime Vangu",
  email: "estimevangu.pro@gmail.com",
  company: "Acme",
  message: "Bonjour, je souhaite échanger sur un projet.",
} as const;
