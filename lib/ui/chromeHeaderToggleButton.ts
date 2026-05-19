import { composeButtonClassName } from "@/components/button/compose-button-class-name/composeButtonClassName";
import { CHROME_TOGGLE_OUTLINE } from "@/lib/ui/brandChrome";

/** Surcharge chrome pour `Button` outline sm (menu, langue, thème). */
export const CHROME_HEADER_TOGGLE_CHROME_CLASSES = `${CHROME_TOGGLE_OUTLINE} relative z-10 shrink-0`;

/** Lien icône header (retour case study) — mêmes dimensions qu’un toggle. */
export function getChromeHeaderIconLinkClassName(): string {
  return composeButtonClassName({
    variant: "outline",
    size: "sm",
    className: CHROME_HEADER_TOGGLE_CHROME_CLASSES,
  });
}
