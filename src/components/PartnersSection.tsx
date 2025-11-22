"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "/image/adopin.jpg",
  "/image/1969.webp",
  "/image/AICIC-Logo-150x52.png",
  "/image/codex.webp",
  "/image/Airtel-150x150.webp",
  "/image/Lovebite-150x150.webp",
  "/image/Vastel-Logo-150x150.webp",
];

export default function PartnersSection() {
  return (
    <section className="bg-white py-16 px-4 text-center overflow-hidden">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-extrabold text-[#001D3D] mb-4 leading-tight"
      >
        Support Career <br className="md:hidden" />
        Development Of Nigerian Youths
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-[#001D3D]/80 text-base md:text-lg mb-12"
      >
        At DIUSCADI, we believe one person can make a big difference and that
        kindness should be passed on. We challenge you to pay it forward too!
      </motion.p>

      {/* Infinite Scroll Logos */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex space-x-16"
          aria-label="partner logos scrolling"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Duplicate list twice for seamless infinite scroll */}
          {[...logos, ...logos].map((src, index) => (
            <div
              key={index}
              className="relative h-16 md:h-20 w-40 md:w-48 flex-shrink-0 opacity-90 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={src}
                alt="partner-logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
