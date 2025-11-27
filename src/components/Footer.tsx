"use client";

import React, { useState } from "react";
import { SiLinkedin, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";
import { motion } from "framer-motion";

const Footer = () => {
  // Parent container variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  // Child variants
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      className="w-full bg-gradient-to-b from-blue-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
        variants={containerVariants}
      >
        {/* ======= Main Content Grid ======= */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ======= Social Media Section ======= */}
          <motion.div className="space-y-6" variants={childVariants}>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Follow us on socials to
              <br />
              stay updated!
            </h3>

            {/* Simple Register Button */}
            <motion.a
              href="/registerMember"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-center hover:bg-blue-700 transition font-semibold uppercase text-sm"
            >
              Register Now
            </motion.a>

            {/* Social Icons */}
            <motion.div className="flex flex-wrap items-center gap-4 py-5">
              {[SiFacebook, SiInstagram, SiYoutube, SiLinkedin].map(
                (Icon, idx) => (
                  <motion.a
                    href="#"
                    key={idx}
                    className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              )}

              {/* Custom SVG */}
              <motion.a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ======= Company Section ======= */}
          <motion.div variants={childVariants}>
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
          </motion.div>

          {/* ======= Conference Section ======= */}
          <motion.div variants={childVariants}>
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
          </motion.div>

          {/* ======= Series Section ======= */}
          <motion.div variants={childVariants}>
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
          </motion.div>
        </motion.div>

        {/* ======= Contact Section ======= */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200"
          variants={childVariants}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact</h3>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 flex-wrap">
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
        </motion.div>
      </motion.div>

      {/* ======= Bottom Bar ======= */}
      <motion.div
        className="border-t border-gray-200 py-6"
        variants={childVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600">
          <p>Copyright © 2025 • DIUSCADI</p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
