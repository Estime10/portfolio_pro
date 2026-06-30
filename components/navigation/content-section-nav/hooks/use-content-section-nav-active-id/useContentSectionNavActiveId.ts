"use client";

import { useEffect, useState } from "react";
import { isAtDocumentBottom } from "@/components/navigation/content-section-nav/is-document-bottom/isAtDocumentBottom";
import { resolveContentSectionNavActiveId } from "@/components/navigation/content-section-nav/resolve-content-section-nav-active-id/resolveContentSectionNavActiveId";

function readSectionMetrics(
  sectionIds: readonly string[],
): Record<string, { top: number; bottom: number }> {
  const sections: Record<string, { top: number; bottom: number }> = {};

  for (const sectionId of sectionIds) {
    const element = document.getElementById(sectionId);
    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();
    sections[sectionId] = { top: rect.top, bottom: rect.bottom };
  }

  return sections;
}

export function useContentSectionNavActiveId(sectionIds: readonly string[]): string {
  const sectionIdsKey = sectionIds.join("\0");
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const syncActiveId = (): void => {
      setActiveId(
        resolveContentSectionNavActiveId(sectionIds, {
          isAtDocumentBottom: isAtDocumentBottom(),
          viewportHeight: window.innerHeight,
          sections: readSectionMetrics(sectionIds),
        }),
      );
    };

    syncActiveId();
    window.addEventListener("scroll", syncActiveId, { passive: true });
    window.addEventListener("resize", syncActiveId, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncActiveId);
      window.removeEventListener("resize", syncActiveId);
    };
  }, [sectionIds, sectionIdsKey]);

  return activeId;
}
