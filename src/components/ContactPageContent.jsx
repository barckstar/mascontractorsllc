"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Contact from "@/components/contact";
import Mapa from "@/components/mapa";
import { BiPhoneCall, BiSolidStore, BiCalendar } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BiRightArrowAlt } from "react-icons/bi";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const contactCards = [
    {
        icon: <BiPhoneCall size={22} />,
        label: "Call Us",
        lines: ["+1 (804) 833-4600", "+1 (540) 376-4453"],
        href: "tel:+18048334600",
        cta: "Call now",
    },
    {
        icon: <BiSolidStore size={22} />,
        label: "Our Office",
        lines: ["411 Branchway Rd Suite 107", "North Chesterfield, VA 23236"],
    },
    {
        icon: <BiCalendar size={22} />,
        label: "Office Hours",
        lines: ["Monday – Friday", "7:00 AM – 4:00 PM"],
    },
    {
        icon: <AiOutlineMail size={22} />,
        label: "Email",
        lines: ["info@mascontractors.com"],
        href: "mailto:info@mascontractors.com",
        cta: "Send email",
    },
];

export default function ContactPageContent() {
    return (
        <div className="bg-[#111111] min-h-screen overflow-hidden">

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden mt-[50px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img-9.jpg"
                        alt="Contact MAS Contractors — General Contractor Richmond VA"
                        fill
                        className="object-cover opacity-20"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/30 to-[#111111]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 pb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[#9fe300] font-contrax tracking-[0.35em] text-xs uppercase mb-5"
                    >
                        Free Estimates · 48-hr Response · Richmond, VA
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl sm:text-7xl md:text-[90px] font-contrax text-white uppercase leading-[0.95] mb-7 tracking-tight"
                    >
                        Let&apos;s Build<br />
                        <span className="text-[#9fe300]">Together</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-400 font-atpinko text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Richmond&apos;s trusted Class A general contractor for residential and commercial projects.
                        Tell us your vision &mdash; we&apos;ll handle the rest.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex items-center justify-center gap-3"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#9fe300] animate-pulse" />
                        <span className="text-gray-500 font-atpinko text-sm">
                            Typically responds within one business day
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* ── Info cards ───────────────────────────────────────────── */}
            <section className="relative z-20 px-6 md:px-16 max-w-7xl mx-auto -mt-6 mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {contactCards.map((card, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="group bg-[#181818] border border-white/5 rounded-2xl p-6 hover:border-[#9fe300]/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-10 h-10 bg-[#9fe300]/10 rounded-lg flex items-center justify-center text-[#9fe300] mb-4 group-hover:bg-[#9fe300]/20 transition-colors">
                                {card.icon}
                            </div>
                            <p className="text-[10px] text-gray-500 font-contrax uppercase tracking-widest mb-2">{card.label}</p>
                            <div className="text-gray-300 font-atpinko text-sm space-y-0.5 leading-relaxed">
                                {card.lines.map((line, j) => <p key={j}>{line}</p>)}
                            </div>
                            {card.href && (
                                <a
                                    href={card.href}
                                    className="mt-3 inline-flex items-center gap-1 text-[#9fe300] font-atpinko text-xs hover:gap-2 transition-all"
                                >
                                    {card.cta} <BiRightArrowAlt size={14} />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Form + Map (two-column) ───────────────────────────────── */}
            <section className="px-6 md:px-16 pb-32 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[55fr_45fr] gap-10 items-start">

                    {/* Left: heading + form */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl md:text-5xl font-contrax text-white uppercase leading-tight mb-4">
                                Tell Us About <span className="text-[#9fe300]">Your Project</span>
                            </h2>
                            <p className="text-gray-400 font-atpinko text-lg leading-relaxed max-w-xl">
                                From kitchens and bathrooms to full commercial build-outs — we do it all.
                                Fill out the form and we&apos;ll get back to you with a free, no-obligation estimate.
                            </p>
                        </motion.div>

                        <Contact />
                    </div>

                    {/* Right: map + office card */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-32">

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="h-[380px]"
                        >
                            <Mapa />
                        </motion.div>

                        {/* Office info card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="relative bg-[#181818] rounded-2xl border border-white/5 p-8 overflow-hidden"
                        >
                            {/* Subtle green glow */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#9fe300]/5 blur-[60px] rounded-full pointer-events-none" />

                            <div className="flex items-center gap-3 mb-7">
                                <div className="w-1.5 h-8 bg-[#9fe300] rounded-full" />
                                <h3 className="text-white font-contrax text-base uppercase tracking-wider">
                                    Visit Our Office
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[10px] text-[#9fe300] font-contrax uppercase tracking-widest mb-1.5">Address</p>
                                    <p className="text-gray-300 font-atpinko text-sm leading-relaxed">
                                        411 Branchway Rd Suite 107<br />North Chesterfield, VA 23236
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9fe300] font-contrax uppercase tracking-widest mb-1.5">Hours</p>
                                    <p className="text-gray-300 font-atpinko text-sm leading-relaxed">
                                        Mon – Fri<br />7:00 AM – 4:00 PM
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9fe300] font-contrax uppercase tracking-widest mb-1.5">Phone</p>
                                    <a href="tel:+18048334600" className="block text-gray-300 font-atpinko text-sm hover:text-[#9fe300] transition-colors">
                                        (804) 833-4600
                                    </a>
                                    <a href="tel:+15403764453" className="block text-gray-300 font-atpinko text-sm hover:text-[#9fe300] transition-colors">
                                        (540) 376-4453
                                    </a>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9fe300] font-contrax uppercase tracking-widest mb-1.5">License</p>
                                    <p className="text-gray-300 font-atpinko text-sm leading-relaxed">
                                        Virginia Class A<br />Fully Insured
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-wrap gap-3"
                        >
                            {["4.9★ Google Rating", "47+ Reviews", "Class A Licensed", "Free Estimates", "Founded 2014"].map((badge) => (
                                <span
                                    key={badge}
                                    className="text-xs font-atpinko text-gray-400 border border-white/10 rounded-full px-4 py-1.5"
                                >
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
