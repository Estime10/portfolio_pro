import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WorkScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WorkPage(): Promise<ReactElement> {
  const t = await getTranslations("WorkScreen");

  return (
    <div className="ui-container ui-section">
      <h1 className="text-h1 text-foreground">{t("title")}</h1>
      <p className="text-body text-muted mt-4 max-w-prose">{t("placeholder")}</p>
    </div>
  );
}
