import dynamic from "next/dynamic";

const ServicesContent = dynamic(() => import("@/components/ServicesContent"), {
    loading: () => (
        <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center pt-32">
            <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export const metadata = {
    title: "General Contractor & Construction Services in Richmond, VA | MAS Contractors",
    description: "Explore our wide range of commercial and residential construction services in Richmond, VA. Specialized in Kitchens, Bathrooms, Flooring, Tile, Roofing, and Home Additions. Licensed & Insured.",
    keywords: [
        "Construction Services Richmond VA",
        "Kitchen Remodeling Richmond",
        "Bathroom Remodeling VA",
        "Commercial Construction Richmond",
        "Residential Contractors Richmond",
        "Tile Installation VA",
        "Roofing Services",
        "Home Additions Richmond"
    ],
    openGraph: {
        title: "General Contractor & Construction Services in Richmond VA | MAS Contractors",
        description: "Trusted general contractor in Richmond, VA offering kitchen remodeling, bathroom renovations, roofing, tile, flooring, and home additions. Licensed & insured. Free estimates.",
        url: "https://mascontractors.com/services",
        siteName: "MAS Contractors",
        images: [
            {
                url: "/img-3.jpg",
                width: 1200,
                height: 630,
                alt: "MAS Contractors Services",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: 'https://mascontractors.com/services',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ServicesPage() {
    return (
        <>
            <ServicesContent />
        </>
    );
}
