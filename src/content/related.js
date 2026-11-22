// Topic links between service pages and blog posts (slugs are the same in
// every language). Every service appears in three other services' lists, so
// none depends on the home page alone for internal links.
export const RELATED = {
    "kitchen-remodeling": {
        services: ["tile-work", "trim-carpentry", "bathroom-remodeling"],
        posts: ["kitchen-remodel-cost-richmond-va-2025", "kitchen-remodel-timeline-richmond-va", "every-remodel-is-different-free-estimate-richmond-va"],
    },
    "bathroom-remodeling": {
        services: ["tile-work", "kitchen-remodeling", "trim-carpentry"],
        posts: ["bathroom-remodel-cost-richmond-va-2026", "bathroom-remodel-roi-richmond-va", "tile-work-101-best-tile-choices-richmond"],
    },
    roofing: {
        services: ["siding", "window-replacement", "home-additions"],
        posts: ["roof-replacement-materials-permits-richmond-va", "how-long-does-a-roof-last-virginia", "roof-replacement-siding-permit-chesterfield-county-virginia"],
    },
    "home-additions": {
        services: ["room-additions", "roofing", "decks-porches"],
        posts: ["home-addition-cost-richmond-va-2026", "home-addition-permit-chesterfield-county-virginia", "room-addition-vs-home-addition-richmond-va"],
    },
    "decks-porches": {
        services: ["door-installation", "siding", "home-additions"],
        posts: ["deck-cost-richmond-va-2026", "deck-permit-chesterfield-county-virginia", "virginia-contractor-license-how-to-verify"],
    },
    siding: {
        services: ["roofing", "window-replacement", "door-installation"],
        posts: ["siding-materials-richmond-va-fiber-cement-vinyl-pitfalls", "hardie-board-vs-vinyl-siding-virginia", "roof-replacement-siding-permit-chesterfield-county-virginia"],
    },
    "window-replacement": {
        services: ["door-installation", "siding", "trim-carpentry"],
        posts: ["window-replacement-cost-richmond-va-2026", "front-door-installation-cost-richmond-va", "every-remodel-is-different-free-estimate-richmond-va"],
    },
    "door-installation": {
        services: ["window-replacement", "trim-carpentry", "decks-porches"],
        posts: ["front-door-installation-cost-richmond-va", "window-replacement-cost-richmond-va-2026", "trim-carpentry-ideas-richmond-home"],
    },
    "trim-carpentry": {
        services: ["door-installation", "kitchen-remodeling", "room-additions"],
        posts: ["trim-carpentry-ideas-richmond-home", "tile-work-101-best-tile-choices-richmond", "how-to-choose-general-contractor-richmond-va"],
    },
    "room-additions": {
        services: ["home-additions", "trim-carpentry", "tile-work"],
        posts: ["room-addition-vs-home-addition-richmond-va", "home-addition-permit-chesterfield-county-virginia", "home-addition-cost-richmond-va-2026"],
    },
    "tile-work": {
        services: ["bathroom-remodeling", "kitchen-remodeling", "room-additions"],
        posts: ["tile-work-101-best-tile-choices-richmond", "bathroom-remodel-cost-richmond-va-2026", "kitchen-remodel-cost-richmond-va-2025"],
    },
};
