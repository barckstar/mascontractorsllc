# SEO: competidores en Richmond VA y plan para subir de la posición 21.9

Fecha: 2026-11-21. Complementa `docs/plan-backlinks-trust.md` (backlinks y trust) y `docs/directorios-semana.md` (NAP/citaciones).

**Cómo se hizo:** 12 búsquedas web (general contractor Richmond, remodeling, kitchen, bathroom, additions, decks, Chesterfield, Midlothian, Henrico) y descarga de 8 sitios competidores para comparar títulos, H1/H2, palabras, schema y enlaces. Es una foto de un solo día, sin personalizar a Richmond, y **no mide el Map Pack** (el bloque de mapa de Google), que para un contratista suele pesar más que los resultados orgánicos.

## Dónde aparece hoy mascontractors.com

- **Sí aparece:** "general contractor Midlothian VA remodeling", "general contractor Chesterfield VA", "home addition contractor Richmond VA".
- **No aparece:** kitchen, bathroom, deck ni "general contractor Richmond VA" a secas.
- Los directorios se llevan la mayor parte de la primera página: **Houzz** sobre todo, luego Angi/HomeAdvisor, BBB, Thumbtack, HomeGuide y Expertise.com. Varios competidores salen *dentro* de Houzz como "Best of Houzz".

## Competidores que más salen

| Sitio | Dónde sale | Lo que hace bien |
|---|---|---|
| lhcrva.com (LHC Services) | Chesterfield, Midlothian, additions, decks | Páginas por ciudad (/midlothian-va/, /chesterfield-va/, /henrico-va/, /bon-air-va/…) y servicio+ciudad (/deck-builder-midlothian-va/, /home-addition-contractor-midlothian-va/). Páginas de servicio de 1,800–2,200 palabras con FAQ y schema FAQPage. |
| richmondhomerenovations.com (Eagle) | Midlothian, Henrico | ~35 páginas de barrio (Brandermill, Short Pump, Chester…) y servicio+ciudad. Enlaza a chesterfield.gov. **Ojo:** muchas son casi duplicadas; no copiar ese exceso. |
| classicconstructionext.com | Remodeling, baños, additions | Páginas de antes/después, reseñas, galería por servicio, canal de YouTube y perfil de Houzz enlazados. Blog al día (oct 2026). |
| qualityremodelingva.com | Remodeling, cocina, baño, Midlothian | Página de financiamiento, página de área de servicio de 4,000+ palabras, reseñas, FAQ, sub-servicios (encimeras, vanities, duchas de azulejo). Enlaza sus perfiles de Angi/HomeAdvisor/Thumbtack. |
| leolantz.com | Cocina, baño | Premio NAHB visible, páginas de prensa/medios, garantía, "cómo trabajamos", comunidad. |
| lanebuilt.com | Remodeling, cocina | **Casos de proyecto con nombre de barrio** (p. ej. porche en Glen Allen, Twin Hickory), página de equipo con nombres, página de proceso, blog al día. |
| ahgva.com | GC Richmond, additions | Página de additions de 2,000+ palabras con H2 en forma de pregunta; enlaza a henrico.gov y DPOR. |
| jamesriverremodeling.com | Remodeling, baño, Henrico | On-page flojo (sin JSON-LD ni H1). Probablemente rankea por antigüedad del dominio y perfiles en Houzz/BBB (inferido). |

## Qué hacen ellos que nosotros no (ordenado por impacto esperado)

1. **Páginas de ciudad y de servicio+ciudad.** Es la diferencia más clara: nosotros solo tenemos páginas de servicio y blog; ninguna de Midlothian, Chesterfield, Henrico, Glen Allen. Modelo a seguir: LHC (pocas páginas, largas y únicas), no Eagle (35 casi iguales, que Google puede tratar como contenido delgado).
2. **Páginas de servicio más largas con FAQ.** Ellos 1,800–2,200 palabras; nuestra página de cocina ~1,060. Más proceso, materiales, permisos por condado (con fuente oficial), preguntas reales.
3. **Casos de proyecto con nombre de zona** ("Baño en Midlothian", "Deck en Chester"): alcance, fotos, duración. Nosotros solo tenemos una galería plana. Ya estaba en `plan-backlinks-trust.md` (0.6).
4. **Houzz.** Domina las búsquedas y casi todos los competidores lo enlazan. Crear/completar el perfil de MAS con fotos de proyectos y pedir reseñas ahí.
5. **Página de reseñas que enlaza perfiles externos** (Google, Houzz, BBB, Angi). Sin schema de reseñas propio (se dejó fuera a propósito; ver CLAUDE.md).
6. **Páginas de confianza:** proceso, equipo con nombres y fotos, garantía (solo si existe por escrito), prensa.
7. **Sub-servicios** (encimeras, duchas de azulejo, bump-outs, puertas de patio) cuando el contenido sea real.
8. **Financiamiento**, solo si MAS lo ofrece de verdad.
9. **Video** (YouTube) de obras reales: refuerza la marca y alimenta el Perfil de Negocio.

**Ventaja nuestra que ellos no tienen:** sitio bilingüe completo (solo Eagle tiene una página en español) y un blog con fuentes oficiales citadas. Las páginas de ciudad en español pueden captar búsquedas con muy poca competencia.

## Problemas en nuestro propio sitio (verificados)

1. **Enlace roto al español en la home (bug).** El HTML de la home apunta el selector de idioma a `/es/index` (da **404**) y a `/index`. Lo confirmé con `curl` el 2026-11-21. Causa probable: al prerenderizar la home, `usePathname()` devuelve `/index` y `LanguageSwitcher.jsx` lo usa tal cual. Arreglo de una línea: tratar `/index` como `/`.
2. **H1 de la home sin palabra clave:** "TRANSFORMING SPACES". La frase "Trusted General Contractor in Richmond, VA" está en el H2. Conviene que el H1 diga qué y dónde.
3. **Pocos enlaces internos:** la home tiene 17–25; ventanas, puertas, trim y tile no se enlazan desde ella. Los competidores tienen 50–78.
4. **El FAQ de la home y el de cocina dan rangos de precio** ("$15,000–$60,000+", "decks desde $8,000"…). La regla del dinero cubre solo el blog, así que esto lo decide el dueño.
5. El JSON-LD `GeneralContractor` de la home parece inyectarse en el cliente y no en el HTML inicial (inferido del análisis; Google probablemente lo lee igual tras renderizar). Revisar con la herramienta Rich Results Test.

## Plan propuesto

**Semana 1 (código, rápido):** arreglar el enlace `/es/index`; H1 de la home con qué + dónde; enlazar todos los servicios desde la home; decidir con el dueño los precios del FAQ.

**Semanas 2–4 (contenido):** 4 páginas de ciudad en inglés y español (Midlothian, Chesterfield, Henrico, Glen Allen), cada una con proyectos reales de esa zona, datos de permisos verificados en la fuente oficial del condado (si no se puede verificar Henrico/Richmond, no se afirma nada) y enlaces a los servicios. Después, 2–3 páginas de servicio+ciudad solo donde ya salimos cerca (additions Midlothian/Chesterfield).

**Continuo:** alargar las páginas de servicio con FAQ; 1 caso de proyecto con zona por obra terminada; Houzz + reseñas (ver `plan-backlinks-trust.md` fase 3); seguir el blog.

**Medir:** posición por consulta y página en Search Console (no solo el promedio de 21.9, que mezcla cientos de búsquedas largas) cada 2 semanas.

## Skills / herramientas de SEO para Claude Code (verificadas el 2026-11-21)

| # | Herramienta | Para qué | Costo |
|---|---|---|---|
| 1 | [claude-seo](https://github.com/AgriciDaniel/claude-seo) (31k estrellas, activo) | Auditoría técnica, schema, hreflang, Core Web Vitals, SEO local (`/seo local`, `/seo maps`), conecta Search Console/PageSpeed/GA4 | Gratis (MIT). Instala Python y un Chromium: revisar `install.ps1` antes |
| 2 | [mcp-gsc](https://github.com/AminForou/mcp-gsc) (2.3k, activo) | Leer Search Console desde Claude: consultas, páginas, inspección de URL | Gratis; requiere OAuth propio de Google Cloud. Solo lectura por defecto |
| 3 | [marketingskills](https://github.com/coreyhaines31/marketingskills) (62k, activo) | Métodos: seo-audit, schema, site-architecture, programmatic-seo, link-building | Gratis; casi todo markdown |
| 4 | [pagespeed-insights-mcp](https://github.com/ruslanlap/pagespeed-insights-mcp) | Core Web Vitals de laboratorio y de campo | API key gratis de Google |
| 5 | [DataForSEO MCP](https://github.com/dataforseo/mcp-server-typescript) (oficial) | Volúmenes de búsqueda, SERP y **Map Pack**, competidores, backlinks | De pago por consulta |

Recomendación: instalar **1 y 2** (cubren auditoría, SEO local y datos reales de Search Console sin costo). DataForSEO solo si se quiere seguir el Map Pack y volúmenes de palabras clave.

**Advertencias:** estas skills no conocen nuestra regla de verificar hechos con fuente oficial (sus textos son borradores) y varias recomiendan schema `AggregateRating`/`Review`, que aquí se dejó fuera a propósito.

## Auditoría con las skills (2026-11-21)

Se descargaron `claude-seo` y `marketingskills` (solo se leyeron sus instrucciones; no se ejecutó ningún script) y se aplicaron sus métodos de auditoría técnica, hreflang, schema, página, contenido y SEO local a las 78 URL del sitemap.

**Bien:** todas dan 200, un H1 por página, canonical propio (también en /es), hreflang recíproco con x-default en `<head>` y sitemap, 404 reales con `noindex`, robots limpio, todas las imágenes con alt.

**Hecho el 2026-11-21:**
- Enlace del selector de idioma a `/es/index` (404) → `/es`.
- H1 con qué + dónde en inicio, Nosotros, Contacto y Galería (y con espacio entre partes: antes se leía "…VATRANSFORMINGSPACES").
- El H1 de Contacto ya no arranca invisible (`opacity:0`) esperando a JavaScript.
- Schema `GeneralContractor` del sitio ahora va en el HTML inicial (antes lo inyectaba `next/script` después de cargar; Bing y los rastreadores de IA no lo veían).
- `Service.provider` apunta al `@id` de la organización; se quitó la `Offer` con `price: "0"`; las migas usan la URL canónica sin barra final.
- Enlaces internos: la inicio enlaza los 11 servicios; cada servicio enlaza 3 servicios relacionados por tema (`src/content/related.js`) y 3 guías del blog.
- **Precios de obra quitados de todo el sitio** (servicios, FAQ, llms.txt y las tablas que quedaban en 3 posts). Solo quedan precios de materiales con fuente y tarifas oficiales del condado.
- `llms.txt`: sin "4.9 estrellas" (no coincidía con Google), sin precios, con la lista de posts al día (faltaban 4).

**Pendiente (necesita al dueño o más trabajo):**
1. **Número de licencia DPOR** visible y enlazado a la consulta oficial (hoy el sello lleva a la home de DPOR). Señal de confianza nº 1.
2. **Páginas de ciudad** (Midlothian, Chesterfield, Henrico, Glen Allen) con proyectos reales de cada zona: hace falta saber qué obras se hicieron dónde, para que no sean páginas puerta.
3. **Títulos y descripciones largos:** 49 de 78 títulos pasan de 60 caracteres y 59 descripciones de 160 (el español es peor). Reescribir `meta.*` y `metaTitle`/`metaDescription`.
4. **Fuentes en las páginas de servicio:** las FAQ citan leyes y permisos (§ 54.1-402, crédito 25C, permisos de cocina) sin mostrar referencias, como sí hacen los posts.
5. `llms.txt` dice "Founded in 2014", "500 projects" y "Certified James Hardie installer": confirmar con el dueño o quitar.
6. Menores: `lastmod` del sitemap cambia en cada deploy; FAQ idéntico en `/` y `/services`; Conthrax en OTF (77 KB); `the_haven.jpg` de 893 KB.

## Directorios: dónde no estamos o hay datos mal (2026-11-21)

Sin crear cuentas ni enviar nada. Muchos directorios bloquean la consulta automática; esos quedan "sin verificar".

**Arreglar primero (teléfono equivocado, desvía llamadas):**
- **Apple Maps** (sin reclamar): (804) 920-2569, Suite 218 en vez de 107, dirección visible.
- **MapQuest** (sin reclamar): mapquest.com/us/virginia/mas-contractors-519460166, (804) 920-2569, dirección visible.
- **Yelp** (reclamado por alguien desconocido): (804) 404-5361.
- **ZoomInfo** (distribuye datos a otros sitios): (804) 404-5361.
- **BBB**: (804) 920-2569, dos ubicaciones; en buscadores aparecen 9000 Deerwater Ter y 440 Southlake Blvd y "not BBB accredited", que contradice `directorios-semana.md`. Revisarlo con la sesión del dueño.

**No estamos (por prioridad):** Houzz (domina las búsquedas de remodelación), Nextdoor, Cámara de Chesterfield ($450/año el nivel más bajo, leído en chesterfieldchamber.com/join), Virginia Hispanic Chamber ($495/año, incluye directorio; leído en vahcc.com/membership), Alignable, LinkedIn (página de empresa), Angi/HomeAdvisor, Manta (gratis), YouTube, HBAR (requiere aprobación de la junta).

**Sin verificar:** Yellow Pages/Superpages, ChamberRVA, BuildZoom, Foursquare, Data Axle, Neustar Localeze, Porch.

**Otros:** Thumbtack fue borrado (410) pero los buscadores aún muestran copias. Una reseña vieja de Thumbtack habla de "EA Builders LLC (formerly Mas Contractors)" en Glen Allen: preguntar a Raúl si tiene relación, porque puede mezclar citaciones. Variantes del nombre: "MAS Contractors,LLC" (Facebook) y "MAS Contractors" (MapQuest, ZoomInfo, Instagram).

## Fuentes

Páginas descargadas: lhcrva.com (/, /midlothian-va/, /new-construction-home-additions-richmond-va/, /blog/); classicconstructionext.com (/, /bathroom-remodeling/, /blog/); qualityremodelingva.com (/, /financing, /service-area, /blog); leolantz.com (/, /services/kitchen-remodeling/, /media/, /blogs/); jamesriverremodeling.com (/, /remodeling-services); ahgva.com (/, /residential-home-additions); lanebuilt.com (/, /kitchen-remodeling-richmond-va, /projects/covered-porch-and-patio-remodel-in-glen-allen-at-twin-hickory, /our-team, /blog); richmondhomerenovations.com (/, /midlothian-general-contractor, /blog); mascontractors.com (/, /services/kitchen-remodeling, /sitemap.xml, /index, /es/index).

No se revisó: Map Pack, backlinks, membresías (Chamber/NARI), número de reseñas en Google de cada competidor.
