import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const { POST } = await import("../src/app/api/contact/route.js");

const TURNSTILE = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAILJS = "https://api.emailjs.com/api/v1.0/email/send";

const ENV = {
  TURNSTILE_SECRET_KEY: "ts-secret",
  EMAILJS_SERVICE_ID: "svc",
  EMAILJS_TEMPLATE_ID: "tpl",
  EMAILJS_PUBLIC_KEY: "pub",
  EMAILJS_PRIVATE_KEY: "priv",
};

const form = {
  user_first_name: "Leonel",
  user_last_name: "Smith",
  user_email: "john@email.com",
  user_phone: "(804) 000-0000",
  user_subject: "Roofing",
  message: "Hello",
  user_language: "en",
};

let calls;
let handlers;
const realFetch = globalThis.fetch;

function req(body, headers = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  Object.assign(process.env, ENV);
  calls = [];
  handlers = {
    [TURNSTILE]: () => Response.json({ success: true }),
    [EMAILJS]: () => new Response("OK", { status: 200 }),
  };
  globalThis.fetch = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return handlers[url]();
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of Object.keys(ENV)) delete process.env[k];
});

const sent = () => calls.filter((c) => c.url === EMAILJS);

test("valid token: verifies captcha and sends the email via EmailJS", async () => {
  const res = await POST(req({ ...form, token: "good" }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const verify = calls.find((c) => c.url === TURNSTILE);
  assert.equal(verify.body.secret, "ts-secret");
  assert.equal(verify.body.response, "good");

  assert.equal(sent().length, 1);
  const payload = sent()[0].body;
  assert.equal(payload.service_id, "svc");
  assert.equal(payload.template_id, "tpl");
  assert.equal(payload.user_id, "pub");
  assert.equal(payload.accessToken, "priv");
  assert.deepEqual(payload.template_params, form);
});

test("invalid JSON body -> 400, nothing sent", async () => {
  const res = await POST(req("not json"));
  assert.equal(res.status, 400);
  assert.equal(calls.length, 0);
});

test("missing token -> 400, nothing sent", async () => {
  const res = await POST(req(form));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, "captcha_missing");
  assert.equal(calls.length, 0);
});

test("non-string token -> 400", async () => {
  const res = await POST(req({ ...form, token: { a: 1 } }));
  assert.equal(res.status, 400);
  assert.equal(calls.length, 0);
});

test("Turnstile rejects the token -> 400, email NOT sent", async () => {
  handlers[TURNSTILE] = () => Response.json({ success: false });
  const res = await POST(req({ ...form, token: "bad" }));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, "captcha_failed");
  assert.equal(sent().length, 0);
});

test("Turnstile unreachable -> 400, email NOT sent", async () => {
  handlers[TURNSTILE] = () => {
    throw new Error("network");
  };
  const res = await POST(req({ ...form, token: "x" }));
  assert.equal(res.status, 400);
  assert.equal(sent().length, 0);
});

test("EmailJS failure -> 502 so the user sees an error", async () => {
  handlers[EMAILJS] = () => new Response("bad key", { status: 403 });
  const res = await POST(req({ ...form, token: "good" }));
  assert.equal(res.status, 502);
  assert.equal((await res.json()).error, "send_failed");
});

test("only whitelisted fields are forwarded and long values are truncated", async () => {
  await POST(
    req({ ...form, message: "a".repeat(9000), evil: "x", token: "good" })
  );
  const params = sent()[0].body.template_params;
  assert.equal("evil" in params, false);
  assert.equal(params.message.length, 5000);
});

test("missing fields are sent as empty strings", async () => {
  await POST(req({ token: "good" }));
  const params = sent()[0].body.template_params;
  assert.equal(params.user_email, "");
});
