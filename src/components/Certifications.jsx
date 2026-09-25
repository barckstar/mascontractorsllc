"use client";
import React from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

const Certifications = () => {
    const c = useI18n().t.certifications;
    return (
        <div className="bg-[#2a2a2a] p-4 sm:p-6 rounded-xl border border-[#9fe300]/30 flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
                <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/DPOR.png"
                        alt={c.dporAlt}
                        width={120}
                        height={60}
                        className="object-contain h-12 w-auto"
                    />
                </div>
                <p className="text-white text-xs font-body opacity-70 group-hover:text-[#9fe300] transition-colors">
                    {c.dpor}
                </p>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center group">
                <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/OSHA-Logo.png"
                        alt={c.oshaAlt}
                        width={120}
                        height={60}
                        className="object-contain h-12 w-auto"
                    />
                </div>
                <p className="text-white text-xs font-body opacity-70 group-hover:text-[#9fe300] transition-colors">
                    {c.osha}
                </p>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center">
                <iframe
                    title={c.bbbTitle}
                    loading="lazy"
                    scrolling="no"
                    src="https://seal-richmond.bbb.org/frame/blue-seal-293-61-whitetxt-bbb-63417310.png?chk=9087F100C0"
                    style={{ border: 0, height: "61px", width: "293px" }}
                    className="mb-2 max-w-full"
                />
                <p className="text-white text-xs font-body opacity-70">
                    {c.bbb}
                </p>
            </div>
        </div>
    );
};

export default Certifications;
