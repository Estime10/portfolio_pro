import { ProjectTagList } from "@/features/projects/components/project-tag-list/ProjectTagList";
import type { ProjectCaseStudySectionViewModel } from "@/features/projects/types/projectViewModel";

export type ProjectCaseStudySectionProps = Readonly<{
  isFirst: boolean;
  section: ProjectCaseStudySectionViewModel;
  sectionTagsLabel: string;
}>;

export function ProjectCaseStudySection({
  isFirst,
  section,
  sectionTagsLabel,
}: ProjectCaseStudySectionProps) {
  const headingId = `${section.id}-heading`;
  const sectionIndexLabel = String(section.index).padStart(2, "0");

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={
        isFirst
          ? "scroll-mt-[calc(var(--nav-height)+var(--space-6))]"
          : "border-stroke-default scroll-mt-[calc(var(--nav-height)+var(--space-6))] border-t pt-14 md:pt-20"
      }
    >
      <p className="text-label text-tertiary mb-3 md:mb-4">{sectionIndexLabel}</p>
      <h2 id={headingId} className="text-h2 text-foreground max-w-2xl">
        {section.title}
      </h2>

      {section.tags ? (
        <ProjectTagList ariaLabel={sectionTagsLabel} tags={section.tags} variant="stack" />
      ) : null}

      <div className="mt-6 flex max-w-prose flex-col gap-5 md:mt-8 md:gap-6">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets ? (
        <ul className="mt-2 flex max-w-prose flex-col gap-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="text-body text-foreground/90 flex gap-2">
              <span className="text-accent mt-0.5" aria-hidden>
                —
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
