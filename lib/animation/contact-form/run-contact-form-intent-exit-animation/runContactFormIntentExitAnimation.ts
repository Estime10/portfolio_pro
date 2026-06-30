import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import {
  CONTACT_FORM_INTENT_EXIT_DURATION_SECONDS,
  CONTACT_FORM_INTENT_EXIT_EASE,
  CONTACT_FORM_INTENT_EXIT_OFFSET_Y_PX,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runContactFormIntentExitAnimation(element: HTMLElement): Promise<void> {
  return runWithGsap((gsap) => {
    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 0, height: 0, overflow: "hidden" });
      return;
    }

    return new Promise<void>((resolve) => {
      const timeline = createGsapTimeline(gsap, {
        onComplete: () => {
          resolve();
        },
      });

      timeline.to(element, {
        opacity: 0,
        y: CONTACT_FORM_INTENT_EXIT_OFFSET_Y_PX,
        duration: CONTACT_FORM_INTENT_EXIT_DURATION_SECONDS,
        ease: CONTACT_FORM_INTENT_EXIT_EASE,
      });

      timeline.to(
        element,
        {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          overflow: "hidden",
          duration: CONTACT_FORM_INTENT_EXIT_DURATION_SECONDS * 0.95,
          ease: "power2.inOut",
        },
        `-=${String(CONTACT_FORM_INTENT_EXIT_DURATION_SECONDS * 0.45)}`,
      );
    });
  });
}
