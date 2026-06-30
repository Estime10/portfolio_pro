import { describe, expect, it } from "vitest";
import { resolveContentSectionNavMobileScrollLeft } from "@/components/navigation/content-section-nav/resolve-content-section-nav-mobile-scroll-left/resolveContentSectionNavMobileScrollLeft";

const SCROLL_PADDING = 16;
const LIST_WIDTH = 320;
const MAX_SCROLL = 480;

describe("resolveContentSectionNavMobileScrollLeft", () => {
  it("aligns the active item to the start with leading inset", () => {
    const scrollLeft = resolveContentSectionNavMobileScrollLeft({
      activeItemOffsetLeft: 120,
      activeItemOffsetRight: 220,
      isAtDocumentBottom: false,
      listClientWidth: LIST_WIDTH,
      maxScrollLeft: MAX_SCROLL,
      scrollPaddingLeft: SCROLL_PADDING,
      scrollPaddingRight: SCROLL_PADDING,
    });

    expect(scrollLeft).toBe(104);
  });

  it("pins to the end when the page bottom is reached", () => {
    const scrollLeft = resolveContentSectionNavMobileScrollLeft({
      activeItemOffsetLeft: 360,
      activeItemOffsetRight: 460,
      isAtDocumentBottom: true,
      listClientWidth: LIST_WIDTH,
      maxScrollLeft: MAX_SCROLL,
      scrollPaddingLeft: SCROLL_PADDING,
      scrollPaddingRight: SCROLL_PADDING,
    });

    expect(scrollLeft).toBe(MAX_SCROLL);
  });

  it("pins to the end when the active item cannot reach the start cleanly", () => {
    const scrollLeft = resolveContentSectionNavMobileScrollLeft({
      activeItemOffsetLeft: 500,
      activeItemOffsetRight: 620,
      isAtDocumentBottom: false,
      listClientWidth: LIST_WIDTH,
      maxScrollLeft: MAX_SCROLL,
      scrollPaddingLeft: SCROLL_PADDING,
      scrollPaddingRight: SCROLL_PADDING,
    });

    expect(scrollLeft).toBe(MAX_SCROLL);
  });
});
