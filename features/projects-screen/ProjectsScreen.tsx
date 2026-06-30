import { ProjectsLayout } from "@/features/projects-screen/components/projects-layout/ProjectsLayout";
import { mapProjectsContent } from "@/features/projects-screen/map-projects-content/map-projects-content/mapProjectsContent";
import { getTranslations } from "next-intl/server";

export async function ProjectsScreen() {
  const t = await getTranslations("ProjectsScreen");
  const content = mapProjectsContent(t);

  return <ProjectsLayout content={content} />;
}
