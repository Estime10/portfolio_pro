import { CHROME_OUTLINE_BORDER } from "@/lib/ui/brandChrome";

/** Carte d’intention sélectionnée — même chrome que les CTA outline du hero. */
export const CONTACT_INTENT_SELECTED_SURFACE = [
  CHROME_OUTLINE_BORDER,
  "bg-[color:var(--layer-surface-subtle)]",
  "ring-2 ring-[color:rgb(72_82_98_/0.14)] dark:ring-[color:rgb(186_196_210_/0.22)]",
].join(" ");

/** Carte d’intention au repos. */
export const CONTACT_INTENT_DEFAULT_SURFACE = [
  CHROME_OUTLINE_BORDER,
  "bg-surface hover:bg-[color:var(--layer-surface-subtle)]",
].join(" ");
