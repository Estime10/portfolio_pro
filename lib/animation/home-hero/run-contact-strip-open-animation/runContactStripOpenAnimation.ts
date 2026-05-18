import gsap from "gsap";
import { getContactStripChannelItems } from "@/lib/animation/home-hero/contact-strip-channel-items/contactStripChannelItems";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import {
  CONTACT_STRIP_EXPAND_DURATION_SECONDS,
  CONTACT_STRIP_EXPAND_EASE,
  CONTACT_STRIP_ITEM_DURATION_SECONDS,
  CONTACT_STRIP_ITEM_EASE,
  CONTACT_STRIP_ITEM_OFFSET_Y_PX,
  CONTACT_STRIP_ITEM_STAGGER_SECONDS,
} from "@/lib/constants/constants";

function measureShellHeight(shell: HTMLElement): number {
  const previousHeight = shell.style.height;
  gsap.set(shell, { height: "auto" });
  const height = shell.offsetHeight;
  gsap.set(shell, { height: previousHeight || 0 });
  return height;
}

export function runContactStripOpenAnimation(shell: HTMLElement): gsap.core.Timeline {
  const items = getContactStripChannelItems(shell);
  const tl = gsap.timeline();

  if (prefersReducedMotion()) {
    gsap.set(shell, { height: "auto", overflow: "hidden" });
    gsap.set(items, { opacity: 1, y: 0 });
    return tl;
  }

  const targetHeight = measureShellHeight(shell);

  gsap.set(shell, { height: 0, overflow: "hidden" });
  gsap.set(items, { opacity: 0, y: CONTACT_STRIP_ITEM_OFFSET_Y_PX });

  tl.to(shell, {
    height: targetHeight,
    duration: CONTACT_STRIP_EXPAND_DURATION_SECONDS,
    ease: CONTACT_STRIP_EXPAND_EASE,
  });

  if (items.length > 0) {
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: CONTACT_STRIP_ITEM_DURATION_SECONDS,
        stagger: CONTACT_STRIP_ITEM_STAGGER_SECONDS,
        ease: CONTACT_STRIP_ITEM_EASE,
      },
      `-=${String(CONTACT_STRIP_EXPAND_DURATION_SECONDS * 0.35)}`,
    );
  }

  tl.eventCallback("onComplete", () => {
    gsap.set(shell, { height: "auto" });
  });

  return tl;
}
