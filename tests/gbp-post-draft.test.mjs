import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const { buildDraft, pickPost, postUrl, MAX_TEXT } = await import("../scripts/gbp-post-draft.mjs");

const post = (over = {}) => ({
  slug: "a-post",
  title: "A title",
  excerpt: "A short excerpt.",
  publishDate: "2026-03-10",
  image: "/gallery/Kitchen.jpeg",
  regulatory: false,
  reviewed: "2026-10-16",
  ...over,
});

test("link is language-aware and tagged for analytics", () => {
  assert.equal(
    postUrl("a-post", "en"),
    "https://mascontractors.com/blog/a-post?utm_source=google&utm_medium=gbp&utm_campaign=a-post",
  );
  assert.match(postUrl("a-post", "es"), /^https:\/\/mascontractors\.com\/es\/blog\/a-post\?/);
});

test("default pick is the newest post already published", () => {
  const posts = [
    post({ slug: "old", publishDate: "2026-01-01" }),
    post({ slug: "new", publishDate: "2026-05-01" }),
    post({ slug: "future", publishDate: "2099-01-01" }),
  ];
  assert.equal(pickPost(posts, undefined, "2026-10-24").slug, "new");
  assert.equal(pickPost(posts, "old").slug, "old");
  assert.equal(pickPost(posts, "missing"), null);
});

test("draft is title + excerpt only, with a localized button", () => {
  const d = buildDraft(post(), "es");
  assert.match(d.text, /^A title\n\nA short excerpt\.\n\nLea el artículo/);
  assert.equal(d.button, "Más información");
  assert.deepEqual(d.warnings, []);
});

test("warns on phone numbers, long text and stale regulatory posts", () => {
  const phone = buildDraft(post({ excerpt: "Call 804-833-4600 now" }), "en");
  assert.ok(phone.warnings.some((w) => /phone/.test(w)));
  const long = buildDraft(post({ excerpt: "x".repeat(MAX_TEXT) }), "en");
  assert.ok(long.warnings.some((w) => /allows/.test(w)));
  const stale = buildDraft(post({ regulatory: true, reviewed: "2026-01-01" }), "en", "2026-10-24");
  assert.ok(stale.warnings.some((w) => /re-verify/.test(w)));
  const fresh = buildDraft(post({ regulatory: true }), "en", "2026-10-24");
  assert.deepEqual(fresh.warnings, []);
});

test("every real post in both languages makes a clean draft", () => {
  for (const lang of ["en", "es"]) {
    const posts = JSON.parse(fs.readFileSync(new URL(`../src/content/${lang}/blog.json`, import.meta.url)));
    for (const p of posts) {
      const d = buildDraft(p, lang, "2026-10-24");
      assert.ok(d.text.length <= MAX_TEXT, `${lang}/${p.slug} too long`);
      assert.ok(!d.warnings.some((w) => /phone/.test(w)), `${lang}/${p.slug} has a phone number`);
    }
  }
});
