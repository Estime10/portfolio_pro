import { formatContactFormEmailTime } from "@/features/contact/services/format-contact-form-email-time/formatContactFormEmailTime";
import type { ContactFormSubmissionPayload } from "@/features/contact/types/contactFormSubmissionPayload";

/**
 * Variables du template EmailJS — voir `features/contact/email/contact-form-email-template.html`.
 *
 * Subject suggéré : Nouvelle demande — {{intent_label}} · {{name}}
 */
export type ContactFormEmailTemplateParams = Readonly<{
  company: string;
  from_name: string;
  intent_id: string;
  intent_label: string;
  message: string;
  name: string;
  reply_to: string;
  time: string;
}>;

const EMPTY_COMPANY_PLACEHOLDER = "—";

export function buildContactFormEmailTemplateParams(
  payload: ContactFormSubmissionPayload,
): ContactFormEmailTemplateParams {
  const company = payload.values.company.trim();
  const fromName = payload.values.name.trim();
  const replyTo = payload.values.email.trim();

  return {
    intent_label: payload.intentLabel,
    intent_id: payload.intentId,
    from_name: fromName,
    name: fromName,
    reply_to: replyTo,
    company: company.length > 0 ? company : EMPTY_COMPANY_PLACEHOLDER,
    message: payload.values.message.trim(),
    time: formatContactFormEmailTime(),
  };
}
