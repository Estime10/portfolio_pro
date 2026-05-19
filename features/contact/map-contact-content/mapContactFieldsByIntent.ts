import { getContactFieldsForIntent } from "@/features/contact/config/getContactFieldsForIntent";
import { mapContactField } from "@/features/contact/map-contact-field/mapContactField";
import type { ContactPageContentViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactTranslator } from "@/features/contact/types/contactTranslator";

function mapIntentFields(
  t: ContactTranslator,
  intentId: "marketing-site" | "business-app" | "product-redesign" | "general-contact",
) {
  return getContactFieldsForIntent(intentId).map((definition) => mapContactField(t, definition));
}

export function mapContactFieldsByIntent(
  t: ContactTranslator,
): ContactPageContentViewModel["form"]["fieldsByIntent"] {
  return {
    "marketing-site": mapIntentFields(t, "marketing-site"),
    "business-app": mapIntentFields(t, "business-app"),
    "product-redesign": mapIntentFields(t, "product-redesign"),
    "general-contact": mapIntentFields(t, "general-contact"),
  };
}
