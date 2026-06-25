import { blogData } from "@/lib/blogData";
import BlogContent from "@/components/BlogContent";

export const metadata = {
    title: "Contractor Resources & Home Improvement Tips | MAS Contractors Richmond VA",
    description: "Real answers to real questions from Richmond VA homeowners — remodeling costs, permit requirements, material comparisons, and what to expect working with a licensed general contractor.",
    alternates: {
        canonical: "https://mascontractors.com/blog",
    },
    openGraph: {
        title: "Home Improvement Resources | MAS Contractors LLC Richmond VA",
        description: "Expert contractor advice for Richmond, Chesterfield, Henrico, and Midlothian homeowners.",
        url: "https://mascontractors.com/blog",
        images: [
            {
                url: `https://mascontractors.com${blogData[0].image}`,
                width: 1200,
                height: 630,
                alt: blogData[0].imgAlt,
            },
        ],
    },
};

export default function BlogPage() {
    return <BlogContent />;
}
