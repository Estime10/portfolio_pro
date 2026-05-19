import { composeButtonClassName } from "@/components/button/compose-button-class-name/composeButtonClassName";
import { CTA_LINK_TEXT_WRAP } from "@/components/button/cta/ctaLinkLayoutClasses";
import { CHROME_LOGO_GRADIENT_FILL } from "@/lib/ui/brandChrome";

/** Même rendu que le CTA « Lancer un projet » du hero (ghost + dégradé logo). */
const CTA_GRADIENT_GHOST_OVERRIDES =
  "border-0 shadow-none hover:bg-transparent dark:hover:bg-transparent";

export function composeCtaGradientClassName(className?: string): string {
  return composeButtonClassName({
    variant: "ghost",
    size: "md",
    className: [
      CHROME_LOGO_GRADIENT_FILL,
      CTA_LINK_TEXT_WRAP,
      CTA_GRADIENT_GHOST_OVERRIDES,
      className ?? "",
    ]
      .filter((part) => part.length > 0)
      .join(" "),
  });
}
