// Valida el token de Cloudflare Turnstile y envía el correo por la API REST de
// EmailJS. Las claves son solo de servidor (sin NEXT_PUBLIC_).
const FIELDS = [
  "user_first_name",
  "user_last_name",
  "user_email",
  "user_phone",
  "user_subject",
  "message",
  "user_language",
];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // El chequeo diario (GitHub Actions) no puede resolver un captcha: se identifica
  // con un secreto compartido y recorre el mismo camino de envío.
  const monitor = request.headers.get("x-monitor-token");
  const isMonitor =
    !!process.env.MONITOR_SECRET && monitor === process.env.MONITOR_SECRET;

  const { token } = body;
  if (!isMonitor && (!token || typeof token !== "string")) {
    return Response.json({ error: "captcha_missing" }, { status: 400 });
  }

  const verify = isMonitor ? { success: true } : await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("x-forwarded-for")?.split(",")[0],
      }),
    }
  )
    .then((r) => r.json())
    .catch(() => null);

  if (!verify?.success) {
    return Response.json({ error: "captcha_failed" }, { status: 400 });
  }

  const params = {};
  for (const k of FIELDS) params[k] = String(body[k] ?? "").slice(0, 5000);

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  });

  if (!res.ok) {
    console.error("EmailJS error:", res.status, await res.text());
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
