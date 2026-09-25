import BlogContent from "@/components/BlogContent";
import { getPosts } from "@/content";
import { pageMetadata } from "@/i18n/metadata";
import { SITE_URL } from "@/i18n/config";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const [first] = getPosts(lang);
    const meta = pageMetadata(lang, "blog", "/blog");
    meta.openGraph.images = [{ url: `${SITE_URL}${first.image}`, width: 1200, height: 630, alt: first.imgAlt }];
    return meta;
}

export default async function BlogPage({ params }) {
    const { lang } = await params;
    return <BlogContent posts={getPosts(lang)} />;
}
