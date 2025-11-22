"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Users, Mic2, BookOpen, Star, Gift } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#0067ff]" />,
      text: "Hands-on workshops tailored to today's job market.",
    },
    {
      icon: <Mic2 className="w-6 h-6 text-[#0067ff]" />,
      text: "Expert Speakers from various industries",
    },
    {
      icon: <Users className="w-6 h-6 text-[#0067ff]" />,
      text: "Network with like minded peers and Mentors",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#0067ff]" />,
      text: "Free registration and participation",
    },
    {
      icon: <Star className="w-6 h-6 text-[#0067ff]" />,
      text: "Access to closed community & opportunities",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#0067ff]" />,
      text: "Exclusive Resources and Tools",
    },
  ];

  // Animations
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerParent = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="about"
      className="py-20 px-6 sm:px-10 bg-gray-50 text-[#001d33] flex flex-col items-center"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Top Section */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-start sm:text-center mb-10 w-full max-w-5xl"
      >
        <p className="text-[#001d33] font-semibold text-base sm:text-lg mb-2">
          Why should you attend #LASCDSS5?
        </p>
        <h2 className="text-3xl sm:text-6xl font-semibold text-[#001d33] leading-tight">
          Career Growth Starts Here.
        </h2>
      </motion.div>

      {/* Highlights Cards */}
      <motion.div
        variants={staggerParent}
        className="flex flex-col items-center w-full max-w-5xl mb-20 space-y-4 sm:space-y-5"
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full bg-white shadow-md rounded-md py-5 px-4 flex items-start gap-4 text-[#001d33] hover:shadow-lg transition-shadow"
          >
            {item.icon}
            <p className="text-sm sm:text-lg md:text-xl leading-snug text-start">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* What to Expect */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-start sm:text-center mb-12 w-full max-w-5xl"
      >
        <p className="text-[#001d33] text-base sm:text-lg mb-2">
          What to expect at #LASCDSS5
        </p>
        <h2 className="text-3xl sm:text-6xl font-semibold leading-tight text-[#001d33]">
          Turn Your Skills into <br />
          Wealth for Life-After <br /> School
        </h2>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:space-x-10 w-full max-w-6xl mx-auto">
        {/* IMAGE — RIGHT ON DESKTOP, TOP ON MOBILE */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:w-1/2 flex justify-center order-1 md:order-2 mb-8 md:mb-0"
        >
          <div className="relative w-full sm:w-4/5">
            <Image
              src="/image/dr-umeh.png"
              alt="Dr. Ikechukwu Umeh"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />

            {/* DESKTOP FLOATING CARD */}
            <div className="hidden md:block absolute top-6 right-[-40px] sm:right-[-60px] h-30  bg-orange-400 text-white p-4 rounded-lg shadow-lg max-w-[300px] text-sm sm:text-base">
              <p className="mb-2">
                The theme of LASSCADS series 5 of is: Turn Your Skills into
                Wealth for Life-After School. You cannot afford to miss it. 🚀
              </p>
              <p className="font-sm text-end text-[#001d33] pt-5">
                Saturday, 24th July 2025
              </p>
            </div>
          </div>
        </motion.div>

        {/* TEXT — LEFT ON DESKTOP, BELOW ON MOBILE */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 text-[#001d33] leading-relaxed space-y-4 text-start text-sm sm:text-lg px-1 sm:px-0 order-2 md:order-1"
        >
          <p className="text-justify first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]">
            Life after tertiary education is definitely not a bed of roses. With
            the continuous rise in the rate of unemployment, and competitive and
            harsh labour market, many graduates find themselves unprepared for
            the transition into the realities of the universal workforce.
          </p>

          <p className="font-bold">My name is Dr. Ikechukwu Umeh...</p>

          <p className="font-bold">DIUSCADI’s mission</p>
          <p>
            is to bridge the gap in transition from academia to professionalism
            seamlessly via our Life After School Career Development Seminar
            series organized for fresh graduates and undergraduate students.
          </p>

          <p className="font-bold">DIUSCADI’s vision</p>
          <p>is to achieve a situation where finalist students...</p>

          <div className="flex justify-start">
            <button className="mt-4 border border-[#0067ff] text-[#0067ff] bg-white px-6 py-2 rounded-full hover:bg-[#0067ff] hover:text-white transition-all text-sm sm:text-base">
              See all Volunteers
            </button>
          </div>

          {/* MOBILE VERSION OF ORANGE CARD */}
          <div className="md:hidden mt-6 bg-orange-400 text-white p-4 rounded-lg shadow-lg max-w-[300px] text-sm h-25 ">
            <p className="mb-2">
              The theme of LASSCADS series 5 of is: Turn Your Skills into Wealth
              for Life-After School. You cannot afford to miss it. 🚀
            </p>
            <p className="font-sm text-end text-[#001d33] pt-6">
              Saturday, 24th July 2025
            </p>{" "}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
