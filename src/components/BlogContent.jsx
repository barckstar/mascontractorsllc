"use client";
import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaClock, FaTag } from "react-icons/fa";
import { useI18n } from "@/i18n/I18nProvider";
import { DATE_LOCALE } from "@/i18n/config";

// Keyed by `categoryId` (English, never translated), not the displayed category.
export const CATEGORY_COLORS = {
    "Kitchen Remodeling": "bg-black/70 border border-white/10 text-secondary",
    "Decks & Porches": "bg-black/70 border border-white/10 text-blue-300",
    "Siding": "bg-black/70 border border-white/10 text-orange-300",
    "Home Improvement Tips": "bg-black/70 border border-white/10 text-purple-300",
    "Roofing": "bg-black/70 border border-white/10 text-red-300",
    "Bathroom Remodeling": "bg-black/70 border border-white/10 text-teal-300",
};

// publishDate is a plain YYYY-MM-DD; formatting it in UTC keeps US time zones
// from showing the day before.
export function formatDate(dateStr, lang) {
    return new Date(dateStr).toLocaleDateString(DATE_LOCALE[lang], {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}

export default function BlogContent({ posts }) {
    const { t, lang, href } = useI18n();
    const b = t.blogPage;
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
    );
    const featured = sortedPosts[0];
    const rest = sortedPosts.slice(1);

    return (
        <div className="bg-primary min-h-screen overflow-hidden">

            {/* Hero */}
            <section className="pt-44 pb-20 relative z-10">
                <div className="container mx-auto px-6 lg:px-16 text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-6 block">
                            {b.eyebrow}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-contrax text-white mb-6 uppercase tracking-wider leading-tight">
                            {b.titleA}<span className="text-secondary">{b.titleB}</span>{b.titleC}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto leading-relaxed">
                            {b.intro}
                        </p>
                    </m.div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-secondary/5 blur-[120px] rounded-full -z-10" />
                </div>
            </section>

            {/* Featured Post */}
            <section className="bg-[#191919] py-16">
                <div className="container mx-auto px-6 lg:px-16">
                    <p className="text-secondary font-contrax text-xs tracking-widest uppercase mb-8">{b.latest}</p>
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/5 hover:border-secondary/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(159,227,0,0.08)]"
                    >
                        <div className="relative h-64 lg:h-auto min-h-[320px] overflow-hidden">
                            <Image
                                src={featured.image}
                                alt={featured.imgAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-all duration-700 group-hover:brightness-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a] hidden lg:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent lg:hidden" />
                        </div>
                        <div className="bg-[#1a1a1a] p-10 lg:p-14 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`text-xs font-contrax tracking-wider px-3 py-1 rounded-full ${CATEGORY_COLORS[featured.categoryId] || "bg-white/5 text-gray-400"}`}>
                                    {featured.category}
                                </span>
                                <span className="text-gray-500 font-body text-xs flex items-center gap-1">
                                    <FaClock size={11} /> {featured.readTime}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-contrax text-white mb-5 uppercase leading-tight group-hover:text-secondary transition-colors duration-300">
                                {featured.title}
                            </h2>
                            <p className="text-gray-400 font-body text-base leading-relaxed mb-8">
                                {featured.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-body text-sm">{formatDate(featured.publishDate, lang)}</span>
                                <Link
                                    href={href(`/blog/${featured.slug}`)}
                                    className="inline-flex items-center gap-2 text-secondary font-contrax text-sm tracking-widest hover:gap-4 transition-all"
                                >
                                    {b.readArticle} <BiRightArrowAlt size={18} />
                                </Link>
                            </div>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map((post, index) => (
                            <m.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/5 hover:border-secondary/30 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(159,227,0,0.08)] transition-all duration-500 flex flex-col"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.imgAlt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-all duration-700 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/20 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`text-xs font-contrax tracking-wider px-3 py-1 rounded-full backdrop-blur-sm ${CATEGORY_COLORS[post.categoryId] || "bg-white/10 text-gray-300"}`}>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-7 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-4 text-gray-600 font-body text-xs">
                                        <span className="flex items-center gap-1"><FaClock size={10} /> {post.readTime}</span>
                                        <span>·</span>
                                        <span>{formatDate(post.publishDate, lang)}</span>
                                    </div>
                                    <h2 className="text-lg font-contrax text-white mb-3 uppercase leading-snug group-hover:text-secondary transition-colors duration-300 flex-1">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-500 font-body text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={href(`/blog/${post.slug}`)}
                                        className="inline-flex items-center gap-2 text-secondary font-contrax text-xs tracking-widest hover:gap-4 transition-all mt-auto"
                                    >
                                        {b.readArticle} <BiRightArrowAlt size={16} />
                                    </Link>
                                </div>
                            </m.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#191919] py-24">
                <div className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase leading-tight">
                            {b.ctaA}<span className="text-secondary">{b.ctaB}</span>{b.ctaC}
                        </h2>
                        <p className="text-gray-400 font-body text-lg mb-10">
                            {b.ctaText}
                        </p>
                        <Link href={href("/contact")}>
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cta-glow bg-secondary text-primary font-contrax text-lg py-5 px-14 rounded-full hover:bg-white transition-all duration-300"
                            >
                                {b.ctaButton}
                            </m.button>
                        </Link>
                    </m.div>
                </div>
            </section>
        </div>
    );
}
