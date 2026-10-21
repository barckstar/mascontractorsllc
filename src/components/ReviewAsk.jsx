"use client";
import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useI18n } from "@/i18n/I18nProvider";

// Three quiet ways to ask for a Google review, none of them a blocking popup:
//   ReviewCard  inside the contact form's "sent" panel
//   ReviewStrip static band above the footer (sitewide)
//   ReviewChip  small corner star that unfolds into a short card, dismissible
// /review is a route handler that redirects to Google's "write a review" box, so
// it's a plain <a>: next/link would try to prefetch it as a page.

const REVIEW_PATH = "/review";

function Stars({ className = "" }) {
    return (
        <span className={`inline-flex gap-0.5 text-[#facc15] ${className}`} aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={13} />)}
        </span>
    );
}

function ReviewLink({ children, className = "", onClick }) {
    const { t } = useI18n();
    return (
        <a
            href={REVIEW_PATH}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#9fe300] px-5 py-3 font-contrax text-xs uppercase tracking-[0.12em] text-[#111111] transition-colors duration-200 hover:bg-white ${className}`}
        >
            <FaStar size={13} aria-hidden="true" />
            {children}
            <span className="sr-only">{t.reviewAsk.newTab}</span>
        </a>
    );
}

export function ReviewCard({ delay = 0 }) {
    const r = useI18n().t.reviewAsk;
    return (
        <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 border-l-[3px] border-l-[#9fe300] bg-[#262626] p-5 text-left"
        >
            <div className="min-w-[220px] flex-1">
                <Stars />
                <p className="mt-1 font-body text-[15px] font-bold text-white">{r.cardTitle}</p>
                <p className="mt-1 font-body text-[13px] leading-relaxed text-gray-400">{r.cardText}</p>
            </div>
            <ReviewLink>{r.cardButton}</ReviewLink>
        </m.div>
    );
}

export function ReviewStrip() {
    const r = useI18n().t.reviewAsk;
    return (
        <section id="review-strip" className="border-t border-white/10 bg-gradient-to-r from-[#1e1e1e] to-[#242a14] px-6 py-6 md:px-16 print:hidden">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
                <div>
                    <Stars />
                    <p className="mt-1 font-contrax text-sm tracking-wide text-white">{r.stripTitle}</p>
                    <p className="mt-1 font-body text-[13px] text-gray-400">{r.stripText}</p>
                </div>
                <ReviewLink>{r.stripButton}</ReviewLink>
            </div>
        </section>
    );
}

const DISMISS_KEY = "mas-review-chip-dismissed";
const DISMISS_DAYS = 30;
const SHOW_AFTER_MS = 20000;
const SHOW_AFTER_SCROLL = 0.4;

// Renders nothing until the visitor has either stayed 20 s or scrolled 40 %, so it
// never competes with the hero (LCP) and adds no layout shift: it's position: fixed.
export function ReviewChip() {
    const r = useI18n().t.reviewAsk;
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [stripInView, setStripInView] = useState(false);

    useEffect(() => {
        try {
            const at = Number(localStorage.getItem(DISMISS_KEY));
            if (at && Date.now() - at < DISMISS_DAYS * 864e5) return;
        } catch {}
        let timer;
        const show = () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
            setVisible(true);
        };
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (max > 0 && window.scrollY / max > SHOW_AFTER_SCROLL) show();
        };
        timer = setTimeout(show, SHOW_AFTER_MS);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // The strip above the footer asks the same thing; don't stack the chip on top of it.
    useEffect(() => {
        const strip = document.getElementById("review-strip");
        if (!visible || !strip) return;
        const io = new IntersectionObserver(([e]) => setStripInView(e.isIntersecting));
        io.observe(strip);
        return () => io.disconnect();
    }, [visible]);

    const dismiss = () => {
        try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
        setVisible(false);
    };

    if (!visible || stripInView) return null;

    return (
        <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 right-4 z-40 print:hidden"
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
            {open ? (
                <div className="w-[260px] rounded-2xl border border-white/15 bg-[#1e1e1e] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <button
                        type="button"
                        onClick={dismiss}
                        aria-label={r.chipClose}
                        className="absolute right-2 top-2 rounded-full p-1.5 text-gray-400 transition-colors hover:text-white"
                    >
                        <IoClose size={16} aria-hidden="true" />
                    </button>
                    <Stars />
                    <p className="mt-1 pr-6 font-body text-sm font-bold text-white">{r.chipTitle}</p>
                    <p className="mb-3 mt-0.5 font-body text-[13px] text-gray-400">{r.chipText}</p>
                    <ReviewLink onClick={dismiss} className="w-full">{r.chipButton}</ReviewLink>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={r.chipOpen}
                    aria-expanded="false"
                    className="grid h-11 w-11 place-items-center rounded-full bg-[#9fe300] text-[#111111] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-110"
                >
                    <FaStar size={18} aria-hidden="true" />
                </button>
            )}
        </m.div>
    );
}
