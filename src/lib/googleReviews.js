// Google reviews, read live from the Places API (New) on the server.
//
// Needs two server-only env vars (no NEXT_PUBLIC_ — the key must never reach
// the browser):
//   GOOGLE_PLACES_API_KEY  key restricted to "Places API (New)"
//   GOOGLE_PLACE_ID        the Business Profile's Place ID
//
// Without them, or if Google fails, it returns REVIEWS_SNAPSHOT with no review
// texts: the site shows the real rating and count, never invented reviews.

import { REVIEWS_SNAPSHOT } from "./reviewsSnapshot";

const REVALIDATE_SECONDS = 6 * 60 * 60; // ~120 calls/month per language, well inside the free tier

// `lang` only changes Google's relative dates ("a month ago" / "hace un mes");
// review texts are always shown as the author wrote them (originalText).
export async function getGoogleReviews(lang = "en") {
    const key = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (!key || !placeId) return REVIEWS_SNAPSHOT;

    try {
        const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`;
        const res = await fetch(url, {
            headers: {
                "X-Goog-Api-Key": key,
                "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
            },
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) throw new Error(`Places API ${res.status}`);
        const place = await res.json();

        return {
            rating: place.rating ?? REVIEWS_SNAPSHOT.rating,
            count: place.userRatingCount ?? REVIEWS_SNAPSHOT.count,
            asOf: null,
            mapsUrl: place.googleMapsUri ?? REVIEWS_SNAPSHOT.mapsUrl,
            live: true,
            reviews: (place.reviews ?? [])
                .filter((r) => r.text?.text || r.originalText?.text)
                .map((r) => ({
                    id: r.name,
                    rating: r.rating,
                    text: (r.originalText ?? r.text).text,
                    when: r.relativePublishTimeDescription,
                    publishTime: r.publishTime,
                    author: r.authorAttribution?.displayName ?? "Google user",
                    authorUrl: r.authorAttribution?.uri ?? null,
                    authorPhoto: r.authorAttribution?.photoUri ?? null,
                    url: r.googleMapsUri ?? null,
                })),
        };
    } catch (err) {
        console.error("[googleReviews]", err);
        return REVIEWS_SNAPSHOT;
    }
}

// Link that opens the "write a review" box straight away. Falls back to the
// Maps listing when the Place ID isn't configured.
export function writeReviewUrl() {
    const placeId = process.env.GOOGLE_PLACE_ID;
    return placeId
        ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
        : REVIEWS_SNAPSHOT.mapsUrl;
}
