import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import { mapProjectCard } from "@/features/projects/map-projects-content/map-project-card/mapProjectCard";
import type { ProjectsContentViewModel } from "@/features/projects/types/projectViewModel";
import type { ProjectsTranslator } from "@/features/projects/types/projectsTranslator";
import { getFeaturedProjects, getSecondaryProjects } from "@/lib/projects/project-catalog";

export function mapProjectsContent(t: ProjectsTranslator): ProjectsContentViewModel {
  const introParagraphs = asTranslationStringArray(
    t.raw("intro.paragraphs") as object,
    "intro.paragraphs",
  );

  return {
    title: t("title"),
    introParagraphs,
    featuredLabel: t("sections.featured"),
    secondaryLabel: t("sections.secondary"),
    selectionNote: t("selectionNote"),
    readCaseStudyLabel: t("card.readCaseStudy"),
    viewLiveLabel: t("card.viewLive"),
    tagLabels: {
      focus: t("tags.focus"),
      stack: t("tags.stack"),
    },
    featured: getFeaturedProjects().map((entry) => mapProjectCard(t, entry)),
    secondary: getSecondaryProjects().map((entry) => mapProjectCard(t, entry)),
  };
}
