import type { ContactFieldId } from "@/features/contact/types/contactFieldId";

export function createEmptyContactFormValues(): Record<ContactFieldId, string> {
  return {
    name: "",
    email: "",
    company: "",
    message: "",
  };
}
