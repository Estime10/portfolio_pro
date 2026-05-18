import Link from "next/link";
import { composeNavClassName } from "@/components/button/nav/composeNavClassName";
import type { ComponentProps } from "react";

export type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  readonly className?: string;
};

export function NavLink({ className, ...rest }: NavLinkProps) {
  return (
    <Link
      data-nav-option
      className={composeNavClassName("link", `pointer-events-auto ${className ?? ""}`.trim())}
      {...rest}
    />
  );
}
