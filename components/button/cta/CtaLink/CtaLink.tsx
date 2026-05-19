import Link from "next/link";
import type { ComponentProps } from "react";
import { composeCtaOutlineLinkClassName } from "@/components/button/cta/compose-cta-outline-link-class-name/composeCtaOutlineLinkClassName";

export type CtaLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  Readonly<{
    className?: string;
  }>;

export function CtaLink({ className, children, ...rest }: CtaLinkProps) {
  return (
    <Link className={composeCtaOutlineLinkClassName(className)} {...rest}>
      {children}
    </Link>
  );
}
