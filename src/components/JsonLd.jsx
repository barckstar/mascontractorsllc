// Un <script type="application/ld+json">. Escapa "<" para que un texto con
// "</script>" nunca pueda cerrar la etiqueta (JSON.stringify no lo hace solo).
export const safeJson = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function JsonLd({ data, id }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
