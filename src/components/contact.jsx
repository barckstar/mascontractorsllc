"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { m } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

function Contact() {
  const { t, lang } = useI18n();
  const data = t.site;
  const f = t.contactForm;
  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState(null); // null | { type: 'success'|'error', text: string }
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const form = useRef();
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const onChangeCaptcha = (value) => {
    if (!value) return;
    setCaptchaValue(value);
    setIsButtonDisabled(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setStatus(null);
    if (captchaValue) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          form.current,
          { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
        )
        .then(
          () => setStatus({ type: "success", text: f.success }),
          (error) => {
            setStatus({ type: "error", text: f.error });
            console.error("EmailJS error:", error.text);
          }
        );
    } else {
      setStatus({ type: "error", text: f.captchaMissing });
      setIsButtonDisabled(false);
    }
  };

  const inputClass =
    "w-full bg-[#0f0f0f] border border-white/10 hover:border-white/20 focus:border-[#9fe300] rounded-xl py-3.5 px-4 text-white outline-none transition-colors duration-200 font-atpinko text-base";
  const labelClass =
    "block text-[11px] text-gray-500 font-contrax uppercase tracking-widest mb-2";

  return (
    <div id="email" className="scroll-mt-28">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#181818] rounded-2xl border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9fe300] to-transparent" />

        <div className="p-8 md:p-10">
          <form id="contactForm" onSubmit={sendEmail} ref={form} className="space-y-5">
            {/* Tells the office which language to answer in. Add {{user_language}} to the EmailJS template to see it. */}
            <input type="hidden" name="user_language" value={lang} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="first_name" className={labelClass}>{f.firstName}</label>
                <input
                  type="text"
                  id="first_name"
                  name="user_first_name"
                  required
                  placeholder={f.firstNamePh}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="last_name" className={labelClass}>{f.lastName}</label>
                <input
                  type="text"
                  id="last_name"
                  name="user_last_name"
                  required
                  placeholder={f.lastNamePh}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="user-email" className={labelClass}>{f.email}</label>
                <input
                  type="email"
                  id="user-email"
                  name="user_email"
                  required
                  placeholder={f.emailPh}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>{f.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  name="user_phone"
                  required
                  placeholder="(804) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>{f.service}</label>
              <select
                id="subject"
                name="user_subject"
                required
                defaultValue="default"
                className={`${inputClass} cursor-pointer`}
              >
                <option value="default" disabled>{f.servicePh}</option>
                {/* Values stay in English so the office gets the same labels in every language. */}
                {data.contact_services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title2}
                  </option>
                ))}
                {data.specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.title}
                  </option>
                ))}
                <option value="General Inquiry">{f.optGeneral}</option>
                <option value="Support">{f.optSupport}</option>
                <option value="Feedback">{f.optFeedback}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>{f.message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={f.messagePh}
                className={`${inputClass} resize-none leading-relaxed`}
              />
            </div>

            <div className="flex justify-center py-1">
              {key && (
                <ReCAPTCHA
                  sitekey={key}
                  onChange={onChangeCaptcha}
                  theme="dark"
                  hl={lang}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-4 rounded-xl font-contrax text-base tracking-[0.15em] uppercase transition-all duration-300 ${
                isButtonDisabled
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-[#9fe300] text-[#111111] hover:bg-white hover:shadow-[0_0_40px_rgba(159,227,0,0.35)] cursor-pointer"
              }`}
            >
              {isButtonDisabled ? f.submitDisabled : f.submit}
            </button>
          </form>

          {status && (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 p-4 rounded-xl text-center font-atpinko text-sm ${
                status.type === "success"
                  ? "bg-[#9fe300]/10 text-[#9fe300] border border-[#9fe300]/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {status.text}
            </m.div>
          )}
        </div>
      </m.div>
    </div>
  );
}

export default Contact;
