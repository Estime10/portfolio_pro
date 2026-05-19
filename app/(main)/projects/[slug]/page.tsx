import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyScreen } from "@/features/projects/ProjectCaseStudyScreen";
import {
  FEATURED_PROJECT_SLUGS,
  isProjectSlug,
  type FeaturedProjectSlug,
} from "@/lib/projects/project-catalog";
import { getTranslations } from "next-intl/server";

type ProjectCaseStudyPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function parseFeaturedSlug(slug: string): FeaturedProjectSlug | null {
  if (!isProjectSlug(slug)) {
    return null;
  }
  return (FEATURED_PROJECT_SLUGS as readonly string[]).includes(slug)
    ? (slug as FeaturedProjectSlug)
    : null;
}

export function generateStaticParams(): { slug: FeaturedProjectSlug }[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const featuredSlug = parseFeaturedSlug(slug);
  if (!featuredSlug) {
    return {};
  }

  const t = await getTranslations("ProjectsScreen.caseStudies");
  return {
    title: t(`${featuredSlug}.meta.title`),
    description: t(`${featuredSlug}.meta.description`),
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const featuredSlug = parseFeaturedSlug(slug);
  if (!featuredSlug) {
    notFound();
  }

  return <ProjectCaseStudyScreen slug={featuredSlug} />;
}
