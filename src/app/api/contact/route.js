import { sendContactEmail, verifyTurnstile } from "../../../lib/contactMail.js";

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

  const { token } = body;
  if (!token || typeof token !== "string") {
    return Response.json({ error: "captcha_missing" }, { status: 400 });
  }

  const verify = await verifyTurnstile(
    token,
    request.headers.get("x-forwarded-for")?.split(",")[0]
  );
  if (!verify?.success) {
    return Response.json({ error: "captcha_failed" }, { status: 400 });
  }

  const params = {};
  for (const k of FIELDS) params[k] = String(body[k] ?? "").slice(0, 5000);

  const res = await sendContactEmail(params);
  if (!res.ok) {
    console.error("EmailJS error:", res.status, await res.text());
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
