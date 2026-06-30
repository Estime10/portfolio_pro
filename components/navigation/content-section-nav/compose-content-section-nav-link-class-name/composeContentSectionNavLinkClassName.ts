import {
  NAV_BUTTON_BASE_CLASSES,
  NAV_BUTTON_LINK_CLASSES,
} from "@/components/button/nav/navButtonClasses";

const SECTION_NAV_LINK_BASE_CLASS_NAME = `${NAV_BUTTON_BASE_CLASSES} ${NAV_BUTTON_LINK_CLASSES} whitespace-nowrap`;

const SECTION_NAV_LINK_DESKTOP_ACTIVE_CLASS_NAME =
  "lg:border-foreground lg:text-foreground lg:border-b lg:pb-0.5";

const SECTION_NAV_LINK_DESKTOP_INACTIVE_CLASS_NAME = "lg:border-b lg:border-transparent lg:pb-0.5";

export function composeContentSectionNavLinkClassName(isActive: boolean): string {
  return [
    SECTION_NAV_LINK_BASE_CLASS_NAME,
    isActive
      ? SECTION_NAV_LINK_DESKTOP_ACTIVE_CLASS_NAME
      : SECTION_NAV_LINK_DESKTOP_INACTIVE_CLASS_NAME,
  ].join(" ");
}
