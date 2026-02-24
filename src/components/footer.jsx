"use client";
import Image from "next/image";
import React from "react";
import data from "@/lib/data.json";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="body-font bg-[#1e1e1e] border-t-2 border-[#515151]">
        <div
          className="footer-fade-in"
        >
          <div className="py-16 mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {/* Quick Links */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">Quick Links</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Commercial */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">Commercial Services</p>
              <ul className="space-y-2">
                {data.commercial.map((commercial, index) => (
                  <li key={index} className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    {commercial.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Residential */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">Residential Services</p>
              <ul className="space-y-2">
                {data.residential.map((residential, index) => (
                  <li key={index} className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text">
                    {residential.text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Connect */}
            <div className="w-full">
              <p className="text-[#9fe300] font-contrax text-3xl mb-4 footer-title">Connect</p>
              <ul className="space-y-2">
                {data.social_media.map((social_media, index) => (
                  <li key={index}>
                    <Link
                      href={social_media.link}
                      className="text-white text-lg font-atpinko hover:text-[#9fe300] transition footer-text"
                    >
                      {social_media.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Copyright */}
          <div className="flex flex-col text-center items-center justify-between py-6 border-t border-[#515151] px-6 md:px-32 lg:flex-row lg:text-left lg:justify-between gap-4">
            <p className="text-[#9fe300] text-sm font-atpinko">
              © 2024 - 2025 Mas Contractors LLC <br /> All Rights Reserved
            </p>
            {/* Logo */}
            <Link href="/" className="flex title-font font-medium items-center justify-end flex-shrink-0">
              <Image
                src="/IMG_0271.png"
                alt="MAS Contractors LLC Logo - General Contractor Richmond VA"
                width={200}
                height={200}
                className="object-contain mx-auto"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
