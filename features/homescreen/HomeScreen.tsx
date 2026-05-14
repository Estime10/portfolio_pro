import type { ReactElement } from "react";
import { getTranslations } from "next-intl/server";
import { HomeHero } from "@/features/homescreen/home-hero/HomeHero";
import { WORK_ROUTE_PATH } from "@/lib/constants";

export async function HomeScreen(): Promise<ReactElement> {
  const t = await getTranslations("HomeScreen.hero");

  return (
    <HomeHero
      name={t("name")}
      role={t("role")}
      intro={t("intro")}
      ctaStartProject={t("ctaStartProject")}
      ctaViewWork={t("ctaViewWork")}
      modalPlaceholder={t("modalPlaceholder")}
      modalClose={t("modalClose")}
      workHref={WORK_ROUTE_PATH}
    />
  );
}
