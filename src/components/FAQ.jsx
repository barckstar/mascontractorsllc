"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "How much does remodeling cost in Richmond, VA?",
        answer: "Remodeling costs in Richmond vary by project scope and materials. Kitchen remodels typically range from $15,000–$60,000+, bathroom remodels from $8,000–$35,000, and whole-home renovations from $50,000–$200,000+. Decks start around $8,000, and room additions from $30,000. We provide free, itemized written estimates so you know exactly what you're paying for before any work begins."
    },
    {
        question: "Are you licensed and insured in Virginia?",
        answer: "Yes. MAS Contractors LLC holds a Virginia Class A Contractor License and carries full general liability insurance plus workers' compensation coverage. We pull all required permits through Chesterfield County, Henrico County, and the City of Richmond — so your project is legal, inspected, and fully protected."
    },
    {
        question: "Do you offer free estimates?",
        answer: "Yes — always. We offer free, no-obligation in-home estimates for every project. We visit your property, listen to your vision, take measurements, and provide a detailed written quote. No pressure, no hidden fees, no surprises."
    },
    {
        question: "What areas do you serve in the Richmond metro?",
        answer: "We serve all of the greater Richmond, VA area including North Chesterfield, Midlothian, Glen Allen, Henrico County, Chester, Colonial Heights, Mechanicsville, and Short Pump. If you're within 45 minutes of Richmond, give us a call — we'll come to you."
    },
    {
        question: "How long does a typical remodeling project take?",
        answer: "Timeline depends on project scope. A bathroom remodel typically takes 2–4 weeks, a kitchen 4–8 weeks, a deck 1–3 weeks, and a full home addition 2–4 months. We give you a firm schedule upfront and communicate any changes immediately. Permit approval from Chesterfield or Henrico can add 2–4 weeks to larger structural projects."
    },
    {
        question: "Do I need a permit for my project in Virginia?",
        answer: "Most structural, electrical, plumbing, and mechanical work in Virginia requires a permit — including kitchen remodels, home additions, new decks over 200 sq ft, roof replacements, and window replacements in some jurisdictions. MAS Contractors handles the entire permit process for you: application, inspections, and final sign-off. We never skip permits — they protect your investment and are required for insurance claims and resale."
    },
    {
        question: "Will I need to move out during a renovation?",
        answer: "In most cases, no. For kitchen and bathroom remodels, we work in phases to keep the rest of your home functional. For major home additions or full renovations affecting multiple systems, we'll discuss your best options during the estimate visit. Our crews work Monday–Friday (and Saturdays when needed) to minimize disruption and complete projects on schedule."
    },
    {
        question: "How do you handle unexpected problems during a project?",
        answer: "Old homes in Richmond sometimes hide surprises — water damage, outdated wiring, or rotted framing behind walls. When we find something unexpected, we stop work, document it with photos, explain the issue clearly, and give you a written change-order with cost and timeline impact before proceeding. You are always in control of what gets approved."
    },
    {
        question: "What is your payment process?",
        answer: "We require a deposit to reserve your project start date (typically 10–30% depending on project size), with progress payments tied to completion milestones, and a final payment only after you've done a walkthrough and are satisfied. We never ask for full payment upfront — that's a red flag with any contractor."
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-[#151515]">
            <div className="container mx-auto px-6 md:px-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase tracking-wide">
                        Frequently Asked <span className="text-secondary">Questions</span>
                    </h2>
                    <p className="text-gray-400 font-atpinko text-lg max-w-xl mx-auto">
                        Everything Richmond homeowners ask before hiring a general contractor.
                    </p>
                    <div className="w-20 h-1 bg-secondary mx-auto rounded-full mt-6" />
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
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
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 md:px-7 pb-7">
                                            <p className="text-gray-400 font-atpinko text-base leading-relaxed border-t border-white/5 pt-5">
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
