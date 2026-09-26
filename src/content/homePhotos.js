// Real project photos used on the home page, all taken from gallery.json so
// every one has alt text in every language. The page receives only the alt
// text of these paths, not the whole gallery.
export const HOME_PHOTOS = {
    hero: [
        "/gallery/FR5.jpg",
        "/gallery/BathroomRemodel-FreestandingTub.jpeg",
        "/gallery/the_haven.jpg",
        "/gallery/FinishCarpentryGalery8.png",
    ],
    about: ["/gallery/FR2.jpg", "/gallery/FinishCarpentryGalery6.png"],
    // Keyed by service slug.
    services: {
        "home-additions": "/gallery/Additions.jpeg",
        "kitchen-remodeling": "/gallery/Kitchen.jpeg",
        "bathroom-remodeling": "/gallery/Bathroom.jpeg",
        "decks-porches": "/gallery/Deck.jpeg",
        "roofing": "/gallery/RC6.jpg",
        "siding": "/gallery/Siding.jpeg",
    },
    // Work in progress, in build order; labels are home.buildStages.
    build: [
        "/gallery/RoomAddition-FootingTrench.jpeg",
        "/gallery/RoomAddition-BlockWall.jpeg",
        "/gallery/the_haven3.jpg",
        "/gallery/FR3.jpg",
    ],
    strip: [
        "/gallery/Kitchen.jpeg",
        "/gallery/multiple_bathrooms.jpg",
        "/gallery/Trim.jpeg",
        "/gallery/Roofing.jpeg",
        "/gallery/FR12.jpg",
        "/gallery/TileGalery1.png",
        "/gallery/the_haven.jpg",
        "/gallery/Windows.jpeg",
        "/gallery/RC3.JPG",
        "/gallery/FR7.jpg",
        "/gallery/Siding.jpeg",
        "/gallery/FinishCarpentryGalery7.png",
    ],
    finalCta: "/gallery/FR1.jpg",
};

export function homePhotoPaths() {
    const { services, finalCta, ...lists } = HOME_PHOTOS;
    return new Set([...Object.values(lists).flat(), ...Object.values(services), finalCta]);
}
