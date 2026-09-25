"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import social from "@/content/social.json";
import { useI18n } from "@/i18n/I18nProvider";

export const Footer = () => {
  const { t, href } = useI18n();
  const data = t.site;
  const f = t.footer;
  return (
    <>
      <footer className="body-font bg-[#1e1e1e] border-t-2 border-[#515151]">
        <div
          className="footer-fade-in"
        >
          <div className="py-16 mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {/* Quick Links */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">{f.quickLinks}</p>
              <ul className="space-y-2">
                {f.links.map((link) => (
                  <li key={link.url}>
                    <Link href={href(link.url)} className="text-white text-lg font-body hover:text-[#9fe300] transition footer-text">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">{f.commercial}</p>
              <ul className="space-y-2">
                {data.commercial.map((commercial, index) => (
                  <li key={index} className="text-white text-lg font-body hover:text-[#9fe300] transition footer-text">
                    {commercial.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Residential */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">{f.residential}</p>
              <ul className="space-y-2">
                {data.residential.map((residential, index) => (
                  <li key={index} className="text-white text-lg font-body hover:text-[#9fe300] transition footer-text">
                    {residential.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Connect */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">{f.connect}</p>
              <ul className="space-y-2">
                {social.map((social_media, index) => (
                  <li key={index}>
                    <Link
                      href={social_media.link}
                      className="text-white text-lg font-body hover:text-[#9fe300] transition footer-text"
                    >
                      {social_media.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Visit Us / NAP */}
          <div className="flex flex-col items-center text-center gap-1 pb-10 px-6 border-t border-[#515151] pt-8 mx-6 md:mx-16">
            <p className="text-[#9fe300] font-contrax text-xl mb-1 footer-title">{f.visitUs}</p>
            <p className="text-white text-base font-body footer-text">MAS Contractors LLC</p>
            <p className="text-white text-base font-body footer-text">411 Branchway Rd Suite 107, North Chesterfield, VA 23236</p>
            <a href="tel:+18048334600" className="text-white text-base font-body hover:text-[#9fe300] transition footer-text">
              (804) 833-4600
            </a>
          </div>
          {/* Copyright */}
          <div className="flex flex-col text-center items-center justify-between py-6 border-t border-[#515151] px-6 md:px-32 lg:flex-row lg:text-left lg:justify-between gap-4">
            <p className="text-[#9fe300] text-sm font-body">
              © 2024 - 2026 MAS Contractors LLC <br /> {f.rights}
            </p>
            {/* Logo */}
            <Link href={href("/")} className="flex title-font font-medium items-center justify-end flex-shrink-0">
              <Image
                src="/IMG_0271.png"
                alt={t.common.logoAlt}
                width={200}
                height={200}
                className="object-contain mx-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
