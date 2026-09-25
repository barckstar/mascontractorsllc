"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useI18n } from "@/i18n/I18nProvider";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    const f = useI18n().t.faq;
    const faqs = f.items;
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
    };

    return (
        <section className="py-24 bg-[#151515]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="container mx-auto px-6 md:px-16 max-w-4xl">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                        {f.eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase tracking-wide">
                        {f.titleA}<span className="text-secondary">{f.titleB}</span>
                    </h2>
                    <p className="text-gray-400 font-body text-lg max-w-xl mx-auto">
                        {f.subtitle}
                    </p>
                    <div className="w-20 h-1 bg-secondary mx-auto rounded-full mt-6" />
                </m.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                                activeIndex === index
                                    ? "border-secondary/50 bg-[#252525]"
                                    : "border-white/10 bg-[#1e1e1e]"
                            }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
                                aria-expanded={activeIndex === index}
                            >
                                <h3 className={`text-base md:text-lg font-contrax uppercase pr-4 transition-colors ${
                                    activeIndex === index ? "text-white" : "text-gray-300"
                                }`}>
                                    {faq.question}
                                </h3>
                                <div className={`p-3 rounded-full flex-shrink-0 transition-all ${
                                    activeIndex === index
                                        ? "bg-secondary text-primary"
                                        : "bg-white/5 text-secondary"
                                }`}>
                                    {activeIndex === index ? <FaMinus size={11} /> : <FaPlus size={11} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <m.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 md:px-7 pb-7">
                                            <p className="text-gray-400 font-body text-base leading-relaxed border-t border-white/5 pt-5">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
