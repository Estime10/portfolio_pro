import { ProjectCard } from "@/features/projects/components/project-card/ProjectCard";
import { ProjectsPageHeader } from "@/features/projects/components/projects-page-header/ProjectsPageHeader";
import type { ProjectsContentViewModel } from "@/features/projects/types/projectViewModel";

export type ProjectsLayoutProps = Readonly<{
  content: ProjectsContentViewModel;
}>;

export function ProjectsLayout({ content }: ProjectsLayoutProps) {
  return (
    <article className="ui-container ui-section pb-20 md:pb-28">
      <ProjectsPageHeader
        introParagraphs={content.introParagraphs}
        selectionNote={content.selectionNote}
        title={content.title}
      />

      <section
        aria-labelledby="featured-projects-heading"
        className="mt-16 md:mt-24"
      >
        <h2 id="featured-projects-heading" className="text-h2 text-foreground">
          {content.featuredLabel}
        </h2>
        <ul className="ui-grid mt-8 grid-cols-1 lg:grid-cols-2">
          {content.featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                readCaseStudyLabel={content.readCaseStudyLabel}
                variant="featured"
                viewLiveLabel={content.viewLiveLabel}
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="secondary-projects-heading"
        className="border-stroke-default mt-20 border-t pt-16 md:mt-28 md:pt-20"
      >
        <h2 id="secondary-projects-heading" className="text-h2 text-foreground">
          {content.secondaryLabel}
        </h2>
        <ul className="ui-grid mt-8 grid-cols-1 md:grid-cols-2">
          {content.secondary.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                readCaseStudyLabel={content.readCaseStudyLabel}
                variant="secondary"
                viewLiveLabel={content.viewLiveLabel}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
