import gsap from "gsap";
import { runContactFieldEnterAnimation } from "@/lib/animation/contact-form/run-contact-field-enter-animation/runContactFieldEnterAnimation";
import { runContactFormScrollToElementAnimation } from "@/lib/animation/contact-form/run-contact-form-scroll-to-element-animation/runContactFormScrollToElementAnimation";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export type ContactFormRevealStepAnimationTarget = Readonly<{
  focusElement: HTMLElement | null;
  scrollElement: HTMLElement;
  stepElement: HTMLElement;
}>;

export function runContactFormRevealStepAnimation(
  target: ContactFormRevealStepAnimationTarget,
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  const reducedMotion = prefersReducedMotion();
  const scrollOverlapSeconds = reducedMotion ? 0 : 0.14;
  const focusDelaySeconds = reducedMotion ? 0 : 0.08;

  timeline.add(runContactFieldEnterAnimation(target.stepElement));
  timeline.add(
    runContactFormScrollToElementAnimation(target.scrollElement),
    `-=${String(scrollOverlapSeconds)}`,
  );
  timeline.add(() => {
    target.focusElement?.focus({ preventScroll: true });
  }, `-=${String(focusDelaySeconds)}`);

  return timeline;
}
