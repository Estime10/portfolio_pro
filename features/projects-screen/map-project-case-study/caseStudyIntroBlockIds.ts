export const CASE_STUDY_PROBLEM_BLOCK_ID = "problem" as const;
export const CASE_STUDY_APPROACH_BLOCK_ID = "approach" as const;

export type CaseStudyIntroBlockId =
  typeof CASE_STUDY_PROBLEM_BLOCK_ID | typeof CASE_STUDY_APPROACH_BLOCK_ID;
