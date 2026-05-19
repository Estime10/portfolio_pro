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
  stack: readonly string[];
  liveUrl?: string;
  caseStudyHref?: string;
}>;

export type ProjectCaseStudySectionViewModel = Readonly<{
  id: string;
  index: number;
  title: string;
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
  stack: readonly string[];
  sections: readonly ProjectCaseStudySectionViewModel[];
  navItems: readonly ProjectCaseStudyNavItemViewModel[];
  navLabel: string;
}>;

export type ProjectsContentViewModel = Readonly<{
  title: string;
  introParagraphs: readonly string[];
  featuredLabel: string;
  secondaryLabel: string;
  selectionNote: string;
  readCaseStudyLabel: string;
  viewLiveLabel: string;
  featured: readonly ProjectCardViewModel[];
  secondary: readonly ProjectCardViewModel[];
}>;
