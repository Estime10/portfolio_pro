import { PageIntro } from "@/components/layout/page-intro/PageIntro";
import { getTranslations } from "next-intl/server";

export async function WorkScreen() {
  const t = await getTranslations("WorkScreen");

  return <PageIntro description={t("placeholder")} title={t("title")} />;
}
