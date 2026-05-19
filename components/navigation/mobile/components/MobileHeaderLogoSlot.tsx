"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProjectCaseStudyBackLink } from "@/features/projects/components/project-case-study-back-link/ProjectCaseStudyBackLink";
import { isProjectCaseStudyRoute } from "@/lib/navigation/is-project-case-study-route/isProjectCaseStudyRoute";

export type MobileHeaderLogoSlotProps = Readonly<{
  backLabel: string;
  logo: ReactNode;
}>;

export function MobileHeaderLogoSlot({ backLabel, logo }: MobileHeaderLogoSlotProps) {
  const pathname = usePathname();

  if (isProjectCaseStudyRoute(pathname)) {
    return <ProjectCaseStudyBackLink label={backLabel} />;
  }

  return logo;
}
