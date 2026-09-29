import BlogContent from "@/components/BlogContent";
import { getPostSummaries } from "@/content";
import { pageMetadata } from "@/i18n/metadata";
import PageSections from "@/i18n/PageSections";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return pageMetadata(lang, "blog", "/blog");
}

export default async function BlogPage({ params }) {
    const { lang } = await params;
    return <PageSections lang={lang} names={["blogPage"]}>
      <BlogContent posts={getPostSummaries(lang)} />
    </PageSections>;
}
