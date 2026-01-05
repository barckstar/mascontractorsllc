import React from "react";
import Image from "next/image";

const Certifications = () => {
    return (
        <div className="bg-[#2a2a2a] p-6 rounded-xl border border-[#9fe300]/30 flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
                <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/DPOR.png"
                        alt="DPOR License - Virginia Contractor"
                        width={120}
                        height={60}
                        className="object-contain h-12 w-auto"
                    />
                </div>
                <p className="text-white text-xs font-atpinko opacity-70 group-hover:text-[#9fe300] transition-colors">
                    Licensed & Insured
                </p>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center group">
                <div className="bg-white p-3 rounded-lg mb-2 inline-block shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/OSHA-Logo.png"
                        alt="OSHA Safety Certified Contractor"
                        width={120}
                        height={60}
                        className="object-contain h-12 w-auto"
                    />
                </div>
                <p className="text-white text-xs font-atpinko opacity-70 group-hover:text-[#9fe300] transition-colors">
                    Safety Certified
                </p>
            </div>
        </div>
    );
};

export default Certifications;
