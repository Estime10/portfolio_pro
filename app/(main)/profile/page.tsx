import type { Metadata } from "next";
import { ProfileScreen } from "@/features/profile/ProfileScreen";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProfileScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ProfilePage() {
  return <ProfileScreen />;
}
