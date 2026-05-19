export const CASE_STUDY_SECTION_IDS = [
  "context",
  "architecture",
  "decisions",
  "execution",
] as const;

export type CaseStudySectionId = (typeof CASE_STUDY_SECTION_IDS)[number];
