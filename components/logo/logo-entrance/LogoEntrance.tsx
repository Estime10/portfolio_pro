"use client";

import { useLogoEntranceAnimation } from "@/lib/animation/logo/use-logo-entrance-animation/useLogoEntranceAnimation";
import { CHROME_LOGO_GRADIENT_TEXT, CHROME_LOGO_TYPOGRAPHY } from "@/lib/ui/brandChrome";

const LOGO_SIZE_LG = `text-4xl ${CHROME_LOGO_TYPOGRAPHY} sm:text-5xl md:text-6xl lg:text-7xl`;

export type LogoEntranceProps = Readonly<{
  onSplashComplete?: () => void;
}>;

export function LogoEntrance(props?: LogoEntranceProps) {
  const { onSplashComplete } = props ?? {};
  const { rootRef, leftRef, rightRef } = useLogoEntranceAnimation({
    onSplashComplete,
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Estime Vangu"
      className="inline-flex justify-center overflow-visible"
    >
      <p
        className={`flex flex-wrap items-baseline justify-center gap-x-[0.22em] overflow-visible ${LOGO_SIZE_LG}`}
      >
        <span ref={leftRef} className={`inline-block opacity-0 ${CHROME_LOGO_GRADIENT_TEXT}`}>
          Estime
        </span>
        <span ref={rightRef} className={`inline-block opacity-0 ${CHROME_LOGO_GRADIENT_TEXT}`}>
          Vangu
        </span>
      </p>
    </div>
  );
}
