import { ProjectCaseStudyLayout } from "@/features/projects-screen/components/project-case-study-layout/ProjectCaseStudyLayout";
import { mapProjectCaseStudy } from "@/features/projects-screen/map-project-case-study/map-project-case-study/mapProjectCaseStudy";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";
import { getTranslations } from "next-intl/server";

export type ProjectCaseStudyScreenProps = Readonly<{
  slug: FeaturedProjectSlug;
}>;

export async function ProjectCaseStudyScreen({ slug }: ProjectCaseStudyScreenProps) {
  const t = await getTranslations("ProjectsScreen.caseStudies");
  const tScreen = await getTranslations("ProjectsScreen");
  const tagLabels = {
    focus: tScreen("tags.focus"),
    stack: tScreen("tags.stack"),
    section: tScreen("tags.section"),
  };
  const content = mapProjectCaseStudy(t, slug, tagLabels);

  return <ProjectCaseStudyLayout content={content} />;
}
