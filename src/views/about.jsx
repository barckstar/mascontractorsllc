import dynamic from "next/dynamic";
import { getGallery } from "@/content";
import { aboutPhotoPaths } from "@/content/aboutPhotos";
import { pageMetadata } from "@/i18n/metadata";

const AboutPageContent = dynamic(() => import("@/components/AboutPageContent"), {
  loading: () => (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#9fe300] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "about", "/about");
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const paths = aboutPhotoPaths();
  const photos = Object.fromEntries(
    getGallery(lang).images
      .filter((img) => paths.has(img.src))
      .map(({ src, width, height, alt }) => [src, { src, width, height, alt }])
  );
  return <AboutPageContent photos={photos} />;
}
