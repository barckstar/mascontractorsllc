"use client";
import { usePathname } from "next/navigation";
import { LOCALES, LANGUAGE_NAMES, localePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// EN | ES pill. Each option is a real link to the same page in the other
// language, so it works without JS and crawlers can follow it.
//
// Plain <a>, not next/link, on purpose: English lives at unprefixed URLs that
// next.config.js rewrites to /en/…, and the client router can't see that
// rewrite. A soft navigation across languages leaves it holding /en/… as the
// current route, and from there every prefetch of an English link guesses the
// wrong segment and 404s. Switching language is rare; a full load keeps the
// router's state clean.
export default function LanguageSwitcher({ className = "" }) {
    const { lang, t } = useI18n();
    const path = stripLocale(usePathname() ?? "/");

    return (
        <nav aria-label={t.nav.languageLabel} className={`flex items-center rounded-full border border-white/15 p-0.5 font-contrax text-xs ${className}`}>
            {LOCALES.map((l) => (
                <a
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
                </a>
            ))}
        </nav>
    );
}
