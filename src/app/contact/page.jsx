import dynamic from "next/dynamic";

const ContactPageContent = dynamic(() => import("@/components/ContactPageContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export const metadata = {
  title: "Contact MAS Contractors | General Contractor in Richmond VA",

  description:
    "Contact MAS Contractors LLC, a licensed and insured general contractor serving Richmond, VA and surrounding areas. Call (804) 833-4600 for a free estimate today.",

  keywords: [
    "Contact General Contractor Richmond VA",
    "MAS Contractors Contact",
    "Construction Company Richmond VA",
    "Remodeling Contractor Richmond",
    "Commercial Construction Richmond VA",
    "Residential Contractor Richmond",
    "Free Construction Estimate Richmond VA",
    "MAS Contractors LLC Phone Number"
  ],

  openGraph: {
    title: "Contact MAS Contractors | Richmond VA General Contractor",
    description:
      "Get in touch with MAS Contractors LLC for residential or commercial construction in Richmond, VA. Call now for a free estimate.",
    url: "https://mascontractors.com/contact",
    siteName: "MAS Contractors",
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: "https://mascontractors.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}