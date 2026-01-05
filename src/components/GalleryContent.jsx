"use client";
import LightGallery from 'lightgallery/react';
import { motion } from 'framer-motion';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import galleryData from '@/lib/gallery.json';
import Image from 'next/image';

export default function GalleryContent() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <section className="bg-[#1e1e1e] text-white py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="font-contrax text-5xl md:text-7xl font-medium text-[#9fe300] mb-4 tracking-wider mt-40 md:mt-20 ">
                    GALLERY
                </h1>
                <div className="w-24 h-1 bg-[#9fe300] mx-auto rounded-full shadow-[0_0_10px_#9fe300]"></div>
                <p className="mt-6 text-gray-400 text-lg font-atpinko tracking-wide">
                    Explore our finest craftsmanship
                </p>
            </motion.div>
            <div className="mx-auto p-[40px]">
                {/* Gallery Grid */}
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="columns-1 md:columns-2 lg:columns-4 gap-5 space-y-5"
                >
                    {galleryData.map((image, index) => (
                        <motion.a
                            key={index}
                            href={image.src}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
                            className="block break-inside-avoid group relative overflow-hidden rounded-xl border border-transparent hover:border-[#9fe300] transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    alt={image.alt}
                                    src={image.src}
                                    width={image.width}
                                    height={image.height}
                                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </LightGallery>
            </div>
        </section>
    );
}
