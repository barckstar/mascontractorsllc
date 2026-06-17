# CLAUDE.md

Guía rápida para retomar este proyecto (ej. tras formatear la PC).

## Qué es

Sitio web de **MAS Contractors LLC**, contratista general en Richmond, VA. Next.js 14 (App Router) + Tailwind + Framer Motion. Enfoque fuerte en SEO local.

- Repo: `git@github.com:barckstar/mascontractorsllc.git`
- Dominio: `mascontractors.com` (redirect de `www` → no-www configurado en `next.config.js`)
- Deploy: Vercel (usa `@vercel/speed-insights`, no hay carpeta `.vercel` ni `vercel.json` versionados — el proyecto está linkeado en el dashboard de Vercel, no localmente)

## Comandos

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run start
npm run lint
node scripts/optimize-images.js   # opcional, re-comprime imágenes en public/gallery (in-place, sin backup automático)
```

No hay test runner configurado.

## Variables de entorno

Copiar `.env.example` → `.env.local`. Son `NEXT_PUBLIC_*` porque las usa el Client Component `contact.jsx`:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
```

En producción estas keys están en las Environment Variables de Vercel.

## Estructura

```
src/
  app/                    # App Router
    page.jsx              # Home
    about/, contact/, gallery/, services/, blog/
    services/[slug]/      # páginas dinámicas por servicio
    blog/[slug]/          # páginas dinámicas por post
    layout.js             # metadata raíz, fonts, JSON-LD, Navbar/Footer/SpeedInsights
    robots.js, sitemap.js
    not-found.js           # redirige todo 404 a Home

  components/             # *Content.jsx = lógica/vista de cada página, el resto son piezas reutilizables (navbar, footer, contact form, FAQ, etc.)

  lib/                    # contenido como datos, separado del código
    data.json             # textos generales (navbar, home cards, etc.)
    servicesData.js        # contenido de /services
    blogData.js             # posts del blog
    galleryData.js          # ⚠️ fuente real de la galería (ver nota abajo)
    gallery.json             # generado/derivado, no editar a mano

public/
  gallery/                # imágenes de la galería
  llms.txt                # archivo de SEO para AI crawlers (AI-friendliness)
```

## Notas importantes / discrepancias conocidas

- **El README menciona `npm run generate-gallery` y que el build lo corre automáticamente.** Eso no existe en el código actual: no hay tal script en `package.json` ni archivo `scripts/generate-gallery.js`. La galería real se mantiene a mano en `src/lib/galleryData.js` (cada entrada tiene `src, width, height, alt, category, project?, featured?`). El comentario en ese archivo es la fuente de verdad: *"To add a new image: drop the file in /public/gallery/ and add an entry here."* Si vas a tocar el flujo de galería, revisa esto primero — el README está desactualizado en este punto.
- `scripts/optimize-images.js` sí existe y es manual (`node scripts/optimize-images.js`), reemplaza las imágenes in-place — no hay backup automático.
- Alt text de imágenes sigue el patrón **"Qué + Dónde"** (ej. "Kitchen Remodeling in Richmond VA") para SEO local.
- `next.config.js` tiene varios redirects 301 heredados de URLs viejas (Search Console / Cloudflare email protection / rutas `/specialties/*` y `/projects/*`) — no borrar sin revisar Search Console primero.

## SEO

- Metadata API por página (`export const metadata` en cada `page.jsx`).
- JSON-LD: `LocalBusiness` (home) y `FAQPage` (services).
- Jerarquía estricta H1 → H2 → H3.
- `public/llms.txt` para AI-friendliness/crawlers de LLM.

## Stack

Next.js 14, React 18, Tailwind, Framer Motion, EmailJS (formulario de contacto), Google ReCAPTCHA v2, react-icons, lightgallery, sharp (solo para el script de optimización).
