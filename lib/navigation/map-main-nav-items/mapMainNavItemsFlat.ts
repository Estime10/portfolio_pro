import { mapMainNavItems } from "@/lib/navigation/map-main-nav-items/mapMainNavItems";
import type { MainNavItemViewModel } from "@/lib/navigation/types/main-nav-item-view-model/mainNavItemViewModel";
import type { MainNavLabels } from "@/lib/navigation/types/main-nav-labels/mainNavLabels";

export function mapMainNavItemsFlat(labels: MainNavLabels): readonly MainNavItemViewModel[] {
  const panels = mapMainNavItems(labels);

  return [...panels.leading, ...panels.trailing];
}
