import AboutPageContent from "@/components/AboutPageContent";

export const metadata = {
  title: "About MAS Contractors | Licensed General Contractor in Richmond VA",

  description:
    "Learn about MAS Contractors LLC, a family-owned, licensed and insured Class A General Contractor serving Richmond, VA and surrounding areas. Built on trust, quality craftsmanship, and integrity.",

  keywords: [
    "About MAS Contractors",
    "General Contractor Richmond VA",
    "Licensed Contractor Virginia",
    "Family Owned Construction Company Richmond",
    "Residential and Commercial Contractor Richmond",
    "MAS Contractors LLC"
  ],

  openGraph: {
    title: "About MAS Contractors | Richmond VA General Contractor",
    description:
      "Discover the story behind MAS Contractors LLC, a trusted family-owned general contractor serving Richmond, VA with residential and commercial construction services.",
    url: "https://mascontractors.com/about",
    siteName: "MAS Contractors",
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: "https://mascontractors.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}