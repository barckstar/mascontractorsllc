import dynamic from "next/dynamic";
import { getGoogleReviews } from "@/lib/googleReviews";
import { pageMetadata } from "@/i18n/metadata";

const ContactPageContent = dynamic(() => import("@/components/ContactPageContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "contact", "/contact");
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const reviews = await getGoogleReviews(lang);
  return <ContactPageContent reviews={reviews} />;
}
