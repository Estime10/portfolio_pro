/**
 * Chrome visuel partagé : header (toggles) et CTA hero — même arrondi et
 * mêmes références que le logo (dégradé signature).
 */

/** Aligné sur les toggles langue / thème (`LanguageSwitcher`, `ThemeToggle`). */
export const CHROME_TOGGLE_OUTLINE =
  "text-label !rounded-xl border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]";

/** Fond dégradé calqué sur le mot-signature du logo (`LogoEstimeVangu`). */
export const CHROME_LOGO_GRADIENT_FILL =
  "!rounded-xl bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] !text-white transition-[filter] hover:brightness-110 active:brightness-95 dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8] dark:!text-slate-900 dark:hover:brightness-105";

/** Texte dégradé identique au logo (clip). */
export const CHROME_LOGO_GRADIENT_TEXT =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] bg-clip-text text-transparent dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8]";

/** Pastille d’icône (modale contact, etc.) — mêmes tons que le logo. */
export const CHROME_LOGO_GRADIENT_ICON_TILE =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] shadow-sm ring-1 ring-black/10 dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8] dark:ring-white/25";
