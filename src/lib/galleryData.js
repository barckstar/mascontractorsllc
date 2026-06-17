// Gallery data — single source of truth.
// To add a new image: drop the file in /public/gallery/ and add an entry here.
// Fields: src, width, height, alt (SEO), category, project (optional), featured (optional)

export const CATEGORIES = [
    "All",
    "Kitchen",
    "Bathroom",
    "Home Addition",
    "Trim & Carpentry",
    "Tile Work",
    "Full Renovation",
    "Deck",
    "Roofing",
    "Siding",
    "Windows & Doors",
    "Commercial",
];

export const galleryData = [
    // ── Kitchen ─────────────────────────────────────────────────────────────
    {
        src: "/gallery/Kitchen.jpeg",
        width: 1200, height: 900,
        alt: "Kitchen remodel by MAS Contractors in Richmond, VA — custom cabinets and quartz countertops",
        category: "Kitchen",
        featured: true,
    },

    // ── Bathroom ─────────────────────────────────────────────────────────────
    {
        src: "/gallery/Bathroom.jpeg",
        width: 1200, height: 1600,
        alt: "Custom bathroom remodel by MAS Contractors in Chesterfield, VA — tile shower and modern vanity",
        category: "Bathroom",
        featured: true,
    },
    {
        src: "/gallery/multiple_bathrooms.jpg",
        width: 1920, height: 1440,
        alt: "Bathroom remodel in Richmond, VA by MAS Contractors — custom tile and modern fixtures",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms1.jpg",
        width: 1920, height: 1440,
        alt: "Bathroom renovation in Chesterfield, VA by MAS Contractors — custom tile and fixtures",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms2.JPG",
        width: 960, height: 1280,
        alt: "Full bathroom remodel in Midlothian, VA by MAS Contractors LLC",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms3.JPG",
        width: 960, height: 1280,
        alt: "Bathroom tile installation in North Chesterfield, VA by MAS Contractors — walk-in shower",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms4.JPG",
        width: 960, height: 1280,
        alt: "Master bathroom remodel in Henrico, VA by MAS Contractors — double vanity and soaking tub",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms5.jpg",
        width: 1920, height: 1440,
        alt: "Bathroom renovation in Glen Allen, VA by MAS Contractors — freestanding tub and tile surround",
        category: "Bathroom",
    },
    {
        src: "/gallery/multiple_bathrooms6.jpg",
        width: 1920, height: 1440,
        alt: "Complete bathroom remodel in Richmond, VA by MAS Contractors — modern fixtures and large tile",
        category: "Bathroom",
    },

    // ── Home Addition ────────────────────────────────────────────────────────
    {
        src: "/gallery/Additions.jpeg",
        width: 1200, height: 1600,
        alt: "Home addition project completed by MAS Contractors in Richmond, VA — room addition with matching exterior finishes",
        category: "Home Addition",
        featured: true,
    },
    {
        src: "/gallery/CustomRoomAdditions.png",
        width: 358, height: 306,
        alt: "Custom room addition built by MAS Contractors in North Chesterfield, VA — seamless exterior match",
        category: "Home Addition",
    },
    {
        src: "/gallery/CustomRoomAdditions1.png",
        width: 639, height: 857,
        alt: "Custom home addition by MAS Contractors in Richmond, VA — framing and structure phase",
        category: "Home Addition",
    },
    {
        src: "/gallery/CustomRoomAdditions2.png",
        width: 612, height: 822,
        alt: "Room addition construction in Midlothian, VA by MAS Contractors — interior framing detail",
        category: "Home Addition",
    },
    {
        src: "/gallery/CustomRoomAdditions3.png",
        width: 618, height: 833,
        alt: "Finished custom room addition by MAS Contractors in Chesterfield County, VA",
        category: "Home Addition",
    },

    // ── Trim & Carpentry ─────────────────────────────────────────────────────
    {
        src: "/gallery/Trim.jpeg",
        width: 1600, height: 1200,
        alt: "Trim carpentry and crown molding installation by MAS Contractors in Richmond, VA",
        category: "Trim & Carpentry",
        featured: true,
    },
    {
        src: "/gallery/FinishCarpentry.png",
        width: 584, height: 392,
        alt: "Finish carpentry and trim work by MAS Contractors in Richmond, VA — crown molding installation",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery1.png",
        width: 401, height: 543,
        alt: "Crown molding installation in Richmond, VA by MAS Contractors — detail view",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery2.png",
        width: 443, height: 597,
        alt: "Custom trim carpentry by MAS Contractors in Chesterfield, VA — wainscoting and baseboard detail",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery3.png",
        width: 366, height: 547,
        alt: "Coffered ceiling installation by MAS Contractors in Richmond, VA — finish carpentry work",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery4.png",
        width: 472, height: 606,
        alt: "Built-in shelving and finish carpentry by MAS Contractors in Midlothian, VA",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery5.png",
        width: 889, height: 573,
        alt: "Interior trim carpentry by MAS Contractors in North Chesterfield, VA — door casing and crown molding",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery6.png",
        width: 460, height: 613,
        alt: "Custom millwork and trim installation by MAS Contractors in Henrico, VA",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery7.png",
        width: 454, height: 557,
        alt: "Finish carpentry detail — wainscoting panel installation by MAS Contractors in Richmond, VA",
        category: "Trim & Carpentry",
    },
    {
        src: "/gallery/FinishCarpentryGalery8.png",
        width: 844, height: 582,
        alt: "Custom built-in bookcase by MAS Contractors in Chesterfield County, VA",
        category: "Trim & Carpentry",
    },

    // ── Tile Work ────────────────────────────────────────────────────────────
    {
        src: "/gallery/Tile.png",
        width: 428, height: 573,
        alt: "Tile installation by MAS Contractors in Richmond, VA — large format floor tile in bathroom",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery1.png",
        width: 1251, height: 833,
        alt: "Custom tile work by MAS Contractors in Chesterfield, VA — bathroom floor and wall tile",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery2.png",
        width: 617, height: 921,
        alt: "Tile shower installation in Richmond, VA by MAS Contractors — subway tile with niche",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery3.png",
        width: 671, height: 918,
        alt: "Porcelain tile installation by MAS Contractors in Henrico, VA — kitchen backsplash",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery4.png",
        width: 644, height: 860,
        alt: "Custom tile work in Midlothian, VA by MAS Contractors — large format tile floor",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery5.png",
        width: 648, height: 873,
        alt: "Tile installation detail by MAS Contractors in North Chesterfield, VA — herringbone pattern",
        category: "Tile Work",
    },
    {
        src: "/gallery/TileGalery6.png",
        width: 681, height: 907,
        alt: "Bathroom tile remodel in Richmond, VA by MAS Contractors — walk-in shower with bench",
        category: "Tile Work",
    },

    // ── Full Renovation ──────────────────────────────────────────────────────
    {
        src: "/gallery/the_haven.jpg",
        width: 1840, height: 1920,
        alt: "The Haven — full home renovation by MAS Contractors in Richmond, VA",
        category: "Full Renovation",
        project: "The Haven",
        featured: true,
    },
    {
        src: "/gallery/the_haven1.jpg",
        width: 1440, height: 1920,
        alt: "The Haven renovation by MAS Contractors — kitchen and living area transformation in Richmond, VA",
        category: "Full Renovation",
        project: "The Haven",
    },
    {
        src: "/gallery/the_haven2.jpg",
        width: 1440, height: 1920,
        alt: "The Haven project by MAS Contractors in Richmond, VA — custom finish carpentry and built-ins",
        category: "Full Renovation",
        project: "The Haven",
    },
    {
        src: "/gallery/the_haven3.jpg",
        width: 1440, height: 1920,
        alt: "The Haven home renovation in Richmond, VA by MAS Contractors — completed interior",
        category: "Full Renovation",
        project: "The Haven",
    },
    {
        src: "/gallery/FR1.jpg",
        width: 1332, height: 1920,
        alt: "Full home renovation project by MAS Contractors in Richmond, VA — before and during construction",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR2.jpg",
        width: 1920, height: 1280,
        alt: "Full renovation by MAS Contractors in Richmond, VA — framing and structural work",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR3.jpg",
        width: 1920, height: 1280,
        alt: "Home renovation in Chesterfield, VA by MAS Contractors — interior demo and rebuild",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR4.jpg",
        width: 1920, height: 1280,
        alt: "Full gut renovation completed by MAS Contractors in the Richmond, VA area",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR5.jpg",
        width: 1920, height: 1280,
        alt: "Richmond, VA home renovation by MAS Contractors — drywall and finish phase",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR6.jpg",
        width: 1920, height: 1280,
        alt: "Complete home renovation in Henrico, VA by MAS Contractors LLC",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR7.jpg",
        width: 1920, height: 1280,
        alt: "Full interior renovation by MAS Contractors in Chesterfield County, VA",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR8.jpg",
        width: 1920, height: 1280,
        alt: "Home remodel project by MAS Contractors in Midlothian, VA — finished interior",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR9.jpg",
        width: 1920, height: 1280,
        alt: "Full renovation project in North Chesterfield, VA by MAS Contractors — kitchen and living area",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR10.jpg",
        width: 1920, height: 1280,
        alt: "Residential renovation completed by MAS Contractors in Richmond, VA — open floor plan remodel",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR11.jpg",
        width: 1920, height: 1280,
        alt: "Full gut renovation in Richmond, VA by MAS Contractors — finished result",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR12.jpg",
        width: 1920, height: 1280,
        alt: "Home renovation in Glen Allen, VA completed by MAS Contractors LLC",
        category: "Full Renovation",
    },
    {
        src: "/gallery/FR13.jpg",
        width: 1920, height: 1280,
        alt: "Full home renovation project in the Richmond, VA metro by MAS Contractors",
        category: "Full Renovation",
    },

    // ── Deck ─────────────────────────────────────────────────────────────────
    {
        src: "/gallery/Deck.jpeg",
        width: 1146, height: 1600,
        alt: "Custom composite deck built by MAS Contractors in Chesterfield County, VA — Trex decking with railing",
        category: "Deck",
        featured: true,
    },

    // ── Roofing ──────────────────────────────────────────────────────────────
    {
        src: "/gallery/Roofing.jpeg",
        width: 1516, height: 852,
        alt: "Roof replacement by MAS Contractors in Chesterfield County, VA — architectural shingle installation",
        category: "Roofing",
        featured: true,
    },

    // ── Siding ───────────────────────────────────────────────────────────────
    {
        src: "/gallery/Siding.jpeg",
        width: 1024, height: 682,
        alt: "James Hardie fiber cement siding installed by MAS Contractors in Richmond, VA — certified Hardie installer",
        category: "Siding",
        featured: true,
    },

    // ── Windows & Doors ──────────────────────────────────────────────────────
    {
        src: "/gallery/Windows.jpeg",
        width: 1200, height: 900,
        alt: "Energy-efficient window replacement by MAS Contractors in Chesterfield, VA — double-hung vinyl windows",
        category: "Windows & Doors",
        featured: true,
    },
    {
        src: "/gallery/Doors.jpeg",
        width: 800, height: 1067,
        alt: "Entry door installation by MAS Contractors in Richmond, VA — fiberglass exterior door with trim",
        category: "Windows & Doors",
    },

    // ── Commercial ───────────────────────────────────────────────────────────
    {
        src: "/gallery/Berkadia4.jpg",
        width: 1440, height: 1920,
        alt: "Commercial construction project for Berkadia in Richmond, VA — completed by MAS Contractors LLC",
        category: "Commercial",
        project: "Berkadia",
        featured: true,
    },
    {
        src: "/gallery/RC1.JPG",
        width: 1024, height: 683,
        alt: "Residential construction project by MAS Contractors in Richmond, VA — structural framing phase",
        category: "Commercial",
    },
    {
        src: "/gallery/RC2.JPG",
        width: 1024, height: 683,
        alt: "Residential remodeling by MAS Contractors in Chesterfield, VA — construction in progress",
        category: "Commercial",
    },
    {
        src: "/gallery/RC3.JPG",
        width: 924, height: 1385,
        alt: "Home construction project in North Chesterfield, VA by MAS Contractors LLC",
        category: "Commercial",
    },
    {
        src: "/gallery/RC4.JPG",
        width: 1024, height: 683,
        alt: "Residential construction in Midlothian, VA by MAS Contractors — foundation and framing",
        category: "Commercial",
    },
    {
        src: "/gallery/RC5.JPG",
        width: 1024, height: 683,
        alt: "Construction project completed by MAS Contractors in Henrico County, VA",
        category: "Commercial",
    },
    {
        src: "/gallery/RC6.jpg",
        width: 958, height: 683,
        alt: "Residential building project in Richmond, VA by MAS Contractors — exterior construction",
        category: "Commercial",
    },
];
