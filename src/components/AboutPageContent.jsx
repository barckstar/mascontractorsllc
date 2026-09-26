"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { BiPhoneCall } from "react-icons/bi";
import { TbBrandCashapp } from "react-icons/tb";
import { FaHardHat, FaClipboardCheck, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { useI18n } from "@/i18n/I18nProvider";
import { ABOUT_PHOTOS } from "@/content/aboutPhotos";
import { EASE, fadeInUp, Eyebrow, PrimaryCta, Photo, GlowCard } from "./ui";
import Certifications from "./Certifications";

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function AboutPageContent({ photos }) {
    const { t, href } = useI18n();
    const data = t.site;
    const a = t.aboutPage;
    const hero = photos[ABOUT_PHOTOS.hero];
    const collageMain = photos[ABOUT_PHOTOS.collageMain];
    const collageDetail = photos[ABOUT_PHOTOS.collageDetail];
    const finalCta = photos[ABOUT_PHOTOS.finalCta];

    return (
        <div className="bg-[#1e1e1e] min-h-screen overflow-hidden">
            {/* Hero — real jobsite photo instead of a stock skyline */}
            <section className="relative flex h-[65vh] min-h-[440px] w-full items-center justify-center overflow-hidden pt-16">
                <div className="absolute inset-0 z-0">
                    <Photo photo={hero} alt={a.heroAlt} sizes="100vw" priority className="scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/85 via-[#1e1e1e]/55 to-[#1e1e1e]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(159,227,0,0.1),transparent_65%)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#9fe300]/30 bg-[#9fe300]/10 px-4 py-2"
                    >
                        <FaShieldAlt className="text-[#9fe300]" size={14} />
                        <span className="font-contrax text-[10px] uppercase tracking-[0.2em] text-[#9fe300] sm:text-[11px]">
                            {t.nav.classA}
                        </span>
                    </m.div>
                    <m.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-4 font-contrax text-5xl uppercase tracking-wide text-white md:text-7xl"
                    >
                        {data.heroAbout.title}
                    </m.h1>
                    <m.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="mx-auto h-1 w-24 rounded-full bg-[#9fe300]"
                    />
                </div>
            </section>

            {/* Intro — real photo collage, mirrors the home page's About section */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Eyebrow index="01" />
                        <h2 className="mb-8 font-contrax text-3xl text-[#9fe300] md:text-4xl">{data.about.title}</h2>
                        <p className="mb-8 font-body text-lg leading-relaxed text-white">{data.heroAbout.text}</p>
                        <div className="space-y-4">
                            {data.about.list.map((item, index) => (
                                <m.div
                                    key={item.subTitle}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-3 border-l-2 border-[#9fe300]/60 pl-4"
                                >
                                    <p className="font-body text-white/90">
                                        <span className="font-bold text-[#9fe300]">{item.subTitle}</span> — {item.description}
                                    </p>
                                </m.div>
                            ))}
                        </div>
                    </m.div>

                    <m.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[420px] sm:h-[500px]">
                        <div className="absolute left-0 top-0 h-[78%] w-[84%] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                            <Photo photo={collageMain} sizes="(max-width: 1024px) 85vw, 42vw" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 right-0 h-[58%] w-[44%] overflow-hidden rounded-3xl border-4 border-[#1e1e1e] shadow-2xl">
                            <Photo photo={collageDetail} sizes="(max-width: 1024px) 45vw, 22vw" />
                        </div>
                    </m.div>
                </div>

                {/* Certifications — shared component, no more duplicate markup */}
                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16">
                    <Certifications />
                </m.div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="bg-[#151515] py-20">
                <div className="mx-auto max-w-7xl px-6 md:px-16">
                    <m.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Eyebrow index="02" />
                    </m.div>
                    <m.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-3"
                    >
                        {[
                            { title: a.missionTitle, text: a.missionText, Icon: FaClipboardCheck },
                            { title: a.visionTitle, text: a.visionText, Icon: FaHardHat },
                            { title: a.valuesTitle, list: a.values, Icon: FaHandshake },
                        ].map(({ title, text, list, Icon }) => (
                            <m.div
                                key={title}
                                variants={fadeInUp}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1e1e1e] p-8 transition-colors duration-300 hover:border-[#9fe300]"
                            >
                                <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                                    <Icon size={80} color="#9fe300" />
                                </div>
                                <h3 className="mb-4 font-contrax text-3xl text-[#9fe300]">{title}</h3>
                                {text && <p className="font-body leading-relaxed text-white/80">{text}</p>}
                                {list && (
                                    <ul className="space-y-3 font-body text-white/80">
                                        {list.map((value) => (
                                            <li key={value} className="flex items-center gap-2">
                                                <span className="text-[#9fe300]">✓</span> {value}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </m.div>
                        ))}
                    </m.div>
                </div>
            </section>

            {/* Process */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:px-16">
                <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
                    <Eyebrow index="03" />
                    <h2 className="mb-4 font-contrax text-4xl text-[#9fe300] md:text-5xl">{a.processTitle}</h2>
                    <p className="font-body text-white/60">{a.processSubtitle}</p>
                </m.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
                    {[
                        <BiPhoneCall key="contact" size={50} />,
                        <Image key="visit" src="/car.png" alt={a.steps[1].iconAlt} width={60} height={60} />,
                        <Image key="materials" src="/material.jpg" alt={a.steps[2].iconAlt} width={60} height={60} className="rounded-full object-cover" />,
                        <Image key="agreement" src="/contrat.png" alt={a.steps[3].iconAlt} width={60} height={60} />,
                        <TbBrandCashapp key="completion" size={50} />,
                    ]
                        .map((icon, index) => ({ icon, ...a.steps[index] }))
                        .map((step, index) => (
                            <m.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, ease: EASE }}
                                className="group flex flex-col items-center rounded-xl border border-white/5 bg-[#252525] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#9fe300]"
                            >
                                <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#9fe300]/30 bg-[#1e1e1e] text-[#9fe300] transition-colors group-hover:border-[#9fe300]">
                                    {step.icon}
                                </div>
                                <h3 className="mb-3 font-contrax text-xl text-white transition-colors group-hover:text-[#9fe300]">{step.title}</h3>
                                <p className="font-body text-sm leading-relaxed text-white/70">{step.text}</p>
                            </m.div>
                        ))}
                </div>
            </section>

            {/* Final CTA — real finished project behind the glow card */}
            <section className="mx-auto max-w-7xl px-6 pb-20 md:px-16 md:pb-28">
                <m.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
                    <GlowCard>
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0">
                                <Photo photo={finalCta} sizes="100vw" className="opacity-25" />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#252525]/95 to-[#1a1a1a]/95" />
                            </div>
                            <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-20">
                                <h2 className="mx-auto mb-8 max-w-3xl font-contrax text-3xl leading-tight text-white md:text-5xl">
                                    {data.about.aboutFooter}
                                </h2>
                                <PrimaryCta href={href("/contact#email")} className="md:px-10 md:py-5 md:text-lg">
                                    {data.about.buttonText}
                                </PrimaryCta>
                            </div>
                        </div>
                    </GlowCard>
                </m.div>
            </section>
        </div>
    );
}
