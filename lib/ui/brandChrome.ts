/**
 * Chrome visuel partagé : header (toggles) et CTA hero — même arrondi et
 * mêmes références que le logo (dégradé signature).
 */

/** Bordure indigo partagée : toggles header, CTA outline. */
export const CHROME_OUTLINE_BORDER =
  "border border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]";

/** Bordure + rayon `xl` pour surfaces type CTA outline. */
export const CHROME_OUTLINE_SURFACE = `rounded-xl ${CHROME_OUTLINE_BORDER}`;

/** Aligné sur les toggles langue / thème (`LanguageSwitcher`, `ThemeToggle`). */
export const CHROME_TOGGLE_OUTLINE = `text-label !rounded-xl ${CHROME_OUTLINE_BORDER}`;

/** Dégradé logo — fond (CTA « Lancer un projet », pastilles profil). */
export const CHROME_LOGO_GRADIENT_BG =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8]";

/** Texte posé sur le dégradé logo. */
export const CHROME_LOGO_GRADIENT_TEXT_ON_FILL = "!text-white dark:!text-slate-900";

/** Fond dégradé calqué sur le mot-signature du logo (`LogoEstimeVangu`). */
export const CHROME_LOGO_GRADIENT_FILL = `!rounded-xl ${CHROME_LOGO_GRADIENT_BG} ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL} transition-[filter] hover:brightness-110 active:brightness-95 dark:hover:brightness-105`;

/** Pastilles profil — même dégradé et contraste que le CTA « Lancer un projet ». */
export const CHROME_GRADIENT_CHIP = `rounded-xl ${CHROME_LOGO_GRADIENT_BG} px-4 py-2 text-body font-normal leading-snug tracking-normal ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL}`;

/** Badge statut (cartes projets) — même fond que le logo, taille xs. */
export const CHROME_GRADIENT_STATUS_BADGE = `rounded-full ${CHROME_LOGO_GRADIENT_BG} px-2 py-0.5 text-xs ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL}`;

/** Texte dégradé identique au logo (clip). */
export const CHROME_LOGO_GRADIENT_TEXT =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] bg-clip-text text-transparent dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8]";

/** Pastille d’icône (modale contact, etc.) — mêmes tons que le logo. */
export const CHROME_LOGO_GRADIENT_ICON_TILE =
  "bg-linear-to-br from-[#070b14] via-[#312e81] to-[#1e1b4b] shadow-sm ring-1 ring-black/10 dark:from-[#f8fafc] dark:via-[#c7d2fe] dark:to-[#818cf8] dark:ring-white/25";
