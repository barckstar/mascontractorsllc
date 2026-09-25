// Runs before every build (npm "prebuild"). Fails if any language is missing
// something English has, so a half-translated page can never ship.
//
//   - dictionaries/<lang>.json and content/<lang>/*.json must have exactly the
//     same keys and array lengths as English, and no empty strings.
//   - Fields that are identifiers, not text (slugs, URLs, image paths, dates…)
//     must be IDENTICAL to English: translating them would break links.
//   - Every gallery image needs alt text in every language.
//
// Strings longer than 30 characters that are identical to English are listed
// as warnings: usually a missed translation, sometimes a legit proper noun.
import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(new URL(`../${p}`, import.meta.url)));
const config = fs.readFileSync(new URL("../src/i18n/config.js", import.meta.url), "utf8");
const LOCALES = JSON.parse(config.match(/LOCALES = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
const DEFAULT = "en";

const LOCKED = new Set([
    "url", "slug", "id", "img", "image", "src", "link", "servicePage", "categoryId",
    "publishDate", "relatedService", "step", "width", "height", "featured", "type",
]);

const errors = [];
const warnings = [];

function compare(en, other, path) {
    if (Array.isArray(en)) {
        if (!Array.isArray(other)) return errors.push(`${path}: expected an array`);
        if (en.length !== other.length) errors.push(`${path}: ${other.length} items, English has ${en.length}`);
        en.forEach((v, i) => i < other.length && compare(v, other[i], `${path}[${i}]`));
        return;
    }
    if (en && typeof en === "object") {
        if (!other || typeof other !== "object") return errors.push(`${path}: expected an object`);
        for (const k of Object.keys(en)) {
            if (!(k in other)) errors.push(`${path}.${k}: missing`);
            else if (LOCKED.has(k)) {
                if (JSON.stringify(en[k]) !== JSON.stringify(other[k])) errors.push(`${path}.${k}: must equal English (${JSON.stringify(en[k])})`);
            } else compare(en[k], other[k], `${path}.${k}`);
        }
        for (const k of Object.keys(other)) if (!(k in en)) errors.push(`${path}.${k}: not in English`);
        return;
    }
    if (typeof en === "string") {
        if (typeof other !== "string" || (!other.trim() && en.trim())) errors.push(`${path}: empty`);
        else if (other === en && en.length > 30) warnings.push(`${path}: same as English`);
        return;
    }
    if (typeof en !== typeof other) errors.push(`${path}: type ${typeof other}, English is ${typeof en}`);
}

for (const lang of LOCALES.filter((l) => l !== DEFAULT)) {
    compare(read(`src/i18n/dictionaries/${DEFAULT}.json`), read(`src/i18n/dictionaries/${lang}.json`), `dictionaries/${lang}`);
    for (const file of ["services", "blog"]) {
        compare(read(`src/content/${DEFAULT}/${file}.json`), read(`src/content/${lang}/${file}.json`), `content/${lang}/${file}`);
    }
}

read("src/content/gallery.json").images.forEach((img, i) => {
    for (const lang of LOCALES) {
        if (!img.alt?.[lang]?.trim()) errors.push(`content/gallery.json images[${i}] (${img.src}): no alt for "${lang}"`);
        else if (lang !== DEFAULT && img.alt[lang] === img.alt[DEFAULT]) warnings.push(`gallery ${img.src}: alt "${lang}" same as English`);
    }
});

if (warnings.length) {
    console.warn(`check-i18n: ${warnings.length} possibly untranslated string(s):`);
    const shown = process.env.I18N_VERBOSE ? warnings.length : 40;
    for (const w of warnings.slice(0, shown)) console.warn(`  ~ ${w}`);
    if (warnings.length > shown) console.warn(`  … and ${warnings.length - shown} more (I18N_VERBOSE=1 to list all)`);
}
if (errors.length) {
    console.error(`check-i18n: ${errors.length} error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
console.log(`check-i18n: ${LOCALES.join(", ")} OK`);
