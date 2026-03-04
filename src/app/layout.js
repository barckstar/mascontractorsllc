import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SocialMediaBar } from "@/components/socialMedia";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5015, // Coordenadas aproximadas para North Chesterfield
      "longitude": -77.5651
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
    "sameAs": [
      "https://www.facebook.com/buildandrenovaterva?_rdr",
      "https://www.instagram.com/mas_contractors/",
      "https://www.thumbtack.com/va/richmond/disability-retrofit/mas-contractors-llc/service/292433618750267588"
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
