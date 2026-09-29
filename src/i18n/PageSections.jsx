import { I18nSections } from "./I18nProvider";
import { getDictionary } from "./dictionaries";

// Server-side: wraps one page's client components with just the dictionary
// sections they read (the layout already provides common, nav, footer, site).
// Reading a section that isn't listed throws at build time, since every
// page is prerendered.
export default function PageSections({ lang, names, children }) {
    const dict = getDictionary(lang);
    const sections = Object.fromEntries(names.map((name) => [name, dict[name]]));
    return <I18nSections sections={sections}>{children}</I18nSections>;
}
