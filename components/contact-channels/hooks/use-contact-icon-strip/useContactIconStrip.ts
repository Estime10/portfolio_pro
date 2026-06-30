import { useRef, type RefObject } from "react";
import { useContactStripAnimation } from "@/lib/animation/home-hero/use-contact-strip-animation/useContactStripAnimation";

export type UseContactIconStripResult = Readonly<{
  shellRef: RefObject<HTMLDivElement | null>;
}>;

export function useContactIconStrip(
  isOpen: boolean,
  onCloseComplete: () => void,
): UseContactIconStripResult {
  const shellRef = useRef<HTMLDivElement>(null);

  useContactStripAnimation(isOpen, shellRef, onCloseComplete);

  return { shellRef };
}
