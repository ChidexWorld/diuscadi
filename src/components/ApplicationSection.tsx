"use client";

import React from "react";
import { motion } from "framer-motion";

const ApplicationSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="bg-[#005BFF] rounded-[50px] text-center text-white px-6 py-20"
    >
      {/* Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white text-[#0A0A0A] font-semibold px-8 py-4 rounded-full text-sm md:text-base shadow-md">
          APPLICATIONS ARE OPEN
        </div>
      </motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
      >
        Don&apos;t miss this opportunity to kickstart your career. <br />
        Register now to secure your spot at{" "}
        <span className="font-semibold">DIUSCADI 5.0</span>
      </motion.h2>

      {/* White Rounded Bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center overflow-hidden"
      >
        <div className="bg-white h-[60px] w-[90%] md:w-[80%] rounded-full"></div>
      </motion.div>
    </motion.section>
  );
};

export default ApplicationSection;
