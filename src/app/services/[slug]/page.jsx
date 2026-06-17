import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/lib/servicesData";
import dynamic from "next/dynamic";

const ServicePageContent = dynamic(() => import("@/components/ServicePageContent"), {
    loading: () => (
        <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center pt-32">
            <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export async function generateStaticParams() {
    return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
    const service = getServiceBySlug(params.slug);
    if (!service) return {};

    return {
        title: service.metaTitle,
        description: service.metaDescription,
        keywords: service.keywords,
        alternates: {
            canonical: `https://mascontractors.com/services/${service.slug}`,
        },
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            url: `https://mascontractors.com/services/${service.slug}`,
            siteName: "MAS Contractors LLC",
            images: [{ url: service.img, width: 1200, height: 630, alt: service.imgAlt }],
            locale: "en_US",
            type: "website",
        },
        robots: { index: true, follow: true },
    };
}

export default function ServicePage({ params }) {
    const service = getServiceBySlug(params.slug);
    if (!service) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "GeneralContractor",
            "name": "MAS Contractors LLC",
            "url": "https://mascontractors.com",
            "telephone": "+18048334600",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "411 Branchway Rd Suite 107",
                "addressLocality": "North Chesterfield",
                "addressRegion": "VA",
                "postalCode": "23236",
                "addressCountry": "US"
            }
        },
        "areaServed": [
            { "@type": "City", "name": "Richmond" },
            { "@type": "City", "name": "North Chesterfield" },
            { "@type": "City", "name": "Midlothian" },
            { "@type": "City", "name": "Glen Allen" },
            { "@type": "City", "name": "Henrico" }
        ],
        "url": `https://mascontractors.com/services/${service.slug}`,
        "offers": {
            "@type": "Offer",
            "description": "Free Estimate",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mascontractors.com" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://mascontractors.com/services" },
            { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://mascontractors.com/services/${service.slug}` }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ServicePageContent service={service} />
        </>
    );
}
