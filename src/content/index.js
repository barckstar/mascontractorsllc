// Localized content. Long-form text lives in one JSON file per language
// (content/<lang>/services.json, blog.json); the gallery is structural data
// shared by all languages, with its alt text localized per image.
import servicesEn from "./en/services.json";
import servicesEs from "./es/services.json";
import blogEn from "./en/blog.json";
import blogEs from "./es/blog.json";
import gallery from "./gallery.json";
import { DEFAULT_LOCALE } from "@/i18n/config";

const SERVICES = { en: servicesEn, es: servicesEs };
const POSTS = { en: blogEn, es: blogEs };

export function getServices(lang) {
    return SERVICES[lang] ?? SERVICES[DEFAULT_LOCALE];
}

export function getServiceBySlug(lang, slug) {
    return getServices(lang).find((s) => s.slug === slug) ?? null;
}

export function getPosts(lang) {
    return POSTS[lang] ?? POSTS[DEFAULT_LOCALE];
}

export function getPostBySlug(lang, slug) {
    return getPosts(lang).find((p) => p.slug === slug) ?? null;
}

// Gallery images with `alt` resolved to one language.
export function getGallery(lang) {
    return {
        categories: gallery.categories,
        images: gallery.images.map((img) => ({ ...img, alt: img.alt[lang] ?? img.alt[DEFAULT_LOCALE] })),
    };
}
