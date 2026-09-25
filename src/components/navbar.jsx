"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { RiMedalLine } from "react-icons/ri";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export const Navbar = () => {
  const { t, href } = useI18n();
  const n = t.nav;
  const data = t.site;
  const [open, setOpen] = useState(false);
  // Auto-hide: se esconde al bajar, reaparece al subir.
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Umbral de 6px para ignorar micro-scroll; se oculta solo tras pasar el alto del navbar (~150px).
      if (Math.abs(y - lastScrollY.current) > 6) {
        setHidden(y > lastScrollY.current && y > 150);
        lastScrollY.current = y;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumbers = ["(804) 833-4600", "(540) 376-4453", "(804) 593-9468"];

  // Desktop: 4 static boxes; the phone box cycles its 3 numbers internally (CSS-only).
  const topBarItems = [
    {
      icon: <RiMedalLine size={24} color="#9fe300" />,
      title: n.classA,
      subtitle: n.classASub
    },
    {
      icon: <IoShieldCheckmark size={24} color="#9fe300" />,
      title: n.trusted,
      subtitle: n.trustedSub
    },
    {
      icon: <FaPhoneAlt size={24} color="#9fe300" />,
      title: n.office,
      isPhone: true
    },
    {
      icon: <IoIosMail size={26} color="#9fe300" />,
      title: n.email,
      subtitle: "info@mascontractors.com",
      link: href("/contact#email")
    }
  ];

  // Mobile slider: each phone number gets its own full slide so the
  // CSS-only slider can never cut one off mid-cycle — same guarantee
  // the other slides already have.
  const mobileTopBarItems = [
    topBarItems[0],
    topBarItems[1],
    ...phoneNumbers.map((number) => ({
      icon: <FaPhoneAlt size={24} color="#9fe300" />,
      title: n.office,
      subtitle: number
    })),
    topBarItems[3],
  ];

  return (
    <nav className={`w-full bg-[#1e1e1e]/70 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 font-body transition-transform duration-300 ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}>
      {/* Top Bar */}
      <div className="bg-[#1e1e1e]/90 shadow border-b border-white/5 h-16 flex items-center overflow-hidden relative">
        {/* Desktop View (All items) */}
        <div className="hidden md:flex w-full items-center justify-end px-6 gap-6">
          <LanguageSwitcher className="mr-auto" />
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
              ) : item.isPhone ? (
                <>
                  {item.icon}
                  <div className="text-left">
                    <span className="block text-xs lg:text-sm text-[#9fe300] leading-tight">{item.title}</span>
                    <span className="phone-cycle block text-xs lg:text-sm text-white font-medium">
                      <span className="phone-cycle-track">
                        {phoneNumbers.map((number) => (
                          <span key={number} className="phone-cycle-item">{number}</span>
                        ))}
                      </span>
                    </span>
                  </div>
                </>
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

        {/* Mobile View (CSS-only Slider) */}
        <div className="md:hidden w-full h-full relative">
          <div className="topbar-slider">
            {mobileTopBarItems.map((item, index) => (
              <div key={index} className="topbar-slide flex items-center gap-3">
                {item.icon}
                <div className="text-left">
                  <span className="block text-xs text-[#9fe300] font-bold">{item.title}</span>
                  <span className="block text-xs text-white">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-full mx-auto px-6 flex items-center justify-between h-20">
        <Link href={href("/")} className="flex-shrink-0">
          {/* Small logo for mobile, full logo for desktop — CSS controlled */}
          <Image
            src="/IMG_0271_SM.png"
            width={55}
            height={25}
            alt={t.common.logoAlt}
            className="object-contain md:hidden"
            style={{ width: "auto", height: "auto" }}
          />
          <Image
            src="/IMG_0271.png"
            width={250}
            height={120}
            alt={t.common.logoAlt}
            className="object-contain hidden md:block"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center md:space-x-1 lg:space-x-4 xl:space-x-8">
          {data.url_navbar.map((link) => (
            <Link
              key={link.url}
              href={href(link.url)}
              className="text-white md:text-base lg:text-lg font-medium py-1 md:px-2 lg:px-4 hover:text-[#9fe300] transition-colors relative group"
            >
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9fe300] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile: language + menu button */}
        <div className="md:hidden flex items-center gap-3">
        <LanguageSwitcher />
        <button
          className="p-2 text-white hover:text-[#9fe300] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={n.toggleMenu}
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
      </div>

      {/* Mobile Menu Dropdown — CSS transition instead of Framer Motion */}
      <div
        className={`md:hidden bg-[#1e1e1e]/95 border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          {data.url_navbar.map((link) => (
            <Link
              key={link.url}
              href={href(link.url)}
              className="text-white text-lg font-body py-2 border-b border-white/5 hover:text-[#9fe300] hover:pl-2 transition-all"
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
