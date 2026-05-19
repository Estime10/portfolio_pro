import {
  NAV_BUTTON_BASE_CLASSES,
  NAV_BUTTON_LINK_CLASSES,
} from "@/components/button/nav/navButtonClasses";
import type { ProfileSectionViewModel } from "@/features/profile/types/profileSectionViewModel";

const PROFILE_NAV_LINK_CLASS_NAME = `${NAV_BUTTON_BASE_CLASSES} ${NAV_BUTTON_LINK_CLASSES} whitespace-nowrap`;

export type ProfileSectionNavProps = Readonly<{
  navLabel: string;
  sections: readonly ProfileSectionViewModel[];
}>;

export function ProfileSectionNav({ navLabel, sections }: ProfileSectionNavProps) {
  return (
    <nav
      aria-label={navLabel}
      className="border-stroke-default bg-background/95 supports-[backdrop-filter]:bg-background/88 sticky top-[calc(var(--nav-height)+var(--safe-top))] z-20 -mx-[var(--container-px)] mb-10 self-start border-b px-[var(--container-px)] py-3 backdrop-blur-md lg:top-[calc(var(--nav-height)+var(--space-8))] lg:z-10 lg:mx-0 lg:mb-0 lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
    >
      <p className="text-label text-muted mb-3 lg:mb-4">{navLabel}</p>
      <ul className="flex gap-x-4 gap-y-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <li key={section.id} className="shrink-0 lg:shrink">
            <a href={`#${section.id}`} className={PROFILE_NAV_LINK_CLASS_NAME}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
