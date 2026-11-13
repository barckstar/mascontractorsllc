"use client";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

// Privacy policy: every text lives in dictionaries/<lang>.json under privacyPage.
// The providers list goes right after the "Who else sees your information"
// section, and the Google opt-out link after "Cookies".
const PROVIDERS_AFTER = 5;
const OPT_OUT_AFTER = 4;

export default function PrivacyContent() {
    const { t, href } = useI18n();
    const p = t.privacyPage;
    return (
        <div className="bg-[#1e1e1e] min-h-screen px-6 pt-44 pb-24">
            <article className="max-w-3xl mx-auto font-body text-gray-300 leading-relaxed">
                <p className="text-[#9fe300] font-contrax text-sm uppercase tracking-widest mb-3">{p.eyebrow}</p>
                <h1 className="text-4xl md:text-5xl font-contrax text-white mb-4">{p.title}</h1>
                <p className="text-gray-500 text-sm mb-8">
                    {p.updatedLabel}: {p.updated}
                </p>
                <p className="text-lg mb-12">{p.intro}</p>

                {p.sections.map((s, i) => (
                    <section key={s.heading} className="mb-10">
                        <h2 className="text-xl md:text-2xl font-contrax text-white mb-4">{s.heading}</h2>
                        {s.paragraphs.map((para) => (
                            <p key={para} className="mb-4">
                                {para}
                            </p>
                        ))}
                        {s.items.length > 0 && (
                            <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#9fe300]">
                                {s.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {i === OPT_OUT_AFTER && (
                            <p className="mb-4">
                                <a
                                    href={p.optOutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#9fe300] underline underline-offset-4 hover:text-white transition"
                                >
                                    {p.optOutLabel}
                                </a>
                            </p>
                        )}
                        {i === PROVIDERS_AFTER && (
                            <>
                                <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#9fe300]">
                                    {p.providers.map((prov) => (
                                        <li key={prov.url}>
                                            <a
                                                href={prov.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#9fe300] underline underline-offset-4 hover:text-white transition"
                                            >
                                                {prov.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mb-4">{p.bbbNote}</p>
                            </>
                        )}
                    </section>
                ))}

                <p className="border-t border-[#515151] pt-8">
                    {p.contactCta}{" "}
                    <Link href={href("/contact")} className="text-[#9fe300] underline underline-offset-4 hover:text-white transition">
                        {p.contactLink}
                    </Link>
                </p>
            </article>
        </div>
    );
}
