"use client";

import React, { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { m } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { ReviewCard } from "@/components/ReviewAsk";

// Shown in place of the form once the message is out: a ring that draws itself, the
// check, then (after a beat) the review ask. role="status" announces it to screen readers.
function SentPanel({ onReset }) {
  const f = useI18n().t.contactForm;
  return (
    <div role="status" className="p-8 md:p-10 text-center">
      <div className="relative mx-auto mb-6 h-24 w-24">
        <m.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#9fe300]/25"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        />
        <svg viewBox="0 0 96 96" fill="none" className="relative h-24 w-24" aria-hidden="true">
          <g transform="rotate(-90 48 48)">
            <m.circle
              cx="48" cy="48" r="44" stroke="#9fe300" strokeWidth="4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </g>
          <m.path
            d="M28 50 L42 64 L69 34" stroke="#9fe300" strokeWidth="6"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          />
        </svg>
      </div>
      <m.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="font-contrax text-2xl text-white"
      >
        {f.successTitle}
      </m.p>
      <m.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4 }}
        className="mx-auto mt-2 mb-8 max-w-sm font-body text-sm text-gray-400"
      >
        {f.successText}
      </m.p>
      <ReviewCard delay={1.3} />
      <button
        type="button"
        onClick={onReset}
        className="mt-6 font-body text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-[#9fe300]"
      >
        {f.sendAnother}
      </button>
    </div>
  );
}

function Contact() {
  const { t, lang } = useI18n();
  const data = t.site;
  const f = t.contactForm;
  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState(null); // null | { type: 'success'|'error', text: string }
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const form = useRef();
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const captchaRef = useRef();
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const noKey = !key;

  const onChangeCaptcha = (value) => {
    if (!value) return;
    setCaptchaFailed(false);
    setCaptchaValue(value);
    setIsButtonDisabled(false);
  };

  // Turnstile tokens are single-use and expire after 5 min; the widget refreshes
  // them on its own, but if it can't we lock the button instead of sending a dead token.
  const onExpiredCaptcha = () => {
    setCaptchaValue(null);
    setIsButtonDisabled(true);
  };

  // The widget could not load or run (bad/missing site key, hostname not allowed in
  // Cloudflare, blocked script...). Say so instead of leaving a silent locked button.
  const onErrorCaptcha = (code) => {
    console.error("Turnstile error:", code);
    setCaptchaFailed(true);
    onExpiredCaptcha();
  };

  const resetCaptcha = () => {
    captchaRef.current?.reset();
    setCaptchaValue(null);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!captchaValue) {
      setStatus({ type: "error", text: f.captchaMissing });
      return;
    }
    setIsButtonDisabled(true);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form.current)),
          token: captchaValue,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.current.reset();
      setSent(true);
      // The card is shorter once the form is gone; keep it in view.
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("email")?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
    } catch (error) {
      setStatus({ type: "error", text: f.error });
      console.error("Contact form error:", error.message);
    } finally {
      setSending(false);
      resetCaptcha();
    }
  };

  // Back to an empty form: the Turnstile widget remounts and unlocks the button itself.
  const sendAnother = () => {
    setSent(false);
    setStatus(null);
  };

  const inputClass =
    "w-full bg-[#0f0f0f] border border-white/10 hover:border-white/20 focus:border-[#9fe300] rounded-xl py-3.5 px-4 text-white outline-none transition-colors duration-200 font-body text-base";
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

        {sent ? (
          <SentPanel onReset={sendAnother} />
        ) : (
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
                <Turnstile
                  ref={captchaRef}
                  siteKey={key}
                  onSuccess={onChangeCaptcha}
                  onExpire={onExpiredCaptcha}
                  onError={onErrorCaptcha}
                  options={{ theme: "dark", language: lang }}
                />
              )}
              {(captchaFailed || noKey) && (
                <p role="alert" className="max-w-md text-center font-body text-sm text-red-400">
                  {f.captchaUnavailable}
                </p>
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
              {sending ? (
                <span className="inline-flex items-center justify-center gap-3">
                  <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#9fe300]" />
                  {f.sending}
                </span>
              ) : isButtonDisabled ? f.submitDisabled : f.submit}
            </button>
          </form>

          {status && (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mt-5 p-4 rounded-xl text-center font-body text-sm bg-red-500/10 text-red-400 border border-red-500/20"
            >
              {status.text}
            </m.div>
          )}
        </div>
        )}
      </m.div>
    </div>
  );
}

export default Contact;
