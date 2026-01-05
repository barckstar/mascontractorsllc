import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SocialMediaBar } from "@/components/socialMedia";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://mascontractors.com'),
  title: {
    default: "MAS Contractors | General Contractor in Richmond, VA",
    template: "%s | MAS Contractors"
  },
  description: "Premier General Contractor in Richmond, VA providing commercial and residential construction services. Licensed, insured, and committed to quality.",
  alternates: {
    canonical: 'https://mascontractors.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "MAS Contractors LLC",
    "image": "https://mascontractors.com/logo-3D.png",
    "@id": "https://mascontractors.com",
    "url": "https://mascontractors.com",
    "telephone": "+18048334600",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "411 Branchway Rd Suite 107",
      "addressLocality": "North Chesterfield",
      "addressRegion": "VA",
      "postalCode": "23236",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Richmond" },
      { "@type": "City", "name": "North Chesterfield" },
      { "@type": "City", "name": "Midlothian" },
      { "@type": "City", "name": "Glen Allen" },
      { "@type": "City", "name": "Henrico" }
    ],
    "knowsAbout": [
      "Commercial Construction",
      "Residential Remodeling",
      "Tile Installation",
      "Cabinetry",
      "Carpentry",
      "Framing",
      "Drywall",
      "Painting"
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:00",
      "closes": "16:00"
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <SocialMediaBar />
        {children}
        <SpeedInsights />
        <Footer />
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
