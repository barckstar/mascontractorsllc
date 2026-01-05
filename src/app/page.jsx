import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "General Contractor in Richmond, VA | MAS Contractors",

  description:
    "Top-rated general contractor in Richmond, VA offering commercial and residential construction, remodeling, and home improvements. Free estimates available.",

  keywords: [
    "General Contractor Richmond VA",
    "Construction Company Richmond",
    "Commercial Construction Richmond",
    "Residential Contractor Richmond VA",
    "Kitchen Remodeling Richmond",
    "Bathroom Remodeling Richmond",
    "Home Improvement Richmond VA",
    "MAS Contractors"
  ],

  openGraph: {
    title: "General Contractor in Richmond, VA | MAS Contractors",
    description:
      "Expert general contracting services in Richmond, VA. Licensed and insured for residential and commercial projects.",
    url: "https://mascontractors.com",
    siteName: "MAS Contractors",
    images: [
      {
        url: "/img-1.jpg",
        width: 1200,
        height: 630,
        alt: "MAS Contractors – General Contractor in Richmond VA",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: "https://mascontractors.com",
  },
};

export default function Home() {
  return <HomeContent />;
}
