import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { getContactStripChannelItems } from "@/lib/animation/home-hero/contact-strip-channel-items/contactStripChannelItems";
import { runContactStripCloseAnimation } from "@/lib/animation/home-hero/run-contact-strip-close-animation/runContactStripCloseAnimation";
import { runContactStripOpenAnimation } from "@/lib/animation/home-hero/run-contact-strip-open-animation/runContactStripOpenAnimation";
import { CONTACT_STRIP_ITEM_OFFSET_Y_PX } from "@/lib/constants";

function setContactStripClosed(shell: HTMLElement): Promise<void> {
  return runWithGsap((gsap) => {
    gsap.set(shell, { height: 0, overflow: "hidden" });
    gsap.set(getContactStripChannelItems(shell), {
      opacity: 0,
      y: CONTACT_STRIP_ITEM_OFFSET_Y_PX,
    });
  });
}

export function useContactStripAnimation(
  isOpen: boolean,
  shellRef: RefObject<HTMLDivElement | null>,
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<GsapTimeline | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const abortRef = { current: false };

    timelineRef.current?.kill();
    timelineRef.current = null;

    void (async () => {
      if (isOpen) {
        hasBeenOpenRef.current = true;
        const tl = await runContactStripOpenAnimation(shell);
        if (abortRef.current) {
          tl.kill();
          return;
        }
        timelineRef.current = tl;
        return;
      }

      if (hasBeenOpenRef.current) {
        const tl = await runContactStripCloseAnimation(shell, () => {
          void setContactStripClosed(shell).then(() => {
            if (!abortRef.current) {
              onCloseComplete();
            }
          });
        });
        if (abortRef.current) {
          tl.kill();
          await setContactStripClosed(shell);
          onCloseComplete();
          return;
        }
        timelineRef.current = tl;
        return;
      }

      await setContactStripClosed(shell);
    })();

    return () => {
      abortRef.current = true;
      const activeTimeline = timelineRef.current;
      if (!activeTimeline) {
        return;
      }
      const interruptedClose = !isOpen && hasBeenOpenRef.current;
      activeTimeline.kill();
      if (interruptedClose) {
        void setContactStripClosed(shell).then(onCloseComplete);
      }
    };
  }, [isOpen, onCloseComplete, shellRef]);
}
