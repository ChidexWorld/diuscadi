"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  image: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Stephanie Nkamigbo",
    image: "/image/Stephanie-Nkamigbo.webp",
    message:
      "Being part of the organization team for DIUSCADI 2.0 was not just an interesting experience but an amazing opportunity to work alongside people with diverse perspectives yet building meaningful contributions. The Finalist Launchpad Workshop gave me an insight of what life after school looks like. It was indeed a great initiative to actually educate students who are about to graduate on what to expect after graduation and how to go about it.",
  },
  {
    name: "Okoro Esther Chiamaka",
    image: "/image/Esther-Chiamaka.webp",
    message:
      "DIUSCADI 2023 was a fantastic event for me, and I'm proud to have been a participant. It was an event that taught me the essential skills needed for the contemporary world, and the best part was realizing that one needs little to no capital to start.",
  },
  {
    name: "Mbah Divine Chinecherem",
    image: "/image/Mbah-Divine-Chinecherem.webp",
    message:
      "It was a transformative experience that connected me with mentors and peers and opened my eyes to new opportunities.",
  },
  {
    name: "Azubike Desiree",
    image: "/image/Azubike-Desiree.webp",
    message:
      "The Life After School seminar by DIUSCADI was amazing. It covered useful skills like entrepreneurship, interview techniques, digital marketing and more.",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentItem = testimonials[current];
  const nextItem = testimonials[(current + 1) % testimonials.length];

  return (
    <section className="w-full bg-[#001d33] px-5 py-20">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h4 className="text-white uppercase tracking-widest font-semibold mb-3">
          Trusted Community. True Connections.
        </h4>
        <h2 className="text-3xl sm:text-6xl font-semibold text-white">
          Past Attendees Are <br /> Raving…
        </h2>
      </div>

      {/* SLIDER */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* LEFT CARD (2/3) */}
          <div className="md:col-span-2 bg-[#AFCBFF] rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row gap-6">
            {/* IMAGE + NAME */}
            <div className="flex flex-col items-center shrink-0">
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                width={180}
                height={180}
                className="rounded-2xl object-cover"
              />
              <h3 className="font-extrabold mt-4 text-[#001D3D] text-center text-lg">
                {currentItem.name}
              </h3>
            </div>

            {/* MESSAGE */}
            <div className="flex items-start">
              <p className="text-[#001D3D] text-base sm:text-lg leading-relaxed">
                {currentItem.message}
              </p>
            </div>
          </div>

          {/* RIGHT CARD (1/3) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center text-center">
            <Image
              src={nextItem.image}
              alt={nextItem.name}
              width={180}
              height={180}
              className="rounded-2xl object-cover"
            />
            <h3 className="font-extrabold mt-4 text-[#001D3D] text-lg">
              {nextItem.name}
            </h3>
          </div>
        </div>

        {/* DOT NAVIGATION */}
        <div className="flex justify-center space-x-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
                current === index ? "bg-[#AFCBFF]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
