import { asTranslationStringArray } from "@/lib/i18n/asTranslationStringArray";
import type { CaseStudyTranslator } from "@/features/projects/types/caseStudyTranslator";

export function readOptionalTranslationTags(
  t: CaseStudyTranslator,
  key: string,
): readonly string[] | undefined {
  if (!t.has(key)) {
    return undefined;
  }

  return asTranslationStringArray(t.raw(key) as object, key);
}
