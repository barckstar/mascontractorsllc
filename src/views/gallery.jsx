import dynamic from "next/dynamic";
import { getGallery } from "@/content";
import { pageMetadata } from "@/i18n/metadata";

const GalleryContent = dynamic(() => import("@/components/GalleryContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "gallery", "/gallery");
}

export default async function GalleryPage({ params }) {
  const { lang } = await params;
  return <GalleryContent gallery={getGallery(lang)} />;
}
