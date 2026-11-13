# Analítica: objetivos y estado (para revisar cuando haya datos)

Creado el 2026-11-05. Nada de esto está publicado ni commiteado: el dueño lo revisa primero.

## IDs

| Qué | ID |
|---|---|
| GA4: cuenta `MAS Contractors LLC`, propiedad `mascontractors.com` | flujo web `MAS Contractors`, ID de medición **G-XQVT29GVBQ** |
| GTM: contenedor `mascontractors.com` (cuenta `mas contractors`) | **GTM-KMQQ3RGM** |
| Etiqueta de Google administrada por GA (no usada en el código) | GTM-WK6CHDVH |

El sitio carga **solo GTM**; GA4 va dentro del contenedor. No añadir `gtag.js` aparte (duplicaría visitas).
GA4 también tiene una propiedad de apps móviles ajena (`appdespertador-ff114`, `com.isc.*`): no se usa para el sitio.

## Qué está montado

Código (sin commit): `src/components/GoogleTagManager.jsx` (snippet con `next/script`), montado en `src/components/LangHtml.jsx`; y en `src/components/contact.jsx` un `dataLayer.push({ event: "generate_lead", form_id: "contact", language })` tras un envío correcto.

GTM, en el **espacio de trabajo (borrador, sin publicar)**:
1. `GA4 - Google tag` → G-XQVT29GVBQ, activador *Initialization - All Pages*.
2. `GA4 - generate_lead (formulario)` → evento GA4 `generate_lead`, activador *Evento personalizado generate_lead*.
3. `GA4 - phone_click (teléfono)` → evento GA4 `phone_click`, activador *Solo enlaces* con `Click URL` contiene `tel:`.

## Objetivos de negocio (lo que queremos medir)

1. **Clientes potenciales**: envíos del formulario de contacto (`generate_lead`) y llamadas desde el sitio (`phone_click`). Marcar ambos como *eventos clave* en GA4 después de que aparezcan.
2. **Qué páginas traen clientes**: cuáles de los servicios, posts del blog y páginas de ciudad terminan en formulario o llamada (informe de páginas de destino + eventos clave).
3. **De dónde llegan**: búsqueda orgánica vs. directo vs. redes (Facebook programado en Business Suite) vs. Google Business Profile.
4. **SEO local**: vincular **Search Console** con GA4; ver consultas, páginas indexadas y clics por Chesterfield, Midlothian, Richmond, Henrico.
5. **Idioma**: comparar inglés (`/`) contra español (`/es`): visitas y conversiones por idioma (el evento lleva el parámetro `language`).
6. **Móvil vs. escritorio**: rendimiento y conversión por dispositivo (el sitio se midió rápido en escritorio; falta Lighthouse móvil).
7. **Calidad del tráfico**: tasa de rebote/interacción en la home y en las páginas de servicio tras los cambios de título y descripción.

## Pendiente antes de publicar

- [ ] Revisar el diff del código y probar en local (`npm test`, `npm run build`).
- [ ] En GTM: **Vista previa** contra producción/local y comprobar que salen `generate_lead` y `phone_click`; luego **Enviar** (publicar).
- [ ] En GA4: confirmar que llegan datos (Informes en tiempo real) y marcar `generate_lead` y `phone_click` como eventos clave.
- [ ] Vincular Search Console con GA4.
- [ ] Decidir el aviso de cookies/privacidad: GA4 usa cookies; revisar si la política de privacidad del sitio lo menciona.
- [ ] Opcional: evento para clics en `mailto:` y botón de reseña (`/review`).

## Revisión cuando haya datos (2–4 semanas después de publicar)

- ¿Cuántas visitas, de dónde y a qué páginas?
- ¿Cuántos `generate_lead` y `phone_click`? ¿Coinciden con los correos reales que llegan a la oficina?
- ¿Qué servicios convierten y cuáles no? ¿Hay páginas con muchas visitas y cero contactos?
- ¿El español trae visitas y contactos o sobra el esfuerzo?
- Pendientes de SEO de la auditoría del 2026-11-05: título y descripción de la home demasiado largos, 13 imágenes sin `alt` en la home, precios "desde" en la meta de la home, `og:url` sin barra final, cabeceras de seguridad.
