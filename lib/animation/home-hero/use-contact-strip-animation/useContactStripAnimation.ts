import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { getContactStripChannelItems } from "@/lib/animation/home-hero/contact-strip-channel-items/contactStripChannelItems";
import { runContactStripCloseAnimation } from "@/lib/animation/home-hero/run-contact-strip-close-animation/runContactStripCloseAnimation";
import { runContactStripOpenAnimation } from "@/lib/animation/home-hero/run-contact-strip-open-animation/runContactStripOpenAnimation";
import { CONTACT_STRIP_ITEM_OFFSET_Y_PX } from "@/lib/constants";

function setContactStripClosed(shell: HTMLElement): void {
  gsap.set(shell, { height: 0, overflow: "hidden" });
  gsap.set(getContactStripChannelItems(shell), {
    opacity: 0,
    y: CONTACT_STRIP_ITEM_OFFSET_Y_PX,
  });
}

export function useContactStripAnimation(
  isOpen: boolean,
  shellRef: RefObject<HTMLDivElement | null>,
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (isOpen) {
      hasBeenOpenRef.current = true;
      timelineRef.current = runContactStripOpenAnimation(shell);
    } else if (hasBeenOpenRef.current) {
      const tl = runContactStripCloseAnimation(shell);
      const finishClose = (): void => {
        setContactStripClosed(shell);
        onCloseComplete();
      };
      tl.eventCallback("onComplete", finishClose);
      timelineRef.current = tl;
    } else {
      setContactStripClosed(shell);
    }

    return () => {
      const activeTimeline = timelineRef.current;
      if (!activeTimeline) {
        return;
      }
      const interruptedClose = !isOpen && hasBeenOpenRef.current;
      activeTimeline.kill();
      if (interruptedClose) {
        setContactStripClosed(shell);
        onCloseComplete();
      }
    };
  }, [isOpen, onCloseComplete, shellRef]);
}
