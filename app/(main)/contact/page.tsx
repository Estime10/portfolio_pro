import type { Metadata } from "next";
import { ContactScreen } from "@/features/contact/ContactScreen";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactPage() {
  return <ContactScreen />;
}
