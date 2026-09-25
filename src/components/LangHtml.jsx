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
            <body>{children}</body>
        </html>
    );
}
