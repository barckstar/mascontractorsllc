"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaPlus, FaMinus, FaPhoneAlt, FaClock, FaDollarSign, FaExclamationTriangle, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import BeforeAfter from "@/components/BeforeAfter";
import { BiRightArrowAlt } from "react-icons/bi";
import { servicesData } from "@/lib/servicesData";

export default function ServicePageContent({ service }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const relatedServices = servicesData
        .filter((s) => s.slug !== service.slug)
        .slice(0, 3);

    return (
        <div className="bg-primary min-h-screen overflow-hidden">

            {/* ── Hero ───────────────────────────────────────────── */}
            <section className="pt-44 pb-24 relative z-10">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-secondary font-contrax text-xs tracking-widest mb-8 hover:gap-4 transition-all"
                        >
                            <span className="rotate-180 inline-block"><BiRightArrowAlt size={16} /></span>
                            ALL SERVICES
                        </Link>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-contrax text-white mb-6 uppercase tracking-wider leading-tight">
                            {service.title.includes(", VA")
                                ? <>{service.title.split(", VA")[0]}, <span className="text-secondary">VA</span></>
                                : service.title
                            }
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-atpinko max-w-2xl mx-auto leading-relaxed mb-10">
                            {service.heroText}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-secondary text-primary font-contrax py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.3)]"
                                >
                                    GET FREE ESTIMATE
                                </motion.button>
                            </Link>
                            <a href="tel:+18048334600">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 border border-secondary/50 text-secondary font-contrax py-4 px-10 rounded-full hover:border-secondary transition-all duration-300"
                                >
                                    <FaPhoneAlt size={14} />
                                    (804) 833-4600
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-secondary/5 blur-[120px] rounded-full -z-10" />
            </section>

            {/* ── Image + Description + Benefits ─────────────────── */}
            <section className="bg-[#191919] py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative h-[320px] md:h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                                <Image
                                    src={service.img}
                                    alt={service.imgAlt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="w-full lg:w-1/2"
                        >
                            <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                                Richmond, VA · Licensed & Insured
                            </span>
                            <h2 className="text-2xl md:text-4xl font-contrax text-white mb-6 uppercase leading-tight">
                                Why Choose MAS Contractors?
                            </h2>
                            <p className="text-gray-400 font-atpinko text-lg mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <p className="text-gray-400 font-atpinko text-lg mb-10 leading-relaxed">
                                {service.description2}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <FaCheckCircle className="text-secondary mt-1 flex-shrink-0" size={14} />
                                        <span className="text-gray-300 font-atpinko text-sm leading-snug">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Our Process ────────────────────────────────────── */}
            {service.process && (
                <section className="py-24">
                    <div className="container mx-auto px-6 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                                Simple & Transparent
                            </span>
                            <h2 className="text-3xl md:text-5xl font-contrax text-white uppercase tracking-wide">
                                Our <span className="text-secondary">Process</span>
                            </h2>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {service.process.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative bg-[#252525] rounded-2xl p-8 border border-white/5 hover:border-secondary/30 transition-colors duration-300"
                                >
                                    <span className="text-6xl font-contrax text-secondary/15 mb-4 block leading-none">
                                        {item.step}
                                    </span>
                                    <h3 className="text-white font-contrax uppercase text-sm tracking-wider mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 font-atpinko text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                    {i < service.process.length - 1 && (
                                        <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-secondary/25" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Trust Bar ──────────────────────────────────────── */}
            <section className="bg-[#0f0f0f] py-16">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Years of Experience", value: "11+" },
                            { label: "Projects Completed", value: "500+" },
                            { label: "Satisfaction Rate", value: "100%" },
                            { label: "Free Estimate", value: "Always" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <p className="text-4xl md:text-5xl font-contrax text-secondary mb-2">{stat.value}</p>
                                <p className="text-gray-400 font-atpinko text-sm uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Cost & Timeline Guide ───────────────────────────── */}
            {service.costGuide && (
                <section className="bg-[#191919] py-24">
                    <div className="container mx-auto px-6 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                                Richmond, VA Market
                            </span>
                            <h2 className="text-3xl md:text-5xl font-contrax text-white uppercase tracking-wide">
                                Cost & <span className="text-secondary">Timeline</span> Guide
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Numbers */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-5"
                            >
                                <div className="bg-[#252525] rounded-2xl p-8 border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <FaDollarSign className="text-secondary" size={14} />
                                        </div>
                                        <span className="text-gray-400 font-contrax text-xs tracking-widest uppercase">
                                            Investment Range
                                        </span>
                                    </div>
                                    <p className="text-3xl md:text-4xl font-contrax text-white mb-2">
                                        {service.costGuide.range}
                                    </p>
                                    {service.costGuide.average && (
                                        <p className="text-gray-500 font-atpinko text-sm">
                                            Most projects: <span className="text-gray-300">{service.costGuide.average}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#252525] rounded-2xl p-8 border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <FaClock className="text-secondary" size={13} />
                                        </div>
                                        <span className="text-gray-400 font-contrax text-xs tracking-widest uppercase">
                                            Typical Timeline
                                        </span>
                                    </div>
                                    <p className="text-3xl md:text-4xl font-contrax text-white mb-2">
                                        {service.costGuide.timeline}
                                    </p>
                                    <p className="text-gray-500 font-atpinko text-sm">
                                        Permit approval times may add 2–4 weeks for certain projects
                                    </p>
                                </div>
                            </motion.div>

                            {/* Factors */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-white font-contrax uppercase tracking-wider mb-6 text-base">
                                    What Affects Your Cost
                                </h3>
                                <ul className="space-y-4 mb-8">
                                    {service.costGuide.factors.map((factor, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <FaCheckCircle className="text-secondary mt-1 flex-shrink-0" size={13} />
                                            <span className="text-gray-300 font-atpinko text-sm leading-snug">
                                                {factor}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-white/5 pt-6">
                                    <p className="text-gray-500 font-atpinko text-sm leading-relaxed mb-6">
                                        These are typical ranges for the Richmond, VA market. Every project is unique — we provide free on-site written estimates with no surprises and no pressure.
                                    </p>
                                    <Link href="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="bg-secondary text-primary font-contrax py-3 px-8 rounded-full hover:bg-white transition-all duration-300 text-sm"
                                        >
                                            GET YOUR FREE ESTIMATE
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Expert Insights ─────────────────────────────────── */}
            {(service.challenges?.length > 0 || service.proTips?.length > 0) && (
                <section className="bg-[#0f0f0f] py-24">
                    <div className="container mx-auto px-6 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                                11 Years of Field Experience
                            </span>
                            <h2 className="text-3xl md:text-5xl font-contrax text-white uppercase tracking-wide">
                                What Every Homeowner <span className="text-secondary">Should Know</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                            {/* Challenges */}
                            {service.challenges?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                            <FaExclamationTriangle className="text-orange-400" size={13} />
                                        </div>
                                        <h3 className="text-white font-contrax uppercase tracking-wider text-xs">Common Challenges</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {service.challenges.map((c, i) => (
                                            <div key={i} className="bg-[#1a1a1a] rounded-2xl p-6 border border-orange-500/10">
                                                <p className="text-orange-400 font-contrax text-xs tracking-wider uppercase mb-2">{c.title}</p>
                                                <p className="text-gray-400 font-atpinko text-sm leading-relaxed">{c.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Pro Tips */}
                            {service.proTips?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                            <FaLightbulb className="text-secondary" size={13} />
                                        </div>
                                        <h3 className="text-white font-contrax uppercase tracking-wider text-xs">Pro Tips from Our Team</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {service.proTips.map((tip, i) => (
                                            <div key={i} className="flex items-start gap-4 bg-[#1a1a1a] rounded-2xl p-5 border border-secondary/10">
                                                <span className="text-secondary font-contrax text-xs mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                                <p className="text-gray-300 font-atpinko text-sm leading-relaxed">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Safety Gear */}
                        {service.safetyGear?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                        <FaShieldAlt className="text-secondary" size={13} />
                                    </div>
                                    <h3 className="text-white font-contrax uppercase tracking-wider text-xs">Safety Equipment on Every Job</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {service.safetyGear.map((item, i) => (
                                        <span key={i} className="bg-[#252525] text-gray-300 font-atpinko text-sm px-4 py-2 rounded-full border border-white/5">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* ── Before & After ─────────────────────────────────── */}
            {service.beforeAfter?.length > 0 && (
                <section className="py-24">
                    <div className="container mx-auto px-6 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                                Real Transformations
                            </span>
                            <h2 className="text-3xl md:text-5xl font-contrax text-white mb-4 uppercase tracking-wide">
                                Before <span className="text-secondary">&amp; After</span>
                            </h2>
                            <p className="text-gray-400 font-atpinko text-lg max-w-xl mx-auto">
                                Drag the slider to see the full transformation.
                            </p>
                        </motion.div>
                        <div className="space-y-12">
                            {service.beforeAfter.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <BeforeAfter
                                        before={item.before}
                                        after={item.after}
                                        label={item.label}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">
                            Common Questions
                        </span>
                        <h2 className="text-3xl md:text-5xl font-contrax text-white mb-4 uppercase tracking-wide">
                            Frequently Asked <span className="text-secondary">Questions</span>
                        </h2>
                        <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-4">
                        {service.faq.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.07 }}
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
                                        {item.question}
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
                                                    {item.answer}
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

            {/* ── Related Services ───────────────────────────────── */}
            <section className="bg-[#191919] py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl font-contrax text-white uppercase">
                            Other Services in <span className="text-secondary">Richmond, VA</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedServices.map((s, i) => (
                            <motion.div
                                key={s.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-[#252525] rounded-2xl overflow-hidden border border-white/5 hover:border-secondary/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(159,227,0,0.1)] transition-all duration-500"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={s.img}
                                        alt={s.imgAlt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-all duration-700 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/20 to-transparent" />
                                    <h3 className="absolute bottom-4 left-6 text-lg font-contrax text-white uppercase group-hover:text-secondary transition-colors">
                                        {s.shortTitle}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <Link
                                        href={`/services/${s.slug}`}
                                        className="inline-flex items-center gap-2 text-secondary font-contrax text-xs tracking-widest hover:gap-4 transition-all"
                                    >
                                        LEARN MORE <BiRightArrowAlt size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 font-atpinko hover:text-secondary transition-colors text-sm">
                            View all services <BiRightArrowAlt size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ──────────────────────────────────────── */}
            <section className="py-28">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase leading-tight">
                            Ready for Your <span className="text-secondary">Free Estimate</span>?
                        </h2>
                        <p className="text-gray-400 font-atpinko text-lg mb-10 max-w-xl mx-auto">
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
                                    <FaPhoneAlt size={16} />
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
