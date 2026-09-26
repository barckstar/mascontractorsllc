import dynamic from "next/dynamic";
import { pageMetadata } from "@/i18n/metadata";

const ServicesContent = dynamic(() => import("@/components/ServicesContent"), {
    loading: () => (
        <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center pt-32">
            <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return {
        ...pageMetadata(lang, "services", "/services"),
        robots: { index: true, follow: true },
    };
}

export default function ServicesPage() {
    return <ServicesContent />;
}
