"use client";
import { useState } from "react";
import LightGallery from 'lightgallery/react';
import { m, AnimatePresence } from 'framer-motion';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { useI18n, fill } from '@/i18n/I18nProvider';
import Image from 'next/image';

// `gallery` comes from the page with alt text already in this language;
// categories stay as English keys and are labelled through the dictionary.
export default function GalleryContent({ gallery }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const g = useI18n().t.galleryPage;
    const galleryData = gallery.images;
    const CATEGORIES = gallery.categories;

    const filtered = activeCategory === "All"
        ? galleryData
        : galleryData.filter(img => img.category === activeCategory);
    const headerPhoto = galleryData.find((img) => img.featured) ?? galleryData[0];

    return (
        <section className="bg-[#1e1e1e] text-white py-20 min-h-screen">
            {/* Header — real project photo faint behind the title */}
            <div className="relative mb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {headerPhoto && (
                        <Image src={headerPhoto.src} alt="" fill sizes="100vw" quality={50} className="object-cover opacity-[0.14]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e]/90 to-[#1e1e1e]" />
                </div>
                <m.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center"
                >
                    <h1 className="font-contrax text-5xl md:text-7xl font-medium text-[#9fe300] mb-4 tracking-wider mt-40 md:mt-20">
                        {g.title}
                    </h1>
                    <div className="w-24 h-1 bg-[#9fe300] mx-auto rounded-full shadow-[0_0_10px_#9fe300]" />
                    <p className="mt-6 text-gray-400 text-lg font-body tracking-wide">
                        {g.subtitle}
                    </p>
                </m.div>
            </div>

            {/* Category Filter */}
            <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-6 md:px-16 mb-10 overflow-x-auto"
            >
                <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full font-contrax text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                                activeCategory === cat
                                    ? "bg-[#9fe300] text-[#1e1e1e] shadow-[0_0_15px_rgba(159,227,0,0.4)]"
                                    : "bg-[#252525] text-gray-400 border border-white/10 hover:border-[#9fe300]/40 hover:text-white"
                            }`}
                        >
                            {g.categories[cat]}
                        </button>
                    ))}
                </div>
                <p className="text-center text-gray-600 font-body text-sm mt-4">
                    {fill(filtered.length === 1 ? g.photoOne : g.photoMany, { count: filtered.length })}
                    {activeCategory !== "All" && ` · ${g.categories[activeCategory]}`}
                </p>
            </m.div>

            {/* Gallery Grid */}
            <AnimatePresence mode="wait">
                <m.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto px-6 md:px-10"
                >
                    <LightGallery
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        elementClassNames="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4"
                    >
                        {filtered.map((image, index) => (
                            <m.a
                                key={image.src}
                                href={image.src}
                                data-src={image.src}
                                data-sub-html={`<p>${image.alt}</p>`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                                className="block break-inside-avoid group relative overflow-hidden rounded-xl border border-transparent hover:border-[#9fe300] transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        alt={image.alt}
                                        src={image.src}
                                        width={image.width}
                                        height={image.height}
                                        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white font-body text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            {g.categories[image.category]}{image.project ? ` · ${image.project}` : ""}
                                        </span>
                                    </div>
                                </div>
                            </m.a>
                        ))}
                    </LightGallery>
                </m.div>
            </AnimatePresence>
        </section>
    );
}
