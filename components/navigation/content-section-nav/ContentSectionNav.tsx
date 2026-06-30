"use client";

import { composeContentSectionNavLinkClassName } from "@/components/navigation/content-section-nav/compose-content-section-nav-link-class-name/composeContentSectionNavLinkClassName";
import { useContentSectionNavActiveId } from "@/components/navigation/content-section-nav/hooks/use-content-section-nav-active-id/useContentSectionNavActiveId";
import { useContentSectionNavMobileScroll } from "@/components/navigation/content-section-nav/hooks/use-content-section-nav-mobile-scroll/useContentSectionNavMobileScroll";

export type ContentSectionNavItem = Readonly<{
  id: string;
  title: string;
}>;

export type ContentSectionNavProps = Readonly<{
  items: readonly ContentSectionNavItem[];
  navLabel: string;
}>;

export function ContentSectionNav({ items, navLabel }: ContentSectionNavProps) {
  const sectionIds = items.map((item) => item.id);
  const activeSectionId = useContentSectionNavActiveId(sectionIds);
  const { listRef, setItemRef } = useContentSectionNavMobileScroll(activeSectionId);

  return (
    <nav
      aria-label={navLabel}
      className="border-stroke-default bg-background/95 supports-[backdrop-filter]:bg-background/88 sticky top-[calc(var(--nav-height)+var(--safe-top))] z-20 -mx-[var(--container-px)] mb-10 self-start border-b px-[var(--container-px)] py-3 backdrop-blur-md lg:top-[calc(var(--nav-height)+var(--space-8))] lg:z-10 lg:mx-0 lg:mb-0 lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
    >
      <p className="text-label text-muted mb-3 lg:mb-4">{navLabel}</p>
      <ul
        ref={listRef}
        className="flex gap-x-4 gap-y-2 overflow-x-auto scroll-ps-4 scroll-pe-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:scroll-ps-0 lg:scroll-pe-0 lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === activeSectionId;

          return (
            <li key={item.id} ref={setItemRef(item.id)} className="shrink-0 lg:shrink">
              <a
                aria-current={isActive ? "location" : undefined}
                className={composeContentSectionNavLinkClassName(isActive)}
                href={`#${item.id}`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
