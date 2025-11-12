"use client";

import React, { useState } from "react";
import { SiLinkedin, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";

const Footer = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const handleRegister = () => {
    if (whatsappNumber) {
      console.log("Registering with WhatsApp:", whatsappNumber);
      // Handle registration logic here
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ======= Main Content Grid ======= */}
        <div className="flex  justify-between flex-wrap gap-4">
          {/* ======= Social Media Section ======= */}
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Follow us on socials to
              <br />
              stay updated!
            </h3>

            {/* WhatsApp Register Input */}
            <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden ">
              <input
                type="tel"
                placeholder="Whatsapp Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="flex-1 px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-colors duration-200"
              >
                Register
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <SiFacebook size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <SiInstagram size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <SiYoutube size={20} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                <SiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* ======= Company Section ======= */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              {["About", "Team", "Gallery"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-lg transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= Conference Section ======= */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Conference
            </h3>
            <ul className="space-y-3">
              {["Sponsor", "Speak", "Register"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-lg transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= Series Section ======= */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Series</h3>
            <ul className="space-y-3">
              {["Series 4", "Series 3"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-lg transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ======= Contact Section ======= */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact</h3>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
            <a
              href="tel:+2348035906416"
              className="text-blue-600 hover:text-blue-700 text-lg transition-colors duration-200"
            >
              +234 803 590 6416
            </a>
            <a
              href="mailto:info@diuscadi.org.ng"
              className="text-blue-600 hover:text-blue-700 text-lg transition-colors duration-200"
            >
              info@diuscadi.org.ng
            </a>
          </div>
          <p className="text-blue-600 text-lg">
            ASUU Secretariat, Nnamdi Azikiwe University, Awka
          </p>
        </div>
      </div>

      {/* ======= Bottom Bar ======= */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600">
          <p>Copyright © 2025 • DIUSCADI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
