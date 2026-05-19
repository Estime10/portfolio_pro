import { ProfileSectionBullets } from "@/features/profile/components/profile-section-bullets/ProfileSectionBullets";
import type { ProfileSectionViewModel } from "@/features/profile/types/profileSectionViewModel";

export type ProfileSectionProps = Readonly<{
  section: ProfileSectionViewModel;
}>;

export function ProfileSection({ section }: ProfileSectionProps) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className="scroll-mt-[calc(var(--nav-height)+var(--space-6))]"
    >
      <h2 id={headingId} className="text-h2 text-foreground">
        {section.title}
      </h2>
      <div className="mt-4 flex max-w-prose flex-col gap-4 md:mt-5 md:gap-5">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      {section.bullets ? (
        <ProfileSectionBullets
          bullets={section.bullets}
          presentation={section.bulletPresentation ?? "list"}
        />
      ) : null}
    </section>
  );
}
