import React from "react";
import GalleryContent from "@/components/GalleryContent";

export const metadata = {
  title: "Construction Project Gallery | MAS Contractors Richmond VA",
  description: "View our portfolio of commercial and residential construction projects in Richmond, VA. Kitchens, bathrooms, roofing, patios, and more.",
  keywords: [
    "Construction Gallery Richmond",
    "Remodeling Portfolio VA",
    "Kitchen Remodeling Photos",
    "Bathroom Renovation Gallery",
    "Commercial Construction Projects",
    "MAS Contractors Work"
  ],
  openGraph: {
    title: "Construction Project Gallery | MAS Contractors Richmond VA",
    description: "Browse our gallery of completed construction and remodeling projects in Richmond, VA. Quality craftsmanship you can see.",
    url: "https://mascontractors.com/gallery",
    siteName: "MAS Contractors",
    images: [
      {
        url: "/img-1.jpg",
        width: 1200,
        height: 630,
        alt: "MAS Contractors Project Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: 'https://mascontractors.com/gallery',
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
