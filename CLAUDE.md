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

No hay test runner configurado. La verificación real es `npm run build` (debe generar 70 páginas estáticas —32 por idioma más robots, sitemap y 404— sin error; antes corre `scripts/check-i18n.mjs`) más revisión visual en el navegador.

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
  app/
    layout.js             # ÚNICO layout raíz: <html lang> sale del primer segmento de la URL (LangHtml)
    (en)/                 # páginas en inglés, en sus URL de siempre (/about, /services/…)
      layout.js           # SiteLayout en inglés: diccionario, navbar, footer, JSON-LD
      page.jsx, about/, contact/, gallery/, services/[slug]/, blog/[slug]/
      [...rest]/page.js   # URL inexistentes → not-found.js dentro del layout inglés
      not-found.js
    es/                   # la misma estructura, en español (/es/about, /es/services/…)
    review/route.js       # /review → cuadro de "escribir reseña" de Google
    robots.js, sitemap.js # el sitemap lleva las dos versiones de cada página con hreflang

  views/                  # cada página escrita UNA vez: home.jsx, about.jsx, service.jsx…
                          # leen params.lang; los page.jsx de (en)/ y es/ son envoltorios
                          # de 3 líneas que fijan el idioma con bind() (i18n/bind.js)
  i18n/
    config.js             # LOCALES, localePath(), stripLocale(), alternatesFor()
    dictionaries/en.json  # textos de interfaz + metadatos SEO (meta.*)
    dictionaries/es.json
    I18nProvider.jsx      # useI18n() → { t, lang, href }
    metadata.js           # pageMetadata(): title, description, canonical, hreflang, OG
    bind.js
  content/
    en/services.json, en/blog.json   # contenido largo, un archivo por idioma
    es/services.json, es/blog.json
    gallery.json          # estructura compartida; alt: { en, es } por foto
    social.json           # redes (no se traduce)
    index.js              # getServices(lang), getPosts(lang), getGallery(lang)…

  components/             # *Content.jsx = vista de cada página; leen textos con useI18n()
  lib/                    # googleReviews.js, reviewsSnapshot.js

scripts/check-i18n.mjs    # corre en prebuild; rompe el build si falta una traducción
public/llms.txt
```

## Idiomas (inglés + español)

- **El inglés conserva sus URL de siempre** (`/about`, `/services/roofing`) para no
  perder posicionamiento. El español vive bajo `/es/...` con los **mismos slugs**.
  Las URL coinciden con las carpetas (`app/(en)/`, `app/es/`): **no hay rewrites**.
  `/en/...` redirige con 301 a `/...`.
- **Cambiar de idioma no recarga la página.** Los dos idiomas cuelgan del mismo
  layout raíz, así que Next navega en el cliente y solo baja el contenido y el
  diccionario de la página nueva. No partir el layout raíz por idioma: Next hace
  una carga completa al cruzar entre layouts raíz distintos.
- **Historia, para no repetirla:** hubo una versión con `app/[lang]` y un rewrite
  de las URL sin prefijo a `/en/...`. Next 16 predice la ruta en el cliente sin
  conocer los rewrites, interpretaba `/about` como `[lang]=about` y cada prefetch
  de un enlace en inglés daba 404. Con `proxy.js` pasaba lo mismo.
- **No poner un `app/not-found.js` raíz que envuelva el layout del sitio**: Next lo
  incluye en el payload de TODAS las páginas y metía el diccionario inglés entero
  en cada página en español. Los 404 van por `[...rest]` dentro de cada idioma.
- **Agregar un idioma**: añadirlo a `LOCALES` en `i18n/config.js`, crear
  `dictionaries/<lang>.json` y `content/<lang>/*.json`, los `alt` de la galería, y
  copiar `app/es/` a `app/<lang>/` cambiando el idioma de cada `bind()`.
  `npm run build` lista todo lo que falta.
- **`scripts/check-i18n.mjs`** exige las mismas claves y longitudes de arrays que
  el inglés, y que los campos que son identificadores (`slug`, `url`, `id`, `img`,
  `image`, `link`, `categoryId`, `publishDate`…) sean **idénticos** al inglés.
  `I18N_VERBOSE=1 npm run check-i18n` lista los textos que siguen igual que en inglés.
- **Enlaces internos**: siempre `href(path)` de `useI18n()`, nunca `"/contact"` a
  secas. En el contenido JSON (`cta.link` del blog) los enlaces van **sin** prefijo;
  el componente les pone el del idioma.
- El formulario de contacto manda `user_language` oculto y los **valores** de los
  servicios en inglés (`id`), para que la oficina reciba siempre lo mismo. Hay que
  agregar `{{user_language}}` a la plantilla de EmailJS para verlo.
- Los títulos en español usan `hyphens: auto` (globals.css): las palabras largas en
  la tipografía ancha se salían de la pantalla en móvil.

## Notas importantes / discrepancias conocidas

- **El README menciona `npm run generate-gallery` y que el build lo corre automáticamente.** Eso no existe: la galería se mantiene a mano en `src/content/gallery.json` (cada entrada: `src, width, height, alt: { en, es }, category, project?, featured?`). Para agregar una foto: dejarla en `public/gallery/` y añadir la entrada con el `alt` en los dos idiomas. `category` es una clave en inglés; su etiqueta visible sale de `galleryPage.categories` en cada diccionario. El README está desactualizado en este punto.
- `scripts/optimize-images.js` sí existe y es manual (`node scripts/optimize-images.js`), reemplaza las imágenes in-place — no hay backup automático.
- `next.config.js` tiene varios redirects 301 heredados de URLs viejas (Search Console / Cloudflare email protection / rutas `/specialties/*` y `/projects/*`) — no borrar sin revisar Search Console primero. Que Google reporte esas URLs como "Página con redirección" es el comportamiento **correcto y permanente**, no un bug que haya que arreglar.
- **Bloque de certificaciones duplicado.** `components/Certifications.jsx` (lo usa la home) y `components/AboutPageContent.jsx` (copia inline) tienen el mismo bloque de badges DPOR / OSHA / sello BBB. Los textos ya salen de la misma sección del diccionario (`certifications`), pero el marcado sigue duplicado: cambiar un badge obliga a tocar **los dos archivos**.
- El dominio pasa por un **proxy (Cloudflare) delante de Vercel**, que lo marca con "Proxy Detected". Rompe la mitigación de DDoS/bots de Vercel y degrada rendimiento. La huella está en el redirect de `/cdn-cgi/l/email-protection` del `next.config.js`. Se arregla poniendo los registros DNS de `@` y `www` en "DNS only" (nube gris).

## SEO

- Metadata API por página (`export const metadata` en cada `page.jsx`).
- Jerarquía estricta H1 → H2 → H3.
- `public/llms.txt` para AI-friendliness/crawlers de LLM.
- Alt text de imágenes: patrón **"Qué + Dónde"** (ej. "Kitchen Remodeling in Richmond VA").

### JSON-LD (está repartido en varios archivos, no solo en layout)

| Archivo | Schemas |
|---|---|
| `app/[lang]/layout.js` | `["GeneralContractor","LocalBusiness"]` raíz — con `OfferCatalog`/`Service`, `OpeningHoursSpecification`, `PostalAddress`, `GeoCoordinates`, `areaServed` |
| `app/[lang]/services/[slug]/page.jsx` | `GeneralContractor`, `Service`, `FAQPage`, `BreadcrumbList`, `Offer` |
| `app/[lang]/blog/[slug]/page.jsx` | `BlogPosting`, `BreadcrumbList`, `WebPage`, `Organization`, `ImageObject` |
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
