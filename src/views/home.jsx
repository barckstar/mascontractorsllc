import HomeContent from "@/components/HomeContent";
import { getGoogleReviews } from "@/lib/googleReviews";
import { getGallery, getPostSummaries } from "@/content";
import { homePhotoPaths } from "@/content/homePhotos";
import { pageMetadata } from "@/i18n/metadata";
import PageSections from "@/i18n/PageSections";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "home", "/");
}

export default async function Home({ params }) {
  const { lang } = await params;
  const reviews = await getGoogleReviews(lang);
  const paths = homePhotoPaths();
  const photos = Object.fromEntries(
    getGallery(lang).images
      .filter((img) => paths.has(img.src))
      .map(({ src, width, height, alt }) => [src, { src, width, height, alt }])
  );
  return <PageSections lang={lang} names={["home","localBusiness","certifications","faq","reviews","servicesPage"]}>
      <HomeContent reviews={reviews} posts={getPostSummaries(lang).slice(0, 3)} photos={photos} />
    </PageSections>;
}
