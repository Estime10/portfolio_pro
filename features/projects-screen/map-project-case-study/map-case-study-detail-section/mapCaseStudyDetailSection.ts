import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type { CaseStudySectionId } from "@/features/projects-screen/map-project-case-study/caseStudySectionIds";
import { readOptionalTranslationTags } from "@/features/projects-screen/map-project-case-study/read-optional-translation-tags/readOptionalTranslationTags";
import type { CaseStudyTranslator } from "@/features/projects-screen/types/caseStudyTranslator";
import type { ProjectCaseStudyViewModel } from "@/features/projects-screen/types/projectViewModel";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";

export function mapCaseStudyDetailSection(
  t: CaseStudyTranslator,
  slug: FeaturedProjectSlug,
  sectionId: CaseStudySectionId,
  index: number,
): ProjectCaseStudyViewModel["sections"][number] {
  const paragraphsKey = `${slug}.sections.${sectionId}.paragraphs` as const;
  const bulletsKey = `${slug}.sections.${sectionId}.bullets` as const;
  const tagsKey = `${slug}.sections.${sectionId}.tags` as const;

  const paragraphs = asTranslationStringArray(t.raw(paragraphsKey) as object, paragraphsKey);

  const bullets = t.has(bulletsKey)
    ? asTranslationStringArray(t.raw(bulletsKey) as object, bulletsKey)
    : undefined;

  return {
    id: sectionId,
    index,
    title: t(`${slug}.sections.${sectionId}.title`),
    tags: readOptionalTranslationTags(t, tagsKey),
    paragraphs,
    bullets,
  };
}
