import { getTranslations } from "next-intl/server";
import { SplashScreen } from "@/features/splash-screen/SplashScreen";
import { resolveAppLocale } from "@/lib/i18n/resolve-app-locale/resolveAppLocale";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata/createPageMetadata";

export async function generateMetadata() {
  const t = await getTranslations("SplashScreen.meta");
  const locale = await resolveAppLocale();

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    pathname: "/",
    locale,
    titleAbsolute: true,
  });
}

export default function Home() {
  return <SplashScreen />;
}
