"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { RiMedalLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import data from "../lib/data.json";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide for mobile top bar
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const topBarItems = [
    {
      icon: <RiMedalLine size={24} color="#9fe300" />,
      title: "Class A General Contractor",
      subtitle: "Licensed - Insured - Bonded"
    },
    {
      icon: <IoShieldCheckmark size={24} color="#9fe300" />,
      title: "Trusted Professionals",
      subtitle: "Trained and Experienced"
    },
    {
      icon: <FaPhoneAlt size={24} color="#9fe300" />,
      title: "Office Number",
      subtitle: "(804) 833-4600 / (540) 376-4453"
    },
    {
      icon: <IoIosMail size={26} color="#9fe300" />,
      title: "Email Us",
      subtitle: "info@mascontractors.com",
      link: "/contact#email"
    }
  ];

  return (
    <nav className="w-full bg-[#1e1e1e]/70 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 font-atpinko">
      {/* Top Bar */}
      <div className="bg-[#1e1e1e]/90 shadow border-b border-white/5 h-16 flex items-center overflow-hidden relative">
        {/* Desktop View (All items) */}
        <div className="hidden md:flex w-full justify-end px-6 gap-6">
          {topBarItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.link ? (
                <Link href={item.link} className="flex items-center gap-2 group">
                  {item.icon}
                  <div className="text-left">
                    <span className="block text-xs lg:text-sm text-[#9fe300] leading-tight">{item.title}</span>
                    <span className="block text-xs lg:text-sm text-white font-medium group-hover:text-[#9fe300] transition-colors">{item.subtitle}</span>
                  </div>
                </Link>
              ) : (
                <>
                  {item.icon}
                  <div className="text-left">
                    <span className="block text-xs lg:text-sm text-[#9fe300] leading-tight">{item.title}</span>
                    <span className="block text-xs lg:text-sm text-white font-medium">{item.subtitle}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View (Slider) */}
        <div className="md:hidden w-full h-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 absolute"
            >
              {topBarItems[currentSlide].icon}
              <div className="text-left">
                <span className="block text-xs text-[#9fe300] font-bold">{topBarItems[currentSlide].title}</span>
                <span className="block text-xs text-white">{topBarItems[currentSlide].subtitle}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-full mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={isMobile ? "/IMG_0271_SM.png" : "/IMG_0271.png"}
            width={isMobile ? 55 : 250}
            height={isMobile ? 25 : 120}
            alt="MAS Contractors LLC Logo - General Contractor Richmond VA"
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {data.url_navbar.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className="text-white text-lg font-medium py-1 px-4 hover:text-[#9fe300] transition-colors relative group"
            >
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9fe300] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-[#9fe300] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1e1e1e]/95 border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {data.url_navbar.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-white text-lg font-atpinko py-2 border-b border-white/5 hover:text-[#9fe300] hover:pl-2 transition-all"
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
