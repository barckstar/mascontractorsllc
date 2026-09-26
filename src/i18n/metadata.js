import { getDictionary } from "./dictionaries";
import { OG_LOCALE, SITE_URL, alternatesFor, localePath } from "./config";

// Metadata for a static page whose texts live in dictionaries/<lang>.json
// under meta.<key>. Next replaces (doesn't merge) openGraph between layout and
// page, so every page sets its own full openGraph here. The picture is not set
// here: each route has an opengraph-image.jsx (see src/views/og.jsx).
export function pageMetadata(lang, key, path) {
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
        },
    };
}
