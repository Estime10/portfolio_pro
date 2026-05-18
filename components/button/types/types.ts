import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "nav";

export type ButtonSize = "sm" | "md" | "lg" | "nav";

export type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "className"> & {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
};
