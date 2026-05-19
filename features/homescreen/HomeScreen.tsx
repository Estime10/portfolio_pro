import { getTranslations } from "next-intl/server";
import { HomeHero } from "@/features/homescreen/home-hero/HomeHero";
import { PROJECTS_ROUTE_PATH } from "@/lib/constants";

export async function HomeScreen() {
  const t = await getTranslations("HomeScreen.hero");

  return (
    <HomeHero
      contactStrip={{
        ariaLabel: t("contactStrip.ariaLabel"),
        instagramLabel: t("contactStrip.instagramLabel"),
        linkedinLabel: t("contactStrip.linkedinLabel"),
        emailLabel: t("contactStrip.emailLabel"),
        phoneLabel: t("contactStrip.phoneLabel"),
      }}
      ctaStartProject={t("ctaStartProject")}
      ctaViewProjects={t("ctaViewProjects")}
      intro={t("intro")}
      name={t("name")}
      role={t("role")}
      projectHref={PROJECTS_ROUTE_PATH}
    />
  );
}
