# Take The Crown (1V1 Streetball) — Étude de cas

**Repo :** `creativity/1V1_streetball` · **Package :** `one-streetball` · **Statut :** MVP prêt au ship 2026

## Problème

Digitaliser une ligue streetball 1v1 (matchs, fight nights, progression joueur) sans compromettre la fiabilité du classement.

## Approche

12 domaines métier, realtime ligue, mutations games via RPC admin, 42 migrations SQL, 250 tests Vitest + 11 E2E.

## Stack

Next.js 16.2 · Supabase · Zod 4 · next-intl · GSAP · Vitest · Playwright

## Routes clés

`/home` · `/games` · `/fight-nights` · `/standings` · `/profile` · `/dashboard` (record, drafts, spectators)

## Assets à produire

- [ ] Screenshots standings + dashboard admin
- [ ] Vidéo démo parcours joueur / organisateur
- [ ] Schéma chemin critique (record game → standings → realtime)

## Lien app

`/projects/1v1-streetball`
