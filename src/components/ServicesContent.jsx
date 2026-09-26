"use client";
import React from "react";
import { m } from "framer-motion";
import { useI18n, fill } from "@/i18n/I18nProvider";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import FAQ from "./FAQ";
import { EASE, fadeInUp, PrimaryCta, Photo, GlowCard } from "./ui";

export default function ServicesContent({ heroPhoto, ctaPhoto }) {
    const { t, href } = useI18n();
    const { contact_services, specialties } = t.site;
    const s = t.servicesPage;

    return (
        <div className="bg-primary min-h-screen overflow-hidden">
            {/* Hero Section — real jobsite photo instead of a plain gradient */}
            <section className="relative mb-16 flex min-h-[52vh] w-full items-center justify-center overflow-hidden pt-24 md:min-h-[56vh]">
                <div className="absolute inset-0 z-0">
                    {heroPhoto && <Photo photo={heroPhoto} sizes="100vw" priority className="scale-105" />}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
                </div>
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container relative z-10 mx-auto px-6 text-center md:px-16"
                >
                    <h1 className="mb-6 font-contrax text-4xl uppercase tracking-wider text-white md:text-7xl">
                        {s.titleA}<span className="text-secondary">{s.titleB}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-gray-300 md:text-xl">
                        {s.intro}
                    </p>
                </m.div>
            </section>

            {/* Main Services Grid */}
            <section className="container mx-auto px-6 md:px-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32 pb-24">
                {contact_services.map((service, index) => {
                    const slug = service.slug;
                    const cardHref = href(slug ? `/services/${slug}` : "/contact");
                    return (
                        <m.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-[#252525] rounded-3xl overflow-hidden border border-white/5 hover:border-secondary/50 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(159,227,0,0.12)] transition-all duration-500 shadow-2xl"
                        >
                            <Link href={cardHref} className="block">
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={service.img}
                                        alt={fill(s.cardAlt, { name: service.title2 })}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-all duration-700 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/20 to-transparent" />
                                    <h2 className="absolute bottom-6 left-8 text-2xl font-contrax text-white uppercase tracking-wider group-hover:text-secondary transition-colors">
                                        {service.title2}
                                    </h2>
                                </div>
                            </Link>
                            <div className="p-8">
                                <p className="text-gray-400 font-body mb-8 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                                    {service.description}
                                </p>
                                <Link
                                    href={cardHref}
                                    className="inline-flex items-center text-secondary font-contrax text-sm tracking-widest hover:gap-4 transition-all"
                                >
                                    {fill(slug ? s.cardLink : s.cardEstimate, { name: service.title2 })}
                                    <BiRightArrowAlt size={20} className="ml-2" />
                                </Link>
                            </div>
                        </m.div>
                    );
                })}

                <div className="col-span-full text-center mt-8">
                    <Link href={href("/gallery")} className="inline-flex items-center gap-2 text-secondary font-contrax text-sm tracking-widest hover:gap-4 transition-all">
                        {s.viewGallery} <BiRightArrowAlt size={20} className="ml-2" />
                    </Link>
                </div>
            </section>
            {/* Detailed Specialties Section */}
            <section className="relative px-6 md:px-16  py-24 bg-[#151515]">
                <div className="container mx-auto px-4">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-6xl font-contrax text-white mb-4 uppercase">
                                {s.specialtiesA}<span className="text-secondary">{s.specialtiesB}</span>
                            </h2>
                            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
                        </div></m.div>

                    <div className="space-y-32">
                        {specialties.map((spec, index) => {
                            const servicePage = spec.servicePage;
                            return (
                            <m.div
                                key={spec.slug}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeInUp}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                            >
                                <div className="w-full lg:w-1/2">
                                    <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group">
                                        <Image
                                            src={spec.image}
                                            alt={fill(s.specialtyAlt, { name: spec.title })}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <span className="text-secondary font-contrax tracking-[0.3em] uppercase text-xs mb-4 block">{s.specialtyEyebrow}</span>
                                    <h3 className="text-3xl md:text-5xl font-contrax text-white mb-8 uppercase leading-tight">
                                        {spec.title}
                                    </h3>
                                    <p className="text-gray-400 font-body text-lg mb-10 leading-relaxed">
                                        {spec.description}
                                    </p>
                                    <p className="text-gray-400 font-body text-lg mb-10 leading-relaxed italic">
                                        &quot;{spec.descriptionLarge}&quot;
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                        {spec.list.map((item, id) => (
                                            <li key={id} className="flex items-start gap-4 group/item">
                                                <FaCheckCircle className="text-secondary mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                                                <span className="text-gray-300 font-body text-base">{item.item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href={href("/contact")}>
                                            <m.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-secondary text-primary font-contrax py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.3)]"
                                            >
                                                {s.freeEstimate}
                                            </m.button>
                                        </Link>
                                        {servicePage && (
                                            <Link
                                                href={href(`/services/${servicePage}`)}
                                                className="inline-flex items-center gap-2 border border-secondary/50 text-secondary font-contrax py-4 px-8 rounded-full hover:border-secondary hover:bg-secondary/5 transition-all duration-300 text-sm tracking-widest"
                                            >
                                                {s.fullServicePage} <BiRightArrowAlt size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </m.div>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            {/*FAQ*/}
            <FAQ />

            {/* Final Call to Action — real finished project behind the glow card */}
            <section className="container mx-auto px-6 py-24 md:px-16 md:py-32">
                <m.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <GlowCard>
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0">
                                {ctaPhoto && <Photo photo={ctaPhoto} sizes="100vw" className="opacity-25" />}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#252525]/95 to-[#1a1a1a]/95" />
                            </div>
                            <div className="relative z-10 mx-auto max-w-3xl px-8 py-16 text-center md:px-16 md:py-20">
                                <h2 className="mb-8 font-contrax text-3xl uppercase leading-tight text-white md:text-6xl">
                                    {s.ctaA}<span className="text-secondary">{s.ctaB}</span>{s.ctaC}
                                </h2>
                                <p className="mx-auto mb-10 max-w-2xl font-body text-lg text-gray-300 md:text-xl">
                                    {s.ctaText}
                                </p>
                                <PrimaryCta href={href("/contact")} className="md:px-10 md:py-5 md:text-lg">
                                    {s.ctaButton}
                                </PrimaryCta>
                                <div className="mt-6">
                                    <Link href={href("/about")} className="inline-flex items-center gap-2 text-gray-400 font-body hover:text-secondary transition-colors">
                                        {s.aboutLink} <BiRightArrowAlt size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </GlowCard>
                </m.div>
            </section>
        </div>
    );
}
