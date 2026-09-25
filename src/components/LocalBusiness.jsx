"use client";
import React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { REVIEWS_SNAPSHOT } from "@/lib/reviewsSnapshot";
import { useI18n } from "@/i18n/I18nProvider";
import { FaMapMarkerAlt, FaPhoneAlt, FaHammer, FaShieldAlt, FaCheckCircle, FaStar } from "react-icons/fa";

export default function LocalBusiness({ reviews = REVIEWS_SNAPSHOT }) {
    const { t, href } = useI18n();
    const lb = t.localBusiness;
    return (
        <section className="relative  py-24 bg-[#151515] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#9fe300]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9fe300]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* LEFT CONTENT */}
                <m.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#252525] border border-white/10 rounded-full px-4 py-2 mb-6">
                        <FaStar className="text-[#9fe300]" />
                        <span className="text-gray-300 text-sm font-body tracking-wide">{lb.badge}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase leading-tight">
                        {lb.titleA}<span className="text-[#9fe300]">{lb.titleB}</span>{lb.titleC}
                    </h2>

                    <p className="text-gray-400 font-body text-lg mb-8 leading-relaxed max-w-xl">
                        {lb.text}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-xl">
                        {[
                            { label: lb.statYears, value: "11+" },
                            { label: lb.statProjects, value: "500+" },
                            { label: lb.statRating, value: `${reviews.rating.toFixed(1)}★` },
                            { label: lb.statReviews, value: String(reviews.count) },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl md:text-3xl font-contrax text-[#9fe300] mb-1">{stat.value}</p>
                                <p className="text-gray-500 font-body text-[11px] uppercase tracking-wider leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 font-body text-gray-300">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{lb.areaTitle}</h3>
                                <p className="text-sm text-gray-400">{lb.areaText}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{lb.contactTitle}</h3>
                                <p className="text-sm text-gray-400">(804) 833-4600</p>
                                <p className="text-sm text-gray-400">(540) 376-4453</p>
                                <p className="text-sm text-gray-400">(804) 593-9468</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaHammer size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{lb.expertiseTitle}</h3>
                                <p className="text-sm text-gray-400">{lb.expertiseText}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaShieldAlt size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{lb.peaceTitle}</h3>
                                <p className="text-sm text-gray-400">{lb.peaceText}</p>
                            </div>
                        </div>
                    </div>
                </m.div>

                {/* RIGHT CONTENT - CARD */}
                <m.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative bg-[#252525]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-[#9fe300]/30 transition-colors duration-500 group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#9fe300]/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-contrax text-white mb-8 uppercase">
                                {lb.whyA}<span className="text-[#9fe300]">{lb.whyB}</span>
                            </h3>

                            <ul className="space-y-6 mb-10">
                                {lb.whyList.map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-center group/item">
                                        <FaCheckCircle className="text-[#9fe300] min-w-[20px] group-hover/item:scale-110 transition-transform" />
                                        <span className="text-gray-200 font-body text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={href("/contact#email")} className="block">
                                <m.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#9fe300] text-[#1e1e1e] font-contrax text-lg py-5 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.2)]"
                                >
                                    {lb.button}
                                </m.button>
                            </Link>

                            <p className="mt-4 text-center text-gray-500 text-sm font-body">
                                {lb.ready}
                            </p>
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
