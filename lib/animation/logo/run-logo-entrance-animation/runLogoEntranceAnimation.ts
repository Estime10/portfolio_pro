import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runLogoEntranceAnimation(
  root: HTMLElement,
  left: HTMLElement,
  right: HTMLElement,
): () => void {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set([left, right], { x: 0, opacity: 1 });
      return;
    }

    gsap.set(left, { x: -72, opacity: 0 });
    gsap.set(right, { x: 72, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(left, { x: 0, opacity: 1, duration: 0.85 }, 0).to(
      right,
      { x: 0, opacity: 1, duration: 0.85 },
      0.1,
    );
  }, root);

  return () => {
    ctx.revert();
  };
}
