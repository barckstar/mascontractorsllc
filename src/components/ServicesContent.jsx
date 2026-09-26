"use client";
import React from "react";
import { m } from "framer-motion";
import { useI18n, fill } from "@/i18n/I18nProvider";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import FAQ from "./FAQ";

export default function ServicesContent() {
    const { t, href } = useI18n();
    const { contact_services, specialties } = t.site;
    const s = t.servicesPage;

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-primary min-h-screen pt-32 pb-20 overflow-hidden mt-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 md:px-16  mb-24 text-center relative z-10">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-7xl font-contrax text-white mb-6 uppercase tracking-wider">
                        {s.titleA}<span className="text-secondary">{s.titleB}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto leading-relaxed mb-12">
                        {s.intro}
                    </p>
                </m.div>

                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-secondary/5 blur-[120px] rounded-full -z-10" />
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
                                                className="cta-glow bg-secondary text-primary font-contrax py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.3)]"
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

            {/* Final Call to Action */}
            <section className="container mx-auto px-6 md:px-16 py-32 text-center">
                <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-6xl font-contrax text-white mb-8 uppercase leading-tight">
                        {s.ctaA}<span className="text-secondary">{s.ctaB}</span>{s.ctaC}
                    </h2>
                    <p className="text-gray-400 font-body text-xl mb-12 max-w-2xl mx-auto">
                        {s.ctaText}
                    </p>
                    <Link href={href("/contact")}>
                        <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cta-glow bg-secondary text-primary font-contrax text-xl py-5 px-14 rounded-full hover:bg-white transition-all duration-300"
                        >
                            {s.ctaButton}
                        </m.button>
                    </Link>
                    <div className="mt-6">
                        <Link href={href("/about")} className="inline-flex items-center gap-2 text-gray-400 font-body hover:text-secondary transition-colors">
                            {s.aboutLink} <BiRightArrowAlt size={20} />
                        </Link>
                    </div>
                </m.div>
            </section>
        </div>
    );
}
