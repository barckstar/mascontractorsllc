# CLAUDE.md

Guía rápida para retomar este proyecto (ej. tras formatear la PC).

## Qué es

Sitio web de **MAS Contractors LLC**, contratista general en Richmond, VA. Next.js 16 (App Router) + React 19 + Tailwind + Framer Motion. Enfoque fuerte en SEO local.

- Repo: `git@github.com:barckstar/mascontractorsllc.git`
- Dominio: `mascontractors.com` (redirect de `www` → no-www configurado en `next.config.js`)
- Deploy: Vercel (usa `@vercel/speed-insights`, no hay carpeta `.vercel` versionada — el proyecto está linkeado en el dashboard de Vercel; `vercel.json` solo define el cron del chequeo diario)

## Comandos

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run start
node scripts/optimize-images.js   # opcional, re-comprime imágenes en public/gallery (in-place, sin backup automático)
```

⚠️ **`npm run lint` está roto.** El script sigue siendo `next lint`, pero Next 16 eliminó ese subcomando: ahora interpreta `lint` como un directorio y falla con *"Invalid project directory provided, no such directory: .../lint"*. Para arreglarlo hay que migrar a la CLI de ESLint directamente (`eslint .`) con un `eslint.config.mjs` (flat config).

`npm test` corre `tests/*.test.mjs` con el runner nativo de Node (hoy cubren `/api/contact` y `/api/cron/contact-check`). Se corren en local antes de cada push; no hay CI en GitHub. Además `npm run build` (debe generar todas las páginas estáticas sin error —143 hoy, y crece con cada post—; antes corre `scripts/check-i18n.mjs`) más revisión visual en el navegador.

## Variables de entorno

Copiar `.env.example` → `.env.local`. El formulario de contacto usa **Cloudflare
Turnstile** en el cliente (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) y manda el POST a
`app/api/contact/route.js`, que valida el token (`TURNSTILE_SECRET_KEY`) y envía
por la API REST de EmailJS. Reutiliza `NEXT_PUBLIC_EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY`
(ya definidas en Vercel; `EMAILJS_*` con el mismo nombre las sobrescriben) y añade una
clave **solo de servidor**: `EMAILJS_PRIVATE_KEY`. En EmailJS hay
que activar *Allow EmailJS API for non-browser applications* (Account → Security).
En producción están en las Environment Variables de Vercel.

**Chequeo diario:** `vercel.json` programa un Vercel Cron (13:17 UTC) que llama a
`app/api/cron/contact-check/route.js`. Vercel manda `Authorization: Bearer $CRON_SECRET`
(define `CRON_SECRET` en Vercel). La ruta valida que la clave de Turnstile sea buena y
que EmailJS acepte las credenciales (cuenta con acceso desde servidor, Public/Private Key,
Service ID) **sin enviar ningún correo**: pide enviar con un template inexistente y espera
"template ID not found"; cualquier otra respuesta es fallo. Así la oficina/cliente nunca
recibe correos de prueba. Si algo falla responde 500 y avisa a `ALERT_WEBHOOK_URL` (opcional,
solo para el dueño del sitio: p. ej. un tema privado de ntfy.sh, Slack o Discord); si todo
está bien, silencio (con `ALERT_NOTIFY_SUCCESS=1` también avisa cuando sale bien, útil los primeros días; las URL de ntfy.sh reciben texto plano con título). Límite: no detecta que el servicio de correo de EmailJS (Gmail) esté
desconectado, porque eso solo se ve al enviar de verdad. Solo corre en el deploy de producción.
La lógica compartida con `/api/contact` está en `lib/contactMail.js`.

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
- **El layout solo manda al cliente `common`, `nav`, `footer`, `site` y `notFound`.**
  Cada vista envuelve su componente en `<PageSections lang names={[...]}>`
  (`i18n/PageSections.jsx`) con las secciones del diccionario que ese componente
  —y los que importa— leen con `useI18n()`. **Si un componente lee una sección que
  no está en `names`, la página revienta al prerenderizar** (`npm run build` lo
  detecta). Al usar un texto nuevo en otra página, añade su sección a esa vista.
- **No pasar posts/servicios completos a componentes cliente**: usar
  `getPostSummaries()` / `getServiceSummaries()` (sin `content`, `faq`, etc.);
  si no, todo el artículo viaja en el payload RSC de la página.
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

## Rendimiento (Lighthouse móvil)

Medir **en local** (`npm run build && npm run start`, Lighthouse con `CHROME_PATH`
al Chromium), con calentamiento y mediana de 3: entre corridas varía ±5–10 puntos.
No hacer pushes solo para medir: cada push a una rama despliega un preview en Vercel.

- No envolver el contenido de una página con `next/dynamic` + spinner: el hero
  llega por streaming y solo se muestra cuando corre el script de React (retrasa FCP y LCP).
- Las imágenes decorativas del hero que acaban siendo el LCP llevan `priority`.
- `GalleryContent`: lightgallery saca las miniaturas del `src` del `<img>` de Next
  (variante de 3840px). Por eso cada enlace lleva `data-thumb` a 256px y el
  componente `exThumbImage="data-thumb"`.
- Las fuentes del hero se precargan en `LangHtml.jsx`.

## Notas importantes / discrepancias conocidas

- **El README menciona `npm run generate-gallery` y que el build lo corre automáticamente.** Eso no existe: la galería se mantiene a mano en `src/content/gallery.json` (cada entrada: `src, width, height, alt: { en, es }, category, project?, featured?`). Para agregar una foto: dejarla en `public/gallery/` y añadir la entrada con el `alt` en los dos idiomas. `category` es una clave en inglés; su etiqueta visible sale de `galleryPage.categories` en cada diccionario. El README está desactualizado en este punto.
- `scripts/optimize-images.js` sí existe y es manual (`node scripts/optimize-images.js`), reemplaza las imágenes in-place — no hay backup automático.
- `next.config.js` tiene varios redirects 301 heredados de URLs viejas (Search Console / Cloudflare email protection / rutas `/specialties/*` y `/projects/*`) — no borrar sin revisar Search Console primero. Que Google reporte esas URLs como "Página con redirección" es el comportamiento **correcto y permanente**, no un bug que haya que arreglar.
- **Bloque de certificaciones duplicado.** `components/Certifications.jsx` (lo usa la home) y `components/AboutPageContent.jsx` (copia inline) tienen el mismo bloque de badges DPOR / OSHA / sello BBB. Los textos ya salen de la misma sección del diccionario (`certifications`), pero el marcado sigue duplicado: cambiar un badge obliga a tocar **los dos archivos**.
- El dominio pasa por un **proxy (Cloudflare) delante de Vercel**, que lo marca con "Proxy Detected". Rompe la mitigación de DDoS/bots de Vercel y degrada rendimiento. La huella está en el redirect de `/cdn-cgi/l/email-protection` del `next.config.js`. Se arregla poniendo los registros DNS de `@` y `www` en "DNS only" (nube gris).

## Regla de contenido: verificar hechos y citar fuentes (obligatoria)

Aplica a **todo** texto con datos externos: posts, páginas de servicio, FAQ del diccionario, `llms.txt`. No queremos dar información errónea sobre permisos, códigos, licencias, impuestos ni cifras de mercado. Es una regla portable: copiar esta sección al `CLAUDE.md` de cada sitio nuevo y cambiar las fuentes locales.

1. **Nada de memoria.** Antes de escribir un dato legal, de permisos, de tarifas, de licencias o una estadística, abrir la fuente oficial y leerla. Reglas de Virginia: `law.lis.virginia.gov` (Código de Virginia y Código Administrativo, incl. el USBC en `13VAC5-63-80`). Condado: `chesterfield.gov` (páginas de Inspección de Edificios, tabla de tarifas en PDF, guía de decks). Otras jurisdicciones (Henrico, Richmond City): su sitio oficial; si no se pudo verificar, **no afirmar nada** de ellas.
2. **Si no se puede validar en la fuente, no se agrega.** Un dato externo (ley, tarifa, estadística, porcentaje de ROI, garantía, norma técnica) solo entra si se abrió y leyó la fuente original; un resumen de buscador, una nota de blog de terceros o la memoria **no cuentan**. Si ya estaba y no se puede validar, se borra. Solo las cifras propias de MAS (costos, plazos, tarifas por hora) se pueden dejar, rotuladas como experiencia de MAS (`usesCompanyData: true`). Nunca inventar rangos, porcentajes, plazos de revisión ni multas.
3. **Cada post lleva sus referencias.** Campos del post en `content/<lang>/blog.json`: `references` (`[{ name, url }]`, `url` idéntica en los dos idiomas, `name` traducido), `reviewed` (AAAA-MM-DD de la última verificación), `usesCompanyData` (cifras propias de costos/plazos) y `regulatory` (toca códigos, permisos o impuestos). El componente las muestra al final del post y `post.jsx` las publica como `citation` en el JSON-LD. Al revisar un post, actualizar `reviewed`.
4. **Un cambio de regla se propaga.** Al corregir un dato, buscarlo con `grep` en `blog.json` (en/es), `services.json` (en/es), `dictionaries/*.json` y `public/llms.txt`. Ya hubo contradicciones (p. ej. el FAQ decía que un cambio de techo requería permiso).
5. **Citar la fecha y el ámbito de cada cifra.** Tarifas del condado: llevan vigencia (hoy 7/2026–6/2027, se actualizan cada 1 de julio). Cost vs. Value lo publica Zonda Media; `costvsvalue.com`, `jlconline.com` y `remodeling.com` bloquean el acceso automático, así que solo se usan cifras leídas en un documento accesible (hoy la reimpresión del informe 2025 en `dasma.com`: puerta de entrada de acero 216 %, remodelación menor de cocina de gama media 113 %, revestimiento de fibrocemento 114 %, todas **promedio nacional**). Las cifras regionales o por ciudad no se usan hasta poder abrirlas en la fuente.
6. **Fotos de terceros:** solo dominio público/CC0/CC BY/Unsplash/Pexels, con autor y licencia revisados en la página de origen; usar el bloque `image` del post (`caption`, `credit`, `creditUrl`) para que el crédito se vea bajo la imagen.
7. **Trampas conocidas** (verificadas el 2026-10-16): las clases de licencia DPOR cambiaron en 2025 (C: >$1,000 y <$30,000; B: $30,000–<$150,000; A: ≥$150,000) según `§ 54.1-1100`; en Chesterfield **todo deck** requiere permiso (esté o no unido a la casa); cambiar techo o revestimiento por uno equivalente no requiere permiso, salvo trabajo estructural, asbesto, distritos históricos y zonas de inundación; Virginia no exige arquitecto/ingeniero para planos de viviendas de 1–2 familias de hasta 3 pisos (`§ 54.1-402`).
8. **Herramientas en sesiones de nube:** el entorno debe permitir `law.lis.virginia.gov`, `chesterfield.gov`, `commons.wikimedia.org` y `upload.wikimedia.org`. `WebFetch` puede no resolver los dominios; `curl` sí pasa por el proxy. Wikimedia limita por tasa (429): reintentar con espera.

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

## Tipografías

- **Texto: Sora** (`font-body`), licencia SIL OFL, en `public/fonts/Sora-*.woff2` con
  su licencia al lado. Solo el subconjunto Latin, que cubre todo el español.
- **Títulos: Conthrax** (`font-contrax`), de Typodermic Fonts. Pendiente de
  confirmar que su licencia cubre el uso web comercial.
- ⚠️ **No volver a AT Pinko** sin comprar su licencia comercial. El archivo que
  había era la demo «free for personal use only» de Ardyana Types: no permite uso
  comercial y no trae acentos ni ñ, así que en español cada «á» o «ñ» salía en la
  fuente del sistema, a mitad de palabra. Se detectó al traducir el sitio.

## Stack

Next.js 16, React 19, Tailwind 3, Framer Motion 12 (vía `LazyMotion` + componente `m`, ver `MotionProvider.jsx`), EmailJS vía `/api/contact` (formulario de contacto), Cloudflare Turnstile, react-icons, lightgallery, sharp.

Sobre **sharp**: `scripts/optimize-images.js` es el único que lo importa directo, pero Next también lo usa para optimizar imágenes en el build — por eso además está fijado dentro del bloque `overrides` bajo `next`.

Sobre **vulnerabilidades**: parchear siempre con `overrides` en `package.json`. Nunca aceptar la propuesta de `npm audit fix` de degradar `next` o `eslint-config-next` a una versión mayor anterior. Los avisos de Dependabot que GitHub imprime en el `git push` van retrasados — verificar con `npm audit` local antes de reaccionar.
