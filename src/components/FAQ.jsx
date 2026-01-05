"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "How much does remodeling cost in Richmond VA?",
        answer: "Remodeling costs in Richmond vary depending on the scope and materials. Kitchen remodels typically range from $15k to $50k+, while bathrooms can range from $10k to $30k+. Contact MAS Contractors for a free, detailed estimate tailored to your project."
    },
    {
        question: "Are you licensed and insured?",
        answer: "Yes, MAS Contractors LLC is fully licensed and insured to operate in Virginia. We carry general liability and workers' compensation insurance for your peace of mind."
    },
    {
        question: "Do you offer free estimates?",
        answer: "Yes, we offer completely free, no-obligation estimates. We visit your site, discuss your needs, and provide a comprehensive quote."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#151515]">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase tracking-wide">
                        Frequently Asked <span className="text-[#9fe300]">Questions</span>
                    </h2>
                    <p className="text-gray-400 font-atpinko text-lg">
                        Everything you need to know about working with MAS Contractors.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-2xl border ${activeIndex === index ? 'border-[#9fe300] bg-[#252525]' : 'border-white/10 bg-[#1e1e1e]'} transition-colors duration-300 overflow-hidden`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                aria-expanded={activeIndex === index}
                            >
                                <h3 className={`text-xl md:text-2xl font-contrax uppercase ${activeIndex === index ? 'text-white' : 'text-gray-300'} transition-colors`}>
                                    {faq.question}
                                </h3>
                                <div className={`p-3 rounded-full ${activeIndex === index ? 'bg-[#9fe300] text-[#1e1e1e]' : 'bg-white/5 text-[#9fe300]'} transition-all`}>
                                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 md:px-8 pb-8">
                                            <p className="text-gray-400 font-atpinko text-lg leading-relaxed border-t border-white/5 pt-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
