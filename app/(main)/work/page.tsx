import type { Metadata } from "next";
import { WorkScreen } from "@/features/work/WorkScreen";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WorkScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function WorkPage() {
  return <WorkScreen />;
}
