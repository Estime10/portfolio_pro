import type { ButtonSize } from "../types/types";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[var(--touch-min)] gap-2 px-4 text-sm leading-none",
  md: "min-h-[var(--touch-min)] gap-2 px-5 text-base leading-none",
  lg: "min-h-12 gap-2.5 px-6 text-base leading-none",
  nav: "min-h-0 gap-0 p-0 text-[inherit] leading-[inherit]",
};

export function getButtonSizeClasses(size: ButtonSize): string {
  return SIZE_CLASSES[size];
}
