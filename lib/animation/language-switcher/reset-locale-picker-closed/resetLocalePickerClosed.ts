import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";

const LOCALE_PICKER_EXIT_X_PX = 32;

export function resetLocalePickerClosed(panel: HTMLElement): Promise<void> {
  return runWithGsap((gsap) => {
    const targets = panel.querySelectorAll<HTMLElement>("[data-locale-option]");
    gsap.set(targets, {
      x: LOCALE_PICKER_EXIT_X_PX,
      opacity: 0,
      scale: 0.9,
    });
  });
}
