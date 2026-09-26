import BlogContent from "@/components/BlogContent";
import { getPosts } from "@/content";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return pageMetadata(lang, "blog", "/blog");
}

export default async function BlogPage({ params }) {
    const { lang } = await params;
    return <BlogContent posts={getPosts(lang)} />;
}
