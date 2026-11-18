# Plan de acción: backlinks y trust (MAS Contractors LLC)

Fecha: 2026-11-17. Complementa `docs/directorios-semana.md` (esa semana cubre citaciones/NAP; este plan cubre lo que viene después y el trust del sitio).

## Principios (no negociables)

1. **Solo enlaces ganados o legítimos.** Nada de comprar enlaces, paquetes "500 backlinks", PBN, intercambio masivo ni comentarios spam. Google lo penaliza y un contratista local no lo necesita.
2. **Pocos y locales > muchos y genéricos.** Para SEO local de Richmond/Chesterfield, 20 enlaces de sitios reales de la zona valen más que 500 de directorios basura.
3. **Cada dato verificable.** Aplica la regla de contenido del `CLAUDE.md`: licencia, seguro, años, cifras. Si no se puede probar, no se publica.
4. **NAP idéntico en todas partes** (ver `directorios-semana.md`).
5. **Dónde no hay certeza, se anota "no verificado"** (p. ej. si un directorio da enlace follow o nofollow, o cuánto cobra).

## Fase 0: arreglar la base de trust del sitio (esta semana, 1–2 días, lo hacemos nosotros en código)

Lo que falta hoy, visto en el repo:

| # | Acción | Por qué | Quién |
|---|---|---|---|
| 0.1 | **Número de licencia DPOR visible** (footer, About, contacto) con enlace a la verificación oficial de DPOR | Hoy el sitio dice "Class A" pero no da número; el cliente no puede comprobarlo. Es la señal de trust nº1 en construcción | Dueño da el número; yo lo pongo |
| 0.2 | **Seguro**: confirmar con el dueño qué cubre (responsabilidad general, comp de trabajadores) y decir solo eso. Opcional: certificado en PDF bajo petición | "Fully Insured" sin detalle suena genérico | Dueño |
| 0.3 | **Página About con personas reales**: nombre del dueño, foto, año de fundación real, historia corta, foto del equipo/camión/uniforme | Google y los clientes evalúan "quién está detrás" (E-E-A-T) | Dueño aporta datos/fotos; yo maqueto |
| 0.4 | **Fix Facebook**: el enlace es `buildandrenovaterva`; confirmar que la página se llame MAS Contractors LLC o renombrarla | Inconsistencia de marca rompe confianza y citaciones | Dueño |
| 0.5 | **Reseñas visibles con enlace a Google** (ya existe `/review`); agregar enlaces "ver todas en Google" y a Thumbtack | Prueba social verificable fuera del sitio | Yo |
| 0.6 | **Proyectos con nombre de zona** (p. ej. "Baño en Midlothian") y, si el cliente acepta, una frase de testimonio con nombre y barrio | Contenido local único; sirve para PR y para GBP | Dueño + yo |
| 0.7 | **Garantía escrita**: solo si el dueño la tiene real (plazo y alcance por escrito). Si no existe, no mencionarla | Ya quitamos "100 % satisfaction" sin respaldo | Dueño |
| 0.8 | Revisar que BBB, DPOR y OSHA enlacen a su perfil real (cada badge debe llevar a la página de verificación, no solo ser imagen) | Un sello sin enlace no prueba nada. Recordar: el bloque está duplicado en `Certifications.jsx` y `AboutPageContent.jsx` | Yo |

## Fase 1: citaciones y perfiles (semana 1–2)

Ejecutar `docs/directorios-semana.md` tal cual. Añadir:

- **Orden por valor seguro:** Google Business Profile → Bing Places → Apple Business Connect → Facebook → BBB → Houzz → Nextdoor → Alignable → Angi/Thumbtack (leer cómo cobran antes).
- **Registrar en una hoja** (sitio, URL del perfil, fecha, método de verificación, enlace a la web sí/no, follow/nofollow *verificado en el código de la página*). Es la fuente de verdad para no repetir ni olvidar.
- Meta: **8–10 perfiles verificados y consistentes** al final de la semana 2.

## Fase 2: backlinks ganados locales (semanas 2–6)

Ordenados de más fácil/seguro a más trabajo. Meta realista: **10–20 enlaces en 6 semanas**.

### 2.1 Enlaces que ya merecemos (esfuerzo bajo)
- **Cámara de comercio local** (Chesterfield Chamber / Richmond Region): membresía lista a sus miembros con enlace. Revisar cuota en su sitio oficial antes de decidir.
- **BBB**: perfil con enlace a la web.
- **Proveedores y marcas con las que trabajamos** (distribuidores de ventanas, techos, pisos, cabinets): muchos tienen página "Find a Pro/Contractor" o "Our Installers". Pedir ser listados. Si MAS es instalador certificado de alguna marca, es un enlace de alta autoridad.
- **Clientes comerciales o aliados** (inmobiliarias, property managers, arquitectos, diseñadores, inspectores): pedir que enlacen a MAS en su página de "partners/recomendados" a cambio de hacer lo mismo.
- **Asociaciones del oficio**: homebuilders association local (RBA) u otras. Revisar requisitos y cuota en la fuente.

### 2.2 Enlaces por comunidad y relaciones (esfuerzo medio)
- **Patrocinios pequeños** con página de patrocinadores: liga infantil, escuela, iglesia, 5K, evento del vecindario. Es costo bajo y da enlace + buena reputación real. Pedirlo explícitamente.
- **Trabajo benéfico visible** (reparación a veteranos/ancianos, Habitat for Humanity RVA, Rebuilding Together): documentar con fotos y pedir que la organización lo publique y enlace.
- **HOAs y asociaciones de vecinos**: ofrecer ser "proveedor recomendado" o dar una charla/guía (permisos de deck en Chesterfield, etc.).
- **Prensa local**: cuando haya una historia real (aniversario, proyecto comunitario, cambio de ley que afecta a dueños de casa), mandar nota a medios locales y blogs de la zona. Sin historia no se manda nada.

### 2.3 Contenido que atrae enlaces (esfuerzo alto, mejor retorno a largo plazo)
Ya hay un blog con referencias y fuentes verificadas; esa es la ventaja. Convertirlo en activos "enlazables":
- **Guía de permisos Chesterfield / Henrico / Richmond City** en una sola página, con tabla y fuentes oficiales (solo lo que se pueda verificar; si no, no afirmar nada de esa jurisdicción). Sirve para que inmobiliarias y HOAs la citen.
- **Costos reales de proyectos en Richmond**, rotulados como datos propios de MAS (`usesCompanyData: true`), actualizados cada año.
- **Antes/después con ficha de proyecto** (alcance, zona, duración): material que los medios y proveedores pueden enlazar.
- Promoción activa: cada guía nueva se envía a 5–10 contactos relevantes (inmobiliarias, HOAs, inspectores, ferreterías locales) en vez de esperar a que Google la encuentre.

### 2.4 Qué NO hacer
- Directorios "gratis" masivos sin revisar (muchos son basura y no aportan).
- Pagar a quien promete rankings garantizados.
- Enlaces con anchor text de palabra clave repetido ("best contractor Richmond VA"). Preferir la marca y URL desnuda.
- Reseñas falsas o incentivadas de forma que viole las normas de Google.

## Fase 3: reseñas como motor de trust (continuo)

1. **Proceso fijo post-obra**: mensaje (SMS o email) con el enlace `/review` el mismo día de entrega, y recordatorio a los 5–7 días.
2. Meta orientativa: **2–4 reseñas nuevas al mes**; el número exacto lo decide el volumen de obras. No fijar cifras en el sitio que no coincidan con Google (ya pasó con el 4.9/47).
3. **Responder todas las reseñas** (también las malas), con nombre y detalle del proyecto.
4. Pedir reseña también en Houzz y Thumbtack a los clientes que ya reseñaron en Google (con su consentimiento, sin forzar).
5. Impresos: QR a `/review` en la tarjeta, en el membrete (ver `negocio/diseno/membrete/`) y en el letrero de obra.

## Fase 4: señales de marca y entidad (semanas 4–8)

- **Mismo logo, descripción y enlaces** en GBP, Facebook, Houzz, BBB, YouTube/Instagram si existen. Enlazar entre ellos y desde el sitio (`social.json`, hoy solo Facebook y Thumbtack).
- **Instagram/YouTube** con trabajos reales: no son backlinks que pasen autoridad, pero refuerzan la entidad de marca y alimentan GBP.
- **Wikidata/Crunchbase u otras fichas de entidad**: solo si cumplen criterios de notabilidad; no forzar.

## Medición (mensual, 30 min)

| Qué | Dónde | Meta orientativa |
|---|---|---|
| Enlaces entrantes nuevos | Search Console → Enlaces | Subida constante mes a mes |
| Impresiones y clics de búsquedas "near me"/ciudad | Search Console | Tendencia al alza |
| Llamadas, rutas y clics a la web | Google Business Profile → Rendimiento | Tendencia al alza |
| Reseñas nuevas y calificación | GBP | 2–4/mes |
| Consistencia NAP | Búsqueda manual del teléfono | 100 % idéntico |

Sin metas numéricas externas: no tenemos una fuente verificada para "cuántos backlinks hacen falta", así que se mide tendencia, no una cifra mágica.

## Calendario resumido

| Semana | Foco |
|---|---|
| 1 | Fase 0 (licencia, About, Facebook, badges con enlace) + arrancar directorios |
| 2 | Cerrar directorios + hoja de control + proceso de reseñas |
| 3 | Cámara de comercio, proveedores/marcas, BBB al día |
| 4 | Partners (inmobiliarias, diseñadores, inspectores), primer patrocinio |
| 5–6 | Guía de permisos/costos como activo enlazable + difusión |
| 7–8 | Revisar métricas, repetir lo que dio enlaces, descartar lo que no |

## Qué necesito del dueño para arrancar

1. Número de licencia DPOR y año de fundación real.
2. Datos del seguro (qué cubre) y si existe garantía por escrito.
3. Foto del dueño/equipo y un par de frases de historia.
4. Confirmar nombre de la página de Facebook.
5. Lista de proveedores/marcas con las que trabaja y de aliados (inmobiliarias, diseñadores) que conozca.
6. Presupuesto, si lo hay, para cámara de comercio o patrocinios.
