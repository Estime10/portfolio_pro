# portfolio_pro

Portfolio Next.js d’Estime Vangu — App Router, i18n (fr/en), animations GSAP, formulaire contact (EmailJS).

## Prérequis

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+

## Installation

```bash
pnpm install
cp .env.example .env.local
```

Renseigner les variables EmailJS dans `.env.local` (voir [EmailJS](https://www.emailjs.com/)) :

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Clé publique |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID du service |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID du template |

Autoriser `localhost` et le domaine de production dans **EmailJS → Account → Security**.

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build production |
| `pnpm start` | Serveur production |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Vérification TypeScript |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm test:watch` | Tests en mode watch |
| `pnpm test:coverage` | Tests + couverture |

## Structure

```
app/           # Routes App Router
features/      # Logique métier par domaine (contact, projects, profile…)
components/    # UI réutilisable
lib/           # Code transverse (animation, i18n, config…)
i18n/messages/ # Traductions fr / en
__tests__/     # Tests unitaires (Vitest)
```

## Tests

Les tests unitaires vivent dans **`__tests__/`** (structure miroir de `features/` et `lib/`). Les fixtures partagées sont dans `__tests__/fixtures/`.

Priorité : logique métier pure (validation contact, config EmailJS, coordonnées publiques). Pas de couverture UI / GSAP en phase 1.

```bash
pnpm test
```

## Déploiement

Build standard Next.js (Vercel ou équivalent). Définir les trois variables `NEXT_PUBLIC_EMAILJS_*` dans l’environnement d’hébergement.

## Documentation contenu

- `doc/portfolio-projects-inventory.md` — inventaire des projets
- `doc/case-studies/` — notes case studies
- `features/contact/email/contact-form-email-template.html` — modèle EmailJS
