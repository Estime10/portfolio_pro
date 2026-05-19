import type { Metadata } from "next";
import { ProjectsScreen } from "@/features/projects/ProjectsScreen";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProjectsScreen.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ProjectsPage() {
  return <ProjectsScreen />;
}
