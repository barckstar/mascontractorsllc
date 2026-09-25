import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/content";
import { getDictionary } from "@/i18n/dictionaries";
import { OG_LOCALE, SITE_URL, alternatesFor, localePath } from "@/i18n/config";
import BlogPostContent from "@/components/BlogPostContent";

export async function generateStaticParams() {
    return getPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const post = getPostBySlug(lang, slug);
    if (!post) return {};
    const path = `/blog/${post.slug}`;

    return {
        title: post.metaTitle,
        description: post.metaDescription,
        alternates: alternatesFor(lang, path),
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            url: SITE_URL + localePath(lang, path),
            type: "article",
            locale: OG_LOCALE[lang],
            publishedTime: post.publishDate,
            images: [
                {
                    url: `https://mascontractors.com${post.image}`,
                    width: 1200,
                    height: 630,
                    alt: post.imgAlt,
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { lang, slug } = await params;
    const post = getPostBySlug(lang, slug);
    if (!post) notFound();
    const t = getDictionary(lang);
    const url = SITE_URL + localePath(lang, `/blog/${post.slug}`);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: `https://mascontractors.com${post.image}`,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        inLanguage: lang,
        author: {
            "@type": "Organization",
            name: "MAS Contractors LLC",
            url: "https://mascontractors.com",
        },
        publisher: {
            "@type": "Organization",
            name: "MAS Contractors LLC",
            logo: {
                "@type": "ImageObject",
                url: "https://mascontractors.com/IMG_0271.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: post.category,
        articleSection: post.category,
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": t.breadcrumbs.home, "item": SITE_URL + localePath(lang, "/") },
            { "@type": "ListItem", "position": 2, "name": t.breadcrumbs.blog, "item": SITE_URL + localePath(lang, "/blog") },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": url }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <BlogPostContent post={post} posts={getPosts(lang)} />
        </>
    );
}
