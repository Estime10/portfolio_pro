import { PageIntro } from "@/components/layout/page-intro/PageIntro";
import { getTranslations } from "next-intl/server";

export async function ProjectsScreen() {
  const t = await getTranslations("ProjectsScreen");

  return <PageIntro description={t("placeholder")} title={t("title")} />;
}
