"use client";

import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";

const logos = [
  "/images/adopin.png",
  "/images/bitefoods.png",
  "/images/aic.png",
  "/images/vbank.png",
  "/images/airtel.png",
  "/images/1960.png",
];

const PartnersSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Continuous right-to-left scroll effect using Framer Motion
  useAnimationFrame((t) => {
    if (paused) return;
    const baseX = (t / 40) % (scrollRef.current?.scrollWidth || 1);
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${baseX}px)`;
    }
  });

  return (
    <section className="bg-white py-16 px-4 text-center overflow-hidden">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-[#001D3D] mb-4 leading-tight">
        Support Career <br className="md:hidden" />
        Development Of Nigerian Youths
      </h2>

      {/* Subheading */}
      <p className="max-w-2xl mx-auto text-[#001D3D]/80 text-base md:text-lg mb-12">
        At DIUSCADI, we believe one person can make a big difference and that
        kindness should be passed on. We challenge you to pay it forward too!
      </p>

      {/* Infinite Scrolling Logos */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={scrollRef}
          className="flex space-x-16"
          aria-label="partner logos scrolling"
        >
          {[...logos, ...logos].map((src, index) => (
            <div
              key={index}
              className="relative h-16 md:h-20 w-40 md:w-48 flex-shrink-0 opacity-90 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={src}
                alt={`partner-${index}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 200px"
                priority={index < 6}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
