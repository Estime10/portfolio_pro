import { PageIntro } from "@/components/layout/page-intro/PageIntro";
import { getTranslations } from "next-intl/server";

export async function ContactScreen() {
  const t = await getTranslations("ContactScreen");

  return <PageIntro description={t("placeholder")} title={t("title")} />;
}
