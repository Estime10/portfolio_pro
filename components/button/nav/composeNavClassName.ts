import {
  NAV_BUTTON_ACTIVE_CLASSES,
  NAV_BUTTON_LINK_CLASSES,
} from "@/components/button/nav/navButtonClasses";

export type NavLabelTone = "link" | "active";

export function composeNavClassName(tone: NavLabelTone, className?: string): string {
  const toneClass = tone === "active" ? NAV_BUTTON_ACTIVE_CLASSES : NAV_BUTTON_LINK_CLASSES;
  return [toneClass, className ?? ""].filter((part) => part.length > 0).join(" ");
}
