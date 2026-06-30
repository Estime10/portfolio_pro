/**
 * Chrome visuel partagé : header (toggles) et CTA hero — même arrondi et
 * mêmes références que le logo (dégradé signature ardoise glossy).
 */

/** Rayon partagé CTA / badges glossy (`--chrome-surface-radius` dans `globals.css`). */
export const CHROME_SURFACE_RADIUS = "rounded-[var(--chrome-surface-radius)]";

/** Même rayon, priorité sur `rounded-full` des boutons de base. */
export const CHROME_SURFACE_RADIUS_IMPORTANT = "!rounded-[var(--chrome-surface-radius)]";

/** Bordure neutre partagée : toggles header, CTA outline. */
export const CHROME_OUTLINE_BORDER =
  "border border-solid border-[color:rgb(15_23_42_/0.18)] dark:border-[color:rgb(248_250_252_/0.18)]";

/** Bordure + rayon partagé pour surfaces type CTA outline. */
export const CHROME_OUTLINE_SURFACE = `${CHROME_SURFACE_RADIUS} ${CHROME_OUTLINE_BORDER}`;

/** Aligné sur les toggles langue / thème (`LanguageSwitcher`, `ThemeToggle`). */
export const CHROME_TOGGLE_OUTLINE = `text-label ${CHROME_SURFACE_RADIUS_IMPORTANT} ${CHROME_OUTLINE_BORDER}`;

/** Surface ardoise glossy — CTA remplis, boutons primary. */
export const CHROME_GLOSS_SLATE = "ui-gloss-slate";

/** Variante compacte — badges, pastilles, chips. */
export const CHROME_GLOSS_SLATE_BADGE = "ui-gloss-slate-badge";

/**
 * Layout badges projets — hauteur proche du CTA pour que le rayon `xl`
 * reste visible (sur un badge trop petit, `rounded-xl` ≈ pilule).
 */
export const CHROME_GLOSS_BADGE_LAYOUT =
  "inline-flex items-center justify-center min-h-9 px-3 text-xs leading-snug";

/** Texte posé sur le dégradé glossy. */
export const CHROME_LOGO_GRADIENT_TEXT_ON_FILL = "!text-white dark:!text-slate-900";

/** Fond dégradé calqué sur le mot-signature du logo (`LogoEstimeVangu`). */
export const CHROME_LOGO_GRADIENT_FILL = `${CHROME_SURFACE_RADIUS_IMPORTANT} ${CHROME_GLOSS_SLATE} ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL}`;

/** Pastilles profil — même dégradé, padding plus généreux. */
export const CHROME_GRADIENT_CHIP = `${CHROME_SURFACE_RADIUS} ${CHROME_GLOSS_SLATE_BADGE} inline-flex items-center px-4 py-2 text-body font-normal leading-snug tracking-normal ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL}`;

/** Badge statut (cartes projets) — même rayon et proportions que les CTA. */
export const CHROME_GRADIENT_STATUS_BADGE = `${CHROME_SURFACE_RADIUS} ${CHROME_GLOSS_SLATE_BADGE} ${CHROME_GLOSS_BADGE_LAYOUT} ${CHROME_LOGO_GRADIENT_TEXT_ON_FILL}`;

/** Tags focus projets — identique au badge statut. */
export const CHROME_GRADIENT_PROJECT_TAG = CHROME_GRADIENT_STATUS_BADGE;

/** Texte dégradé identique au logo (clip). */
export const CHROME_LOGO_GRADIENT_TEXT = "ui-gloss-slate-text";

/** Pastille d’icône (modale contact, etc.) — mêmes tons glossy que le logo. */
export const CHROME_LOGO_GRADIENT_ICON_TILE = `${CHROME_GLOSS_SLATE_BADGE} ${CHROME_SURFACE_RADIUS} shadow-sm ring-1 ring-black/10 dark:ring-white/25`;
