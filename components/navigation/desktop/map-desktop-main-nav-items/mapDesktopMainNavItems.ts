import type { DesktopMainNavItemViewModel } from "@/components/navigation/desktop/types/desktopMainNavItemViewModel";
import type { DesktopMainNavLabels } from "@/components/navigation/desktop/types/desktopMainNavLabels";
import {
  CONTACT_ROUTE_PATH,
  HOME_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  PROJECTS_ROUTE_PATH,
} from "@/lib/constants/constants";

export type DesktopMainNavPanelsViewModel = Readonly<{
  leading: readonly DesktopMainNavItemViewModel[];
  trailing: readonly DesktopMainNavItemViewModel[];
}>;

export function mapDesktopMainNavItems(
  labels: DesktopMainNavLabels,
): DesktopMainNavPanelsViewModel {
  return {
    leading: [
      { href: HOME_ROUTE_PATH, label: labels.home, side: "leading" },
      { href: PROFILE_ROUTE_PATH, label: labels.profile, side: "leading" },
    ],
    trailing: [
      { href: PROJECTS_ROUTE_PATH, label: labels.projects, side: "trailing" },
      { href: CONTACT_ROUTE_PATH, label: labels.contact, side: "trailing" },
    ],
  };
}
