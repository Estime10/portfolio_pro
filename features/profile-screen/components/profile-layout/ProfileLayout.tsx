import { ProfileClosing } from "@/features/profile-screen/components/profile-closing/ProfileClosing";
import { ProfilePageHeader } from "@/features/profile-screen/components/profile-page-header/ProfilePageHeader";
import { ProfileSection } from "@/features/profile-screen/components/profile-section/ProfileSection";
import { ProfileSectionNav } from "@/features/profile-screen/components/profile-section-nav/ProfileSectionNav";
import type { ProfileContentViewModel } from "@/features/profile-screen/types/profileSectionViewModel";

export type ProfileLayoutProps = Readonly<{
  content: ProfileContentViewModel;
}>;

export function ProfileLayout({ content }: ProfileLayoutProps) {
  return (
    <article className="ui-container ui-section pb-20 md:pb-28">
      <ProfilePageHeader introParagraphs={content.introParagraphs} title={content.title} />

      <div className="mt-10 md:mt-12 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-20">
        <ProfileSectionNav navLabel={content.navLabel} sections={content.sections} />

        <div className="flex min-w-0 flex-col gap-0 lg:max-w-3xl">
          {content.sections.map((section) => (
            <ProfileSection key={section.id} section={section} />
          ))}

          <ProfileClosing label={content.closingLabel} paragraphs={content.closingParagraphs} />
        </div>
      </div>
    </article>
  );
}
