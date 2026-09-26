import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { FaPhone, FaEnvelope, FaLocationDot, FaGlobe, FaGoogle, FaStar, FaAddressCard, FaFacebook, FaInstagram, FaT, FaClock } from "react-icons/fa6";
import { FaSms } from "react-icons/fa";
import CardShare from "@/components/CardShare";
import business from "@/content/business.json";
import { getServices } from "@/content";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, alternatesFor, localePath, OG_LOCALE } from "@/i18n/config";
import { getGoogleReviews } from "@/lib/googleReviews";

// Digital business card: what the NFC card, the QR on the truck and the email
// signature open. Standalone on purpose (no navbar, no footer): it has to read
// as a card on a phone, not as one more page of the site.

const SOCIAL_ICONS = { Facebook: FaFacebook, Instagram: FaInstagram, Thumbtack: FaT };
export const VCARD_PATH = "/card/mas-contractors.vcf";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const c = getDictionary(lang).card;
    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: alternatesFor(lang, "/card"),
        // Same facts as /contact; kept out of the index so it doesn't compete with it.
        robots: { index: false, follow: true },
        openGraph: {
            title: `MAS Contractors — ${c.metaTitle}`,
            description: c.metaDescription,
            url: SITE_URL + localePath(lang, "/card"),
            siteName: "MAS Contractors LLC",
            locale: OG_LOCALE[lang],
            type: "profile",
        },
    };
}

function Action({ href, icon: Icon, label, external }) {
    return (
        <a
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/[0.04] border border-white/10 py-4 hover:border-secondary/50 hover:bg-secondary/10 active:scale-95 transition"
        >
            <Icon size={20} className="text-secondary" aria-hidden="true" />
            <span className="font-body text-xs text-gray-200">{label}</span>
        </a>
    );
}

export default async function CardPage({ params }) {
    const { lang } = await params;
    const c = getDictionary(lang).card;
    const url = SITE_URL + localePath(lang, "/card");
    const otherLang = lang === "es" ? "en" : "es";
    const { rating, count, mapsUrl } = await getGoogleReviews(lang);
    const qr = await QRCode.toString(url, {
        type: "svg",
        margin: 0,
        errorCorrectionLevel: "M",
        color: { dark: "#1e1e1e", light: "#ffffff" },
    });
    const a = business.address;

    return (
        <main className="min-h-dvh bg-[#0d0d0d] flex justify-center px-4 py-6 sm:py-12">
            <article className="w-full max-w-md rounded-[2rem] overflow-hidden bg-primary border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <header className="relative px-6 pt-10 pb-7 text-center bg-[radial-gradient(circle_at_50%_0%,rgba(159,227,0,0.22),transparent_65%)]">
                    <Image src="/IMG_0271_V.png" alt="MAS Contractors" width={1024} height={445} priority className="w-52 h-auto mx-auto" />
                    <h1 className="mt-6 font-contrax text-white text-xl tracking-wide uppercase">{business.name}</h1>
                    <p className="mt-2 font-body text-secondary text-sm">{c.role}</p>
                    <p className="mt-1 font-body text-gray-400 text-xs">{c.area}</p>

                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-4 py-1.5 font-body text-xs text-gray-200 hover:border-secondary/40"
                    >
                        <span className="text-white font-semibold">{rating.toFixed(1)}</span>
                        <span className="flex gap-0.5" aria-hidden="true">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} size={11} className={i < Math.round(rating) ? "text-yellow-400" : "text-white/15"} />
                            ))}
                        </span>
                        <span>{c.reviews.replace("{count}", count)}</span>
                    </a>

                    <ul className="mt-5 flex flex-wrap justify-center gap-2">
                        {c.badges.map((b) => (
                            <li key={b} className="rounded-full border border-secondary/30 px-3 py-1 font-body text-[11px] text-secondary">
                                {b}
                            </li>
                        ))}
                    </ul>
                </header>

                <div className="px-6 pb-8">
                    <a
                        href={VCARD_PATH}
                        download
                        className="flex items-center justify-center gap-3 w-full rounded-2xl bg-secondary text-primary font-contrax text-sm tracking-widest uppercase py-4 hover:brightness-110 active:scale-[0.98] transition"
                    >
                        <FaAddressCard size={18} aria-hidden="true" /> {c.saveContact}
                    </a>

                    <nav className="mt-4 grid grid-cols-3 gap-3" aria-label={business.name}>
                        <Action href={`tel:${business.phone}`} icon={FaPhone} label={c.call} />
                        <Action href={`sms:${business.phone}?&body=${encodeURIComponent(c.smsBody)}`} icon={FaSms} label={c.text} />
                        <Action href={`mailto:${business.email}`} icon={FaEnvelope} label={c.email} />
                        <Action href={business.directionsUrl} icon={FaLocationDot} label={c.directions} external />
                        <Action href={localePath(lang, "/")} icon={FaGlobe} label={c.website} />
                        <Action href="/review" icon={FaGoogle} label={c.review} external />
                    </nav>

                    <section className="mt-8">
                        <h2 className="font-contrax text-xs tracking-[0.25em] uppercase text-gray-500">{c.servicesTitle}</h2>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {getServices(lang).map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        href={localePath(lang, `/services/${s.slug}`)}
                                        className="block rounded-lg bg-white/[0.04] px-3 py-1.5 font-body text-xs text-gray-300 hover:text-secondary"
                                    >
                                        {s.shortTitle}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-8 grid grid-cols-2 gap-4 font-body text-xs">
                        <div>
                            <h2 className="flex items-center gap-2 font-contrax tracking-[0.25em] uppercase text-gray-500">
                                <FaClock aria-hidden="true" /> {c.hoursTitle}
                            </h2>
                            <p className="mt-2 text-gray-300 leading-relaxed">{c.hours}</p>
                            <p className="mt-2 text-white">
                                <a href={`tel:${business.phone}`} className="hover:text-secondary">{business.phoneDisplay}</a>
                            </p>
                        </div>
                        <div>
                            <h2 className="flex items-center gap-2 font-contrax tracking-[0.25em] uppercase text-gray-500">
                                <FaLocationDot aria-hidden="true" /> {c.officeTitle}
                            </h2>
                            <address className="mt-2 not-italic text-gray-300 leading-relaxed">
                                {a.street}, {a.extended}
                                <br />
                                {a.city}, {a.region} {a.postalCode}
                            </address>
                        </div>
                    </section>

                    <section className="mt-8">
                        <h2 className="font-contrax text-xs tracking-[0.25em] uppercase text-gray-500">{c.followTitle}</h2>
                        <ul className="mt-3 flex gap-3">
                            {business.social.map((s) => {
                                const Icon = SOCIAL_ICONS[s.name];
                                return (
                                    <li key={s.name}>
                                        <a
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.name}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-secondary hover:bg-secondary hover:text-primary transition"
                                        >
                                            <Icon size={18} aria-hidden="true" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="mt-8 rounded-3xl bg-white/[0.04] border border-white/10 p-5 flex items-center gap-5">
                        <div
                            className="shrink-0 w-28 rounded-xl bg-white p-2 [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
                            role="img"
                            aria-label={url}
                            dangerouslySetInnerHTML={{ __html: qr }}
                        />
                        <div>
                            <h2 className="font-contrax text-xs tracking-wider uppercase text-white">{c.qrTitle}</h2>
                            <p className="mt-2 font-body text-xs text-gray-400 leading-relaxed">{c.qrText}</p>
                        </div>
                    </section>

                    <CardShare url={url} title={business.name} label={c.share} copied={c.copied} />

                    <p className="mt-6 text-center font-body text-xs">
                        <Link href={localePath(otherLang, "/card")} hrefLang={otherLang} className="text-gray-500 hover:text-secondary underline underline-offset-4">
                            {c.switchLang}
                        </Link>
                    </p>
                </div>
            </article>
        </main>
    );
}
