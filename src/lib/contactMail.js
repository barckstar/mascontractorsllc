// Piezas compartidas por /api/contact (usuarios) y /api/cron/contact-check (chequeo diario).
// Todas las claves son solo de servidor.

export async function verifyTurnstile(token, remoteip) {
  return fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip,
    }),
  })
    .then((r) => r.json())
    .catch(() => null);
}

// Los tres identificadores ya existen en Vercel como NEXT_PUBLIC_EMAILJS_* (de la
// versión anterior); el servidor los lee igual, así que no hay que duplicarlos.
// EMAILJS_* tiene prioridad si alguien las define con ese nombre.
const emailjsEnv = (name) =>
  process.env[`EMAILJS_${name}`] ?? process.env[`NEXT_PUBLIC_EMAILJS_${name}`];

export function sendContactEmail(templateParams) {
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjsEnv("SERVICE_ID"),
      template_id: emailjsEnv("TEMPLATE_ID"),
      user_id: emailjsEnv("PUBLIC_KEY"),
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });
}
