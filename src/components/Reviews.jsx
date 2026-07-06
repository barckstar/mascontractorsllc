"use client";
import React, { useState } from "react";
import { m } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";
import { SiHouzz, SiThumbstackIcon } from "react-icons/si";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

const reviews = [
    {
        name: "Sarah M.",
        city: "Midlothian, VA",
        service: "Kitchen Remodeling",
        rating: 5,
        date: "March 2026",
        platform: "Google",
        text: "MAS Contractors completely transformed our outdated kitchen into something out of a magazine. From the custom cabinets to the quartz countertops, every detail was handled with care. Oscar kept us informed every step of the way and the crew was respectful of our home. Finished exactly on schedule.",
    },
    {
        name: "James T.",
        city: "North Chesterfield, VA",
        service: "Deck Construction",
        rating: 5,
        date: "April 2026",
        platform: "Google",
        text: "Had MAS build a 400 sq ft composite deck off the back of our house. They handled the permit with Chesterfield County, scheduled all inspections, and the quality of the framing is exceptional. Three contractors gave us quotes — MAS wasn't the cheapest, but they were clearly the most professional.",
    },
    {
        name: "Maria L.",
        city: "Glen Allen, VA",
        service: "Bathroom Remodel",
        rating: 5,
        date: "February 2026",
        platform: "Houzz",
        text: "From demo day to the final tile grout, the team was clean, punctual, and professional. Our master bath went from a builder-grade nightmare to a full spa bathroom with a walk-in shower and heated floors. We already have a second bathroom on the quote for later this year.",
    },
    {
        name: "Robert K.",
        city: "Henrico, VA",
        service: "Roof Replacement",
        rating: 5,
        date: "January 2026",
        platform: "Google",
        text: "Got four quotes for a full roof replacement on our 2,800 sq ft home. MAS was the most detailed — they showed up, walked the entire roof, and explained exactly what they found before quoting. Job was done in two days, the cleanup was immaculate, and the new architectural shingles look great.",
    },
    {
        name: "Lisa P.",
        city: "Richmond, VA",
        service: "Home Addition",
        rating: 5,
        date: "November 2025",
        platform: "Thumbtack",
        text: "We hired MAS for a 480 sq ft master suite addition to our 1970s ranch home. The project involved permits, structural work, new HVAC ductwork, and all finishes. It took about 10 weeks from groundbreak to move-in. We could not be happier — it looks like it was always part of the house.",
    },
    {
        name: "David W.",
        city: "Chesterfield, VA",
        service: "Hardie Board Siding",
        rating: 5,
        date: "October 2025",
        platform: "Google",
        text: "Replaced all the old vinyl siding with James Hardie fiber cement. MAS is a certified Hardie installer and it showed — the installation was clean, the corner trim work was precise, and they caulked every joint properly. House looks brand new. Already noticed neighbors asking about who did the work.",
    },
];

const PLATFORM_ICONS = {
    Google: <FaGoogle size={13} className="text-[#4285F4]" aria-hidden="true" />,
    Houzz: <SiHouzz size={13} className="text-[#7DC242]" aria-hidden="true" />,
    Thumbtack: <span className="text-xs font-bold text-[#009FD9]">TT</span>,
};

function StarRow({ count = 5 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <FaStar key={i} size={13} className="text-yellow-400" />
            ))}
        </div>
    );
}

export default function Reviews() {
    return (
        <section className="py-24 bg-[#151515]">
            {/* JSON-LD: AggregateRating + individual Reviews */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "GeneralContractor",
                        "name": "MAS Contractors LLC",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "47",
                            "bestRating": "5",
                            "worstRating": "1",
                        },
                        "review": reviews.map((r) => ({
                            "@type": "Review",
                            "author": { "@type": "Person", "name": r.name },
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": r.rating,
                                "bestRating": "5",
                            },
                            "reviewBody": r.text,
                            "datePublished": r.date,
                        })),
                    }),
                }}
            />

            <div className="container mx-auto px-6 md:px-16">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                        Verified Client Reviews
                    </span>
                    <h2 className="text-3xl md:text-6xl font-contrax text-white mb-6 uppercase leading-tight">
                        What Richmond Homeowners <span className="text-secondary">Are Saying</span>
                    </h2>

                    {/* Aggregate badge */}
                    <div className="inline-flex items-center gap-4 bg-[#252525] border border-white/10 rounded-2xl px-6 py-4 mt-2">
                        <div className="text-center">
                            <p className="text-4xl font-contrax text-white leading-none">4.9</p>
                            <p className="text-gray-500 font-atpinko text-xs mt-1">out of 5</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <StarRow count={5} />
                            <p className="text-gray-400 font-atpinko text-sm mt-1.5">Based on 47+ reviews</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-gray-400 font-atpinko text-xs">
                                <FaGoogle size={13} className="text-[#4285F4]" aria-hidden="true" /> Google
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400 font-atpinko text-xs">
                                <SiHouzz size={13} className="text-[#7DC242]" aria-hidden="true" /> Houzz
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400 font-atpinko text-xs">
                                <span className="text-xs font-bold text-[#009FD9]">TT</span> Thumbtack
                            </div>
                        </div>
                    </div>
                </m.div>

                {/* Reviews grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-[#1e1e1e] rounded-2xl p-7 border border-white/5 hover:border-secondary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-400 flex flex-col"
                        >
                            {/* Top: stars + platform */}
                            <div className="flex items-center justify-between mb-5">
                                <StarRow count={review.rating} />
                                <div className="flex items-center gap-1.5 text-gray-500 font-atpinko text-xs">
                                    {PLATFORM_ICONS[review.platform]}
                                    <span>{review.platform}</span>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="relative flex-1">
                                <FaQuoteLeft className="text-secondary/20 absolute -top-1 -left-1" size={24} />
                                <p className="text-gray-400 font-atpinko text-sm leading-relaxed pl-5">
                                    {review.text}
                                </p>
                            </div>

                            {/* Bottom: author */}
                            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-white font-contrax text-sm uppercase tracking-wide">{review.name}</p>
                                    <p className="text-gray-500 font-atpinko text-xs mt-0.5">{review.city} · {review.service}</p>
                                </div>
                                <span className="text-gray-600 font-atpinko text-xs">{review.date}</span>
                            </div>
                        </m.div>
                    ))}
                </div>

                {/* CTA to leave review */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <p className="text-gray-500 font-atpinko text-sm mb-4">
                        Did we work on your home? We&apos;d love to hear from you.
                    </p>
                    <Link
                        href="https://maps.app.goo.gl/bvfykYDomsbJJxzk7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-secondary/40 text-secondary font-contrax text-sm tracking-widest py-3 px-8 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
                    >
                        <FaGoogle size={14} /> LEAVE US A GOOGLE REVIEW <BiRightArrowAlt size={16} />
                    </Link>
                </m.div>
            </div>
        </section>
    );
}
