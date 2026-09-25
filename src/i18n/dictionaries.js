// UI dictionaries. Static imports (not fs) so they are bundled into every
// server function, including the ISR home page.
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import { DEFAULT_LOCALE } from "./config";

const DICTIONARIES = { en, es };

export function getDictionary(lang) {
    return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LOCALE];
}
