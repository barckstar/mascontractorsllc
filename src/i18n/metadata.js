import { getDictionary } from "./dictionaries";
import { OG_LOCALE, SITE_URL, alternatesFor, localePath } from "./config";

// Metadata for a static page whose texts live in dictionaries/<lang>.json
// under meta.<key>. Next replaces (doesn't merge) openGraph between layout and
// page, so every page sets its own full openGraph here.
export function pageMetadata(lang, key, path, { image } = {}) {
    const m = getDictionary(lang).meta[key];
    return {
        title: m.title,
        description: m.description,
        ...(m.keywords && { keywords: m.keywords }),
        alternates: alternatesFor(lang, path),
        openGraph: {
            title: m.ogTitle ?? m.title,
            description: m.ogDescription ?? m.description,
            url: SITE_URL + localePath(lang, path),
            siteName: "MAS Contractors",
            locale: OG_LOCALE[lang],
            type: "website",
            ...(image && { images: [{ url: image.url, width: 1200, height: 630, alt: m.ogImageAlt ?? m.title }] }),
        },
    };
}
