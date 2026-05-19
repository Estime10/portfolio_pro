import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getChromeHeaderIconLinkClassName } from "@/lib/ui/chromeHeaderToggleButton";

export type ProjectCaseStudyBackLinkProps = Readonly<{
  href?: string;
  label: string;
}>;

export function ProjectCaseStudyBackLink({
  href = "/projects",
  label,
}: ProjectCaseStudyBackLinkProps) {
  return (
    <Link aria-label={label} className={getChromeHeaderIconLinkClassName()} href={href}>
      <span className="sr-only">{label}</span>
      <ArrowLeft aria-hidden className="text-foreground size-4 shrink-0" strokeWidth={2} />
    </Link>
  );
}
