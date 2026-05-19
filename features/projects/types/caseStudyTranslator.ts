import type { getTranslations } from "next-intl/server";

export type CaseStudyTranslator = Awaited<
  ReturnType<typeof getTranslations<"ProjectsScreen.caseStudies">>
>;
