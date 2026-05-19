import type { getTranslations } from "next-intl/server";
import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type {
  ProjectCardViewModel,
  ProjectsContentViewModel,
} from "@/features/projects/types/projectViewModel";
import {
  getFeaturedProjects,
  getSecondaryProjects,
  type ProjectCatalogEntry,
} from "@/lib/projects/project-catalog";

type ProjectsTranslator = Awaited<ReturnType<typeof getTranslations<"ProjectsScreen">>>;

function mapProjectCard(
  t: ProjectsTranslator,
  entry: ProjectCatalogEntry,
): ProjectCardViewModel {
  const slug = entry.slug;
  const highlightsKey = `items.${slug}.highlights` as const;
  const stackKey = `items.${slug}.stack` as const;

  return {
    slug,
    year: entry.year,
    name: t(`items.${slug}.name`),
    tagline: t(`items.${slug}.tagline`),
    type: t(`items.${slug}.type`),
    status: t(`items.${slug}.status`),
    summary: t(`items.${slug}.summary`),
    highlights: asTranslationStringArray(t.raw(highlightsKey) as object, highlightsKey),
    stack: asTranslationStringArray(t.raw(stackKey) as object, stackKey),
    liveUrl: entry.liveUrl,
    caseStudyHref: entry.hasCaseStudy ? `/projects/${slug}` : undefined,
  };
}

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
    featured: getFeaturedProjects().map((entry) => mapProjectCard(t, entry)),
    secondary: getSecondaryProjects().map((entry) => mapProjectCard(t, entry)),
  };
}
