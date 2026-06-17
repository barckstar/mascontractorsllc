import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export const metadata = {
  title: "General Contractor Richmond, Chesterfield & Midlothian VA | MAS Contractors",

  description:
    "Top-rated Class A general contractor serving Richmond, Chesterfield County, Midlothian, Henrico & Glen Allen VA. Kitchens from $15K, bathrooms from $8K, decks from $8K. Licensed, insured. Free estimates.",

  keywords: [
    "General Contractor Richmond VA",
    "General Contractor Chesterfield County VA",
    "General Contractor Midlothian VA",
    "Construction Company Richmond",
    "Commercial Construction Richmond",
    "Residential Contractor Richmond VA",
    "Kitchen Remodeling Richmond VA",
    "Bathroom Remodeling Chesterfield VA",
    "Home Addition Midlothian VA",
    "Home Improvement Virginia",
    "MAS Contractors"
  ],

  openGraph: {
    title: "General Contractor Richmond, Chesterfield & Midlothian VA | MAS Contractors",
    description:
      "Class A licensed general contractor serving Richmond, Chesterfield, Midlothian & Henrico. Kitchens, bathrooms, additions, decks, roofing & more. Free estimates.",
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

