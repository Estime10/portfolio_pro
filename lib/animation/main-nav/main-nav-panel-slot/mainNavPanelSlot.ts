/** Panneau à gauche ou à droite du libellé Menu. */
export type MainNavPanelSlot = "leading" | "trailing";

/** Décalage horizontal initial à l’ouverture (px). */
export function getMainNavOpenFromX(slot: MainNavPanelSlot): number {
  return slot === "leading" ? 32 : -32;
}

/** Décalage horizontal cible à la fermeture (px). */
export function getMainNavCloseToX(slot: MainNavPanelSlot): number {
  return slot === "leading" ? 32 : -32;
}

/** Ordre du stagger à l’ouverture (proche du Menu en premier). */
export function getMainNavOpenStaggerFrom(
  slot: MainNavPanelSlot,
): "start" | "end" {
  return slot === "leading" ? "end" : "start";
}

/** Ordre du stagger à la fermeture (inverse de l’ouverture). */
export function getMainNavCloseStaggerFrom(
  slot: MainNavPanelSlot,
): "start" | "end" {
  return slot === "leading" ? "start" : "end";
}
