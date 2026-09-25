"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LANGUAGE_NAMES, localePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// EN | ES pill. Each option is a real link to the same page in the other
// language: crawlers follow it, and Next switches client-side (both languages
// share the root layout), so only the new page's content and dictionary load.
export default function LanguageSwitcher({ className = "" }) {
    const { lang, t } = useI18n();
    const path = stripLocale(usePathname() ?? "/");

    return (
        <nav aria-label={t.nav.languageLabel} className={`flex items-center rounded-full border border-white/15 p-0.5 font-contrax text-xs ${className}`}>
            {LOCALES.map((l) => (
                <Link
                    key={l}
                    href={localePath(l, path)}
                    hrefLang={l}
                    lang={l}
                    title={LANGUAGE_NAMES[l]}
                    aria-current={l === lang ? "true" : undefined}
                    className={`px-2.5 py-1 rounded-full tracking-widest transition-colors ${
                        l === lang ? "bg-[#9fe300] text-[#1e1e1e]" : "text-gray-300 hover:text-[#9fe300]"
                    }`}
                >
                    {l.toUpperCase()}
                </Link>
            ))}
        </nav>
    );
}
