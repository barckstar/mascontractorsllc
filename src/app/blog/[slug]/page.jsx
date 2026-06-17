import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { blogData } from "@/lib/blogData";

const BlogPostContent = dynamic(() => import("@/components/BlogPostContent"), { ssr: false });

export async function generateStaticParams() {
    return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const post = blogData.find((p) => p.slug === params.slug);
    if (!post) return {};

    return {
        title: post.metaTitle,
        description: post.metaDescription,
        alternates: {
            canonical: `https://mascontractors.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            url: `https://mascontractors.com/blog/${post.slug}`,
            type: "article",
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

export default function BlogPostPage({ params }) {
    const post = blogData.find((p) => p.slug === params.slug);
    if (!post) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: `https://mascontractors.com${post.image}`,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
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
            "@id": `https://mascontractors.com/blog/${post.slug}`,
        },
        keywords: post.category,
        articleSection: post.category,
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mascontractors.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://mascontractors.com/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://mascontractors.com/blog/${post.slug}` }
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
            <BlogPostContent post={post} />
        </>
    );
}
