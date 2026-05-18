import { composeNavClassName } from "@/components/button/nav/composeNavClassName";
import { blockActiveNavInteraction } from "@/lib/navigation/block-active-nav-interaction/blockActiveNavInteraction";
import type { ComponentProps } from "react";

export type NavActiveLabelProps = Omit<ComponentProps<"span">, "className"> & {
  readonly className?: string;
};

export function NavActiveLabel({ className, children, ...rest }: NavActiveLabelProps) {
  return (
    <span
      data-nav-option
      data-nav-active
      aria-current="page"
      aria-disabled="true"
      tabIndex={-1}
      className={composeNavClassName("active", `pointer-events-auto ${className ?? ""}`)}
      onPointerDown={blockActiveNavInteraction}
      onClick={blockActiveNavInteraction}
      {...rest}
    >
      {children}
    </span>
  );
}
