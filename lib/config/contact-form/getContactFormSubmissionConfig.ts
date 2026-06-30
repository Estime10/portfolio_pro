import {
  CONTACT_FORM_API_PATH,
  type ContactFormSubmissionConfig,
} from "@/lib/config/contact-form/contactFormApiPath";
import { getFormspreeServerConfig } from "@/lib/config/formspree/getFormspreeServerConfig";

export function getContactFormSubmissionConfig(): ContactFormSubmissionConfig | null {
  if (!getFormspreeServerConfig()) {
    return null;
  }

  return {
    endpoint: CONTACT_FORM_API_PATH,
  };
}
