import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const { GET } = await import("../src/app/api/cron/contact-check/route.js");

const TURNSTILE = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAILJS = "https://api.emailjs.com/api/v1.0/email/send";
const HOOK = "https://hooks.example.com/alert";

const ENV = {
  CRON_SECRET: "cron-secret",
  TURNSTILE_SECRET_KEY: "ts-secret",
  EMAILJS_SERVICE_ID: "svc",
  EMAILJS_TEMPLATE_ID: "tpl",
  EMAILJS_PUBLIC_KEY: "pub",
  EMAILJS_PRIVATE_KEY: "priv",
  ALERT_WEBHOOK_URL: HOOK,
};

let calls;
let handlers;
const realFetch = globalThis.fetch;
const realError = console.error;

const auth = (v = "Bearer cron-secret") =>
  new Request("http://localhost/api/cron/contact-check", {
    headers: v ? { authorization: v } : {},
  });
const at = (url) => calls.filter((c) => c.url === url);

beforeEach(() => {
  console.error = () => {};
  Object.assign(process.env, ENV);
  calls = [];
  handlers = {
    // A valid secret + made-up token: Cloudflare answers invalid-input-response.
    [TURNSTILE]: () =>
      Response.json({ success: false, "error-codes": ["invalid-input-response"] }),
    // Valid credentials + made-up template id: EmailJS only complains about the template.
    [EMAILJS]: () =>
      new Response("The template ID not found. To find this ID, visit https://dashboard.emailjs.com/admin/templates", { status: 400 }),
    [HOOK]: () => new Response("ok"),
  };
  globalThis.fetch = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return handlers[url]();
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
  console.error = realError;
  for (const k of Object.keys(ENV)) delete process.env[k];
});

test("healthy: checks Turnstile and probes EmailJS without emailing anyone, no alert", async () => {
  const res = await GET(auth());
  assert.equal(res.status, 200);
  assert.equal(at(TURNSTILE)[0].body.secret, "ts-secret");
  assert.equal(at(EMAILJS).length, 1);
  const p = at(EMAILJS)[0].body;
  assert.equal(p.service_id, "svc");
  assert.equal(p.accessToken, "priv");
  assert.equal(p.template_id, "monitor-probe-no-such-template");
  assert.notEqual(p.template_id, "tpl");
  assert.deepEqual(p.template_params, {});
  assert.equal(at(HOOK).length, 0);
});

test("EmailJS credential error (403) -> 500 and alert", async () => {
  handlers[EMAILJS] = () =>
    new Response("API access from non-browser environments is currently disabled.", { status: 403 });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.match(at(HOOK)[0].body.text, /403/);
});

test("EmailJS 400 that is not about the template (bad service) -> 500 and alert", async () => {
  handlers[EMAILJS] = () => new Response("The service ID not found.", { status: 400 });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.equal(at(HOOK).length, 1);
});

test("EmailJS unexpectedly accepts the probe (200) -> 500 and alert", async () => {
  handlers[EMAILJS] = () => new Response("OK", { status: 200 });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.equal(at(HOOK).length, 1);
});

test("no Authorization header -> 401, nothing called", async () => {
  const res = await GET(auth(null));
  assert.equal(res.status, 401);
  assert.equal(calls.length, 0);
});

test("wrong bearer -> 401, nothing called", async () => {
  const res = await GET(auth("Bearer nope"));
  assert.equal(res.status, 401);
  assert.equal(calls.length, 0);
});

test("CRON_SECRET unset -> 401 even with 'Bearer undefined'", async () => {
  delete process.env.CRON_SECRET;
  const res = await GET(auth("Bearer undefined"));
  assert.equal(res.status, 401);
  assert.equal(calls.length, 0);
});

test("Turnstile secret rejected -> 500, alert sent, no email", async () => {
  handlers[TURNSTILE] = () =>
    Response.json({ success: false, "error-codes": ["invalid-input-secret"] });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.equal(at(EMAILJS).length, 0);
  assert.match(at(HOOK)[0].body.text, /Turnstile secret/);
});

test("Turnstile unreachable -> 500 and alert", async () => {
  handlers[TURNSTILE] = () => {
    throw new Error("network");
  };
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.equal(at(HOOK).length, 1);
});

test("EmailJS rejects -> 500 and alert includes the status", async () => {
  handlers[EMAILJS] = () => new Response("key revoked", { status: 403 });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.match(at(HOOK)[0].body.text, /403/);
});

test("failure without ALERT_WEBHOOK_URL still returns 500 (no crash)", async () => {
  delete process.env.ALERT_WEBHOOK_URL;
  handlers[EMAILJS] = () => new Response("x", { status: 500 });
  const res = await GET(auth());
  assert.equal(res.status, 500);
  assert.equal(at(HOOK).length, 0);
});

test("alert webhook itself failing does not mask the 500", async () => {
  handlers[EMAILJS] = () => new Response("x", { status: 500 });
  handlers[HOOK] = () => {
    throw new Error("hook down");
  };
  const res = await GET(auth());
  assert.equal(res.status, 500);
});
