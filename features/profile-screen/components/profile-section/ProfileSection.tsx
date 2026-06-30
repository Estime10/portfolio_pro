import { ProfileSectionBullets } from "@/features/profile-screen/components/profile-section-bullets/ProfileSectionBullets";
import type { ProfileSectionViewModel } from "@/features/profile-screen/types/profileSectionViewModel";

export type ProfileSectionProps = Readonly<{
  section: ProfileSectionViewModel;
}>;

export function ProfileSection({ section }: ProfileSectionProps) {
  const headingId = `${section.id}-heading`;
  const sectionIndexLabel = String(section.index).padStart(2, "0");
  const isFirstSection = section.index === 1;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={
        isFirstSection
          ? "scroll-mt-[calc(var(--nav-height)+var(--space-6))]"
          : "border-stroke-default scroll-mt-[calc(var(--nav-height)+var(--space-6))] border-t pt-14 md:pt-20"
      }
    >
      <p className="text-label text-tertiary mb-3 md:mb-4">{sectionIndexLabel}</p>
      <h2 id={headingId} className="text-h2 text-foreground max-w-2xl">
        {section.title}
      </h2>

      <div className="mt-6 flex max-w-prose flex-col gap-5 md:mt-8 md:gap-6">
        {section.intro.map((paragraph) => (
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

      {section.outro ? (
        <p className="text-body text-foreground/90 mt-6 max-w-prose md:mt-8">{section.outro}</p>
      ) : null}
    </section>
  );
}
