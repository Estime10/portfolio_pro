import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type { CaseStudyIntroBlockId } from "@/features/projects-screen/map-project-case-study/caseStudyIntroBlockIds";
import { readOptionalTranslationTags } from "@/features/projects-screen/map-project-case-study/read-optional-translation-tags/readOptionalTranslationTags";
import type { CaseStudyTranslator } from "@/features/projects-screen/types/caseStudyTranslator";
import type { ProjectCaseStudyViewModel } from "@/features/projects-screen/types/projectViewModel";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";

export function mapTaggedIntroSection(
  t: CaseStudyTranslator,
  slug: FeaturedProjectSlug,
  blockId: CaseStudyIntroBlockId,
  index: number,
  title: string,
): ProjectCaseStudyViewModel["sections"][number] {
  const paragraphsKey = `${slug}.${blockId}.paragraphs` as const;
  const tagsKey = `${slug}.${blockId}.tags` as const;

  return {
    id: blockId,
    index,
    title,
    tags: readOptionalTranslationTags(t, tagsKey),
    paragraphs: asTranslationStringArray(t.raw(paragraphsKey) as object, paragraphsKey),
  };
}
