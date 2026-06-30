"use client";

import { useLogoEntranceAnimation } from "@/lib/animation/logo/use-logo-entrance-animation/useLogoEntranceAnimation";

const LOGO_WORD_GRADIENT =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] bg-clip-text text-transparent dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8]";

const LOGO_SIZE_LG =
  "text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl";

export type LogoEntranceProps = Readonly<{
  onSplashComplete?: () => void;
}>;

export function LogoEntrance(props?: LogoEntranceProps) {
  const { onSplashComplete } = props ?? {};
  const { rootRef, leftRef, rightRef } = useLogoEntranceAnimation({
    onSplashComplete,
  });

  return (
    <div ref={rootRef} role="img" aria-label="Estime Vangu" className="inline-flex justify-center">
      <p className={`flex flex-wrap items-center justify-center gap-x-[0.22em] ${LOGO_SIZE_LG}`}>
        <span ref={leftRef} className={`inline-block opacity-0 ${LOGO_WORD_GRADIENT}`}>
          Estime
        </span>
        <span ref={rightRef} className={`inline-block opacity-0 ${LOGO_WORD_GRADIENT}`}>
          Vangu
        </span>
      </p>
    </div>
  );
}
