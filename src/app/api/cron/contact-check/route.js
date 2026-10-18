import { probeEmailJS, verifyTurnstile } from "../../../../lib/contactMail.js";

// Chequeo diario del formulario (Vercel Cron, ver vercel.json). Vercel manda
// `Authorization: Bearer $CRON_SECRET`. Comprueba que la clave de Turnstile sea
// válida y que EmailJS acepte las credenciales de producción SIN enviar ningún
// correo (la oficina/cliente no recibe nada). Si algo falla responde 500 y avisa
// a ALERT_WEBHOOK_URL (Slack/Discord/ntfy…); si todo está bien, silencio.
export const dynamic = "force-dynamic";

async function alert(text) {
  console.error("contact-check FAILED:", text);
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;
  try {
    // `text` lo leen Slack/ntfy; `content`, Discord.
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, content: text }),
    });
  } catch (e) {
    console.error("alert webhook failed:", e?.message);
  }
}

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  // Un token inventado siempre falla, pero el motivo distingue una clave mala
  // (invalid-input-secret / missing-input-secret) de una buena (invalid-input-response).
  const ts = await verifyTurnstile("monitor-probe");
  const codes = ts?.["error-codes"] ?? [];
  if (!ts || codes.some((c) => c.includes("secret"))) {
    const msg = `Turnstile secret key rejected: ${JSON.stringify(ts)}`;
    await alert(`mascontractors.com contact form: ${msg}`);
    return Response.json({ error: "turnstile_secret" }, { status: 500 });
  }

  const res = await probeEmailJS();
  const text = await res.text();
  // Healthy = credentials accepted and only the made-up template is missing.
  const healthy = res.status === 400 && /template/i.test(text);
  if (!healthy) {
    const msg = `EmailJS ${res.status}: ${text.slice(0, 300)}`;
    await alert(`mascontractors.com contact form: ${msg}`);
    return Response.json({ error: "send_failed" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
