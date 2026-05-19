import { ContentSectionNav } from "@/components/navigation/content-section-nav/ContentSectionNav";
import { ProjectCaseStudyPageHeader } from "@/features/projects/components/project-case-study-page-header/ProjectCaseStudyPageHeader";
import { ProjectCaseStudySection } from "@/features/projects/components/project-case-study-section/ProjectCaseStudySection";
import type { ProjectCaseStudyViewModel } from "@/features/projects/types/projectViewModel";

export type ProjectCaseStudyLayoutProps = Readonly<{
  content: ProjectCaseStudyViewModel;
}>;

export function ProjectCaseStudyLayout({ content }: ProjectCaseStudyLayoutProps) {
  return (
    <article className="ui-container ui-section pb-20 md:pb-28">
      <ProjectCaseStudyPageHeader
        focusTags={content.focusTags}
        focusTagsLabel={content.tagLabels.focus}
        name={content.name}
        role={content.role}
        stack={content.stack}
        stackLabel={content.tagLabels.stack}
        status={content.status}
        tagline={content.tagline}
        type={content.type}
        year={content.year}
      />

      <div className="mt-10 md:mt-12 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-20">
        <ContentSectionNav items={content.navItems} navLabel={content.navLabel} />

        <div className="flex min-w-0 flex-col gap-0 lg:max-w-3xl">
          {content.sections.map((section, sectionIndex) => (
            <ProjectCaseStudySection
              key={section.id}
              isFirst={sectionIndex === 0}
              section={section}
              sectionTagsLabel={content.tagLabels.section}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
