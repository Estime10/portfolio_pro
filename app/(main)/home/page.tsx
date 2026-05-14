import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeScreen } from "@/features/homescreen/HomeScreen";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomeScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return <HomeScreen />;
}
