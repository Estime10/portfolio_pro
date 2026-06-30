import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { getContactFormScrollOffsetY } from "@/lib/animation/contact-form/get-contact-form-scroll-offset-y/getContactFormScrollOffsetY";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import { CONTACT_FORM_SCROLL_DURATION_SECONDS, CONTACT_FORM_SCROLL_EASE } from "@/lib/constants";

let isScrollToPluginRegistered = false;

function registerScrollToPlugin(): void {
  if (isScrollToPluginRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollToPlugin);
  isScrollToPluginRegistered = true;
}

export function runContactFormScrollToElementAnimation(element: HTMLElement): gsap.core.Tween {
  registerScrollToPlugin();

  const offsetY = -getContactFormScrollOffsetY();

  if (prefersReducedMotion()) {
    const top = element.getBoundingClientRect().top + window.scrollY + offsetY;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    return gsap.to({}, { duration: 0 });
  }

  return gsap.to(window, {
    scrollTo: { y: element, offsetY, autoKill: true },
    duration: CONTACT_FORM_SCROLL_DURATION_SECONDS,
    ease: CONTACT_FORM_SCROLL_EASE,
  });
}
