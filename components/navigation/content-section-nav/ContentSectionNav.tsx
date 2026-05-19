import {
  NAV_BUTTON_BASE_CLASSES,
  NAV_BUTTON_LINK_CLASSES,
} from "@/components/button/nav/navButtonClasses";

const SECTION_NAV_LINK_CLASS_NAME = `${NAV_BUTTON_BASE_CLASSES} ${NAV_BUTTON_LINK_CLASSES} whitespace-nowrap`;

export type ContentSectionNavItem = Readonly<{
  id: string;
  title: string;
}>;

export type ContentSectionNavProps = Readonly<{
  items: readonly ContentSectionNavItem[];
  navLabel: string;
}>;

export function ContentSectionNav({ items, navLabel }: ContentSectionNavProps) {
  return (
    <nav
      aria-label={navLabel}
      className="border-stroke-default bg-background/95 supports-[backdrop-filter]:bg-background/88 sticky top-[calc(var(--nav-height)+var(--safe-top))] z-20 -mx-[var(--container-px)] mb-10 self-start border-b px-[var(--container-px)] py-3 backdrop-blur-md lg:top-[calc(var(--nav-height)+var(--space-8))] lg:z-10 lg:mx-0 lg:mb-0 lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
    >
      <p className="text-label text-muted mb-3 lg:mb-4">{navLabel}</p>
      <ul className="flex gap-x-4 gap-y-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 lg:shrink">
            <a href={`#${item.id}`} className={SECTION_NAV_LINK_CLASS_NAME}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
