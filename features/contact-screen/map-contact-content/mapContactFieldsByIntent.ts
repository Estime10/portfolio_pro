import { mapContactFieldsForIntent } from "@/features/contact-screen/map-contact-fields-for-intent/mapContactFieldsForIntent";
import type { ContactPageContentViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactTranslator } from "@/features/contact-screen/types/contactTranslator";

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
