"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function BeforeAfter({ before, after, label }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const updatePosition = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.max(2, Math.min(98, pct)));
    }, []);

    const handleMouseDown = useCallback((e) => {
        isDragging.current = true;
        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        updatePosition(e.clientX);
    }, [updatePosition]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[380px] md:h-[500px] rounded-3xl overflow-hidden select-none border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ cursor: "col-resize" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* After image (base) */}
            <Image
                src={after.src}
                alt={after.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Before image — clip reveals left portion only */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
                <Image
                    src={before.src}
                    alt={before.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Vertical divider line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-secondary shadow-[0_0_12px_rgba(159,227,0,0.7)] pointer-events-none"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />

            {/* Drag handle */}
            <div
                className="absolute top-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-secondary shadow-[0_0_25px_rgba(159,227,0,0.6)] cursor-col-resize"
                style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
                onMouseDown={handleMouseDown}
                onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
                onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 4L2 9L6 14M12 4L16 9L12 14" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* BEFORE label */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white font-contrax text-xs tracking-widest px-3 py-1.5 rounded-full uppercase pointer-events-none">
                BEFORE
            </div>

            {/* AFTER label */}
            <div className="absolute bottom-4 right-4 bg-secondary text-primary font-contrax text-xs tracking-widest px-3 py-1.5 rounded-full uppercase pointer-events-none">
                AFTER
            </div>

            {label && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white/90 font-atpinko text-xs px-4 py-1.5 rounded-full whitespace-nowrap pointer-events-none">
                    {label}
                </div>
            )}
        </div>
    );
}
