import type { RefObject } from "react";
import { useLayoutEffect, useRef } from "react";
import { runLogoEntranceAnimation } from "@/lib/animation/logo/run-logo-entrance-animation/runLogoEntranceAnimation";

export function useLogoEntranceAnimation(): {
  rootRef: RefObject<HTMLDivElement | null>;
  leftRef: RefObject<HTMLSpanElement | null>;
  rightRef: RefObject<HTMLSpanElement | null>;
} {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !left || !right) {
      return;
    }
    return runLogoEntranceAnimation(root, left, right);
  }, []);

  return { rootRef, leftRef, rightRef };
}
