import { ProjectCaseStudyLayout } from "@/features/projects/components/project-case-study-layout/ProjectCaseStudyLayout";
import { mapProjectCaseStudy } from "@/features/projects/map-project-case-study/mapProjectCaseStudy";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";
import { getTranslations } from "next-intl/server";

export type ProjectCaseStudyScreenProps = Readonly<{
  slug: FeaturedProjectSlug;
}>;

export async function ProjectCaseStudyScreen({ slug }: ProjectCaseStudyScreenProps) {
  const t = await getTranslations("ProjectsScreen.caseStudies");
  const content = mapProjectCaseStudy(t, slug);

  return <ProjectCaseStudyLayout content={content} />;
}
