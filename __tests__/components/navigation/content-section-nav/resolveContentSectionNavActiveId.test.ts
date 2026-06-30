import { describe, expect, it } from "vitest";
import { resolveContentSectionNavActiveId } from "@/components/navigation/content-section-nav/resolve-content-section-nav-active-id/resolveContentSectionNavActiveId";

describe("resolveContentSectionNavActiveId", () => {
  const sectionIds = [
    "problem",
    "approach",
    "context",
    "architecture",
    "decisions",
    "execution",
  ] as const;

  it("returns the last section when the document bottom is reached", () => {
    const activeId = resolveContentSectionNavActiveId(sectionIds, {
      isAtDocumentBottom: true,
      viewportHeight: 900,
      sections: {
        problem: { top: -800, bottom: -500 },
        approach: { top: -400, bottom: -100 },
        context: { top: 100, bottom: 400 },
        architecture: { top: 450, bottom: 700 },
        decisions: { top: 750, bottom: 950 },
        execution: { top: 200, bottom: 500 },
      },
    });

    expect(activeId).toBe("execution");
  });

  it("returns the last section when it is visible and the previous section has scrolled past", () => {
    const activeId = resolveContentSectionNavActiveId(sectionIds, {
      isAtDocumentBottom: false,
      viewportHeight: 900,
      sections: {
        problem: { top: -2000, bottom: -1700 },
        approach: { top: -1600, bottom: -1300 },
        context: { top: -1200, bottom: -900 },
        architecture: { top: -800, bottom: -500 },
        decisions: { top: -100, bottom: 50 },
        execution: { top: 180, bottom: 520 },
      },
    });

    expect(activeId).toBe("execution");
  });

  it("keeps the standard scroll spy behavior for earlier sections", () => {
    const activeId = resolveContentSectionNavActiveId(sectionIds, {
      isAtDocumentBottom: false,
      viewportHeight: 900,
      sections: {
        problem: { top: -300, bottom: 0 },
        approach: { top: 80, bottom: 360 },
        context: { top: 420, bottom: 700 },
        architecture: { top: 760, bottom: 1040 },
        decisions: { top: 1100, bottom: 1380 },
        execution: { top: 1440, bottom: 1720 },
      },
    });

    expect(activeId).toBe("approach");
  });
});
