# MAS Contractors LLC — Website

Website for **MAS Contractors LLC**, a general contractor in Richmond, VA. Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS 3** and **Framer Motion**, deployed on Vercel. Strong focus on local SEO. Available in English (`/`) and Spanish (`/es`).

> The working guide for this repo (structure, i18n rules, content rules, performance, workflow) is **[CLAUDE.md](CLAUDE.md)**. This README is only the quick start.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the keys (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `scripts/check-i18n.mjs` first; fails if a translation is missing) |
| `npm run start` | Serve the production build |
| `npm test` | Node's built-in test runner over `tests/*.test.mjs` (`/api/contact` and the daily cron check) |
| `npm run check-i18n` | Verify `en`/`es` dictionaries and content have the same keys |
| `npm run indexnow` | Ping IndexNow/Bing after publishing pages |

`npm run lint` is currently broken (Next 16 removed `next lint`); see CLAUDE.md.

## Project layout

```
src/
  app/        routes: (en)/ for English URLs, es/ for Spanish, api/, review/, sitemap, robots
  views/      each page written once (home, service, post…); app/ files are thin wrappers
  components/ UI; *Content.jsx is the view of each page
  content/    long-form content per language (services, blog), gallery, social, business.js
  i18n/       config, dictionaries (en.json / es.json), provider, metadata helpers
  lib/        Google reviews (Places API), contact mail helper
scripts/      check-i18n, indexnow, optimize-images
tests/        node:test suites
public/       images, fonts, llms.txt
```

Business contact data (phones, email, address) lives in **one file**: `src/content/business.js`.

## Environment variables

Copy `.env.example` to `.env.local`. In production they live in Vercel's Environment Variables.

- Contact form: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `EMAILJS_PRIVATE_KEY` and the EmailJS service/template/public ids (`NEXT_PUBLIC_EMAILJS_*`).
- Daily health check of the form: `CRON_SECRET`, optional `ALERT_WEBHOOK_URL`.
- Google reviews (optional; falls back to a snapshot): `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`.

Details of each one are in CLAUDE.md.

## Gallery

The gallery is maintained by hand in `src/content/gallery.json` (there is no generator script). Put the photo in `public/gallery/` and add an entry with `alt: { en, es }`.
