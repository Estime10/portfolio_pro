import type { ButtonSize } from "../types";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[var(--touch-min)] gap-2 px-4 text-sm leading-none",
  md: "min-h-[var(--touch-min)] gap-2 px-5 text-base leading-none",
  lg: "min-h-12 gap-2.5 px-6 text-base leading-none",
};

export function getButtonSizeClasses(size: ButtonSize): string {
  return SIZE_CLASSES[size];
}
