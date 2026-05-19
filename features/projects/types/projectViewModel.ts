import type { ProjectSlug } from "@/lib/projects/project-catalog";

export type ProjectCardViewModel = Readonly<{
  slug: ProjectSlug;
  name: string;
  tagline: string;
  type: string;
  status: string;
  year: number;
  summary: string;
  highlights: readonly string[];
  tags: readonly string[];
  stack: readonly string[];
  liveUrl?: string;
  caseStudyHref?: string;
}>;

export type ProjectCaseStudySectionViewModel = Readonly<{
  id: string;
  index: number;
  title: string;
  tags?: readonly string[];
  paragraphs: readonly string[];
  bullets?: readonly string[];
}>;

export type ProjectCaseStudyNavItemViewModel = Readonly<{
  id: string;
  title: string;
}>;

export type ProjectCaseStudyViewModel = Readonly<{
  slug: ProjectSlug;
  name: string;
  tagline: string;
  type: string;
  status: string;
  year: number;
  role: string;
  focusTags: readonly string[];
  stack: readonly string[];
  sections: readonly ProjectCaseStudySectionViewModel[];
  navItems: readonly ProjectCaseStudyNavItemViewModel[];
  navLabel: string;
  tagLabels: Readonly<{
    focus: string;
    stack: string;
    section: string;
  }>;
}>;

export type ProjectsContentViewModel = Readonly<{
  title: string;
  introParagraphs: readonly string[];
  featuredLabel: string;
  secondaryLabel: string;
  selectionNote: string;
  readCaseStudyLabel: string;
  viewLiveLabel: string;
  tagLabels: Readonly<{
    focus: string;
    stack: string;
  }>;
  featured: readonly ProjectCardViewModel[];
  secondary: readonly ProjectCardViewModel[];
}>;
