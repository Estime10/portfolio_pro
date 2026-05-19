import { CtaGradientLink } from "@/components/button";
import { ProjectTagList } from "@/features/projects/components/project-tag-list/ProjectTagList";
import type { ProjectCardViewModel } from "@/features/projects/types/projectViewModel";
import { CHROME_GRADIENT_STATUS_BADGE } from "@/lib/ui/brandChrome";

export type ProjectCardProps = Readonly<{
  project: ProjectCardViewModel;
  readCaseStudyLabel: string;
  tagsFocusLabel: string;
  tagsStackLabel: string;
  viewLiveLabel: string;
  variant: "featured" | "secondary";
}>;

export function ProjectCard({
  project,
  readCaseStudyLabel,
  tagsFocusLabel,
  tagsStackLabel,
  viewLiveLabel,
  variant,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className="ui-card-surface flex h-full flex-col">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
        <div className="min-w-0">
          <p className="text-label text-tertiary">
            {project.type} · {project.year}
          </p>
          <h2 className="text-h3 text-foreground mt-2">{project.name}</h2>
          <p className="text-body text-muted mt-2">{project.tagline}</p>
        </div>
        <span
          className={`${CHROME_GRADIENT_STATUS_BADGE} max-w-[8.5rem] shrink-0 justify-self-end text-right leading-snug`}
        >
          {project.status}
        </span>
      </div>

      <p className={`text-body text-muted ${isFeatured ? "mt-6" : "mt-4"}`}>{project.summary}</p>

      {isFeatured ? (
        <ul className="mt-5 flex flex-col gap-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="text-body text-foreground/90 flex gap-2">
              <span className="text-accent mt-0.5" aria-hidden>
                —
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {project.tags.length > 0 ? (
        <ProjectTagList ariaLabel={tagsFocusLabel} tags={project.tags} variant="focus" />
      ) : null}

      <ProjectTagList
        ariaLabel={tagsStackLabel}
        className="mt-5"
        tags={project.stack}
        variant="stack"
      />

      <div className="mt-auto pt-6">
        {project.caseStudyHref ? (
          <CtaGradientLink href={project.caseStudyHref}>{readCaseStudyLabel}</CtaGradientLink>
        ) : null}

        {!project.caseStudyHref && project.liveUrl ? (
          <CtaGradientLink external href={project.liveUrl}>
            {viewLiveLabel}
          </CtaGradientLink>
        ) : null}
      </div>
    </article>
  );
}
