import { ContactLayout } from "@/features/contact-screen/components/contact-layout/ContactLayout";
import { mapContactContent } from "@/features/contact-screen/map-contact-content/mapContactContent";
import { mapContactStripLabels } from "@/lib/contact-channels/map-contact-strip-labels/mapContactStripLabels";
import { getContactFormSubmissionConfig } from "@/lib/config/contact-form/getContactFormSubmissionConfig";
import { getTranslations } from "next-intl/server";

export async function ContactScreen() {
  const t = await getTranslations("ContactScreen");
  const tHero = await getTranslations("HomeScreen.hero");
  const content = mapContactContent(
    t,
    mapContactStripLabels(tHero),
    getContactFormSubmissionConfig(),
  );

  return <ContactLayout content={content} />;
}
