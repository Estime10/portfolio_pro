import Link from "next/link";
import type { ReactNode } from "react";
import { composeCtaGradientClassName } from "@/components/button/cta/compose-cta-gradient-class-name/composeCtaGradientClassName";

export type CtaGradientLinkProps = Readonly<{
  children: ReactNode;
  className?: string;
  external?: boolean;
  href: string;
}>;

export function CtaGradientLink({
  children,
  className,
  external = false,
  href,
}: CtaGradientLinkProps) {
  const composedClassName = composeCtaGradientClassName(className);

  if (external) {
    return (
      <a
        className={composedClassName}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={composedClassName} href={href}>
      {children}
    </Link>
  );
}
