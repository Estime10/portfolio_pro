import gsap from "gsap";

/** Verrouille la hauteur mesurée avant un tween (évite le saut `height: auto` → `0`). */
export function pinContactStripHeight(shell: HTMLElement): number {
  const height = shell.offsetHeight;
  gsap.set(shell, { height, overflow: "hidden" });
  return height;
}
