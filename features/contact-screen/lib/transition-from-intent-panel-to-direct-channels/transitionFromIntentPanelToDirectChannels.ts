import { runContactFormIntentExitAnimation } from "@/lib/animation/contact-form/run-contact-form-intent-exit-animation/runContactFormIntentExitAnimation";

export function transitionFromIntentPanelToDirectChannels(
  intentPanel: HTMLElement | null,
  onComplete: () => void,
): void {
  if (!intentPanel) {
    onComplete();
    return;
  }

  void runContactFormIntentExitAnimation(intentPanel).then(onComplete);
}
