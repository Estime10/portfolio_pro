import { ContactLayout } from "@/features/contact/components/contact-layout/ContactLayout";
import { mapContactContent } from "@/features/contact/map-contact-content/mapContactContent";
import { mapContactStripLabels } from "@/features/contact/map-contact-strip-labels/mapContactStripLabels";
import { getEmailJsClientConfig } from "@/lib/config/emailjs/getEmailJsClientConfig";
import { getTranslations } from "next-intl/server";

export async function ContactScreen() {
  const t = await getTranslations("ContactScreen");
  const tHome = await getTranslations("HomeScreen");
  const content = mapContactContent(t, mapContactStripLabels(tHome), getEmailJsClientConfig());

  return <ContactLayout content={content} />;
}
