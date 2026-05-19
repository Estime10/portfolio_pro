import { mapContactFieldsForIntent } from "@/features/contact/map-contact-fields-for-intent/mapContactFieldsForIntent";
import type { ContactPageContentViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactTranslator } from "@/features/contact/types/contactTranslator";

export function mapContactFieldsByIntent(
  t: ContactTranslator,
): ContactPageContentViewModel["form"]["fieldsByIntent"] {
  return {
    "marketing-site": mapContactFieldsForIntent(t, "marketing-site"),
    "business-app": mapContactFieldsForIntent(t, "business-app"),
    "product-redesign": mapContactFieldsForIntent(t, "product-redesign"),
    "general-contact": mapContactFieldsForIntent(t, "general-contact"),
  };
}
