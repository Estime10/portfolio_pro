import { GHOST_BUTTON_CLASSES } from "@/components/button/ghost/ghostButtonClasses";
import {
  NAV_BUTTON_BASE_CLASSES,
  NAV_BUTTON_LINK_CLASSES,
} from "@/components/button/nav/navButtonClasses";
import { OUTLINE_BUTTON_CLASSES } from "@/components/button/outline/outlineButtonClasses";
import { PRIMARY_BUTTON_CLASSES } from "@/components/button/primary/primaryButtonClasses";
import { SECONDARY_BUTTON_CLASSES } from "@/components/button/secondary/secondaryButtonClasses";
import { getButtonSizeClasses } from "@/components/button/sizes/sizeClasses";
import type { ButtonSize, ButtonVariant } from "@/components/button/types/types";

const VARIANT_CLASSES: Record<Exclude<ButtonVariant, "nav">, string> = {
  primary: PRIMARY_BUTTON_CLASSES,
  secondary: SECONDARY_BUTTON_CLASSES,
  outline: OUTLINE_BUTTON_CLASSES,
  ghost: GHOST_BUTTON_CLASSES,
};

const BASE_BUTTON_CLASSES =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium transition-colors focus-visible:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45";

export function composeButtonClassName(options: {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
}): string {
  const variant: ButtonVariant = options.variant ?? "primary";
  const size: ButtonSize =
    variant === "nav" ? "nav" : (options.size ?? "md");

  if (variant === "nav") {
    return [
      NAV_BUTTON_BASE_CLASSES,
      NAV_BUTTON_LINK_CLASSES,
      getButtonSizeClasses(size),
      options.className ?? "",
    ]
      .filter((part) => part.length > 0)
      .join(" ");
  }

  return [
    BASE_BUTTON_CLASSES,
    VARIANT_CLASSES[variant],
    getButtonSizeClasses(size),
    options.className ?? "",
  ]
    .filter((part) => part.length > 0)
    .join(" ");
}
