"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Event() {
  return (
    <section
      id="about"
      className="py-2 px-4 bg-white flex items-center justify-center"
    >
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/image/image.png"
            alt="event photo"
            width={1200}
            height={300}
            className="shadow-lg rounded-2xl w-full h-auto"
          />
        </motion.div>

        {/* Floating Card (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="hidden md:flex absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#54b435] text-white rounded-xl shadow-lg px-10 py-5 w-[80%] items-start justify-between"
        >
          {/* Date */}
          <div className="flex flex-row items-center gap-5">
            <p className="text-base font-semibold">Date:</p>
            <p className="text-xl font-semibold leading-snug">
              Thursday, 24th <br /> July, 2025
            </p>
          </div>

          <div className="w-px h-10 bg-white/70 mx-6"></div>

          {/* Venue */}
          <div className="flex flex-row items-center gap-5">
            <p className="text-base font-semibold">Venue:</p>
            <p className="text-lg font-semibold leading-snug">
              ASUU Secretariat Hall, <br /> Nnamdi Azikiwe University Awka.
            </p>
          </div>
        </motion.div>

        {/* Mobile Card (Separate) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-6 md:hidden bg-[#54b435] text-white rounded-xl shadow-lg px-6 py-5 w-full flex flex-col gap-6"
        >
          {/* Date */}
          <div className="flex flex-row items-start gap-4">
            <p className="text-sm font-semibold">Date:</p>
            <p className="text-base font-semibold leading-snug">
              Thursday, 24th July, 2025
            </p>
          </div>

          <div className="w-full h-px bg-white/40"></div>

          {/* Venue */}
          <div className="flex flex-row items-start gap-4">
            <p className="text-sm font-semibold">Venue:</p>
            <p className="text-base font-semibold leading-snug">
              ASUU Secretariat Hall, Nnamdi Azikiwe University Awka.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
