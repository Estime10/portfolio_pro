import type { getTranslations } from "next-intl/server";
import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type { ProjectCaseStudyViewModel } from "@/features/projects/types/projectViewModel";
import {
  CASE_STUDY_SECTION_IDS,
  type CaseStudySectionId,
} from "@/features/projects/map-project-case-study/caseStudySectionIds";
import type { FeaturedProjectSlug } from "@/lib/projects/project-catalog";

type CaseStudyTranslator = Awaited<
  ReturnType<typeof getTranslations<"ProjectsScreen.caseStudies">>
>;

const CASE_STUDY_PROBLEM_ID = "problem";
const CASE_STUDY_APPROACH_ID = "approach";

function mapCaseStudyDetailSection(
  t: CaseStudyTranslator,
  slug: FeaturedProjectSlug,
  sectionId: CaseStudySectionId,
  index: number,
): ProjectCaseStudyViewModel["sections"][number] {
  const paragraphsKey = `${slug}.sections.${sectionId}.paragraphs` as const;
  const bulletsKey = `${slug}.sections.${sectionId}.bullets` as const;

  const paragraphs = asTranslationStringArray(
    t.raw(paragraphsKey) as object,
    paragraphsKey,
  );

  const bullets = t.has(bulletsKey)
    ? asTranslationStringArray(t.raw(bulletsKey) as object, bulletsKey)
    : undefined;

  return {
    id: sectionId,
    index,
    title: t(`${slug}.sections.${sectionId}.title`),
    paragraphs,
    bullets,
  };
}

export function mapProjectCaseStudy(
  t: CaseStudyTranslator,
  slug: FeaturedProjectSlug,
): ProjectCaseStudyViewModel {
  const problemKey = `${slug}.problem` as const;
  const approachKey = `${slug}.approach` as const;
  const stackKey = `${slug}.stack` as const;

  const problemLabel = t("labels.problem");
  const approachLabel = t("labels.approach");

  const problemSection: ProjectCaseStudyViewModel["sections"][number] = {
    id: CASE_STUDY_PROBLEM_ID,
    index: 1,
    title: problemLabel,
    paragraphs: asTranslationStringArray(t.raw(problemKey) as object, problemKey),
  };

  const approachSection: ProjectCaseStudyViewModel["sections"][number] = {
    id: CASE_STUDY_APPROACH_ID,
    index: 2,
    title: approachLabel,
    paragraphs: asTranslationStringArray(t.raw(approachKey) as object, approachKey),
  };

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
    stack: asTranslationStringArray(t.raw(stackKey) as object, stackKey),
    sections,
    navItems,
    navLabel: t("nav.label"),
  };
}
