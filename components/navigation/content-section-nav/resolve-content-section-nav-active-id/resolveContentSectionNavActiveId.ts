const SCROLL_OFFSET_PX = 120;

export type ContentSectionNavSectionMetrics = Readonly<{
  top: number;
  bottom: number;
}>;

export type ResolveContentSectionNavActiveIdInput = Readonly<{
  isAtDocumentBottom: boolean;
  viewportHeight: number;
  sections: Readonly<Record<string, ContentSectionNavSectionMetrics>>;
}>;

function getSectionMetrics(
  sectionId: string,
  sections: ResolveContentSectionNavActiveIdInput["sections"],
): ContentSectionNavSectionMetrics | null {
  return sections[sectionId] ?? null;
}

export function resolveContentSectionNavActiveId(
  sectionIds: readonly string[],
  input: ResolveContentSectionNavActiveIdInput,
): string {
  if (sectionIds.length === 0) {
    return "";
  }

  const lastSectionId = sectionIds.at(-1);
  if (!lastSectionId) {
    return "";
  }

  if (input.isAtDocumentBottom) {
    return lastSectionId;
  }

  const lastMetrics = getSectionMetrics(lastSectionId, input.sections);

  if (lastMetrics) {
    const lastSectionVisible = lastMetrics.top < input.viewportHeight && lastMetrics.bottom > 0;

    if (lastSectionVisible && sectionIds.length > 1) {
      const previousSectionId = sectionIds.at(-2);
      if (!previousSectionId) {
        return lastSectionId;
      }

      const previousMetrics = getSectionMetrics(previousSectionId, input.sections);

      if (previousMetrics && previousMetrics.bottom <= SCROLL_OFFSET_PX) {
        return lastSectionId;
      }
    }
  }

  const firstSectionId = sectionIds[0];
  let activeId = firstSectionId ?? "";

  for (const sectionId of sectionIds) {
    const metrics = getSectionMetrics(sectionId, input.sections);
    if (!metrics) {
      continue;
    }

    if (metrics.top <= SCROLL_OFFSET_PX) {
      activeId = sectionId;
    }
  }

  return activeId;
}
