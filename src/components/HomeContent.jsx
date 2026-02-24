"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import data from "@/lib/data.json";
import Certifications from "./Certifications";
import { BiRightArrowAlt } from "react-icons/bi";
import LocalBusiness from "./LocalBusiness";

export default function HomeContent() {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-[#1e1e1e] min-h-screen overflow-hidden">
            {/* 1. Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-10">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img-2.jpg" // Using a high-quality image
                        alt="MAS Contractors commercial construction site in Richmond VA with heavy machinery"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1e1e1e]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl max-[400px]:text-2xl md:text-7xl lg:text-8xl font-contrax text-white mb-2 tracking-wider">
                            TRANSFORMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fe300] to-[#7ab300]">SPACES</span>
                        </h1>
                        <h2 className="text-2xl max-[400px]:text-xl md:text-6xl lg:text-7xl font-contrax text-white mb-8 tracking-wide">
                            BUILDING LEGACIES
                        </h2>
                        <p className="text-base max-[400px]:text-sm md:text-xl text-gray-300 font-atpinko max-w-2xl mx-auto mb-10 leading-relaxed">
                            Welcome to MAS Contractors. Where expertise meets innovation and unparalleled quality to turn your vision into lasting realities.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
                            <Link href="/contact#email">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#9fe300] text-[#1e1e1e] font-contrax text-base max-[400px]:text-sm py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.3)]"
                                >
                                    GET A QUOTE
                                </motion.button>
                            </Link>
                        </div>
                        <h2 className="text-2xl max-[400px]:text-xl md:text-6xl font-contrax text-white mb-4">
                            <span className="text-[#9fe300]">Commercial & </span>Residential
                        </h2>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-[#9fe300] rounded-full mt-2" />
                    </div>
                </motion.div>
            </section>


            <LocalBusiness />

            {/* 2. Certifications Bar */}
            <section className="relative z-20 -mt-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Certifications />
                </motion.div>
            </section>

            {/* 3. About Section */}
            <section className="px-6 md:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="relative"
                    >
                        <div className="relative z-10">
                            <Image
                                src="/logo-3D.png"
                                alt="MAS Contractors 3D Logo - Premier General Contractor in Richmond VA"
                                width={500}
                                height={500}
                                className="w-full max-w-md mx-auto drop-shadow-2xl"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#9fe300]/5 blur-3xl rounded-full -z-10" />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="relative z-10"
                    >
                        <h2 className="text-2xl max-[400px]:text-xl md:text-6xl font-contrax text-white mb-6">
                            <span className="text-[#9fe300]">About</span> Us
                        </h2>
                        <p className="text-gray-300 font-atpinko text-lg mb-8 leading-relaxed">
                            {data.heroAbout.text}
                        </p>
                        <Link href="/about" aria-label="Read more about MAS Contractors history and mission">
                            <span className="inline-flex items-center gap-2 text-[#9fe300] font-contrax hover:gap-4 transition-all cursor-pointer group">
                                READ MORE <BiRightArrowAlt size={24} className="group-hover:text-white transition-colors" />
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 4. Featured Projects */}
            <section className="py-24 bg-[#151515]">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-2xl max-[400px]:text-xl md:text-6xl font-contrax text-white mb-4">
                            Featured <span className="text-[#9fe300]">Projects</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.homeCards.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl bg-[#1e1e1e] border border-white/5 hover:border-[#9fe300]/50 transition-all duration-500"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <Image
                                        src={project.img}
                                        alt={project.alt || project.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-80" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-contrax text-white mb-2 uppercase tracking-wide group-hover:text-[#9fe300] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 font-atpinko text-sm line-clamp-2 group-hover:text-white transition-colors">
                                        {project.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/gallery" className="inline-flex items-center gap-2 text-[#9fe300] font-contrax hover:gap-4 transition-all group">
                            VIEW OUR WORK <BiRightArrowAlt size={24} className="group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Services */}

            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl max-[400px]:text-xl md:text-6xl font-contrax text-white mb-4">
                        Explore Our <span className="text-[#9fe300]">Services</span>
                    </h2>
                    <p className="text-gray-400 font-atpinko text-lg max-w-3xl mx-auto">
                        From groundbreaking commercial to beautifully designed residential communities, our portfolio showcases the transformation power of our expertise.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.homeGreenCards.map((service, index) => {
                        // Icon mapping based on service title
                        let IconComponent;
                        switch (service.title) {
                            case "HOME ADDITIONS":
                                IconComponent = require("react-icons/md").MdAddHome;
                                break;
                            case "KITCHEN":
                                IconComponent = require("react-icons/tb").TbToolsKitchen2;
                                break;
                            case "BATHROOMS":
                                IconComponent = require("react-icons/fa").FaBath;
                                break;
                            case "DECKS":
                                IconComponent = require("react-icons/md").MdDeck;
                                break;
                            case "ROOFING":
                                IconComponent = require("react-icons/md").MdRoofing;
                                break;
                            case "SIDING":
                                IconComponent = require("react-icons/gi").GiBrickWall;
                                break;
                            default:
                                IconComponent = require("react-icons/fa").FaHammer;
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#252525] p-8 rounded-3xl border border-white/5 hover:border-[#9fe300] hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {IconComponent && <IconComponent size={120} color="#9fe300" />}
                                </div>

                                <div className="w-24 h-24 bg-[#1e1e1e] rounded-full flex items-center justify-center mb-6 border border-[#9fe300]/30 group-hover:border-[#9fe300] transition-colors shadow-[0_0_15px_rgba(159,227,0,0.1)] group-hover:shadow-[0_0_25px_rgba(159,227,0,0.3)]">
                                    {IconComponent && <IconComponent size={40} color="#9fe300" />}
                                </div>

                                <h3 className="text-2xl font-contrax text-white mb-2 group-hover:text-[#9fe300] transition-colors uppercase relative z-10">
                                    {service.title}
                                </h3>
                                <p className="text-[#9fe300] font-atpinko text-sm mb-4 uppercase tracking-wider relative z-10">
                                    {service.subTitle}
                                </p>
                                <p className="text-gray-400 font-atpinko leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                                    {service.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link href="/services" className="inline-flex items-center gap-2 text-[#9fe300] font-contrax hover:gap-4 transition-all group">
                        VIEW ALL SERVICES <BiRightArrowAlt size={24} className="group-hover:text-white transition-colors" />
                    </Link>
                </div>
            </section>

            {/* 6. Free Visit CTA */}

            <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto mb-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#9fe300]/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="md:w-2/3">
                            <h2 className="text-2xl max-[400px]:text-xl md:text-5xl font-contrax text-white mb-6">
                                Free <span className="text-[#9fe300]">Visit</span> & Estimate
                            </h2>
                            <p className="text-gray-300 font-atpinko text-lg mb-6 leading-relaxed">
                                We come directly to your project site to take precise measurements and discuss materials, requirements, and expectations before providing any estimate. Our evaluations are completely free, with no obligation.
                            </p>
                            <Link href="/contact#email">
                                <button className="bg-[#9fe300] text-[#1e1e1e] font-contrax py-4 px-8 rounded-full hover:bg-white transition-colors shadow-lg">
                                    REQUEST YOUR FREE ESTIMATE
                                </button>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 relative">
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-[#9fe300]/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src="/car.png"
                                    alt="MAS Contractors fleet vehicle for free estimate site visits in Richmond VA"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 7. Future & Collaboration */}

            <section className="py-20 bg-[#151515]">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="md:w-1/2"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="/work.png"
                                    alt="MAS Contractors team discussing blueprints and project plans in Richmond VA"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <p className="text-[#9fe300] font-contrax text-xl">ILLUMINATING THE FUTURE</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="md:w-1/2"
                        >
                            <h2 className="text-2xl max-[400px]:text-xl md:text-5xl font-contrax text-white mb-6">
                                Unlocking <span className="text-[#9fe300]">Collaborative Excellence</span>
                            </h2>
                            <p className="text-gray-300 font-atpinko text-lg mb-6 leading-relaxed">
                                Collaboration is at the heart of every successful project. We work closely with our clients, listening to their needs and incorporating their feedback at every stage.
                            </p>
                            <p className="text-gray-300 font-atpinko text-lg mb-8 leading-relaxed">
                                At MAS Contractors, we believe that the best results come from working together. Our collaborative approach not only enhances creativity and innovation but also builds lasting relationships based on trust.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 8. Final CTA */}

            <section className="py-24 px-6 md:px-16 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl max-[400px]:text-xl md:text-7xl font-contrax text-white mb-8">
                        <span className="text-[#9fe300]">Elevating</span> Your<br />
                        Construction Journey
                    </h2>
                    <p className="text-gray-400 font-atpinko text-xl mb-10 max-w-2xl mx-auto">
                        As contractors, we understand that every project is unique, and we are committed to delivering tailored solutions that meet your specific needs.
                    </p>
                    <Link href="/contact#email">
                        <button className="bg-[#9fe300] text-[#1e1e1e] font-contrax text-xl py-5 px-12 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(159,227,0,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                            GET A QUOTE NOW
                        </button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
