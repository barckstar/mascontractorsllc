"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaClock, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { blogData } from "@/lib/blogData";

const CATEGORY_COLORS = {
    "Kitchen Remodeling": "bg-black/70 border border-white/10 text-secondary",
    "Decks & Porches": "bg-black/70 border border-white/10 text-blue-300",
    "Siding": "bg-black/70 border border-white/10 text-orange-300",
    "Home Improvement Tips": "bg-black/70 border border-white/10 text-purple-300",
    "Roofing": "bg-black/70 border border-white/10 text-red-300",
    "Bathroom Remodeling": "bg-black/70 border border-white/10 text-teal-300",
};

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function ContentBlock({ block }) {
    switch (block.type) {
        case "lead":
            return (
                <p className="text-xl md:text-2xl text-gray-300 font-atpinko leading-relaxed mb-10 border-l-4 border-secondary pl-6">
                    {block.text}
                </p>
            );
        case "p":
            return (
                <p className="text-gray-400 font-atpinko text-lg leading-relaxed mb-6">
                    {block.text}
                </p>
            );
        case "h2":
            return (
                <h2 className="text-2xl md:text-3xl font-contrax text-white uppercase tracking-wide mt-14 mb-5">
                    {block.text}
                </h2>
            );
        case "h3":
            return (
                <h3 className="text-xl font-contrax text-secondary uppercase tracking-wide mt-8 mb-4">
                    {block.text}
                </h3>
            );
        case "ul":
            return (
                <ul className="space-y-3 mb-8 ml-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <FaCheckCircle className="text-secondary mt-1.5 flex-shrink-0" size={13} />
                            <span className="text-gray-400 font-atpinko text-base leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "ol":
            return (
                <ol className="space-y-4 mb-8 ml-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-contrax text-xs flex items-center justify-center mt-0.5">
                                {i + 1}
                            </span>
                            <span className="text-gray-400 font-atpinko text-base leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ol>
            );
        case "table":
            return (
                <div className="overflow-x-auto mb-10 rounded-2xl border border-white/10">
                    <table className="w-full text-sm font-atpinko">
                        <thead>
                            <tr className="bg-[#252525] border-b border-white/10">
                                {block.headers.map((h, i) => (
                                    <th key={i} className="text-left px-5 py-4 text-secondary font-contrax text-xs tracking-wider uppercase">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, ri) => (
                                <tr key={ri} className={`border-b border-white/5 ${ri % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1e1e1e]"}`}>
                                    {row.map((cell, ci) => (
                                        <td key={ci} className={`px-5 py-4 leading-snug ${ci === 0 ? "text-white font-medium" : "text-gray-400"}`}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case "cta":
            return (
                <div className="my-12 bg-[#191919] border border-secondary/20 rounded-2xl p-8 md:p-10">
                    <h3 className="text-xl md:text-2xl font-contrax text-white uppercase mb-3">{block.title}</h3>
                    <p className="text-gray-400 font-atpinko text-base mb-6 leading-relaxed">{block.text}</p>
                    <Link href={block.link}>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-secondary text-primary font-contrax py-3 px-8 rounded-full hover:bg-white transition-all duration-300 text-sm inline-flex items-center gap-2"
                        >
                            {block.linkText} <BiRightArrowAlt size={16} />
                        </motion.button>
                    </Link>
                </div>
            );
        case "tip":
            return (
                <div className="my-8 flex items-start gap-4 bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
                    <FaLightbulb className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <p className="text-gray-300 font-atpinko text-base leading-relaxed">{block.text}</p>
                </div>
            );
        default:
            return null;
    }
}

export default function BlogPostContent({ post }) {
    const relatedPosts = blogData.filter((p) => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="bg-primary min-h-screen overflow-hidden">

            {/* Hero */}
            <section className="pt-44 pb-0 relative z-10">
                <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-secondary font-contrax text-xs tracking-widest mb-8 hover:gap-4 transition-all"
                        >
                            <span className="rotate-180 inline-block"><BiRightArrowAlt size={16} /></span>
                            ALL ARTICLES
                        </Link>

                        <div className="flex items-center gap-3 mb-6">
                            <span className={`text-xs font-contrax tracking-wider px-3 py-1.5 rounded-full ${CATEGORY_COLORS[post.category] || "bg-white/5 text-gray-400"}`}>
                                {post.category}
                            </span>
                            <span className="text-gray-500 font-atpinko text-sm flex items-center gap-1.5">
                                <FaClock size={12} /> {post.readTime}
                            </span>
                            <span className="text-gray-600 font-atpinko text-sm">{formatDate(post.publishDate)}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-contrax text-white mb-8 uppercase tracking-wide leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg text-gray-400 font-atpinko leading-relaxed mb-10 max-w-3xl">
                            {post.excerpt}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="relative h-72 md:h-[480px] mb-0">
                <Image
                    src={post.image}
                    alt={post.imgAlt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
            </section>

            {/* Article Body */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {post.content.map((block, i) => (
                            <ContentBlock key={i} block={block} />
                        ))}
                    </motion.div>

                    {/* Author Footer */}
                    <div className="mt-16 pt-10 border-t border-white/10 flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-secondary font-contrax text-lg">M</span>
                        </div>
                        <div>
                            <p className="text-white font-contrax text-sm uppercase tracking-wider mb-1">MAS Contractors LLC</p>
                            <p className="text-gray-500 font-atpinko text-sm leading-relaxed">
                                Licensed Class A General Contractor · Richmond, VA · Serving Chesterfield, Henrico, Midlothian & surrounding areas since 2013.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            <section className="bg-[#191919] py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl font-contrax text-white uppercase">
                            More <span className="text-secondary">Articles</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((p, i) => (
                            <motion.article
                                key={p.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-[#252525] rounded-2xl overflow-hidden border border-white/5 hover:border-secondary/30 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(159,227,0,0.08)] transition-all duration-500"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={p.image}
                                        alt={p.imgAlt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-all duration-700 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/20 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <span className="text-gray-500 font-atpinko text-xs flex items-center gap-1 mb-3">
                                        <FaClock size={10} /> {p.readTime}
                                    </span>
                                    <h3 className="text-base font-contrax text-white uppercase leading-snug mb-4 group-hover:text-secondary transition-colors">
                                        {p.title}
                                    </h3>
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className="inline-flex items-center gap-2 text-secondary font-contrax text-xs tracking-widest hover:gap-4 transition-all"
                                    >
                                        READ <BiRightArrowAlt size={14} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 font-atpinko hover:text-secondary transition-colors text-sm">
                            View all articles <BiRightArrowAlt size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase leading-tight">
                            Ready for Your <span className="text-secondary">Free Estimate</span>?
                        </h2>
                        <p className="text-gray-400 font-atpinko text-lg mb-10">
                            Serving Richmond, North Chesterfield, Midlothian, Glen Allen, and Henrico. Licensed, insured, and ready to start.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(159,227,0,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-secondary text-primary font-contrax text-lg py-5 px-14 rounded-full hover:bg-white transition-all duration-300"
                                >
                                    CONTACT US TODAY
                                </motion.button>
                            </Link>
                            <a href="tel:+18048334600">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-3 border border-white/20 text-white font-contrax text-lg py-5 px-14 rounded-full hover:border-secondary hover:text-secondary transition-all duration-300"
                                >
                                    (804) 833-4600
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
