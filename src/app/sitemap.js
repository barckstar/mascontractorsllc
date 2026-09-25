import { getPosts, getServices } from "@/content";
import { LOCALES, alternatesFor } from "@/i18n/config";

// One entry per page per language, each listing all its language versions
// (hreflang in the sitemap, on top of the <link rel="alternate"> in each page).
export default function sitemap() {
    const pages = [
        { path: "/", changeFrequency: "weekly", priority: 1 },
        { path: "/services", changeFrequency: "monthly", priority: 0.9 },
        ...getServices("en").map((s) => ({ path: `/services/${s.slug}`, changeFrequency: "monthly", priority: 0.9 })),
        { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
        ...getPosts("en").map((p) => ({
            path: `/blog/${p.slug}`,
            changeFrequency: "yearly",
            priority: 0.7,
            lastModified: new Date(p.publishDate),
        })),
        { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
        { path: "/about", changeFrequency: "yearly", priority: 0.6 },
        { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
    ];

    return pages.flatMap(({ path, lastModified = new Date(), ...rest }) =>
        LOCALES.map((lang) => {
            const { canonical, languages } = alternatesFor(lang, path);
            return { url: canonical, lastModified, alternates: { languages }, ...rest };
        })
    );
}
