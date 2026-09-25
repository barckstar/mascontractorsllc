# CLAUDE.md

Guía rápida para retomar este proyecto (ej. tras formatear la PC).

## Qué es

Sitio web de **MAS Contractors LLC**, contratista general en Richmond, VA. Next.js 16 (App Router) + React 19 + Tailwind + Framer Motion. Enfoque fuerte en SEO local.

- Repo: `git@github.com:barckstar/mascontractorsllc.git`
- Dominio: `mascontractors.com` (redirect de `www` → no-www configurado en `next.config.js`)
- Deploy: Vercel (usa `@vercel/speed-insights`, no hay carpeta `.vercel` ni `vercel.json` versionados — el proyecto está linkeado en el dashboard de Vercel, no localmente)

## Comandos

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run start
node scripts/optimize-images.js   # opcional, re-comprime imágenes en public/gallery (in-place, sin backup automático)
```

⚠️ **`npm run lint` está roto.** El script sigue siendo `next lint`, pero Next 16 eliminó ese subcomando: ahora interpreta `lint` como un directorio y falla con *"Invalid project directory provided, no such directory: .../lint"*. Para arreglarlo hay que migrar a la CLI de ESLint directamente (`eslint .`) con un `eslint.config.mjs` (flat config).

No hay test runner configurado. La verificación real es `npm run build` (debe generar las 36 páginas sin error) más revisión visual en el navegador.

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
    not-found.js           # página 404 propia con links internos (NO redirige a Home)

  components/             # *Content.jsx = lógica/vista de cada página, el resto son piezas reutilizables (navbar, footer, contact form, FAQ, etc.)

  lib/                    # contenido como datos, separado del código
    data.json             # textos generales (navbar, home cards, etc.)
    servicesData.js        # contenido de /services
    blogData.js             # posts del blog
    galleryData.js          # ⚠️ fuente real de la galería (ver nota abajo)
    gallery.json             # ⚠️ archivo muerto — no se importa en ningún lado

public/
  gallery/                # imágenes de la galería
  llms.txt                # archivo de SEO para AI crawlers (AI-friendliness)
```

## Notas importantes / discrepancias conocidas

- **El README menciona `npm run generate-gallery` y que el build lo corre automáticamente.** Eso no existe en el código actual: no hay tal script en `package.json` ni archivo `scripts/generate-gallery.js`. La galería real se mantiene a mano en `src/lib/galleryData.js` (cada entrada tiene `src, width, height, alt, category, project?, featured?`). El comentario en ese archivo es la fuente de verdad: *"To add a new image: drop the file in /public/gallery/ and add an entry here."* Si vas a tocar el flujo de galería, revisa esto primero — el README está desactualizado en este punto.
- `scripts/optimize-images.js` sí existe y es manual (`node scripts/optimize-images.js`), reemplaza las imágenes in-place — no hay backup automático.
- `next.config.js` tiene varios redirects 301 heredados de URLs viejas (Search Console / Cloudflare email protection / rutas `/specialties/*` y `/projects/*`) — no borrar sin revisar Search Console primero. Que Google reporte esas URLs como "Página con redirección" es el comportamiento **correcto y permanente**, no un bug que haya que arreglar.
- **Bloque de certificaciones duplicado.** `components/Certifications.jsx` (lo usa la home) y `components/AboutPageContent.jsx` (copia inline) tienen el mismo bloque de badges DPOR / OSHA / sello BBB. Cambiar un badge obliga a tocar **los dos archivos**. Deuda técnica pendiente de unificar.
- El dominio pasa por un **proxy (Cloudflare) delante de Vercel**, que lo marca con "Proxy Detected". Rompe la mitigación de DDoS/bots de Vercel y degrada rendimiento. La huella está en el redirect de `/cdn-cgi/l/email-protection` del `next.config.js`. Se arregla poniendo los registros DNS de `@` y `www` en "DNS only" (nube gris).

## SEO

- Metadata API por página (`export const metadata` en cada `page.jsx`).
- Jerarquía estricta H1 → H2 → H3.
- `public/llms.txt` para AI-friendliness/crawlers de LLM.
- Alt text de imágenes: patrón **"Qué + Dónde"** (ej. "Kitchen Remodeling in Richmond VA").

### JSON-LD (está repartido en varios archivos, no solo en layout)

| Archivo | Schemas |
|---|---|
| `app/layout.js` | `["GeneralContractor","LocalBusiness"]` raíz — con `OfferCatalog`/`Service`, `OpeningHoursSpecification`, `PostalAddress`, `GeoCoordinates`, `areaServed` |
| `app/services/[slug]/page.jsx` | `GeneralContractor`, `Service`, `FAQPage`, `BreadcrumbList`, `Offer` |
| `app/blog/[slug]/page.jsx` | `BlogPosting`, `BreadcrumbList`, `WebPage`, `Organization`, `ImageObject` |
| `components/FAQ.jsx` | `FAQPage` — va **dentro del componente**, así que aplica donde sea que se renderice `<FAQ />` (hoy: home y services) |

**Sin `AggregateRating` ni `Review` a propósito.** Google considera
"self-serving" las reseñas que un negocio marca en su propia web sobre sí mismo
y no les da estrellas; y el 4.9/47 que había no cuadraba con Google (7 reseñas
el 25/09/2026). Las estrellas del buscador salen del Perfil de Negocio.

Al tocar schema, ojo con duplicar: `FAQ.jsx` y `services/[slug]` ambos emiten `FAQPage`.

## Reseñas de Google (en vivo)

`lib/googleReviews.js` las lee de la Places API (New) en el servidor, con
`revalidate` de 6 h. `app/page.jsx` y `app/contact/page.jsx` las piden y las
pasan como prop a los componentes cliente. Variables solo de servidor:
`GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID`. Sin ellas, o si Google falla, se
usa `lib/reviewsSnapshot.js` — números reales copiados a mano, **sin textos**:
nunca se muestran reseñas escritas por nosotros.

La API da como máximo 5 reseñas (las "más relevantes"). Para todas hace falta
la Business Profile API, con OAuth del dueño y aprobación de Google.

`/review` (`app/review/route.js`) redirige al cuadro de "escribir reseña" de
Google. Es el enlace para el QR y el mensaje de entrega de obra.

## Stack

Next.js 16, React 19, Tailwind 3, Framer Motion 12 (vía `LazyMotion` + componente `m`, ver `MotionProvider.jsx`), EmailJS (formulario de contacto), Google ReCAPTCHA v2, react-icons, lightgallery, sharp.

Sobre **sharp**: `scripts/optimize-images.js` es el único que lo importa directo, pero Next también lo usa para optimizar imágenes en el build — por eso además está fijado dentro del bloque `overrides` bajo `next`.

Sobre **vulnerabilidades**: parchear siempre con `overrides` en `package.json`. Nunca aceptar la propuesta de `npm audit fix` de degradar `next` o `eslint-config-next` a una versión mayor anterior. Los avisos de Dependabot que GitHub imprime en el `git push` van retrasados — verificar con `npm audit` local antes de reaccionar.
