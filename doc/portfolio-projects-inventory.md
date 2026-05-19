# Inventaire projets — Portfolio Estime Vangu

> Document de référence pour sélectionner, documenter et intégrer les projets dans `portfolio_pro`.  
> Sources : code cloné dans `../mes-apps/` + dépôt actuel `portfolio_pro`.  
> Dernière mise à jour : **mai 2026**

---

## Comment utiliser ce document

| Section | Usage |
|--------|--------|
| **Vue d’ensemble** | Décider quoi montrer (sélection ≠ tout montrer) |
| **Fiches projet** | Base pour case studies, copy i18n, page `/projects` |
| **Assets** | Checklist de ce qu’il faut récupérer / produire |
| **Ponts** | Liens entre projets, patterns récurrents, narrative portfolio |
| **Recommandation finale** | 2–4 principaux · 3–6 secondaires · experiments |

**Dossier local des clones :**  
`/Users/estimevangu/Desktop/REPOSITORIES/creativity/mes-apps/`

**Projets analysés (8) :**  
`enna` · `folio_photo_vbs` · `jikowood_refonte` · `shadow` · `maxweljones` · `purpose_sport_latest` · `scratch_tracker` · `portfolio_pro`

---

## Vue d’ensemble — Matrice rapide

| Projet | Type | Année | Statut | Fullstack | Motion / UX | Tests | Prod documentée | Tier portfolio |
|--------|------|-------|--------|-----------|-------------|-------|-----------------|----------------|
| **FleetScan** (`scratch_tracker`) | App métier B2B | 2026 | En cours · avancé | ★★★ | ★★ | ★★★ | Non (MVP) | **Principal** |
| **Shadow** | App privée (messagerie + calendrier) | 2026 | En cours · avancé | ★★★ | ★★ | ★★★ | Pré-deploy | **Principal** |
| **Jikowood refonte** | Vitrine premium artisan | 2026 | En cours | ★ | ★★★ | ★★★ | Partiel | **Principal** |
| **portfolio_pro** | Portfolio product engineer | 2026 | En cours (shell OK) | ★ | ★★★ | ★ (lint/tsc) | À déployer | **Principal** (meta) |
| **Enna** | Vitrine B2B RH | 2026 | Release 1.0.0 | ★ | ★★ | ★ | ★★★ (`ennabv.be`) | **Secondaire** |
| **Maxwel Jones** | Vitrine corporate one-page | 2025–26 | Release 1.0.0 | ★ | ★★ | — | ★★★ (`maxweljones.com`) | **Secondaire** |
| **folio_photo_vbs** | Portfolio photo immersif | 2026 | Release 1.0.0 | ★ | ★★★ | — | ★★★ (`photovibesbyshana.vercel.app`) | **Secondaire** (visuel) |
| **Purpose Sport** | Vitrine agence sport | 2025 | Release 1.0.0 | ★ | ★★ | ★ | ★★★ (`purpose-sport.com`) | **Secondaire** |

---

## Ponts transversaux (comment tout s’articule)

### 1. Deux familles de livrables

```
VITRINES (conversion, narration, motion premium)
├── enna          → B2B, i18n, contact EmailJS, prod BE
├── jikowood      → artisan premium, galerie, Lenis, tests E2E
├── folio_photo   → créatif photo, galerie / lightbox
├── maxweljones   → corporate, réseau, Web3Forms
└── purpose_sport → data-driven (12 joueurs), vidéos

APPLICATIONS (système, auth, données, terrain)
├── shadow          → messagerie éphémère, PWA, Supabase realtime
└── scratch_tracker → flotte / QR / rôles, Supabase RLS

META
└── portfolio_pro   → démontre la méthode + le niveau d’exécution du shell
```

### 2. Patterns techniques récurrents (ton « signature »)

| Pattern | Projets concernés |
|---------|-------------------|
| Next.js App Router + React 19 | Tous |
| i18n multi-locale (fr/en/nl) | enna, jikowood, folio, scratch, portfolio_pro |
| GSAP + `prefers-reduced-motion` | enna, jikowood, folio, maxweljones, portfolio_pro, scratch |
| Framer Motion | shadow, purpose_sport, folio, enna |
| Supabase (auth + RLS + migrations) | shadow, scratch_tracker |
| Architecture `features/` stricte | shadow, scratch, jikowood, portfolio_pro |
| Vitest (+ Playwright sur les plus matures) | jikowood, shadow, scratch, enna |
| Vitrine sans backend (données statiques / mock contact) | folio, jikowood (contact UI seul), enna (témoignages mock) |

### 3. Narrative portfolio (ce que tu racontes)

1. **Je construis des produits**, pas seulement des pages — Shadow + FleetScan prouvent auth, rôles, données, contraintes terrain.
2. **Je soigne l’exécution frontend** — Jikowood, folio, portfolio_pro = motion, galerie, design system, détails.
3. **Je livre en conditions réelles** — Enna, Maxwel Jones, Purpose Sport = domaines prod, SEO, conversion.
4. **Je documente et j’architecture** — docs dans shadow/jikowood/maxweljones/scratch ; portfolio_pro = stratégie phases 1–7.

### 4. Gaps communs à combler avant publication

| Gap | Projets | Action |
|-----|---------|--------|
| **Aucun screenshot marketing** dans les repos | Presque tous | Captures desktop + mobile (prod ou staging) |
| **Pas de vidéo démo** | Tous sauf purpose (vidéos joueurs) | 30–60 s par principal (Loom / enregistrement) |
| **Contact / formulaire mock** | jikowood (UI seul), folio (email placeholder) | Mentionner honnêtement en case study ou brancher |
| **Assets manquants en local** | purpose_sport (`og-image`, certaines images) | Re-télécharger depuis prod ou Vercel |
| **README générique** | folio, purpose | Remplacer par fiche projet dans portfolio uniquement |

### 5. Lien avec `portfolio_pro` (roadmap contenu)

| Phase stratégie (`porfolio-strategy.md`) | Alimentée par |
|------------------------------------------|---------------|
| Phase 2 — Projets listés | Matrice « secondaires » ci-dessous |
| Phase 3–4 — Case studies | 2–4 principaux (FleetScan, Shadow, Jikowood, + option Enna ou portfolio meta) |
| Phase 5 — Contenu MDX / détail | Fiches ci-dessous → extraire « Problème / Solution / Stack / Learnings » |
| Phase 6 — Contact réel | Remplacer placeholders `publicContact.ts` |

---

## Recommandation de sélection (niveau perçu)

> **Règle :** chaque projet affiché doit sembler **choisi volontairement**, pas « tout mon historique GitHub ».

### Case studies complètes (2–4) — priorité contenu

| Rang | Projet | Pourquoi |
|------|--------|----------|
| 1 | **FleetScan** (`scratch_tracker`) | Seul vrai produit métier récent : QR, rôles, RLS, tests, doc produit. Prouve seniorité fullstack mesurée. |
| 2 | **Shadow** | App complète : realtime, PWA, sécurité, migrations. Différenciant vs vitrines. |
| 3 | **Jikowood refonte** | Craft motion + archi documentée + E2E. Excellent pour « premium execution ». |
| 4 (option) | **portfolio_pro** | Case study **meta** : « comment j’ai conçu mon propre produit » — shell GSAP, stratégie, design system. |

**Enna** peut remplacer Jikowood ou compléter en 4e place si tu veux insister **client B2B + prod Belgique**.

### Projets secondaires (3–6) — cartes plus courtes, visuelles

- **Maxwel Jones** — polish corporate, animations, archi features/
- **folio_photo_vbs** — direction artistique, galerie (fort visuel, faible backend)
- **Purpose Sport** — secteur sport, roster + vidéos
- **Enna** — si pas en case study complète

### Section experiments (optionnelle)

- Extraits motion isolés (splash GSAP, transitions thème `portfolio_pro`)
- Concepts non déployés — **ne pas lister** les repos non sélectionnés

### À ne pas sur-promouvoir dans le portfolio principal

- Projets sans preuve prod ou sans angle « système » fort sans contexte
- Doublons narratifs (3 vitrines one-page sans différenciation claire) — regrouper visuellement « Selected client work »

---

## Fiches projet détaillées

---

### 1. FleetScan — `scratch_tracker`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom affiché** | FleetScan |
| **Dossier** | `mes-apps/scratch_tracker` |
| **Repo** | `Estime10/scratch_tracker` (privé) |
| **Année** | 2026 |
| **Type** | Application web métier B2B, mobile-first |
| **Objectif** | Gestion d’incidents flotte : scan QR / plaque → fiche camion → signalement dégâts ou « rien à signaler » ; vue admin/manager |
| **Statut** | **MVP actif** (flux `home/create` encore placeholder) |

#### Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind 4, App Router |
| Backend | Next.js Server Actions, Supabase |
| DB | PostgreSQL (Supabase), migrations versionnées, **RLS** |
| Auth | Supabase Auth, rôles `admin` \| `manager` \| conducteur |
| Infra | Vercel (probable), pas de config deploy dans le repo |
| Animation | GSAP |
| Outils clés | next-intl (fr/nl/en), Zod 4, react-hook-form, `@zxing/browser` (QR), Vitest (~30 tests), Husky |

#### Ce qui est intéressant

- **Contraintes terrain** : usage mobile, scan caméra, saisie plaque, normalisation données
- **Challenges** : RLS multi-rôles, validation Zod aux frontières, architecture feature/controller/view
- **Décisions** : i18n via cookie sans segment `/fr` dans l’URL ; pattern features scalable (~267 fichiers TS)
- **UX complexe** : flow scan → fiche → signalement ; dashboard flotte
- **Architecture** : `doc/PRODUIT-FLEET-QR.md`, `doc/ROADMAP-MVP.md` — vision produit en avance sur certaines implémentations (Realtime, TanStack Query documentés mais pas encore dans les deps)

#### Assets à récupérer

| Type | État dans le repo | Action |
|------|-------------------|--------|
| Screenshots desktop/mobile | ❌ Aucun | Capturer staging/prod |
| Vidéo démo scan + dashboard | ❌ | Enregistrer 45–60 s |
| Docs | ✅ `doc/PRODUIT-FLEET-QR.md`, `doc/ROADMAP-MVP.md` | Réutiliser pour case study |
| Figma / wireframes | ❌ | Optionnel |
| SQL / schéma | ✅ `supabase/migrations/` | Diagramme architecture pour portfolio |

#### Force portfolio

> Réflexion produit + système + exécution. Le projet le plus **crédible** pour un profil frontend-first fullstack.

---

### 2. Shadow (Shade / Ghost Riders) — `shadow`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom affiché** | Shade / Shadow |
| **Dossier** | `mes-apps/shadow` |
| **Repo** | `Estime10/shadow` |
| **Année** | 2026 |
| **Type** | Application web privée fullstack + PWA |
| **Objectif** | Messagerie (messages éphémères 24h), conversations directes/groupe, calendrier partagé, notifications, installable |
| **Statut** | **MVP avancé** (audit pré-deploy, quelques gaps CSP / error boundaries) |

#### Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16, React 19, Tailwind 4, Framer Motion |
| Backend | Server Actions, middleware Supabase SSR |
| DB | Supabase PostgreSQL — users, messages, events, conversations, groups, reads, storage |
| Auth | Supabase Auth (`@supabase/ssr`) |
| Infra | PWA (`next-pwa`), CSP, rate limit auth mémoire |
| Animation | Framer Motion + reduced motion |
| Outils clés | SWR, Zod 4, Vitest, Playwright (5 E2E), bundle analyzer, 14 migrations SQL |

#### Ce qui est intéressant

- **Contraintes** : app privée, sécurité RLS (piège documenté `004_conversations.sql`)
- **Challenges** : realtime badges/threads, médias, disparition messages, PWA + middleware SW
- **Décisions** : architecture `features/` + CRUD modulaire `lib/supabase/CRUD/`
- **UX** : messagerie groupe, calendrier, onboarding auth
- **Docs** : `docs/ARCHITECTURE.md`, `DOCUMENTATION.md`, `AUDIT-PRE-DEPLOY.md`, `SECURITE.md`, analyses perf/maintenabilité

#### Assets à récupérer

| Type | État | Action |
|------|------|--------|
| Screenshots | ❌ | UI messagerie + calendrier + mobile PWA |
| Vidéo | ❌ | Flow login → conversation → event |
| PWA icons | ✅ `public/favicon-*` | Réutiliser |
| Docs | ✅ `docs/*`, `supabase/` | Extraire schéma + extraits sécurité |
| Figma | ❌ | — |

#### Force portfolio

> Preuve **fullstack sérieux** : données, realtime, sécurité, tests E2E. Moins « beau showcase » que Jikowood/folio — à compenser par captures soignées.

---

### 3. Jikowood refonte — `jikowood_refonte`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | JIKOWOOD |
| **Dossier** | `mes-apps/jikowood_refonte` |
| **Repo** | `Estime10/jikowood_refonte` |
| **Année** | 2026 |
| **Type** | Refonte site vitrine premium (artisan menuisier) |
| **Objectif** | Vitrine haut de gamme : galerie projets, services, avis, contact |
| **Statut** | **Quasi livrable** — formulaire contact **UI only** (succès local sans envoi) |

#### Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16, React 19, Tailwind 4 |
| Backend | — |
| DB | Données statiques `lib/projects/projects-index.ts` |
| Auth | — |
| Infra | Vercel probable |
| Animation | GSAP, **Lenis** smooth scroll, `lib/motion` |
| Outils clés | Vitest + coverage, Playwright E2E, Husky, Zod 4, react-hook-form |

#### Ce qui est intéressant

- Galerie immersive : fullscreen, crossfade, navigation pure (`compute-*`)
- 5 projets indexés (~40 JPEG `public/projects/`)
- Hero « notch », i18n fr/en/nl, routes dynamiques `[slug]/[projectSlug]`
- Docs : `docs/ARCHITECTURE-CONVENTIONS.md`, `ROADMAP-ARCHITECTURE.md`

#### Assets à récupérer

| Type | État | Action |
|------|------|--------|
| Photos projets | ✅ `public/projects/{Cannes,Knokke,...}/` | Utiliser dans portfolio |
| Screenshots pages | ❌ | Desktop + mobile scroll galerie |
| Vidéo scroll Lenis | ❌ | 20–30 s hero + galerie |
| Figma | ❌ | — |

#### Force portfolio

> **Exécution premium + architecture + tests.** Case study idéal « craft frontend ».

---

### 4. portfolio_pro — ce dépôt

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | Portfolio Estime Vangu |
| **Dossier** | `creativity/portfolio_pro` |
| **Repo** | `Estime10/portfolio_pro` |
| **Année** | 2026 |
| **Type** | Portfolio product engineer (multi-pages, narratif) |
| **Objectif** | Démontrer frontend orienté produit, exécution UI, capacité à ship — anti-template Awwwards |
| **Statut** | **En cours** — Phase 1 identité livrée ; `/projects` et `/contact` = placeholders |

#### Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16, React 19, Tailwind 4, GSAP (41 modules animation) |
| Backend | — (Server Actions locale i18n uniquement) |
| DB | — |
| Auth | — |
| Infra | Vercel prévu (`.gitignore` .vercel), pas de `vercel.json` |
| Animation | GSAP exclusif (pas Framer) — splash, thème interpolé 14 CSS vars, nav panneaux, contact strip |
| Outils clés | next-intl (cookie, sans préfixe URL), ESLint strict (no any), Husky, Instrument Sans + IBM Plex Mono |

#### Ce qui est intéressant

- **Meta-produit** : `doc/porfolio-strategy.md` phases 1–7 avant contenu projets
- Splash `/` ≠ `/home` — parcours cinématique
- Profil structuré 6 sections (`mapProfileContent`, chips vs list)
- Nav desktop leading/trailing animée ; thème dark/light via GSAP sur tokens
- Design system strict (`globals.css`, pas de couleurs ad hoc)

#### Assets à récupérer

| Type | État | Action |
|------|------|--------|
| Portrait | ✅ `public/image/myself.webp` | Hero |
| Favicon | ✅ généré `app/icon.tsx` | — |
| Screenshots shell | ❌ | Capturer splash, home, profile, nav |
| Contact réel | ❌ placeholders `publicContact.ts` | Remplacer avant prod |

#### Force portfolio

> Pas un « projet client » mais la **preuve de méthode** : comment tu conçois un produit pour toi-même. À présenter comme case study **#0** ou section « About the build ».

---

### 5. Enna — `enna`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | Enna Consulting |
| **Dossier** | `mes-apps/enna` |
| **Repo** | `Estime10/enna` |
| **Année** | 2026 |
| **Type** | Site vitrine B2B one-pager (consulting RH) |
| **Objectif** | Talent Acquisition, D&I, marque employeur → contact qualifié |
| **Statut** | **Production** — `https://www.ennabv.be` |

#### Stack

Next.js 16, React 19, Tailwind 4, GSAP + Framer Motion, EmailJS, Zod + RHF, i18n **nl/fr/en**, Vitest (limité).

#### Ce qui est intéressant

- One-pager scroll + routes section sans reload (`OnePager.tsx`)
- SEO hreflang, OG dynamiques
- Témoignages **statiques mock** — à mentionner si case study honnête

#### Assets

- ✅ Logos, favicons, `PRESENTATION_CLIENT_SITE.md`
- ❌ Screenshots → **capturer prod enna**

#### Force portfolio

Client réel, i18n trilingue, prod. Secondaire si case studies déjà fullstack-heavy.

---

### 6. Maxwel Jones — `maxweljones`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | Maxwel Jones |
| **Dossier** | `mes-apps/maxweljones` |
| **Repo** | `Estime10/maxweljones` |
| **Année** | 2025–2026 |
| **Type** | Site corporate one-page (holding) |
| **Objectif** | Holding, piliers Learn–Earn–Return, réseau consultants, contact |
| **Statut** | **Production** — `https://www.maxweljones.com` ; booking « Coming Soon 2027 » |

#### Stack

Next.js 15, React 19, Tailwind 4, GSAP, Web3Forms, i18n FR/EN (context, pas next-intl utilisé), ~186 fichiers TS.

#### Ce qui est intéressant

- `docs/ARCHITECTURE_ANALYSIS.md` (DRY/SOLID)
- Network Slide + annuaire membres
- Calendrier UI sans backend booking

#### Assets

- ✅ Images `public/images/`, OG dynamique
- ❌ Screenshots prod

#### Force portfolio

Secondaire fort en **polish front + structure** ; moins différenciant techniquement que FleetScan/Shadow.

---

### 7. PhotoVibes — `folio_photo_vbs`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | Portfolio photo (PhotoVibes / Shana) |
| **Dossier** | `mes-apps/folio_photo_vbs` |
| **Repo** | `Estime10/folio_photo_vbs` |
| **Année** | 2026 |
| **Type** | Portfolio photographique immersif |
| **Objectif** | Mettre en valeur travaux photo par catégories + Story / Gallery / Contact |
| **Statut** | Fonctionnel local — contact `contact@example.com` placeholder |

#### Stack

Next.js 16, GSAP + Framer Motion, i18n fr/en/nl, ~62 images `public/images/`, masonry, lightbox, blur-card modal, seeded shuffle.

#### Assets

- ✅ **~62 photos** locales (basketball, brand, fitness, lifestyle, profile)
- ❌ Screenshots UI, pas de tests

#### Force portfolio

**Visuel / motion** — carte secondaire courte avec galerie animée ; pas case study technique principale.

---

### 8. Purpose Sport — `purpose_sport_latest`

#### Informations générales

| Champ | Valeur |
|-------|--------|
| **Nom** | Purpose Sport |
| **Dossier** | `mes-apps/purpose_sport_latest` |
| **Repo** | `Estime10/purpose_sport_latest` |
| **Année** | 2025 (release 1.0.0 déc. 2025) |
| **Type** | Vitrine agence management sportif (basket) |
| **Objectif** | 12 joueurs, fiches, vidéos, contact |
| **Statut** | **Release 1.0.0** — `https://purpose-sport.com` |

#### Stack

Next.js 15, Framer Motion, i18next, react-player, Web3Forms, Vercel Analytics, Jest (6 tests), `data/data.ts` ~1000 lignes.

#### Assets

- ✅ Vidéos joueurs `public/players/videos/`, images joueurs
- ⚠️ `og-image.jpg`, `sans_bg.png` absents en local (présents en prod)
- README template — ignorer, rédiger depuis ce doc

#### Force portfolio

Secondaire — contenu riche secteur sport ; stack plus classique.

---

## Checklist assets globale (à produire une fois)

Pour chaque projet **principal**, viser :

- [ ] 3–5 screenshots desktop (hero, feature clé, détail UX)
- [ ] 2–3 screenshots mobile
- [ ] 1 vidéo 30–60 s (Loom ou MP4)
- [ ] 1 schéma architecture (Excalidraw / FigJam) — surtout FleetScan + Shadow
- [ ] Copy : Problème · Rôle · Stack · Décisions · Résultat (5 bullets max)

Stockage suggéré :  
`portfolio_pro/public/projects/{slug}/` ou `content/projects/` (à créer phase 5).

---

## Prochaines étapes (workflow)

1. ~~**Valider la sélection**~~ — FleetScan, Shadow, Jikowood, portfolio_pro (principaux).
2. **Capturer les assets** — screenshots + vidéos (priorité FleetScan, Shadow, Jikowood).
3. ~~**Rédiger case studies**~~ — `doc/case-studies/*.md` + contenu i18n `ProjectsScreen`.
4. ~~**Mapper vers i18n**~~ — `i18n/messages/projects-screen.{fr,en}.json` fusionnés dans `fr.json` / `en.json`.
5. ~~**Implémenter `/projects`**~~ — liste + `/projects/[slug]` pour les 4 principaux.
6. **Section experiments** — optionnel, extraits GSAP du portfolio uniquement.
7. **Images projet** — `public/projects/{slug}/` quand captures prêtes.

---

## Annexe — Chemins utiles

```
mes-apps/
├── scratch_tracker/     → doc/PRODUIT-FLEET-QR.md, doc/ROADMAP-MVP.md
├── shadow/              → docs/*.md, supabase/
├── jikowood_refonte/    → docs/ARCHITECTURE-CONVENTIONS.md
├── enna/                → PRESENTATION_CLIENT_SITE.md
├── maxweljones/         → docs/ARCHITECTURE_ANALYSIS.md
├── folio_photo_vbs/     → public/images/
└── purpose_sport_latest/→ data/data.ts, public/players/

portfolio_pro/
├── doc/porfolio-strategy.md
├── doc/phase-1-identity.md
└── doc/portfolio-projects-inventory.md   ← ce fichier
```

---

*Ce document est la source de vérité jusqu’à intégration dans l’app. Mettre à jour après chaque capture d’assets ou changement de statut projet.*
