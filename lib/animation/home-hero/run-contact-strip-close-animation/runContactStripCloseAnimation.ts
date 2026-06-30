import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getContactStripChannelItems } from "@/lib/animation/home-hero/contact-strip-channel-items/contactStripChannelItems";
import { pinContactStripHeight } from "@/lib/animation/home-hero/pin-contact-strip-height/pinContactStripHeight";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import {
  CONTACT_STRIP_CLOSE_COLLAPSE_OVERLAP_RATIO,
  CONTACT_STRIP_COLLAPSE_DURATION_SECONDS,
  CONTACT_STRIP_COLLAPSE_EASE,
  CONTACT_STRIP_ITEM_EXIT_DURATION_SECONDS,
  CONTACT_STRIP_ITEM_EXIT_OFFSET_Y_PX,
  CONTACT_STRIP_ITEM_EXIT_STAGGER_SECONDS,
} from "@/lib/constants";

function contactStripItemsExitSpan(itemCount: number): number {
  if (itemCount <= 0) {
    return 0;
  }
  return (
    CONTACT_STRIP_ITEM_EXIT_DURATION_SECONDS +
    (itemCount - 1) * CONTACT_STRIP_ITEM_EXIT_STAGGER_SECONDS
  );
}

export function runContactStripCloseAnimation(
  shell: HTMLElement,
  onComplete?: () => void,
): Promise<GsapTimeline> {
  return runWithGsap((gsap) => {
    const items = getContactStripChannelItems(shell);

    if (prefersReducedMotion()) {
      gsap.set(shell, { height: 0, overflow: "hidden" });
      gsap.set(items, { opacity: 0, y: CONTACT_STRIP_ITEM_EXIT_OFFSET_Y_PX });
      onComplete?.();
      return createGsapTimeline(gsap);
    }

    pinContactStripHeight(gsap, shell);
    gsap.set(items, { y: 0 });

    const exitSpan = contactStripItemsExitSpan(items.length);
    const collapseOverlap = exitSpan * CONTACT_STRIP_CLOSE_COLLAPSE_OVERLAP_RATIO;

    const tl = createGsapTimeline(gsap, { onComplete });
    if (items.length > 0) {
      tl.to(items, {
        opacity: 0,
        y: CONTACT_STRIP_ITEM_EXIT_OFFSET_Y_PX,
        duration: CONTACT_STRIP_ITEM_EXIT_DURATION_SECONDS,
        stagger: {
          each: CONTACT_STRIP_ITEM_EXIT_STAGGER_SECONDS,
          from: "end",
        },
        ease: "power2.in",
      });
    }

    tl.to(
      shell,
      {
        height: 0,
        duration: CONTACT_STRIP_COLLAPSE_DURATION_SECONDS,
        ease: CONTACT_STRIP_COLLAPSE_EASE,
      },
      items.length > 0 ? `-=${String(collapseOverlap)}` : 0,
    );

    return tl;
  });
}
