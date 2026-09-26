"use client";
import { useState } from "react";
import { FaShareNodes, FaCheck } from "react-icons/fa6";

// Native share sheet on phones (WhatsApp, Messages, AirDrop…); on desktop,
// where there usually isn't one, it copies the link instead.
export default function CardShare({ url, title, label, copied }) {
    const [done, setDone] = useState(false);

    async function share() {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch {
                // Closing the share sheet rejects; nothing to do.
            }
            return;
        }
        await navigator.clipboard.writeText(url);
        setDone(true);
        setTimeout(() => setDone(false), 2500);
    }

    return (
        <button
            type="button"
            onClick={share}
            className="mt-4 flex items-center justify-center gap-3 w-full rounded-2xl border border-secondary/40 text-secondary font-contrax text-xs tracking-widest uppercase py-4 hover:bg-secondary hover:text-primary transition"
        >
            {done ? <FaCheck aria-hidden="true" /> : <FaShareNodes aria-hidden="true" />}
            <span aria-live="polite">{done ? copied : label}</span>
        </button>
    );
}
