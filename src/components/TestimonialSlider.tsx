"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  image: string;
  message: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Stephanie Nkamigbo",
    image: "/images/stephanie.jpg",
    message:
      "Being part of the organization team for DIUSCADI 2.0 was not just an interesting experience but an amazing opportunity to work alongside people with diverse perspectives yet building meaningful contributions. The Finalist Launchpad Workshop gave me an insight of what life after school looks like. It was indeed a great initiative to actually educate students who are about to graduate on what to expect after graduation and how to go about it. For the first time, I actually had someone educate me on how to prepare my Curriculum Vitae and get prepared for interviews. This program positively impacted a lot in my life and I can’t wait to attend the next one.",
    bgColor: "bg-[#AFCBFF]",
  },
  {
    name: "Okoro Esther Chiamaka",
    image: "/images/esther.jpg",
    message:
      "DIUSCADI was an eye-opener. It allowed me to network, learn, and grow in ways I didn’t expect. I’m grateful for the practical sessions that helped me improve my confidence and readiness for life after school.",
    bgColor: "bg-white",
  },
  {
    name: "Another Participant",
    image: "/images/placeholder.jpg",
    message:
      "It was a transformative experience that connected me with mentors and peers who shared valuable insights about career growth.",
    bgColor: "bg-[#AFCBFF]",
  },
];

const TestimonialSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = testimonials[current];
  const nextItem = testimonials[(current + 1) % testimonials.length];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0B253F] to-[#003B8A] transition-all duration-700 px-6 py-12">
      {/* ====== Main Container ====== */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-6xl w-full">
        {/* ====== Left: Current Testimonial ====== */}
        <div
          className={`flex flex-col md:flex-row gap-6 p-6 rounded-3xl shadow-lg ${currentItem.bgColor} flex-1 transition-all duration-700`}
        >
          <Image
            src={currentItem.image}
            alt={currentItem.name}
            className="rounded-3xl object-cover"
            width={240}
            height={240}
          />
          <div className="text-[#001D3D] flex flex-col justify-center md:w-2/3">
            <p className="text-base leading-relaxed">{currentItem.message}</p>
            <h3 className="font-extrabold mt-4 text-lg">{currentItem.name}</h3>
          </div>
        </div>

        {/* ====== Right: Next Preview ====== */}
        <div
          className={`hidden md:flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg ${nextItem.bgColor} w-[45%] transition-all duration-700`}
        >
          <Image
            src={nextItem.image}
            alt={nextItem.name}
            width={240}
            height={240}
            className="rounded-3xl object-cover"
          />
          <h3 className="font-extrabold mt-4 text-lg text-[#001D3D]">
            {nextItem.name}
          </h3>
        </div>
      </div>

      {/* ====== Navigation Dots ====== */}
      <div className="flex space-x-3 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
              i === current ? "bg-[#AFCBFF]" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
