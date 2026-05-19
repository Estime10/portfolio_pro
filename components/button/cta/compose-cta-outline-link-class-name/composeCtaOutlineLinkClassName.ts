import { composeButtonClassName } from "@/components/button/compose-button-class-name/composeButtonClassName";
import { CTA_LINK_TEXT_WRAP } from "@/components/button/cta/ctaLinkLayoutClasses";
import { CHROME_TOGGLE_OUTLINE } from "@/lib/ui/brandChrome";

export function composeCtaOutlineLinkClassName(className?: string): string {
  return composeButtonClassName({
    variant: "outline",
    size: "md",
    className: [CHROME_TOGGLE_OUTLINE, CTA_LINK_TEXT_WRAP, className ?? ""]
      .filter((part) => part.length > 0)
      .join(" "),
  });
}
