import type { MainNavItemViewModel } from "@/lib/navigation/types/main-nav-item-view-model/mainNavItemViewModel";
import type { MainNavLabels } from "@/lib/navigation/types/main-nav-labels/mainNavLabels";
import {
  CONTACT_ROUTE_PATH,
  HOME_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  PROJECTS_ROUTE_PATH,
} from "@/lib/constants";

export type MainNavPanelsViewModel = Readonly<{
  leading: readonly MainNavItemViewModel[];
  trailing: readonly MainNavItemViewModel[];
}>;

export function mapMainNavItems(labels: MainNavLabels): MainNavPanelsViewModel {
  return {
    leading: [
      { href: HOME_ROUTE_PATH, label: labels.home },
      { href: PROFILE_ROUTE_PATH, label: labels.profile },
    ],
    trailing: [
      { href: PROJECTS_ROUTE_PATH, label: labels.projects },
      { href: CONTACT_ROUTE_PATH, label: labels.contact },
    ],
  };
}
