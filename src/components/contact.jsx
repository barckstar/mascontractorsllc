import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import data from "@/lib/data.json";

function Contact() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const form = useRef();
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const onChangeCaptcha = (value) => {
    setCaptchaValue(value);
    setIsButtonDisabled(false);
  };

  const sendEmail = (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    setMessage("");
    if (captchaValue) {
      emailjs
        .sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, form.current, {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        })
        .then(
          () => {
            setMessage("Email sent successfully!");
            setIsButtonDisabled(true);
          },
          (error) => {
            setMessage("Failed to send email. Please try again later.");
            console.error("FAILED...", error.text);
            setIsButtonDisabled(true);
          }
        );
    } else {
      setMessage("Please complete the CAPTCHA.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <section className="text-gray-600 body-font relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="px-5 py-10 flex justify-center">
              <div className="bg-[#1e1e1e] rounded-lg p-8 flex flex-col w-full shadow-2xl">
                <h2 className="text-[#9fe300] text-center text-4xl mb-8 font-medium font-contrax">
                  Send a Email
                </h2>
                <form id="contactForm" onSubmit={sendEmail} ref={form}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <label
                        htmlFor="first_name"
                        className="leading-7 text-xl font-medium text-white font-atpinko"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="user_first_name"
                        required
                        className="w-full bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#1e1e1e] focus:ring-2 focus:ring-[#9fe300] text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        htmlFor="last_name"
                        className="leading-7 text-xl font-medium text-white font-atpinko"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="user_last_name"
                        required
                        className="w-full bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#1e1e1e] focus:ring-2 focus:ring-[#9fe300] text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <label
                        htmlFor="email"
                        className="leading-7 text-xl font-medium text-white font-atpinko"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="user_email"
                        required
                        className="w-full bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#1e1e1e] focus:ring-2 focus:ring-[#9fe300] text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        htmlFor="phone"
                        className="leading-7 text-xl font-medium text-white font-atpinko"
                      >
                        Phone
                      </label>
                      <input
                        type="phone"
                        id="phone"
                        name="user_phone"
                        required
                        className="w-full bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#1e1e1e] focus:ring-2 focus:ring-[#9fe300] text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="subject"
                      className="leading-7 text-xl font-medium text-white font-atpinko"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="user_subject"
                      required
                      defaultValue="default"
                      className="w-full text-xl bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#1e1e1e] focus:ring-2 focus:ring-[#9fe300] outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-atpinko"
                    >
                      <option value="default" disabled>
                        Select a subject
                      </option>
                      {data.contact_services.map((service) => (
                        <option key={service.title} value={service.title2}>
                          {service.title2}
                        </option>
                      ))}
                      {data.specialties.map((specialties) => (
                        <option
                          key={specialties.title}
                          value={specialties.title}
                        >
                          {specialties.title}
                        </option>
                      ))}
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Support">Support</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="message"
                      className="leading-7 text-xl font-medium text-white font-atpinko"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-[#1e1e1e] rounded border border-[#9fe300] focus:border-[#9fe300] focus:ring-2 focus:ring-[#9fe300] h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out font-atpinko"
                    ></textarea>
                  </div>
                  <div className="flex my-4 justify-center">
                    <ReCAPTCHA sitekey={key} onChange={onChangeCaptcha} />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={`mt-4 border-0 py-2 px-6 focus:outline-none rounded text-xl font-medium w-full sm:w-11/12 transition-colors duration-300 font-contrax
                        ${isButtonDisabled
                          ? "bg-gray-700 text-white cursor-not-allowed"
                          : "bg-[#9fe300] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-[#9fe300] cursor-pointer"
                        }`}
                      disabled={isButtonDisabled}
                    >
                      Send
                    </button>
                  </div>
                </form>
                {message && (
                  <div className="text-center mt-4 text-xl font-semibold text-green-600">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}

export default Contact;
