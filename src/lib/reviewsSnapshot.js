// Fallback when the Places API isn't configured or fails. Kept apart from
// googleReviews.js so client components can import it without the fetch code.

// Real numbers copied by hand from the Google Business Profile.
// Update `asOf` together with the numbers.
export const REVIEWS_SNAPSHOT = {
    rating: 4.9,
    count: 7,
    asOf: "2026-09-25",
    reviews: [],
    mapsUrl: "https://maps.app.goo.gl/bvfykYDomsbJJxzk7",
    live: false,
};
