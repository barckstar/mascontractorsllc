"use client";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

// Shared visual language for every page: numbered section labels, the pill
// CTA with a light sweep on hover, a real-photo helper, the moving
// "construction tape" strip, and the rotating conic-gradient glow card used
// on every page's final CTA. Introduced with the home page redesign so the
// rest of the site (About, Contact, Services, Gallery, Blog) can reuse the
// same primitives instead of the old flat green button/plain section look.
export const EASE = [0.22, 1, 0.36, 1];

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Eyebrow({ index, children }) {
    return (
        <span className="flex items-center gap-3 text-[#9fe300] font-contrax text-[11px] md:text-xs tracking-[0.3em] uppercase mb-5">
            {index != null && <span className="text-white/35">{index}</span>}
            <span className="h-px w-10 bg-[#9fe300]/70" />
            {children}
        </span>
    );
}

export function PrimaryCta({ href, children, className = "" }) {
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

export function Photo({ photo, sizes, priority = false, className = "", alt }) {
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
export function Tape({ items, reverse = false, className = "" }) {
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

// Rotating conic-gradient glow border card, used for every page's final CTA.
export function GlowCard({ children, className = "" }) {
    return (
        <div className={`relative overflow-hidden rounded-[2rem] p-[2px] ${className}`}>
            <div
                aria-hidden="true"
                className="absolute left-[-50%] top-1/2 -mt-[100%] aspect-square w-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#9fe300_50deg,transparent_110deg,transparent_180deg,#9fe300_230deg,transparent_290deg)] opacity-80 motion-safe:animate-spin-slow"
            />
            <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-gradient-to-br from-[#252525] to-[#1a1a1a]">
                <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#9fe300]/10 blur-[100px]" />
                <div className="relative z-10">{children}</div>
            </div>
        </div>
    );
}
