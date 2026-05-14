// =============================================================================
// Brand — identité (favicon / OG, aligné sur le logo texte mode clair)
// =============================================================================

/** Dégradé de surface (favicon / OG), mêmes tons que le logo texte en mode clair. */
export const BRAND_LOGO_SURFACE_GRADIENT =
  "linear-gradient(to bottom right, #070b14 0%, #312e81 52%, #1e1b4b 100%)";

// =============================================================================
// Thème — persistance & événements
// =============================================================================

/** Clé `localStorage` pour mémoriser la préférence utilisateur (clair / sombre). */
export const THEME_STORAGE_KEY = "portfolio-theme";

/**
 * Nom de l'événement `window` émis après un changement de thème (même onglet),
 * pour réveiller les abonnés (ex. `useSyncExternalStore`).
 */
export const THEME_CHANGE_EVENT = "portfolio-theme-change";

/** Variantes de thème applicatif. */
export type ThemeMode = "light" | "dark";

// =============================================================================
// Animation — transition de thème (GSAP)
// =============================================================================

/** Durée en secondes de l'interpolation des couleurs au bascule clair / sombre. */
export const THEME_TRANSITION_DURATION_SECONDS = 1.22;

/**
 * Courbe d'accélération GSAP passée à `gsap.to` pour la transition de thème.
 * @see https://gsap.com/docs/v3/Eases
 */
export const THEME_TRANSITION_EASE = "power2.inOut";

// =============================================================================
// Splash → entrée route principale (/home)
// =============================================================================

/** `sessionStorage` : la prochaine peinture de `(main)` doit jouer le fondu plein écran. */
export const SPLASH_TO_MAIN_SESSION_FLAG_KEY = "portfolio-splash-main-fade";

/** Durée du fondu plein écran (header + contenu) après la splash. */
export const MAIN_SHELL_FADE_IN_DURATION_SECONDS = 2;

/** Courbe GSAP pour le fondu d’entrée du shell principal. */
export const MAIN_SHELL_FADE_IN_EASE = "sine.inOut";

// =============================================================================
// Routes applicatives
// =============================================================================

/** Travaux / réalisations (URL courte ; renommable si passage à « projects »). */
export const WORK_ROUTE_PATH = "/work" as const;

// =============================================================================
// Thème — variables CSS interpolées (alignées sur `app/globals.css`)
// =============================================================================

/**
 * Noms des custom properties à interpoler pendant la transition.
 * Chaque entrée correspond à une variable définie dans `:root` et `html.dark`.
 */
export const THEME_ANIMATED_CSS_VARS = [
  "--color-bg", // fond principal de page
  "--color-bg-muted", // fond secondaire / zones atténuées
  "--layer-surface", // surface type carte / panneau
  "--layer-surface-subtle", // surface très légèrement contrastée
  "--stroke-default", // bordure par défaut
  "--stroke-strong", // bordure plus marquée
  "--color-text-primary", // texte principal
  "--color-text-secondary", // texte secondaire
  "--color-text-tertiary", // texte tertiaire / hints
  "--accent", // couleur d'accentuation
  "--accent-hover", // accent au survol
  "--accent-muted", // accent atténué (surfaces / halos)
  "--color-on-accent", // texte ou icônes posées sur fond accent
  "--color-overlay", // voile modale / recouvrement
] as const;

/** Union des noms de variables CSS animées au changement de thème. */
export type ThemeAnimatedCssVar = (typeof THEME_ANIMATED_CSS_VARS)[number];

// =============================================================================
// Thème — palettes cibles (interpolation GSAP, thème clair)
// =============================================================================

/** Valeurs cibles des variables animées pour le thème clair (`:root` dans `globals.css`). */
export const LIGHT_THEME_PALETTE: Record<ThemeAnimatedCssVar, string> = {
  /** Fond principal de page */
  "--color-bg": "#f6f7f9",
  /** Fond secondaire */
  "--color-bg-muted": "#eceef2",
  /** Surface carte / contenu surélevé */
  "--layer-surface": "#ffffff",
  /** Surface légèrement teintée */
  "--layer-surface-subtle": "#fafbfc",
  /** Bordure standard */
  "--stroke-default": "rgb(15 23 42 / 0.08)",
  /** Bordure renforcée */
  "--stroke-strong": "rgb(15 23 42 / 0.12)",
  /** Texte principal */
  "--color-text-primary": "#0f172a",
  /** Texte secondaire */
  "--color-text-secondary": "#475569",
  /** Texte tertiaire */
  "--color-text-tertiary": "#64748b",
  /** Accent principal */
  "--accent": "#4f46e5",
  /** Accent au survol */
  "--accent-hover": "#4338ca",
  /** Accent atténué (fonds translucides) */
  "--accent-muted": "rgb(79 70 229 / 0.14)",
  /** Contenu sur fond accent */
  "--color-on-accent": "#ffffff",
  /** Overlay (modales, scrim) */
  "--color-overlay": "rgb(15 23 42 / 0.45)",
};

// =============================================================================
// Thème — palettes cibles (interpolation GSAP, thème sombre)
// =============================================================================

/** Valeurs cibles des variables animées pour le thème sombre (`html.dark` dans `globals.css`). */
export const DARK_THEME_PALETTE: Record<ThemeAnimatedCssVar, string> = {
  /** Fond principal de page (sombre) */
  "--color-bg": "#0c0e12",
  /** Fond secondaire (sombre) */
  "--color-bg-muted": "#141820",
  /** Surface carte (sombre) */
  "--layer-surface": "#11141a",
  /** Surface légère (sombre) */
  "--layer-surface-subtle": "#0f1218",
  /** Bordure standard (sombre) */
  "--stroke-default": "rgb(248 250 252 / 0.08)",
  /** Bordure renforcée (sombre) */
  "--stroke-strong": "rgb(248 250 252 / 0.14)",
  /** Texte principal (sombre) */
  "--color-text-primary": "#f1f5f9",
  /** Texte secondaire (sombre) */
  "--color-text-secondary": "#94a3b8",
  /** Texte tertiaire (sombre) */
  "--color-text-tertiary": "#778296",
  /** Accent principal (sombre) */
  "--accent": "#818cf8",
  /** Accent au survol (sombre) */
  "--accent-hover": "#a5b4fc",
  /** Accent atténué (sombre) */
  "--accent-muted": "rgb(129 140 248 / 0.2)",
  /** Contenu sur fond accent (sombre) */
  "--color-on-accent": "#ffffff",
  /** Overlay (sombre) */
  "--color-overlay": "rgb(0 0 0 / 0.55)",
};
