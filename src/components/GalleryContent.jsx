"use client";
import { useState } from "react";
import LightGallery from 'lightgallery/react';
import { motion, AnimatePresence } from 'framer-motion';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { galleryData, CATEGORIES } from '@/lib/galleryData';
import Image from 'next/image';

export default function GalleryContent() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
        ? galleryData
        : galleryData.filter(img => img.category === activeCategory);

    return (
        <section className="bg-[#1e1e1e] text-white py-20 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="font-contrax text-5xl md:text-7xl font-medium text-[#9fe300] mb-4 tracking-wider mt-40 md:mt-20">
                    GALLERY
                </h1>
                <div className="w-24 h-1 bg-[#9fe300] mx-auto rounded-full shadow-[0_0_10px_#9fe300]" />
                <p className="mt-6 text-gray-400 text-lg font-atpinko tracking-wide">
                    Explore our finest craftsmanship across Richmond, VA and surrounding areas
                </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
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
                            {cat}
                        </button>
                    ))}
                </div>
                <p className="text-center text-gray-600 font-atpinko text-sm mt-4">
                    {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
                    {activeCategory !== "All" && ` · ${activeCategory}`}
                </p>
            </motion.div>

            {/* Gallery Grid */}
            <AnimatePresence mode="wait">
                <motion.div
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
                            <motion.a
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
                                        <span className="text-white font-atpinko text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            {image.category}{image.project ? ` · ${image.project}` : ""}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </LightGallery>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
