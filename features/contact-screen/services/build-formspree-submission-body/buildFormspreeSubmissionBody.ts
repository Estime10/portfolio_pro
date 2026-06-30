import { formatContactFormEmailTime } from "@/features/contact-screen/services/format-contact-form-email-time/formatContactFormEmailTime";
import type { ContactFormSubmissionPayload } from "@/features/contact-screen/types/contactFormSubmissionPayload";

/**
 * Corps JSON Formspree — champs visibles dans le tableau de bord et l’e-mail reçu.
 *
 * Sujet suggéré côté Formspree : Nouvelle demande — {{intent_label}} · {{name}}
 */
export type FormspreeSubmissionBody = Readonly<Record<string, string>>;

const EMPTY_COMPANY_PLACEHOLDER = "—";

export function buildFormspreeSubmissionBody(
  payload: ContactFormSubmissionPayload,
): FormspreeSubmissionBody {
  const company = payload.values.company.trim();
  const name = payload.values.name.trim();
  const email = payload.values.email.trim();

  return {
    _subject: `Nouvelle demande — ${payload.intentLabel} · ${name}`,
    name,
    email,
    company: company.length > 0 ? company : EMPTY_COMPANY_PLACEHOLDER,
    message: payload.values.message.trim(),
    intent_id: payload.intentId,
    intent_label: payload.intentLabel,
    time: formatContactFormEmailTime(),
  };
}
