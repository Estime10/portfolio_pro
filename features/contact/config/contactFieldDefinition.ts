import type { ContactFieldId } from "@/features/contact/types/contactFieldId";

export type ContactFieldControlType = "text" | "email" | "textarea";

export type ContactFieldDefinition = Readonly<{
  autocomplete?: string;
  controlType: ContactFieldControlType;
  enterKeyHint?: "done" | "enter" | "go" | "next" | "previous" | "search" | "send";
  id: ContactFieldId;
  inputMode?: "text" | "email" | "numeric";
  required: boolean;
  rows?: number;
}>;

export const CONTACT_FIELD_DEFINITIONS: Readonly<Record<ContactFieldId, ContactFieldDefinition>> = {
  name: {
    id: "name",
    controlType: "text",
    required: true,
    autocomplete: "name",
    enterKeyHint: "next",
  },
  email: {
    id: "email",
    controlType: "email",
    required: true,
    autocomplete: "email",
    inputMode: "email",
    enterKeyHint: "next",
  },
  company: {
    id: "company",
    controlType: "text",
    required: false,
    autocomplete: "organization",
    enterKeyHint: "next",
  },
  message: {
    id: "message",
    controlType: "textarea",
    required: true,
    rows: 5,
    enterKeyHint: "send",
  },
};
