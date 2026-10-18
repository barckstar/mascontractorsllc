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

function callEmailJS(templateId, templateParams) {
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjsEnv("SERVICE_ID"),
      template_id: templateId,
      user_id: emailjsEnv("PUBLIC_KEY"),
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });
}

export function sendContactEmail(templateParams) {
  return callEmailJS(emailjsEnv("TEMPLATE_ID"), templateParams);
}

// Health check that never emails anyone: EmailJS validates the account switch,
// public key, private key and service id before it looks up the template, so a
// made-up template id answers "template ID not found" when everything else is
// fine, and a credential error (403, ...) when it is not.
export const PROBE_TEMPLATE_ID = "monitor-probe-no-such-template";
export function probeEmailJS() {
  return callEmailJS(PROBE_TEMPLATE_ID, {});
}
