import { ContentSectionNav } from "@/components/navigation/content-section-nav/ContentSectionNav";
import type { ProfileSectionViewModel } from "@/features/profile/types/profileSectionViewModel";

export type ProfileSectionNavProps = Readonly<{
  navLabel: string;
  sections: readonly ProfileSectionViewModel[];
}>;

export function ProfileSectionNav({ navLabel, sections }: ProfileSectionNavProps) {
  const items = sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return <ContentSectionNav items={items} navLabel={navLabel} />;
}
