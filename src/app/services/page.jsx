import React from "react";
import ServicesContent from "@/components/ServicesContent";

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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does remodeling cost in Richmond VA?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Remodeling costs in Richmond vary depending on the scope and materials. Kitchen remodels typically range from $15k to $50k+, while bathrooms can range from $10k to $30k+. Contact MAS Contractors for a free, detailed estimate tailored to your project."
                }
            },
            {
                "@type": "Question",
                "name": "Are you licensed and insured?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, MAS Contractors LLC is fully licensed and insured to operate in Virginia. We carry general liability and workers' compensation insurance for your peace of mind."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer free estimates?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer completely free, no-obligation estimates. We visit your site, discuss your needs, and provide a comprehensive quote."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicesContent />
        </>
    );
}
