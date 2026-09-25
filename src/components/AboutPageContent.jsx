"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { BiPhoneCall } from "react-icons/bi";
import { TbBrandCashapp } from "react-icons/tb";
import { FaHardHat, FaClipboardCheck, FaHandshake } from "react-icons/fa";
import { useI18n } from "@/i18n/I18nProvider";

export default function AboutPageContent() {
    const { t, href } = useI18n();
    const data = t.site;
    const a = t.aboutPage;
    const c = t.certifications;
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-[#1e1e1e] min-h-screen overflow-hidden mt-[50px]">
            {/* 1. Integrated Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img-4.jpg" // Using a high-quality image from gallery as hero bg
                        alt={a.heroAlt}
                        fill
                        className="object-cover opacity-40"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/80 via-[#1e1e1e]/50 to-[#1e1e1e]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <m.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-contrax text-white mb-4 tracking-wide"
                    >
                        {data.heroAbout.title}
                    </m.h1>
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="w-24 h-1 bg-[#9fe300] mx-auto rounded-full"
                    />
                </div>
            </section>

            {/* 2. Introduction Section */}
            <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Text Content */}
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-4xl font-contrax text-[#9fe300] mb-8">
                            {data.about.title}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-white text-lg font-atpinko leading-relaxed">
                                {data.heroAbout.text}
                            </p>
                            <div className="space-y-4">
                                {data.about.list.map((item, index) => (
                                    <m.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-[#9fe300] mt-1">➤</span>
                                        <p className="text-white/90 font-atpinko">
                                            <span className="text-[#9fe300] font-bold">{item.subTitle}</span> - {item.description}
                                        </p>
                                    </m.div>
                                ))}
                            </div>
                        </div>
                    </m.div>

                    {/* Image & Certifications */}
                    <m.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            <Image
                                src="/uniform-1.png"
                                alt={a.uniformAlt}
                                width={640}
                                height={400}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </m.div>
                </div>
                {/* Certifications */}
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="bg-[#2a2a2a] p-4 sm:p-6 rounded-xl border border-[#9fe300]/30 flex flex-wrap justify-center mt-10 items-center gap-8">
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg">
                                <Image src="/DPOR.png" alt={c.dporAlt} width={100} height={50} className="object-contain" />
                            </div>
                            <p className="text-white text-xs font-atpinko opacity-70">{c.dpor}</p>
                        </div>
                        <div className="w-px h-16 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg">
                                <Image src="/OSHA-Logo.png" alt={c.oshaAlt} width={100} height={50} className="object-contain" />
                            </div>
                            <p className="text-white text-xs font-atpinko opacity-70">{c.osha}</p>
                        </div>
                        <div className="w-px h-16 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <iframe
                                title={c.bbbTitle}
                                loading="lazy"
                                scrolling="no"
                                src="https://seal-richmond.bbb.org/frame/blue-seal-293-61-whitetxt-bbb-63417310.png?chk=9087F100C0"
                                style={{ border: 0, height: "61px", width: "293px" }}
                                className="mb-2 max-w-full"
                            />
                            <p className="text-white text-xs font-atpinko opacity-70">{c.bbb}</p>
                        </div>
                    </div>
                </m.div>
            </section>

            {/* 3. Mission, Vision, Values */}
            <section className="py-20 bg-[#151515]">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <m.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Mission */}
                        <m.div variants={fadeInUp} className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#9fe300] transition-colors duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaClipboardCheck size={80} color="#9fe300" />
                            </div>
                            <h3 className="text-3xl font-contrax text-[#9fe300] mb-4">{a.missionTitle}</h3>
                            <p className="text-white/80 font-atpinko leading-relaxed">
                                {a.missionText}
                            </p>
                        </m.div>

                        {/* Vision */}
                        <m.div variants={fadeInUp} className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#9fe300] transition-colors duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaHardHat size={80} color="#9fe300" />
                            </div>
                            <h3 className="text-3xl font-contrax text-[#9fe300] mb-4">{a.visionTitle}</h3>
                            <p className="text-white/80 font-atpinko leading-relaxed">
                                {a.visionText}
                            </p>
                        </m.div>

                        {/* Values */}
                        <m.div variants={fadeInUp} className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#9fe300] transition-colors duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaHandshake size={80} color="#9fe300" />
                            </div>
                            <h3 className="text-3xl font-contrax text-[#9fe300] mb-4">{a.valuesTitle}</h3>
                            <ul className="space-y-3 text-white/80 font-atpinko">
                                {a.values.map((value) => (
                                    <li key={value} className="flex items-center gap-2"><span className="text-[#9fe300]">✓</span> {value}</li>
                                ))}
                            </ul>
                        </m.div>
                    </m.div>
                </div>
            </section>

            {/* 4. Our Process */}
            <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-contrax text-[#9fe300] mb-4">{a.processTitle}</h2>
                    <p className="text-white/60 font-atpinko">{a.processSubtitle}</p>
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                    {[
                        <BiPhoneCall key="contact" size={50} />,
                        <Image key="visit" src="/car.png" alt={a.steps[1].iconAlt} width={60} height={60} />,
                        <Image key="materials" src="/material.jpg" alt={a.steps[2].iconAlt} width={60} height={60} className="rounded-full object-cover" />,
                        <Image key="agreement" src="/contrat.png" alt={a.steps[3].iconAlt} width={60} height={60} />,
                        <TbBrandCashapp key="completion" size={50} />,
                    ].map((icon, index) => ({ icon, ...a.steps[index] })).map((step, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#252525] p-6 rounded-xl border border-white/5 hover:border-[#9fe300] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-[#1e1e1e] rounded-full flex items-center justify-center mb-4 border border-[#9fe300]/30 group-hover:border-[#9fe300] transition-colors text-[#9fe300] overflow-hidden">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-contrax text-white mb-3 group-hover:text-[#9fe300] transition-colors">{step.title}</h3>
                            <p className="text-white/70 text-sm font-atpinko leading-relaxed">
                                {step.text}
                            </p>
                        </m.div>
                    ))}
                </div>
            </section>

            {/* 5. Call to Action */}
            <section className="py-16 bg-[#9fe300] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img-1.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <m.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-contrax text-[#1e1e1e] mb-8 leading-tight"
                    >
                        {data.about.aboutFooter}
                    </m.h2>
                    <Link href={href("/contact#email")}>
                        <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#1e1e1e] text-white font-contrax text-xl py-4 px-10 rounded-full hover:bg-white hover:text-[#1e1e1e] transition-colors shadow-xl"
                        >
                            {data.about.buttonText}
                        </m.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
