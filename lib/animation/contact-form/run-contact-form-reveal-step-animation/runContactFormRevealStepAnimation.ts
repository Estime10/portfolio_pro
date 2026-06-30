import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
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
): Promise<GsapTimeline> {
  return runWithGsap(async (gsap) => {
    const timeline = createGsapTimeline(gsap);
    const reducedMotion = prefersReducedMotion();
    const scrollOverlapSeconds = reducedMotion ? 0 : 0.14;
    const focusDelaySeconds = reducedMotion ? 0 : 0.08;

    timeline.add(await runContactFieldEnterAnimation(target.stepElement));
    timeline.add(
      await runContactFormScrollToElementAnimation(target.scrollElement),
      `-=${String(scrollOverlapSeconds)}`,
    );
    timeline.add(
      () => {
        target.focusElement?.focus({ preventScroll: true });
      },
      `-=${String(focusDelaySeconds)}`,
    );

    return timeline;
  });
}
