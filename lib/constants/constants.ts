// =============================================================================
// Brand — identité (favicon / OG, aligné sur le logo texte mode clair)
// =============================================================================

/** Dégradé de surface (favicon / OG), mêmes tons que le logo texte en mode clair. */
export const BRAND_LOGO_SURFACE_GRADIENT =
  "linear-gradient(152deg, rgb(108 116 130) 0%, rgb(48 58 72) 52%, rgb(20 26 36) 100%)";

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
// Animation — logo splash (entrée / sortie)
// =============================================================================

/** Décalage horizontal initial des moitiés du logo (px). */
export const LOGO_ENTRANCE_OFFSET_PX = 72;

/** Durée de l’animation d’arrivée de chaque moitié du logo. */
export const LOGO_ENTRANCE_DURATION_SECONDS = 2.15;

/** Décalage entre « Estime » et « Vangu » à l’arrivée. */
export const LOGO_ENTRANCE_STAGGER_SECONDS = 0;

/** Courbe GSAP pour l’arrivée du logo. */
export const LOGO_ENTRANCE_EASE = "power3.out";

/** Durée de l’animation de sortie de chaque moitié du logo. */
export const LOGO_EXIT_DURATION_SECONDS = 2.15;

/** Décalage entre « Estime » et « Vangu » à la sortie. */
export const LOGO_EXIT_STAGGER_SECONDS = 0;

/** Courbe GSAP pour la sortie du logo. */
export const LOGO_EXIT_EASE = "power3.in";

// =============================================================================
// Animation — changement de route dans (main)
// =============================================================================

/** Durée du fondu de sortie du contenu `<main>` entre deux pages. */
export const MAIN_ROUTE_TRANSITION_OUT_DURATION_SECONDS = 0.4;

/** Durée du fondu d’entrée du contenu `<main>` entre deux pages. */
export const MAIN_ROUTE_TRANSITION_IN_DURATION_SECONDS = 0.65;

/** Courbe GSAP partagée avec l’entrée splash → shell (même langage visuel). */
export const MAIN_ROUTE_TRANSITION_EASE = MAIN_SHELL_FADE_IN_EASE;

// =============================================================================
// Animation — panneau contact hero (GSAP)
// =============================================================================

/** Durée d’ouverture du conteneur contact (hauteur). */
export const CONTACT_STRIP_EXPAND_DURATION_SECONDS = 0.38;

/** Courbe GSAP pour l’ouverture du conteneur contact. */
export const CONTACT_STRIP_EXPAND_EASE = "power2.out";

/** Durée d’entrée de chaque canal contact. */
export const CONTACT_STRIP_ITEM_DURATION_SECONDS = 0.42;

/** Décalage entre chaque canal (stagger). */
export const CONTACT_STRIP_ITEM_STAGGER_SECONDS = 0.09;

/** Courbe GSAP pour l’entrée des canaux contact. */
export const CONTACT_STRIP_ITEM_EASE = "power3.out";

/** Décalage vertical initial des canaux à l’ouverture (px). */
export const CONTACT_STRIP_ITEM_OFFSET_Y_PX = 14;

/** Durée de fermeture du conteneur contact. */
export const CONTACT_STRIP_COLLAPSE_DURATION_SECONDS = 0.4;

/** Courbe GSAP pour la fermeture du conteneur contact. */
export const CONTACT_STRIP_COLLAPSE_EASE = "power2.inOut";

/** Durée de sortie de chaque canal contact. */
export const CONTACT_STRIP_ITEM_EXIT_DURATION_SECONDS = 0.32;

/** Stagger entre canaux à la fermeture (s). */
export const CONTACT_STRIP_ITEM_EXIT_STAGGER_SECONDS = 0.07;

/** Décalage vertical des canaux à la fermeture (px, vers le haut). */
export const CONTACT_STRIP_ITEM_EXIT_OFFSET_Y_PX = -12;

/**
 * Recouvrement du repli hauteur sur la sortie des canaux (0–1 du span items).
 * Plus élevé = fermeture plus parallèle et fluide (miroir de l’ouverture).
 */
export const CONTACT_STRIP_CLOSE_COLLAPSE_OVERLAP_RATIO = 0.58;

// =============================================================================
// Animation — formulaire contact (GSAP)
// =============================================================================

export const CONTACT_FORM_PHASE_DURATION_SECONDS = 0.38;
export const CONTACT_FORM_PHASE_EASE = "power2.out";
export const CONTACT_FORM_PHASE_OFFSET_Y_PX = 14;

export const CONTACT_FORM_FIELD_DURATION_SECONDS = 0.34;
export const CONTACT_FORM_FIELD_EASE = "power2.out";
export const CONTACT_FORM_FIELD_OFFSET_Y_PX = 12;

export const CONTACT_FORM_SCROLL_DURATION_SECONDS = 0.62;
export const CONTACT_FORM_SCROLL_EASE = "power2.inOut";

export const CONTACT_FORM_INTENT_EXIT_DURATION_SECONDS = 0.34;
export const CONTACT_FORM_INTENT_EXIT_EASE = "power2.in";
export const CONTACT_FORM_INTENT_EXIT_OFFSET_Y_PX = -14;

// =============================================================================
// Routes applicatives
// =============================================================================

/** Accueil. */
export const HOME_ROUTE_PATH = "/home" as const;

/** Profil (présentation personnelle). */
export const PROFILE_ROUTE_PATH = "/profile" as const;

/** Projets / réalisations. */
export const PROJECTS_ROUTE_PATH = "/projects" as const;

/** Contact. */
export const CONTACT_ROUTE_PATH = "/contact" as const;

/** Cible du lien d'évitement vers le contenu principal (`<main>`). */
export const MAIN_CONTENT_ID = "main-content" as const;

/** @deprecated Préférer `PROJECTS_ROUTE_PATH`. */
export const PROJECT_ROUTE_PATH = PROJECTS_ROUTE_PATH;

/** @deprecated Préférer `PROJECTS_ROUTE_PATH`. */
export const WORK_ROUTE_PATH = PROJECTS_ROUTE_PATH;

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
  "--color-bg": "#f5f6f8",
  /** Fond secondaire */
  "--color-bg-muted": "#e7e9ee",
  /** Surface carte / contenu surélevé */
  "--layer-surface": "#ffffff",
  /** Surface légèrement teintée */
  "--layer-surface-subtle": "#f9fafb",
  /** Bordure standard */
  "--stroke-default": "rgb(15 23 42 / 0.06)",
  /** Bordure renforcée */
  "--stroke-strong": "rgb(15 23 42 / 0.12)",
  /** Texte principal */
  "--color-text-primary": "#111827",
  /** Texte secondaire */
  "--color-text-secondary": "#4b5563",
  /** Texte tertiaire */
  "--color-text-tertiary": "#6b7280",
  /** Accent principal */
  "--accent": "#2a3342",
  /** Accent au survol */
  "--accent-hover": "#1e2632",
  /** Accent atténué (fonds translucides) */
  "--accent-muted": "rgb(42 51 66 / 0.14)",
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
  "--color-bg": "#0b0d11",
  /** Fond secondaire (sombre) */
  "--color-bg-muted": "#141820",
  /** Surface carte (sombre) */
  "--layer-surface": "#11141a",
  /** Surface légère (sombre) */
  "--layer-surface-subtle": "#0f1218",
  /** Bordure standard (sombre) */
  "--stroke-default": "rgb(248 250 252 / 0.08)",
  /** Bordure renforcée (sombre) */
  "--stroke-strong": "rgb(248 250 252 / 0.16)",
  /** Texte principal (sombre) */
  "--color-text-primary": "#e8ecf1",
  /** Texte secondaire (sombre) */
  "--color-text-secondary": "#9ca3af",
  /** Texte tertiaire (sombre) */
  "--color-text-tertiary": "#6b7280",
  /** Accent principal (sombre) */
  "--accent": "#d4dae3",
  /** Accent au survol (sombre) */
  "--accent-hover": "#eef1f5",
  /** Accent atténué (sombre) */
  "--accent-muted": "rgb(212 218 227 / 0.18)",
  /** Contenu sur fond accent (sombre) */
  "--color-on-accent": "#111827",
  /** Overlay (sombre) */
  "--color-overlay": "rgb(0 0 0 / 0.55)",
};
