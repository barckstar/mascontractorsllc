// Draft a Google Business Profile post from a blog post. Nothing is published:
// it writes gbp-drafts/<slug>.<lang>.txt (+ a 4:3 photo) to paste by hand.
//
//   node scripts/gbp-post-draft.mjs                  # newest post, English
//   node scripts/gbp-post-draft.mjs <slug> --lang es # a specific post
//   node scripts/gbp-post-draft.mjs --list           # slugs and dates
//   node scripts/gbp-post-draft.mjs --no-image       # skip the photo
//
// The text is only the post's own title + excerpt (no new facts, no phone
// numbers: GBP rejects them). The link carries UTM tags so the visits show up in
// analytics as google / gbp.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SITE = "https://mascontractors.com";
export const MAX_TEXT = 1500; // GBP limit for post text
const MIN_PHOTO = 720; // GBP photo minimum, in px
const STALE_DAYS = 180;

const CTA = {
    en: "Read the full article on our website.",
    es: "Lea el artículo completo en nuestro sitio.",
};

const readPosts = (lang) =>
    JSON.parse(fs.readFileSync(path.join(ROOT, `src/content/${lang}/blog.json`), "utf8"));

export function postUrl(slug, lang) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    return `${SITE}${prefix}/blog/${slug}?utm_source=google&utm_medium=gbp&utm_campaign=${slug}`;
}

export function pickPost(posts, slug, today = new Date().toISOString().slice(0, 10)) {
    if (slug) return posts.find((p) => p.slug === slug) ?? null;
    const published = posts.filter((p) => p.publishDate <= today);
    return published.sort((a, b) => b.publishDate.localeCompare(a.publishDate))[0] ?? null;
}

export function buildDraft(post, lang, today = new Date().toISOString().slice(0, 10)) {
    const text = `${post.title}\n\n${post.excerpt}\n\n${CTA[lang]}`;
    const warnings = [];
    if (text.length > MAX_TEXT) warnings.push(`text is ${text.length} chars, GBP allows ${MAX_TEXT}`);
    if (/\d{3}[\s.)-]*\d{3}[\s.-]*\d{4}/.test(text)) warnings.push("text contains a phone number; GBP rejects those");
    if (post.regulatory) {
        const age = (Date.parse(today) - Date.parse(post.reviewed)) / 86400000;
        if (!(age <= STALE_DAYS)) {
            warnings.push(`regulatory post last reviewed ${post.reviewed}; re-verify it before promoting it`);
        }
    }
    return {
        slug: post.slug,
        lang,
        text,
        button: lang === "es" ? "Más información" : "Learn more",
        url: postUrl(post.slug, lang),
        image: post.image,
        warnings,
    };
}

async function writeImage(draft, outDir) {
    const src = path.join(ROOT, "public", draft.image);
    if (!fs.existsSync(src)) return { warn: `image not found: ${draft.image}` };
    const { default: sharp } = await import("sharp");
    const meta = await sharp(src).metadata();
    const dest = path.join(outDir, `${draft.slug}.jpg`);
    await sharp(src).resize(1200, 900, { fit: "cover" }).jpeg({ quality: 90 }).toFile(dest);
    const small = Math.min(meta.width, meta.height) < MIN_PHOTO;
    return {
        dest,
        warn: small ? `source photo is ${meta.width}x${meta.height}; GBP wants at least ${MIN_PHOTO}px` : null,
    };
}

async function main(argv) {
    const args = argv.filter((a) => !a.startsWith("--"));
    const flag = (name) => argv.includes(`--${name}`);
    const li = argv.indexOf("--lang");
    const lang = li >= 0 ? argv[li + 1] : "en";
    if (!CTA[lang]) throw new Error(`--lang must be one of: ${Object.keys(CTA).join(", ")}`);
    const slug = args.find((a) => a !== lang);

    const posts = readPosts(lang);
    if (flag("list")) {
        for (const p of [...posts].sort((a, b) => b.publishDate.localeCompare(a.publishDate))) {
            console.log(`${p.publishDate}  ${p.slug}`);
        }
        return;
    }
    const post = pickPost(posts, slug);
    if (!post) throw new Error(slug ? `no post with slug "${slug}"` : "no published posts");

    const draft = buildDraft(post, lang);
    const outDir = path.join(ROOT, "gbp-drafts");
    fs.mkdirSync(outDir, { recursive: true });

    if (!flag("no-image")) {
        const img = await writeImage(draft, outDir);
        if (img.warn) draft.warnings.push(img.warn);
        draft.imageFile = img.dest;
    }
    const file = path.join(outDir, `${draft.slug}.${lang}.txt`);
    fs.writeFileSync(file, `${draft.text}\n\nBUTTON: ${draft.button}\nLINK: ${draft.url}\n`);

    console.log(`\n${draft.text}\n\nButton: ${draft.button}\nLink:   ${draft.url}`);
    if (draft.imageFile) console.log(`Photo:  ${path.relative(ROOT, draft.imageFile)} (1200x900)`);
    console.log(`Saved:  ${path.relative(ROOT, file)}`);
    for (const w of draft.warnings) console.log(`⚠ ${w}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main(process.argv.slice(2)).catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
}
