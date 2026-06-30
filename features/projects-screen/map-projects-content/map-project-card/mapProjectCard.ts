import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type { ProjectCardViewModel } from "@/features/projects-screen/types/projectViewModel";
import type { ProjectsTranslator } from "@/features/projects-screen/types/projectsTranslator";
import type { ProjectCatalogEntry } from "@/lib/projects/project-catalog";

export function mapProjectCard(
  t: ProjectsTranslator,
  entry: ProjectCatalogEntry,
): ProjectCardViewModel {
  const slug = entry.slug;
  const highlightsKey = `items.${slug}.highlights` as const;
  const stackKey = `items.${slug}.stack` as const;
  const tagsKey = `items.${slug}.tags` as const;

  return {
    slug,
    year: entry.year,
    name: t(`items.${slug}.name`),
    tagline: t(`items.${slug}.tagline`),
    type: t(`items.${slug}.type`),
    status: t(`items.${slug}.status`),
    summary: t(`items.${slug}.summary`),
    highlights: asTranslationStringArray(t.raw(highlightsKey) as object, highlightsKey),
    tags: t.has(tagsKey) ? asTranslationStringArray(t.raw(tagsKey) as object, tagsKey) : [],
    stack: asTranslationStringArray(t.raw(stackKey) as object, stackKey),
    liveUrl: entry.liveUrl,
    caseStudyHref: entry.hasCaseStudy ? `/projects/${slug}` : undefined,
  };
}
