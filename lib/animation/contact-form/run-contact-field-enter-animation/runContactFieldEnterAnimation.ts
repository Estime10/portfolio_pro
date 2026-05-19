import gsap from "gsap";
import {
  CONTACT_FORM_FIELD_DURATION_SECONDS,
  CONTACT_FORM_FIELD_EASE,
  CONTACT_FORM_FIELD_OFFSET_Y_PX,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runContactFieldEnterAnimation(element: HTMLElement): gsap.core.Tween {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return gsap.to(element, { duration: 0 });
  }

  gsap.set(element, { opacity: 0, y: CONTACT_FORM_FIELD_OFFSET_Y_PX });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: CONTACT_FORM_FIELD_DURATION_SECONDS,
    ease: CONTACT_FORM_FIELD_EASE,
  });
}
