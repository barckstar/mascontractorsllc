"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

// <html lang> from the URL's first segment: "es" for /es/…, English for
// everything else (the "(en)" route group). Runs during SSR too, so the static
// HTML already carries the right lang, and it updates on client-side
// navigation between languages.
export default function LangHtml({ children }) {
    const segment = useSelectedLayoutSegment();
    const lang = isLocale(segment) ? segment : DEFAULT_LOCALE;
    return (
        <html lang={lang}>
            <head>
                {/* Fuentes del hero: sin esto el navegador las descubre solo tras leer el CSS y
                    Lighthouse móvil retrasa el LCP esperándolas. */}
                <link rel="preload" href="/fonts/Sora-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/Sora-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/Conthrax-SemiBold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
            </head>
            <body>{children}</body>
        </html>
    );
}
