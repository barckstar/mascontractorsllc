import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SocialMediaBar } from "@/components/socialMedia";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import MotionProvider from "@/components/MotionProvider";

export const metadata = {
  metadataBase: new URL("https://mascontractors.com"),
  title: {
    default: "MAS Contractors | General Contractor in Richmond, VA | Free Estimates",
    template: "%s | MAS Contractors LLC"
  },
  description: "Looking for expert remodeling in Richmond, VA? MAS Contractors specializes in kitchens, bathrooms, and commercial construction. 100% satisfaction guaranteed. Get your free quote today!",
  keywords: ["General Contractor Richmond VA", "Kitchen Remodeling", "Bathroom Remodeling", "Commercial Construction Richmond", "Home Renovation Virginia"],
  authors: [{ name: "MAS Contractors LLC" }],
  creator: "MAS Contractors LLC",
  publisher: "MAS Contractors LLC",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "MAS Contractors | Expert Remodeling in Richmond, VA",
    description: "Quality construction and remodeling services. From kitchens to commercial spaces.",
    url: "https://mascontractors.com",
    siteName: "MAS Contractors LLC",
    images: [
      {
        url: "/logo-3D.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": "https://mascontractors.com/#organization",
    "name": "MAS Contractors LLC",
    "legalName": "MAS Contractors LLC",
    "description": "MAS Contractors LLC is a licensed Class A General Contractor based in North Chesterfield, Virginia. We specialize in kitchen remodeling, bathroom remodeling, home additions, roofing, siding, trim carpentry, tile work, and commercial construction throughout Richmond, Chesterfield County, Midlothian, Glen Allen, and Henrico, VA. Certified James Hardie installer. Free estimates.",
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
      "name": "Construction & Remodeling Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Remodeling" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Remodeling" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Home Additions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roofing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Siding Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trim Carpentry" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tile Work" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Construction" } }
      ]
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <Navbar />
          <SocialMediaBar />
          {children}
          <SpeedInsights />
          <Footer />
        </MotionProvider>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
