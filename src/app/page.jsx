import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

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

