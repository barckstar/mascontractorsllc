"use client";
import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillGoogleCircle } from "react-icons/ai";
import { FaT } from "react-icons/fa6";
import Link from "next/link";
import data from "@/lib/data.json";

const socialIcons = {
  Facebook: AiFillFacebook,
  Instagram: AiFillInstagram,
  Google: AiFillGoogleCircle,
  Thumbtack: FaT,
};

export const SocialMediaBar = () => {
  return (
    <div className="social-bar-enter group/bar fixed right-0 top-1/2 -translate-y-1/2 z-50">
      {/* Interior: encogido en reposo, tamaño normal al pasar el cursor. origin-right
          lo mantiene pegado al borde derecho al escalar. */}
      <div className="flex flex-col gap-6 p-4 bg-black/20 backdrop-blur-md border-y border-l border-white/10 rounded-l-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] origin-right scale-75 opacity-70 group-hover/bar:scale-100 group-hover/bar:opacity-100 transition-all duration-300">
        {data.social_media.map((social, index) => {
          const Icon = socialIcons[social.name];
          return (
            <Link key={index} href={social.link} target="_blank" className="relative group">
              <div className="social-icon-hover text-white/80">
                <Icon size={28} color="#9fe300" />
              </div>

              {/* Tooltip */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-5 px-3 py-1 bg-[#9fe300] text-[#1e1e1e] text-sm font-bold rounded opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg font-contrax">
                {social.name}
                {/* Arrow */}
                <span className="absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-[#9fe300]"></span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};