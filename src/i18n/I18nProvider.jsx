"use client";
import { createContext, useContext, useMemo } from "react";
import { localePath } from "./config";

const I18nContext = createContext(null);

// Wraps each language's layout so client components can read the dictionary
// without threading it through props: const { t, lang, href } = useI18n();
export function I18nProvider({ lang, dict, children }) {
    const value = useMemo(() => ({ lang, t: dict, href: (path) => localePath(lang, path) }), [lang, dict]);
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n() used outside <I18nProvider>");
    return ctx;
}

// "{count} reviews" + { count: 7 } → "7 reviews"
export function fill(template, vars) {
    return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
