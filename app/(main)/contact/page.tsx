import { ContactScreen } from "@/features/contact/ContactScreen";
import { CONTACT_ROUTE_PATH } from "@/lib/constants";
import { resolveAppLocale } from "@/lib/i18n/resolve-app-locale/resolveAppLocale";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata/createPageMetadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ContactScreen.meta");
  const locale = await resolveAppLocale();

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    pathname: CONTACT_ROUTE_PATH,
    locale,
  });
}

export default function ContactPage() {
  return <ContactScreen />;
}
