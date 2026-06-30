import { ProfileLayout } from "@/features/profile-screen/components/profile-layout/ProfileLayout";
import { mapProfileContent } from "@/features/profile-screen/map-profile-content/mapProfileContent";
import { getTranslations } from "next-intl/server";

export async function ProfileScreen() {
  const t = await getTranslations("ProfileScreen");
  const content = mapProfileContent(t);

  return <ProfileLayout content={content} />;
}
