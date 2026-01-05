"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaHammer, FaShieldAlt, FaCheckCircle, FaStar } from "react-icons/fa";

export default function LocalBusiness() {
    return (
        <section className="relative  py-24 bg-[#151515] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#9fe300]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9fe300]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#252525] border border-white/10 rounded-full px-4 py-2 mb-6">
                        <FaStar className="text-[#9fe300]" />
                        <span className="text-gray-300 text-sm font-atpinko tracking-wide">Top Rated in Richmond</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-contrax text-white mb-6 uppercase leading-tight">
                        Trusted <span className="text-[#9fe300]">General Contractor</span> in Richmond, VA
                    </h2>

                    <p className="text-gray-400 font-atpinko text-lg mb-10 leading-relaxed max-w-xl">
                        MAS Contractors LLC is a licensed and insured general contractor providing
                        high-quality residential and commercial construction services throughout
                        Richmond, VA and surrounding areas. We build with integrity and precision.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 font-atpinko text-gray-300">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Service Area</h4>
                                <p className="text-sm text-gray-400">Serving Richmond, VA & Chesterfield County</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Contact Us</h4>
                                <p className="text-sm text-gray-400">(804) 833-4600</p>
                                <p className="text-sm text-gray-400">(540) 376-4453</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaHammer size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Expertise</h4>
                                <p className="text-sm text-gray-400">Residential & Commercial Construction</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                            <div className="bg-[#252525] p-3 rounded-lg text-[#9fe300]">
                                <FaShieldAlt size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Peace of Mind</h4>
                                <p className="text-sm text-gray-400">Licensed & Insured in Virginia</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT CONTENT - CARD */}
                <motion.div
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
                                Why Choose <span className="text-[#9fe300]">MAS Contractors?</span>
                            </h3>

                            <ul className="space-y-6 mb-10">
                                {[
                                    "Free, no-obligation estimates",
                                    "High-quality craftsmanship",
                                    "Local Richmond contractor you can trust",
                                    "On-time and on-budget delivery"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-center group/item">
                                        <FaCheckCircle className="text-[#9fe300] min-w-[20px] group-hover/item:scale-110 transition-transform" />
                                        <span className="text-gray-200 font-atpinko text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact#email" className="block">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#9fe300] text-[#1e1e1e] font-contrax text-lg py-5 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.2)]"
                                >
                                    GET A FREE ESTIMATE
                                </motion.button>
                            </Link>

                            <p className="mt-4 text-center text-gray-500 text-sm font-atpinko">
                                Ready to start your project? Let&apos;s talk.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
