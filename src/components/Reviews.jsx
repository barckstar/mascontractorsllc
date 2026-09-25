"use client";
import React, { useState } from "react";
import { m } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { REVIEWS_SNAPSHOT } from "@/lib/reviewsSnapshot";
import { useI18n, fill } from "@/i18n/I18nProvider";

// No JSON-LD here on purpose: Google treats review markup that a business puts
// on its own site about itself as "self-serving" and won't show stars for it.
// The stars in search come from the Business Profile, which is where reviews go.

const CLAMP_AT = 280;

function StarRow({ count = 5, size = 13 }) {
    const r = useI18n().t.reviews;
    return (
        <div className="flex gap-0.5" role="img" aria-label={fill(r.starsLabel, { count })}>
            {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={size} className={i < Math.round(count) ? "text-yellow-400" : "text-white/15"} aria-hidden="true" />
            ))}
        </div>
    );
}

function Avatar({ name, photo }) {
    if (photo) {
        // Plain <img>: Google's avatar host isn't worth adding to next/image's allowlist for 40px.
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={photo} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" className="w-10 h-10 rounded-full" />;
    }
    return (
        <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary font-contrax flex items-center justify-center" aria-hidden="true">
            {name.charAt(0).toUpperCase()}
        </div>
    );
}

function ReviewCard({ review, index }) {
    const [open, setOpen] = useState(false);
    const r = useI18n().t.reviews;
    const long = review.text.length > CLAMP_AT;
    const text = long && !open ? `${review.text.slice(0, CLAMP_AT).trimEnd()}…` : review.text;

    return (
        <m.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="bg-[#1e1e1e] rounded-2xl p-7 border border-white/5 hover:border-secondary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-400 flex flex-col"
        >
            <div className="flex items-center justify-between mb-5">
                <StarRow count={review.rating} />
                <span className="flex items-center gap-1.5 text-gray-500 font-body text-xs">
                    <FaGoogle size={13} className="text-[#4285F4]" aria-hidden="true" /> Google
                </span>
            </div>

            <div className="relative flex-1">
                <FaQuoteLeft className="text-secondary/20 absolute -top-1 -left-1" size={24} aria-hidden="true" />
                <p className="text-gray-400 font-body text-sm leading-relaxed pl-5 whitespace-pre-line">{text}</p>
                {long && (
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="pl-5 mt-2 text-secondary font-body text-xs hover:underline"
                    >
                        {open ? r.showLess : r.readMore}
                    </button>
                )}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                <Avatar name={review.author} photo={review.authorPhoto} />
                <div className="flex-1 min-w-0">
                    {review.authorUrl ? (
                        <a href={review.authorUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-white font-contrax text-sm uppercase tracking-wide hover:text-secondary truncate block">
                            {review.author}
                        </a>
                    ) : (
                        <p className="text-white font-contrax text-sm uppercase tracking-wide truncate">{review.author}</p>
                    )}
                    {review.when && <p className="text-gray-500 font-body text-xs mt-0.5">{review.when}</p>}
                </div>
            </div>
        </m.article>
    );
}

export default function Reviews({ data = REVIEWS_SNAPSHOT }) {
    const { rating, count, reviews, mapsUrl, live } = data;
    const r = useI18n().t.reviews;

    return (
        <section className="py-24 bg-[#151515]">
            <div className="container mx-auto px-6 md:px-16">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 flex items-center justify-center gap-2">
                        {live && (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                            </span>
                        )}
                        {live ? r.live : r.eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-6xl font-contrax text-white mb-6 uppercase leading-tight">
                        {r.titleA}<span className="text-secondary">{r.titleB}</span>
                    </h2>

                    {/* Aggregate badge — always the real Google numbers */}
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 bg-[#252525] border border-white/10 hover:border-secondary/30 transition-colors rounded-2xl px-6 py-4 mt-2"
                    >
                        <div className="text-center">
                            <p className="text-4xl font-contrax text-white leading-none">{rating.toFixed(1)}</p>
                            <p className="text-gray-500 font-body text-xs mt-1">{r.outOf5}</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-left">
                            <StarRow count={rating} />
                            <p className="text-gray-400 font-body text-sm mt-1.5">
                                {fill(count === 1 ? r.countOne : r.countMany, { count })}
                            </p>
                        </div>
                        <FaGoogle size={22} className="text-[#4285F4]" aria-hidden="true" />
                    </a>
                </m.div>

                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <ReviewCard key={review.id ?? index} review={review} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 font-body max-w-xl mx-auto">
                        {r.emptyText}{" "}
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                            {r.emptyLink}
                        </a>
                        .
                    </p>
                )}

                {/* CTA to leave review — /review redirects to Google's write-a-review box */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <p className="text-gray-500 font-body text-sm sm:mr-2">
                        {r.ctaText}
                    </p>
                    <a
                        href="/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-secondary/40 text-secondary font-contrax text-sm tracking-widest py-3 px-8 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
                    >
                        <FaGoogle size={14} aria-hidden="true" /> {r.ctaButton} <BiRightArrowAlt size={16} aria-hidden="true" />
                    </a>
                </m.div>

                {live && (
                    <p className="text-center text-gray-600 font-body text-xs mt-8">
                        {r.liveNote}
                    </p>
                )}
            </div>
        </section>
    );
}
