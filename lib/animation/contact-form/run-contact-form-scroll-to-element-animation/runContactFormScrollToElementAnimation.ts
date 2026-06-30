import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTween } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { ensureGsapScrollToPlugin } from "@/lib/animation/gsap/ensureGsapScrollToPlugin";
import { getContactFormScrollOffsetY } from "@/lib/animation/contact-form/get-contact-form-scroll-offset-y/getContactFormScrollOffsetY";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import { CONTACT_FORM_SCROLL_DURATION_SECONDS, CONTACT_FORM_SCROLL_EASE } from "@/lib/constants";

export function runContactFormScrollToElementAnimation(element: HTMLElement): Promise<GsapTween> {
  return ensureGsapScrollToPlugin().then((gsap) => {
    const offsetY = -getContactFormScrollOffsetY();

    if (prefersReducedMotion()) {
      const top = element.getBoundingClientRect().top + window.scrollY + offsetY;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      return createGsapTween(gsap, {}, { duration: 0 });
    }

    return createGsapTween(gsap, window, {
      scrollTo: { y: element, offsetY, autoKill: true },
      duration: CONTACT_FORM_SCROLL_DURATION_SECONDS,
      ease: CONTACT_FORM_SCROLL_EASE,
    });
  });
}
