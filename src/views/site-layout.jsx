import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SocialMediaBar } from "@/components/socialMedia";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { OG_LOCALE, SITE_URL, localePath } from "@/i18n/config";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = getDictionary(lang).meta.site;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.title, template: m.template },
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: "MAS Contractors LLC" }],
    creator: "MAS Contractors LLC",
    publisher: "MAS Contractors LLC",
    formatDetection: { email: false, address: true, telephone: true },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: SITE_URL + localePath(lang, "/"),
      siteName: "MAS Contractors LLC",
      images: [{ url: "/logo-3D.png", width: 800, height: 600 }],
      locale: OG_LOCALE[lang],
      type: "website",
    },
  };
}

// Everything around a page in one language: dictionary, navbar, footer and the
// organization JSON-LD. Used by app/(en)/layout.js and app/es/layout.js; the
// <html> itself comes from the single root layout (app/layout.js), which is
// what lets Next switch languages without a full page load.
export default async function SiteLayout({ children, params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const m = dict.meta.site;
  // `meta` is only read on the server; keep it out of the client payload.
  const { meta, ...clientDict } = dict;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": "https://mascontractors.com/#organization",
    "name": "MAS Contractors LLC",
    "legalName": "MAS Contractors LLC",
    "description": m.orgDescription,
    "image": "https://mascontractors.com/logo-3D.png",
    "logo": "https://mascontractors.com/logo-3D.png",
    "url": "https://mascontractors.com",
    "telephone": "+18048334600",
    "email": "info@mascontractors.com",
    "foundingYear": "2014",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "411 Branchway Rd Suite 107",
      "addressLocality": "North Chesterfield",
      "addressRegion": "VA",
      "postalCode": "23236",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5015,
      "longitude": -77.5651
    },
    "areaServed": [
      { "@type": "City", "name": "Richmond", "sameAs": "https://www.wikidata.org/wiki/Q43668" },
      { "@type": "City", "name": "North Chesterfield" },
      { "@type": "City", "name": "Midlothian" },
      { "@type": "City", "name": "Glen Allen" },
      { "@type": "City", "name": "Henrico" },
      { "@type": "AdministrativeArea", "name": "Chesterfield County" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": m.catalogName,
      "itemListElement": m.catalog.map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } }))
    },
    "knowsAbout": [
      "General Contracting",
      "Kitchen Remodeling",
      "Bathroom Remodeling",
      "Home Additions",
      "Roofing",
      "James Hardie Siding",
      "Trim Carpentry",
      "Tile Installation",
      "Commercial Construction",
      "Residential Remodeling",
      "Deck Building"
    ],
    "sameAs": [
      "https://www.facebook.com/buildandrenovaterva?_rdr",
      "https://www.instagram.com/mas_contractors/",
      "https://www.thumbtack.com/va/richmond/disability-retrofit/mas-contractors-llc/service/292433618750267588"
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <>
        <I18nProvider lang={lang} dict={clientDict}>
        <MotionProvider>
          <Navbar />
          <SocialMediaBar />
          {children}
          <SpeedInsights />
          <Footer />
        </MotionProvider>
        </I18nProvider>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    </>
  );
}
