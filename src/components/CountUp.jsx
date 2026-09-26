"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Counts "11+", "500+", "4.9★" up from zero the first time it scrolls into view.
// The real value is in the markup for crawlers and screen readers.
export default function CountUp({ value, duration = 1600 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduce = useReducedMotion();
    const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
    const target = match ? parseFloat(match[1]) : null;
    const decimals = match?.[1].split(".")[1]?.length ?? 0;
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView || target == null || reduce) return;
        let raf;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setN(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, reduce, duration]);

    if (target == null) return <span>{value}</span>;
    const shown = reduce ? target : n;
    return (
        <span ref={ref}>
            <span className="sr-only">{value}</span>
            <span aria-hidden="true">{shown.toFixed(decimals)}{match[2]}</span>
        </span>
    );
}
