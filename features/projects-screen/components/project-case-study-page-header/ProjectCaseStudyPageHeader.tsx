import { ProjectTagList } from "@/features/projects-screen/components/project-tag-list/ProjectTagList";
import { CHROME_GRADIENT_STATUS_BADGE } from "@/lib/ui/brandChrome";

export type ProjectCaseStudyPageHeaderProps = Readonly<{
  focusTags: readonly string[];
  focusTagsLabel: string;
  name: string;
  role: string;
  stack: readonly string[];
  stackLabel: string;
  status: string;
  tagline: string;
  type: string;
  year: number;
}>;

export function ProjectCaseStudyPageHeader({
  focusTags,
  focusTagsLabel,
  name,
  role,
  stack,
  stackLabel,
  status,
  tagline,
  type,
  year,
}: ProjectCaseStudyPageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
        <p className="text-label text-tertiary">
          {type} · {year}
        </p>
        <span
          className={`${CHROME_GRADIENT_STATUS_BADGE} max-w-[8.5rem] shrink-0 justify-self-end text-right leading-snug`}
        >
          {status}
        </span>
      </div>
      <h1 className="text-h1 text-foreground mt-3">{name}</h1>
      <p className="text-body-lg text-muted mt-4">{tagline}</p>
      <p className="text-body text-foreground/90 mt-6">{role}</p>
      <ProjectTagList ariaLabel={focusTagsLabel} tags={focusTags} variant="focus" />
      <ProjectTagList ariaLabel={stackLabel} className="mt-5" tags={stack} variant="stack" />
    </header>
  );
}
