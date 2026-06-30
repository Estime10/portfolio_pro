"use client";

import { useLayoutEffect, useRef, type RefCallback, type RefObject } from "react";
import { isAtDocumentBottom } from "@/components/navigation/content-section-nav/is-document-bottom/isAtDocumentBottom";
import { resolveContentSectionNavMobileScrollLeft } from "@/components/navigation/content-section-nav/resolve-content-section-nav-mobile-scroll-left/resolveContentSectionNavMobileScrollLeft";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function readScrollPadding(value: string): number {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function syncMobileNavScroll(list: HTMLUListElement, activeItem: HTMLLIElement): void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const listStyles = getComputedStyle(list);
  const maxScrollLeft = Math.max(0, list.scrollWidth - list.clientWidth);

  const scrollLeft = resolveContentSectionNavMobileScrollLeft({
    activeItemOffsetLeft: activeItem.offsetLeft,
    activeItemOffsetRight: activeItem.offsetLeft + activeItem.offsetWidth,
    isAtDocumentBottom: isAtDocumentBottom(),
    listClientWidth: list.clientWidth,
    maxScrollLeft,
    scrollPaddingLeft: readScrollPadding(listStyles.scrollPaddingLeft),
    scrollPaddingRight: readScrollPadding(listStyles.scrollPaddingRight),
  });

  list.scrollTo({
    left: scrollLeft,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export type UseContentSectionNavMobileScrollResult = Readonly<{
  listRef: RefObject<HTMLUListElement | null>;
  setItemRef: (itemId: string) => RefCallback<HTMLLIElement>;
}>;

export function useContentSectionNavMobileScroll(
  activeSectionId: string,
): UseContentSectionNavMobileScrollResult {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<ReadonlyMap<string, HTMLLIElement>>(new Map());

  const setItemRef = (itemId: string): RefCallback<HTMLLIElement> => {
    return (node) => {
      const nextRefs = new Map(itemRefs.current);

      if (node) {
        nextRefs.set(itemId, node);
      } else {
        nextRefs.delete(itemId);
      }

      itemRefs.current = nextRefs;
    };
  };

  useLayoutEffect(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      return;
    }

    const syncScroll = (): void => {
      const activeItem = itemRefs.current.get(activeSectionId);

      if (!listRef.current || !activeItem) {
        return;
      }

      syncMobileNavScroll(listRef.current, activeItem);
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, [activeSectionId]);

  return { listRef, setItemRef };
}
