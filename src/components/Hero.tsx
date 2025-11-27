"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const fullText = `DIUSCADI'S Life After School Career Development Seminar is packaged
  to practically expose participants to the real world job situations,
  opportunities, decision making & deep knowledge of entrepreneurship.`;

  const mobileTrimmed =
    "DIUSCADI’S Life After School Career Development Seminar is packaged to practically expose participants to the real world job situations, opportunities, decision making & deep knowledge of entrepreneurship.";

  return (
    <section
      id="home"
      className="pt-4 md:pt-12 pb-12 px-4 md:px-6 bg-gradient-to-br from-green-50 via-white to-orange-50"
    >
      <div className="max-w-7xl mx-auto md:text-center ">
        {/* Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wider font-black mb-6 leading-none"
        >
          <span className="text-[rgb(0,29,51)]">Unlock Your Future</span>
          <br />
          <span className="text-[rgb(0,29,51)]">At </span>
          <span className="text-blue-600 underline decoration-blue-600">
            LASCADS
          </span>
          <span className="text-[rgb(0,29,51)]"> </span>
          <span className="text-orange-500 underline decoration-blue-600">
            S6
          </span>
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-medium leading-relaxed text-[rgb(0,29,51)]"
        >
          {isMobile ? mobileTrimmed : fullText}
        </motion.p>

        {/* Buttons Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/registerMember"
            className="bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl uppercase w-full sm:w-auto text-center"
          >
            Register for Free
          </a>

          <a
            href="#about"
            className="border-2 border-blue-600 text-blue-600 px-8 sm:px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all uppercase w-full sm:w-auto text-center"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
