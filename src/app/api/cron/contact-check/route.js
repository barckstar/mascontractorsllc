import { sendContactEmail, verifyTurnstile } from "../../../../lib/contactMail.js";

// Chequeo diario del formulario (Vercel Cron, ver vercel.json). Vercel manda
// `Authorization: Bearer $CRON_SECRET`. Comprueba que la clave de Turnstile sea
// válida y que EmailJS acepte un envío con las variables reales de producción.
// Si algo falla responde 500 y avisa a ALERT_WEBHOOK_URL (Slack/Discord/ntfy…).
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

  const res = await sendContactEmail({
    user_first_name: "[MONITOR]",
    user_last_name: "Chequeo diario",
    user_email: "monitor@mascontractors.com",
    user_phone: "000-000-0000",
    user_subject: "Test",
    user_language: "en",
    message: `Prueba automática ${new Date().toISOString()}. Puedes ignorar este correo.`,
  });
  if (!res.ok) {
    const msg = `EmailJS ${res.status}: ${await res.text()}`;
    await alert(`mascontractors.com contact form: ${msg}`);
    return Response.json({ error: "send_failed" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
