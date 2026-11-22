// Languages the site serves. English is the default and keeps the original,
// unprefixed URLs (/about, /services/…) so nothing that already ranks moves:
// its pages live in app/(en)/. Every other language lives under its own prefix
// and folder (app/es/ → /es/about, /es/services/…).
//
// Adding a language: add it here, add dictionaries/<lang>.json and
// content/<lang>/*.json, and copy app/es/ to app/<lang>/ changing the "es" in
// each bind() call. `npm run build` runs scripts/check-i18n.mjs first and
// fails listing every key the new language is missing.

export const LOCALES = ["en", "es"];
export const DEFAULT_LOCALE = "en";
export const SITE_URL = "https://mascontractors.com";

export const LANGUAGE_NAMES = { en: "English", es: "Español" };
export const OG_LOCALE = { en: "en_US", es: "es_US" };
export const DATE_LOCALE = { en: "en-US", es: "es-US" };

export function isLocale(value) {
    return LOCALES.includes(value);
}

// "/services/roofing" → "/es/services/roofing" for es, unchanged for en.
// Hashes and query strings ride along ("/contact#email" → "/es/contact#email").
export function localePath(lang, path = "/") {
    if (lang === DEFAULT_LOCALE || !path.startsWith("/")) return path;
    return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Absolute URL of a page, matching its canonical: the English home is the bare
// domain (no trailing slash), everything else is SITE_URL + its localized path.
export function siteUrl(lang, path = "/") {
    const p = localePath(lang, path);
    return SITE_URL + (p === "/" ? "" : p);
}

// The inverse: the language-neutral path of a URL pathname. Also strips an
// explicit /en prefix, which only exists as a redirect.
export function stripLocale(pathname = "/") {
    const [, first, ...rest] = pathname.split("/");
    const path = isLocale(first) ? "/" + rest.join("/") : pathname || "/";
    // While prerendering, usePathname() reports the home page as "/index";
    // left alone, the language switcher linked to /index and a 404 at /es/index.
    return path === "/index" ? "/" : path;
}

// Metadata `alternates` for one page: its own canonical plus hreflang links to
// every language and x-default (English).
export function alternatesFor(lang, path = "/") {
    const url = (l) => SITE_URL + (localePath(l, path) === "/" ? "" : localePath(l, path));
    return {
        canonical: url(lang),
        languages: {
            ...Object.fromEntries(LOCALES.map((l) => [l, url(l)])),
            "x-default": url(DEFAULT_LOCALE),
        },
    };
}
