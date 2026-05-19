import { mapContactFieldsByIntent } from "@/features/contact/map-contact-content/mapContactFieldsByIntent";
import type { ContactPageContentViewModel } from "@/features/contact/types/contactFormViewModel";
import { CONTACT_INTENT_IDS } from "@/features/contact/types/contactIntentId";
import type { ContactTranslator } from "@/features/contact/types/contactTranslator";
import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";
import type { EmailJsClientConfig } from "@/lib/config/emailjs/getEmailJsClientConfig";
import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";

export function mapContactContent(
  t: ContactTranslator,
  contactStrip: ContactStripLabels,
  emailJs: EmailJsClientConfig | null,
): ContactPageContentViewModel {
  const introParagraphs = asTranslationStringArray(
    t.raw("intro.paragraphs") as object,
    "intro.paragraphs",
  );

  const intents = CONTACT_INTENT_IDS.map((intentId) => ({
    id: intentId,
    label: t(`form.intent.options.${intentId}.label`),
    description: t(`form.intent.options.${intentId}.description`),
  }));

  return {
    title: t("title"),
    introParagraphs,
    form: {
      contactStrip,
      emailJs,
      intents,
      fieldsByIntent: mapContactFieldsByIntent(t),
      labels: {
        intentLegend: t("form.intent.legend"),
        intentHint: t("form.intent.hint"),
        back: t("form.back"),
        cancel: t("form.cancel"),
        requiredMark: t("form.requiredMark"),
        submit: t("form.submit"),
        submitting: t("form.submitting"),
        successTitle: t("form.success.title"),
        successBody: t("form.success.body"),
        errors: {
          intentRequired: t("form.errors.intentRequired"),
          fieldRequired: t("form.errors.fieldRequired"),
          emailInvalid: t("form.errors.emailInvalid"),
          submitFailed: t("form.errors.submitFailed"),
          submitNotConfigured: t("form.errors.submitNotConfigured"),
        },
      },
    },
  };
}
