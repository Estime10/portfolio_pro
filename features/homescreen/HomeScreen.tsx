import { getTranslations } from "next-intl/server";
import { HomeHero } from "@/features/homescreen/home-hero/HomeHero";
import { mapContactStripLabels } from "@/features/homescreen/home-hero/map-contact-strip-labels/mapContactStripLabels";
import { PROJECTS_ROUTE_PATH } from "@/lib/constants";

export async function HomeScreen() {
  const t = await getTranslations("HomeScreen.hero");

  return (
    <HomeHero
      contactStrip={mapContactStripLabels(t)}
      ctaStartProject={t("ctaStartProject")}
      ctaViewProjects={t("ctaViewProjects")}
      intro={t("intro")}
      name={t("name")}
      role={t("role")}
      projectHref={PROJECTS_ROUTE_PATH}
    />
  );
}
