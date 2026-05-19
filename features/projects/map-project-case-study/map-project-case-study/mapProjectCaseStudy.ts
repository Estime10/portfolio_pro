import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import {
  CASE_STUDY_APPROACH_BLOCK_ID,
  CASE_STUDY_PROBLEM_BLOCK_ID,
} from "@/features/projects/map-project-case-study/caseStudyIntroBlockIds";
import { CASE_STUDY_SECTION_IDS } from "@/features/projects/map-project-case-study/caseStudySectionIds";
import { mapCaseStudyDetailSection } from "@/features/projects/map-project-case-study/map-case-study-detail-section/mapCaseStudyDetailSection";
import { mapTaggedIntroSection } from "@/features/projects/map-project-case-study/map-tagged-intro-section/mapTaggedIntroSection";
import type { CaseStudyTranslator } from "@/features/projects/types/caseStudyTranslator";
import type { ProjectCaseStudyViewModel } from "@/features/projects/types/projectViewModel";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";

type CaseStudyTagLabels = ProjectCaseStudyViewModel["tagLabels"];

export function mapProjectCaseStudy(
  t: CaseStudyTranslator,
  slug: FeaturedProjectSlug,
  tagLabels: CaseStudyTagLabels,
): ProjectCaseStudyViewModel {
  const focusTagsKey = `${slug}.focusTags` as const;
  const stackKey = `${slug}.stack` as const;

  const problemSection = mapTaggedIntroSection(
    t,
    slug,
    CASE_STUDY_PROBLEM_BLOCK_ID,
    1,
    t("labels.problem"),
  );

  const approachSection = mapTaggedIntroSection(
    t,
    slug,
    CASE_STUDY_APPROACH_BLOCK_ID,
    2,
    t("labels.approach"),
  );

  const detailSections = CASE_STUDY_SECTION_IDS.map((sectionId, sectionIndex) =>
    mapCaseStudyDetailSection(t, slug, sectionId, sectionIndex + 3),
  );

  const sections = [problemSection, approachSection, ...detailSections];

  const navItems = sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return {
    slug,
    name: t(`${slug}.name`),
    tagline: t(`${slug}.tagline`),
    type: t(`${slug}.type`),
    status: t(`${slug}.status`),
    year: Number(t(`${slug}.year`)),
    role: t(`${slug}.role`),
    focusTags: asTranslationStringArray(t.raw(focusTagsKey) as object, focusTagsKey),
    stack: asTranslationStringArray(t.raw(stackKey) as object, stackKey),
    sections,
    navItems,
    navLabel: t("nav.label"),
    tagLabels,
  };
}
