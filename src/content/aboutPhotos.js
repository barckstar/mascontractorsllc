// Real project photos for the About page, resolved from gallery.json so
// every one keeps its localized alt text.
export const ABOUT_PHOTOS = {
    hero: "/gallery/FR4.jpg",
    collageMain: "/gallery/FR9.jpg",
    collageDetail: "/gallery/FinishCarpentryGalery1.png",
    finalCta: "/gallery/FR6.jpg",
};

export function aboutPhotoPaths() {
    return new Set(Object.values(ABOUT_PHOTOS));
}
