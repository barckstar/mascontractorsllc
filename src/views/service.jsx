import JsonLd from "@/components/JsonLd";
import { BUSINESS } from "@/content/business";
import { notFound } from "next/navigation";
import { getServices, getServiceSummaries, getServiceBySlug, getPostSummaries } from "@/content";
import { RELATED } from "@/content/related";
import { getDictionary } from "@/i18n/dictionaries";
import { OG_LOCALE, SITE_URL, alternatesFor, localePath, siteUrl } from "@/i18n/config";
import dynamic from "next/dynamic";
import PageSections from "@/i18n/PageSections";
import { pageTitle } from "@/i18n/metadata";

const ServicePageContent = dynamic(() => import("@/components/ServicePageContent"), {
    loading: () => (
        <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center pt-32">
            <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

// Same slugs in every language (en is the source of truth); scripts/check-i18n.mjs
// fails the build if a language is missing one.
export async function generateStaticParams() {
    return getServices("en").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const service = getServiceBySlug(lang, slug);
    if (!service) return {};
    const path = `/services/${service.slug}`;

    return {
        title: pageTitle(service.metaTitle),
        description: service.metaDescription,
        keywords: service.keywords,
        alternates: alternatesFor(lang, path),
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            url: SITE_URL + localePath(lang, path),
            siteName: "MAS Contractors LLC",
            locale: OG_LOCALE[lang],
            type: "website",
        },
        robots: { index: true, follow: true },
    };
}

export default async function ServicePage({ params }) {
    const { lang, slug } = await params;
    const service = getServiceBySlug(lang, slug);
    if (!service) notFound();
    const t = getDictionary(lang);
    const url = SITE_URL + localePath(lang, `/services/${service.slug}`);
    const related = RELATED[service.slug] ?? { services: [], posts: [] };
    const summaries = getServiceSummaries(lang);
    const relatedServices = related.services.map((s) => summaries.find((x) => x.slug === s)).filter(Boolean);
    const postsBySlug = new Map(getPostSummaries(lang).map((x) => [x.slug, x]));
    // Only what the cards show: the whole summary would bloat the RSC payload.
    const relatedPosts = related.posts.map((s) => postsBySlug.get(s)).filter(Boolean)
        .map(({ slug, title, excerpt }) => ({ slug, title, excerpt }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        // Points at the sitewide GeneralContractor emitted by the layout.
        "provider": { "@type": "GeneralContractor", "@id": `${BUSINESS.url}/#organization`, "name": BUSINESS.name },
        "areaServed": [
            { "@type": "City", "name": "Richmond" },
            { "@type": "City", "name": "North Chesterfield" },
            { "@type": "City", "name": "Midlothian" },
            { "@type": "City", "name": "Glen Allen" },
            { "@type": "City", "name": "Henrico" }
        ],
        "url": url,
        "inLanguage": lang
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
            { "@type": "ListItem", "position": 1, "name": t.breadcrumbs.home, "item": siteUrl(lang, "/") },
            { "@type": "ListItem", "position": 2, "name": t.breadcrumbs.services, "item": SITE_URL + localePath(lang, "/services") },
            { "@type": "ListItem", "position": 3, "name": service.title, "item": url }
        ]
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <PageSections lang={lang} names={["serviceDetail","beforeAfter"]}>
      <ServicePageContent
        service={service}
        services={relatedServices}
        posts={relatedPosts}
      />
    </PageSections>
        </>
    );
}
