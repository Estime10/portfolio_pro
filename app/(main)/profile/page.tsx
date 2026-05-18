import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProfileScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProfilePage() {
  const t = await getTranslations("ProfileScreen");

  return (
    <div className="ui-container ui-section">
      <h1 className="text-h1 text-foreground">{t("title")}</h1>
      <p className="text-body text-muted mt-4 max-w-prose">{t("placeholder")}</p>
    </div>
  );
}
