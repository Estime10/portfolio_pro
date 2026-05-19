import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";

export function createEmptyContactFormValues(): Record<ContactFieldId, string> {
  return {
    name: "",
    email: "",
    company: "",
    message: "",
  };
}
