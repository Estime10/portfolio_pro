# Portfolio Pro — Estime Vangu

Dépôt **open source** du site portfolio personnel d’[Estime Vangu](https://www.linkedin.com/in/estime-vangu/) — **frontend & product engineer** (profil frontend-first, fullstack mesuré).

Ce projet n’est pas une landing générique : c’est une **application Next.js structurée** qui présente une sélection de réalisations (apps métier, vitrines premium, produits en cours), une **narration produit** et un **parcours contact** abouti. Le code est public pour montrer la **méthode**, l’**architecture** et la **qualité d’exécution** — le même niveau que ce que le site affiche côté recruteurs et clients.

---

## Ce que fait le site

| Parcours | Route | Description |
|----------|-------|-------------|
| **Splash** | `/` | Entrée brandée vers l’expérience principale |
| **Accueil** | `/home` | Hero, positionnement, CTA projets & contact |
| **Profil** | `/profile` | Parcours, compétences, sections narratives |
| **Projets** | `/projects` | Catalogue (mis en avant + secondaires) |
| **Étude de cas** | `/projects/[slug]` | Case study détaillée (FleetScan, Shadow, Jikowood, ce portfolio…) |
| **Contact** | `/contact` | Intentions métier, wizard progressif ou canaux directs |

**Fonctionnalités transverses :**

- **i18n** français / anglais (`next-intl`)
- **Thème** clair / sombre avec transition animée (GSAP, `prefers-reduced-motion`)
- **Navigation** desktop & mobile avec animations de panneaux
- **Formulaire contact** par intention (site vitrine, app métier, refonte produit, contact général)
- **Envoi e-mail** via [EmailJS](https://www.emailjs.com/) (clés publiques côté client — voir [Sécurité & limites](#sécurité--limites))
- **Bandeau contact** (LinkedIn, Instagram, e-mail, téléphone) sur l’accueil et le flux « Me contacter »

---

## Projets présentés dans le catalogue

Le contenu (copy, case studies) vit dans `i18n/messages/` et `doc/`. Le catalogue technique est dans `lib/projects/project-catalog.ts`.

**Mis en avant (case studies) :** FleetScan (`scratch_tracker`), Shadow, Jikowood, Portfolio Pro (ce dépôt).

**Secondaires (liens prod) :** Enna, Maxwel Jones, Folio Photo, Purpose Sport — voir les URLs dans le catalogue.

Inventaire détaillé et critères de sélection : [`doc/portfolio-projects-inventory.md`](doc/portfolio-projects-inventory.md).

---

## Stack technique

| Couche | Choix |
|--------|--------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| i18n | [next-intl](https://next-intl.dev/) |
| Animations | [GSAP](https://gsap.com/) |
| Contact | [@emailjs/browser](https://www.emailjs.com/) |
| Qualité | TypeScript strict, ESLint, Husky, Vitest |
| CI | GitHub Actions (lint, typecheck, tests, build) |

---

## Architecture du dépôt

Organisation **feature-based** : chaque domaine métier a son dossier sous `features/`, les pages `app/` ne font qu’orchestrer.

```
app/                 # Routes App Router (fines, sans logique métier lourde)
features/            # contact, homescreen, profile, projects, splashscreen
components/          # UI réutilisable (boutons, form, navigation, layout…)
lib/                 # animation, i18n, navigation, thème, config, projets
i18n/messages/       # Traductions fr / en
__tests__/           # Tests unitaires (structure miroir de features/ et lib/)
doc/                 # Stratégie produit, inventaire projets, case studies
```

**Conventions (résumé) :**

- Une responsabilité = un fichier dans un sous-dossier `kebab-case/`
- Les `index.ts` servent uniquement à composer / exporter
- Server Components par défaut ; `"use client"` seulement si nécessaire
- Données externes validées ; logique métier hors composants UI

Stratégie produit et phases de build : [`doc/porfolio-strategy.md`](doc/porfolio-strategy.md).

---

## Démarrage local

**Prérequis :** Node.js 20+, [pnpm](https://pnpm.io/) 9+

```bash
git clone https://github.com/Estime10/portfolio_pro.git
cd portfolio_pro
pnpm install
cp .env.example .env.local
```

Renseigner `.env.local` pour le formulaire contact (compte EmailJS gratuit ou payant) :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, Open Graph, `sitemap.xml`) — ex. `https://ton-domaine.com` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID du service e-mail |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID du template (voir `features/contact/email/contact-form-email-template.html`) |

Dans EmailJS → **Account → Security**, autoriser `http://localhost:3000` et le domaine de production.

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Déploiement Vercel

1. Importer le dépôt [Estime10/portfolio_pro](https://github.com/Estime10/portfolio_pro) sur [vercel.com](https://vercel.com) (GitHub → **Add New Project**).
2. Laisser le preset **Next.js** ; `vercel.json` force `pnpm install` + `pnpm run build`.
3. **Settings → Environment Variables** → ajouter pour **Production** (et Preview si tu testes le formulaire) :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Clé EmailJS |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Service EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Template EmailJS |
| `NEXT_PUBLIC_SITE_URL` | **Optionnel** sur `*.vercel.app` si les variables système sont activées (étape 4). **Obligatoire** avec un domaine personnalisé — ex. `https://www.ton-domaine.com` (sans slash final) |

4. **Settings → Environment Variables** → cocher **Automatically expose System Environment Variables** (ou équivalent). Le build utilisera alors `VERCEL_PROJECT_PRODUCTION_URL` pour le sitemap, les canonical et l’image Open Graph.
5. **Deploy**. Après le premier déploiement, noter l’URL prod (`https://…vercel.app`) et l’ajouter dans EmailJS → **Account → Security** (allowed origins), avec `http://localhost:3000`.
6. Si tu branches un **domaine perso** sur Vercel, définir `NEXT_PUBLIC_SITE_URL` sur ce domaine en **Production**, puis redéployer.

Vérifications post-déploiement : `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, et un partage test (LinkedIn Post Inspector, iMessage, etc.).

---

## Scripts

| Commande | Usage |
|----------|--------|
| `pnpm dev` | Développement |
| `pnpm build` | Build production |
| `pnpm start` | Serveur après build |
| `pnpm lint` | ESLint (0 warning) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm test:watch` | Tests en watch |
| `pnpm test:coverage` | Couverture (zones contact / config) |

Le hook **Husky** (pre-commit) exécute lint-staged + typecheck. La **CI** (`.github/workflows/ci.yml`) rejoue lint, typecheck, tests et build sur `main` et `develop`.

---

## Tests

Les tests sont dans **`__tests__/`** (pas colocalisés au code source). Les fixtures partagées : `__tests__/fixtures/`.

**Périmètre actuel (phase 1) :** logique métier pure — validation du formulaire contact, machine à états du wizard, config EmailJS, coordonnées publiques. Pas de tests E2E ni de snapshots GSAP pour l’instant.

```bash
pnpm test
```

---

## Sécurité & limites

- Les clés EmailJS sont des variables `NEXT_PUBLIC_*` : **visibles dans le bundle client**. C’est le modèle EmailJS « browser SDK » ; pour un anti-spam fort, une future évolution passerait par une **Route Handler** Next.js + rate limiting.
- Les coordonnées publiques (e-mail, téléphone, réseaux) sont dans `lib/constants/publicContact.ts` — volontairement versionnées pour un portfolio.
- Ne pas committer `.env.local` (déjà ignoré par git).

---

## Documentation interne

| Fichier | Contenu |
|---------|---------|
| [`doc/porfolio-strategy.md`](doc/porfolio-strategy.md) | Vision, identité, direction artistique, phases |
| [`doc/portfolio-projects-inventory.md`](doc/portfolio-projects-inventory.md) | Inventaire des 8 projets, tiers, assets |
| [`doc/case-studies/`](doc/case-studies/) | Notes et brouillons case studies |
| [`features/contact/email/contact-form-email-template.html`](features/contact/email/contact-form-email-template.html) | HTML à coller dans le template EmailJS |

---

## État du projet

- **Shell navigation, projets, profil, contact** : en place sur `develop`
- **Case studies** : FleetScan, Shadow, Jikowood, Portfolio Pro
- **Déploiement prod** : Vercel (voir section ci-dessus) + variables EmailJS
- **SEO** : `metadataBase`, Open Graph / Twitter, `sitemap.xml`, `robots.txt`, image `opengraph-image`
- **Pistes** : API contact serveur, tests E2E Playwright, locale `nl` (mentionnée dans certains contenus, non implémentée)

---

## Auteur & contact

**Estime Vangu** — Frontend & Product Engineer

- LinkedIn : [linkedin.com/in/estime-vangu](https://www.linkedin.com/in/estime-vangu/)
- E-mail : [estimevangu.pro@gmail.com](mailto:estimevangu.pro@gmail.com)
- Instagram : [@10davinchatcode](https://www.instagram.com/10davinchatcode/)

Les issues et suggestions sur ce dépôt sont les bienvenues si tu explores le code dans un cadre pro ou open source.

---

## Licence

Projet personnel — code visible à titre de démonstration. Toute réutilisation substantielle du code ou du design doit faire l’objet d’un accord préalable avec l’auteur.
