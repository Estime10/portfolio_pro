import type { ProfileBulletPresentation } from "@/features/profile-screen/types/profileSectionViewModel";
import { CHROME_GRADIENT_CHIP } from "@/lib/ui/brandChrome";

export type ProfileSectionBulletsProps = Readonly<{
  bullets: readonly string[];
  presentation: ProfileBulletPresentation;
}>;

export function ProfileSectionBullets({ bullets, presentation }: ProfileSectionBulletsProps) {
  if (presentation === "chips") {
    return (
      <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
        {bullets.map((item) => (
          <li key={item} className={CHROME_GRADIENT_CHIP}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="border-stroke-default mt-6 flex flex-col gap-3 border-l pl-5 md:mt-8">
      {bullets.map((item) => (
        <li key={item} className="text-body text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
