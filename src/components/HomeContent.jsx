"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useI18n, fill } from "@/i18n/I18nProvider";
import { HOME_PHOTOS } from "@/content/homePhotos";
import Certifications from "./Certifications";
import LocalBusiness from "./LocalBusiness";
import Reviews from "./Reviews";
import FAQ from "./FAQ";
import { BiRightArrowAlt } from "react-icons/bi";
import { MdAddHome, MdDeck, MdRoofing } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaBath, FaHammer, FaStar, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";

// Keyed by the service slug, not the (translated) card title.
const SERVICE_ICONS = {
    "home-additions": MdAddHome,
    "kitchen-remodeling": TbToolsKitchen2,
    "bathroom-remodeling": FaBath,
    "decks-porches": MdDeck,
    "roofing": MdRoofing,
    "siding": GiBrickWall,
};

const EASE = [0.22, 1, 0.36, 1];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Eyebrow({ index, children }) {
    return (
        <span className="flex items-center gap-3 text-[#9fe300] font-contrax text-[11px] md:text-xs tracking-[0.3em] uppercase mb-5">
            <span className="text-white/35">{index}</span>
            <span className="h-px w-10 bg-[#9fe300]/70" />
            {children}
        </span>
    );
}

function PrimaryCta({ href, children, className = "" }) {
    return (
        <Link
            href={href}
            className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#9fe300] px-8 py-4 font-contrax text-sm md:text-base text-[#1e1e1e] shadow-[0_0_30px_rgba(159,227,0,0.35)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_45px_rgba(255,255,255,0.3)] ${className}`}
        >
            <span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/60 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[600%]" />
            <span className="relative">{children}</span>
            <BiRightArrowAlt size={22} className="relative transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    );
}

function Photo({ photo, sizes, priority = false, className = "", alt }) {
    return (
        <Image
            src={photo.src}
            alt={alt ?? photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={60}
            className={`object-cover ${className}`}
        />
    );
}

// One band of the moving "construction tape". The row is rendered twice and
// slid by -50%, so the loop has no visible seam.
function Tape({ items, reverse = false, className = "" }) {
    const row = [...items, ...items];
    const copy = (key) => (
        <div key={key} className="flex shrink-0 items-center">
            {row.map((item, i) => (
                <span key={i} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                    {item}
                    <span className="text-[0.7em] opacity-60">✦</span>
                </span>
            ))}
        </div>
    );
    return (
        <div className={`flex w-max ${reverse ? "motion-safe:animate-marquee-reverse" : "motion-safe:animate-marquee"} ${className}`}>
            {copy(0)}
            {copy(1)}
        </div>
    );
}

function Hero({ photos }) {
    const { t, href } = useI18n();
    const h = t.home;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const up = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const down = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const [kitchen, bath, haven, builtIns] = HOME_PHOTOS.hero.map((src) => photos[src]);

    const tiles = [
        { photo: kitchen, motion: up, place: "col-start-1 col-end-5 row-start-1 row-end-5", sizes: "(max-width: 1024px) 66vw, 30vw", priority: true },
        { photo: bath, motion: down, place: "col-start-5 col-end-7 row-start-1 row-end-4", sizes: "(max-width: 1024px) 33vw, 15vw" },
        { photo: haven, motion: down, place: "col-start-5 col-end-7 row-start-4 row-end-7", sizes: "(max-width: 1024px) 33vw, 15vw" },
        { photo: builtIns, motion: up, place: "col-start-1 col-end-5 row-start-5 row-end-7", sizes: "(max-width: 1024px) 66vw, 30vw" },
    ];

    return (
        <section ref={ref} className="relative overflow-hidden pt-40 pb-16 md:pt-48 lg:pt-52 lg:pb-24">
            {/* Blueprint grid + glow */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]"
            />
            <div aria-hidden="true" className="absolute -top-48 -left-40 h-[36rem] w-[36rem] rounded-full bg-[#9fe300]/[0.12] blur-[140px]" />
            <div aria-hidden="true" className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#9fe300]/[0.07] blur-[120px]" />

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-16">
                {/* Copy — static on purpose so the LCP paints immediately */}
                <div>
                    <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#9fe300]/30 bg-[#9fe300]/10 px-4 py-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9fe300] opacity-75 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe300]" />
                        </span>
                        <span className="font-contrax text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9fe300]">
                            {h.commercialA}{h.commercialB}
                        </span>
                    </div>

                    <h1 className="font-contrax uppercase leading-[1.02] tracking-wide text-white text-[clamp(1.6rem,7.4vw,3.3rem)] lg:text-[clamp(2.1rem,3.55vw,3.7rem)]">
                        <span className="block">{h.heroTitleA}</span>
                        <span className="block bg-gradient-to-r from-[#9fe300] to-[#7ab300] bg-clip-text text-transparent">{h.heroTitleB}</span>
                    </h1>
                    <p className="mt-2 font-contrax uppercase leading-[1.02] tracking-wide text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)] text-[clamp(1.6rem,7.4vw,3.3rem)] lg:text-[clamp(2.1rem,3.55vw,3.7rem)]">
                        {h.heroSubtitle}
                    </p>

                    <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-gray-300 md:text-lg">
                        {h.heroText}
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <PrimaryCta href={href("/contact#email")}>{h.getQuote}</PrimaryCta>
                        <Link
                            href={href("/gallery")}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-contrax text-sm text-white transition-colors duration-300 hover:border-[#9fe300] hover:text-[#9fe300] md:text-base"
                        >
                            {h.viewWork}
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 font-body text-sm sm:flex-row sm:items-center sm:gap-8">
                        <span className="flex items-center gap-3 text-gray-300">
                            <FaShieldAlt className="shrink-0 text-[#9fe300]" aria-hidden="true" />
                            <span>
                                <span className="block text-white">{t.nav.classA}</span>
                                <span className="text-gray-500 lg:whitespace-nowrap">{t.nav.classASub}</span>
                            </span>
                        </span>
                        <span className="flex items-center gap-3 text-gray-400">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#9fe300] motion-safe:animate-pulse" />
                            {h.freeEstimatesNote}
                        </span>
                    </div>
                </div>

                {/* Real-project collage */}
                <div className="relative">
                    <div className="grid h-[360px] grid-cols-6 grid-rows-6 gap-3 sm:h-[480px] md:gap-4 lg:h-[580px]">
                        {tiles.map(({ photo, motion, place, sizes, priority }, i) => (
                            <m.div key={photo.src} style={{ y: motion }} className={place}>
                                <m.div
                                    initial={priority ? { scale: 1.06 } : { opacity: 0, scale: 1.06, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                                    className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:rounded-3xl"
                                >
                                    <Photo photo={photo} sizes={sizes} priority={priority} className="transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                                </m.div>
                            </m.div>
                        ))}
                    </div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: [0, -10, 0] }}
                        transition={{ opacity: { delay: 0.8, duration: 0.6 }, y: { delay: 0.8, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute -bottom-5 left-3 z-10 rounded-2xl border border-white/10 bg-[#1e1e1e]/85 px-5 py-4 shadow-2xl backdrop-blur-md md:-left-8 md:bottom-12"
                    >
                        <p className="font-contrax text-3xl leading-none text-[#9fe300] md:text-4xl">11+</p>
                        <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-gray-300 md:text-[11px]">{t.localBusiness.statYears}</p>
                    </m.div>
                </div>
            </div>
        </section>
    );
}

export default function HomeContent({ reviews, posts, photos }) {
    const { t, href } = useI18n();
    const h = t.home;
    const data = t.site;
    const buildRef = useRef(null);
    const { scrollYProgress: buildProgress } = useScroll({ target: buildRef, offset: ["start 75%", "center 45%"] });
    const aboutRef = useRef(null);
    const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
    const aboutFloat = useTransform(aboutProgress, [0, 1], [60, -60]);

    const [aboutMain, aboutDetail] = HOME_PHOTOS.about.map((src) => photos[src]);
    const strip = HOME_PHOTOS.strip.map((src) => photos[src]);
    const finalPhoto = photos[HOME_PHOTOS.finalCta];
    const [lead, ...restCards] = data.homeCards;
    const ratingLabel = fill(reviews.count === 1 ? t.reviews.countOne : t.reviews.countMany, { count: reviews.count });

    return (
        <div className="min-h-screen overflow-hidden bg-[#1e1e1e]">
            <Hero photos={photos} />

            {/* Construction tape: every service, always moving */}
            <section aria-hidden="true" className="relative py-12 md:py-16">
                <div className="relative -mx-[5%] w-[110%] rotate-[1.5deg] border-y border-white/10 bg-[#151515] py-3 font-contrax text-sm uppercase tracking-[0.2em] text-white/50 md:py-4 md:text-base">
                    <Tape items={data.commercial.map((c) => c.text)} reverse />
                </div>
                <div className="relative -mx-[5%] -mt-10 w-[110%] -rotate-2 bg-[#9fe300] py-3 font-contrax text-base uppercase tracking-[0.15em] text-[#1e1e1e] shadow-[0_10px_40px_rgba(159,227,0,0.25)] md:-mt-14 md:py-4 md:text-xl">
                    <Tape items={data.contact_services.map((s) => s.title2)} />
                </div>
                <div className="mx-auto mt-10 flex max-w-5xl items-center justify-center gap-3 px-6 text-center font-body text-sm text-gray-400">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white">{reviews.rating.toFixed(1)}</span>
                    <span>·</span>
                    <span>{ratingLabel}</span>
                </div>
            </section>

            {/* Trust: numbers, service area, why us */}
            <LocalBusiness reviews={reviews} />

            <section className="relative z-20 -mt-10 px-4">
                <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <Certifications />
                </m.div>
            </section>

            {/* 01 About */}
            <section ref={aboutRef} className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative h-[400px] sm:h-[520px]">
                        <div className="absolute left-0 top-0 h-[78%] w-[84%] overflow-hidden rounded-3xl border border-white/10">
                            <Photo photo={aboutMain} sizes="(max-width: 1024px) 85vw, 42vw" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                        </div>
                        <m.div style={{ y: aboutFloat }} className="absolute bottom-0 right-0 h-[58%] w-[44%] overflow-hidden rounded-3xl border-4 border-[#1e1e1e] shadow-2xl">
                            <Photo photo={aboutDetail} sizes="(max-width: 1024px) 45vw, 22vw" />
                        </m.div>
                        {/* Rotating seal around the 3D logo */}
                        <div className="absolute bottom-2 left-2 h-32 w-32 md:bottom-4 md:left-4 md:h-40 md:w-40">
                            <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full motion-safe:animate-spin-slower">
                                <defs>
                                    <path id="mas-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                                </defs>
                                <text fill="#9fe300" fontSize="14" className="font-contrax">
                                    <textPath href="#mas-seal-path" textLength="485" lengthAdjust="spacing">
                                        MAS CONTRACTORS • RICHMOND, VA •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-[21%] rounded-full border border-[#9fe300]/40 bg-[#1e1e1e] shadow-[0_0_30px_rgba(159,227,0,0.25)]">
                                <Image src="/logo-3D.png" alt={h.logo3dAlt} fill sizes="100px" className="object-contain p-3" />
                            </div>
                        </div>
                    </m.div>

                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Eyebrow index="01" />
                        <h2 className="mb-6 font-contrax text-3xl text-white md:text-6xl">
                            <span className="text-[#9fe300]">{h.aboutA}</span>{h.aboutB}
                        </h2>
                        <p className="mb-8 font-body text-lg leading-relaxed text-gray-300">{data.heroAbout.text}</p>
                        <ul className="mb-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {data.about.list.map((item) => (
                                <li key={item.subTitle} className="border-l-2 border-[#9fe300]/60 pl-4">
                                    <p className="font-contrax text-sm uppercase tracking-wide text-white">{item.subTitle}</p>
                                    <p className="font-body text-sm text-gray-400">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                        <Link href={href("/about")} aria-label={h.aboutLinkLabel} className="group inline-flex items-center gap-2 font-contrax text-[#9fe300] transition-all hover:gap-4">
                            {h.aboutLink} <BiRightArrowAlt size={24} className="transition-colors group-hover:text-white" />
                        </Link>
                    </m.div>
                </div>
            </section>

            {/* 02 Services */}
            <section className="bg-[#151515] py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-6 md:px-16">
                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 grid items-end gap-6 lg:grid-cols-2">
                        <div>
                            <Eyebrow index="02" />
                            <h2 className="font-contrax text-3xl text-white md:text-6xl">
                                {h.servicesA}<span className="text-[#9fe300]">{h.servicesB}</span>
                            </h2>
                        </div>
                        <p className="font-body text-lg text-gray-400 lg:pb-2">{h.servicesText}</p>
                    </m.div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data.homeGreenCards.map((service, index) => {
                            const Icon = SERVICE_ICONS[service.slug] ?? FaHammer;
                            const photo = photos[HOME_PHOTOS.services[service.slug]];
                            return (
                                <m.div
                                    key={service.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
                                >
                                    <Link
                                        href={href(`/services/${service.slug}`)}
                                        className="group relative block h-[440px] overflow-hidden rounded-3xl border border-white/10 transition-colors duration-500 hover:border-[#9fe300]/60 md:h-[470px]"
                                    >
                                        {photo && (
                                            <Photo
                                                photo={photo}
                                                alt={fill(t.servicesPage.cardAlt, { name: service.title })}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/5" />
                                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-[#9fe300] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#9fe300] group-hover:text-[#1e1e1e]">
                                                <Icon size={22} />
                                            </span>
                                            <span className="rounded-full bg-black/45 px-3 py-1 font-contrax text-xs text-white/70 backdrop-blur-md">0{index + 1}</span>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                                            <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-[#9fe300]">{service.subTitle}</p>
                                            <h3 className="mb-3 font-contrax text-2xl uppercase text-white">{service.title}</h3>
                                            <p className="line-clamp-3 font-body text-sm leading-relaxed text-gray-300">{service.text}</p>
                                            <span className="mt-5 inline-flex items-center gap-2 font-contrax text-xs uppercase tracking-widest text-[#9fe300] transition-all group-hover:gap-4">
                                                {h.learnMore} <BiRightArrowAlt size={16} />
                                            </span>
                                        </div>
                                        <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#9fe300] transition-all duration-500 group-hover:w-full" />
                                    </Link>
                                </m.div>
                            );
                        })}
                    </div>

                    <div className="mt-14 text-center">
                        <Link href={href("/services")} className="group inline-flex items-center gap-2 font-contrax text-[#9fe300] transition-all hover:gap-4">
                            {h.viewAllServices} <BiRightArrowAlt size={24} className="transition-colors group-hover:text-white" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 03 Featured projects + moving strip of real work */}
            <section className="py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-6 md:px-16">
                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <Eyebrow index="03" />
                            <h2 className="font-contrax text-3xl text-white md:text-6xl">
                                {h.featuredA}<span className="text-[#9fe300]">{h.featuredB}</span>
                            </h2>
                        </div>
                        <Link href={href("/gallery")} className="group inline-flex items-center gap-2 font-contrax text-sm tracking-widest text-[#9fe300] transition-all hover:gap-4">
                            {h.viewWork} <BiRightArrowAlt size={20} />
                        </Link>
                    </m.div>

                    <div className="grid gap-6 lg:h-[640px] lg:grid-cols-3 lg:grid-rows-2">
                        {[lead, ...restCards].map((project, index) => (
                            <m.article
                                key={project.img}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
                                className={`group relative h-[340px] overflow-hidden rounded-3xl border border-white/10 lg:h-auto ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                            >
                                <Image
                                    src={project.img}
                                    alt={project.alt || project.title}
                                    fill
                                    quality={60}
                                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                    <span className="mb-3 block h-1 w-10 bg-[#9fe300] transition-all duration-500 group-hover:w-20" />
                                    <h3 className={`mb-2 font-contrax uppercase tracking-wide text-white ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`font-body text-sm text-gray-300 ${index === 0 ? "max-w-xl md:text-base" : "line-clamp-2"}`}>
                                        {project.text}
                                    </p>
                                </div>
                            </m.article>
                        ))}
                    </div>
                </div>

                <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                    <div className="flex w-max motion-safe:animate-marquee-slow hover:[animation-play-state:paused]">
                        {[0, 1].map((copy) => (
                            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1 ? "true" : undefined}>
                                {strip.map((photo) => (
                                    <div
                                        key={photo.src}
                                        className="relative mr-4 h-44 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-60"
                                        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                                    >
                                        <Photo photo={photo} alt={copy === 1 ? "" : photo.alt} sizes="360px" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 04 How a build comes together — real job-site photos */}
            <section ref={buildRef} className="relative overflow-hidden bg-[#151515] py-24 md:py-32">
                <div aria-hidden="true" className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#9fe300]/5 blur-[120px]" />
                <div className="relative mx-auto max-w-7xl px-6 md:px-16">
                    <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 grid items-end gap-8 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <Eyebrow index="04">{h.buildEyebrow}</Eyebrow>
                            <h2 className="font-contrax text-3xl text-white md:text-5xl">
                                {h.collabA}<span className="text-[#9fe300]">{h.collabB}</span>
                            </h2>
                        </div>
                        <div className="space-y-4 font-body text-lg leading-relaxed text-gray-300">
                            <p>{h.collabText1}</p>
                            <p className="text-gray-400">{h.collabText2}</p>
                        </div>
                    </m.div>

                    <div className="relative">
                        <div aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-white/10 md:block" />
                        <m.div
                            aria-hidden="true"
                            style={{ scaleX: buildProgress }}
                            className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-[#9fe300] shadow-[0_0_12px_#9fe300] md:block"
                        />
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                            {HOME_PHOTOS.build.map((src, i) => {
                                const last = i === HOME_PHOTOS.build.length - 1;
                                return (
                                    <m.figure
                                        key={src}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                                    >
                                        <figcaption className="relative z-10 mb-5 flex items-center gap-3">
                                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-contrax text-sm ${last ? "border-[#9fe300] bg-[#9fe300] text-[#1e1e1e]" : "border-[#9fe300]/50 bg-[#151515] text-[#9fe300]"}`}>
                                                0{i + 1}
                                            </span>
                                            <span className="font-contrax text-xs uppercase tracking-wide text-white md:text-sm">{h.buildStages[i]}</span>
                                        </figcaption>
                                        <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                                            <Photo
                                                photo={photos[src]}
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className={`transition-all duration-700 group-hover:scale-105 ${last ? "" : "grayscale-[35%] group-hover:grayscale-0"}`}
                                            />
                                            {last && (
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-16">
                                                    <p className="font-contrax text-[10px] tracking-widest text-[#9fe300] md:text-xs">{h.futureBadge}</p>
                                                </div>
                                            )}
                                        </div>
                                    </m.figure>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <Reviews data={reviews} />

            {/* Free visit — card with a rotating glow border */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-24">
                <m.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="relative overflow-hidden rounded-[2rem] p-[2px]"
                >
                    <div
                        aria-hidden="true"
                        className="absolute left-[-50%] top-1/2 -mt-[100%] aspect-square w-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#9fe300_50deg,transparent_110deg,transparent_180deg,#9fe300_230deg,transparent_290deg)] opacity-80 motion-safe:animate-spin-slow"
                    />
                    <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-gradient-to-br from-[#252525] to-[#1a1a1a] p-8 md:p-14">
                        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#9fe300]/10 blur-[100px]" />
                        <div className="relative z-10 flex flex-col items-center gap-12 md:flex-row">
                            <div className="md:w-3/5">
                                <h2 className="mb-6 font-contrax text-3xl text-white md:text-5xl">
                                    {h.visitA}<span className="text-[#9fe300]">{h.visitB}</span>{h.visitC}
                                </h2>
                                <p className="mb-8 font-body text-lg leading-relaxed text-gray-300">{h.visitText}</p>
                                <PrimaryCta href={href("/contact#email")}>{h.visitButton}</PrimaryCta>
                            </div>
                            <div className="relative w-full md:w-2/5">
                                <div className="relative h-64 w-full rotate-3 overflow-hidden rounded-2xl border-2 border-[#9fe300]/20 shadow-2xl transition-transform duration-500 hover:rotate-0">
                                    <Image src="/car.png" alt={h.carAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                                </div>
                            </div>
                        </div>
                    </div>
                </m.div>
            </section>

            {/* 05 Blog */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:px-16">
                <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12 flex items-end justify-between">
                    <div>
                        <Eyebrow index="05">{h.blogEyebrow}</Eyebrow>
                        <h2 className="font-contrax text-3xl uppercase leading-tight text-white md:text-5xl">
                            {h.blogA}<span className="text-[#9fe300]">{h.blogB}</span>
                        </h2>
                    </div>
                    <Link href={href("/blog")} className="hidden items-center gap-2 font-contrax text-sm tracking-widest text-[#9fe300] transition-all hover:gap-4 md:inline-flex">
                        {h.allArticles} <BiRightArrowAlt size={18} />
                    </Link>
                </m.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {posts.slice(0, 3).map((post, index) => (
                        <m.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group overflow-hidden rounded-2xl border border-white/5 bg-[#252525] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#9fe300]/30 hover:shadow-[0_20px_50px_rgba(159,227,0,0.08)]"
                        >
                            <Link href={href(`/blog/${post.slug}`)} className="block">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.imgAlt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/20 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-contrax text-xs tracking-wider text-[#9fe300] backdrop-blur-sm">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-3 line-clamp-2 font-contrax text-base uppercase leading-snug text-white transition-colors group-hover:text-[#9fe300]">
                                        {post.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-2 font-body text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                                    <span className="inline-flex items-center gap-2 font-contrax text-xs tracking-widest text-[#9fe300] transition-all group-hover:gap-4">
                                        {h.readArticle} <BiRightArrowAlt size={14} />
                                    </span>
                                </div>
                            </Link>
                        </m.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href={href("/blog")} className="inline-flex items-center gap-2 font-contrax text-sm tracking-widest text-[#9fe300] transition-all hover:gap-4">
                        {h.allArticles} <BiRightArrowAlt size={18} />
                    </Link>
                </div>
            </section>

            <FAQ />

            {/* Final CTA over a real finished project */}
            <section className="relative overflow-hidden py-28 md:py-40">
                <Image src={finalPhoto.src} alt="" fill quality={60} sizes="100vw" className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#1e1e1e]/90 to-[#1e1e1e]/95" />
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(159,227,0,0.16),transparent_65%)]" />
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative mx-auto max-w-5xl px-6 text-center"
                >
                    <h2 className="mb-8 font-contrax text-3xl text-white md:text-7xl">
                        <span className="text-[#9fe300]">{h.finalA}</span>{h.finalB}<br />
                        {h.finalC}
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl font-body text-lg text-gray-300 md:text-xl">{h.finalText}</p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <PrimaryCta href={href("/contact#email")} className="md:px-10 md:py-5 md:text-lg">{h.finalButton}</PrimaryCta>
                        <a
                            href="tel:+18048334600"
                            className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-contrax text-sm text-white transition-colors hover:border-[#9fe300] hover:text-[#9fe300] md:text-base"
                        >
                            <FaPhoneAlt size={14} /> (804) 833-4600
                        </a>
                    </div>
                </m.div>
            </section>
        </div>
    );
}
