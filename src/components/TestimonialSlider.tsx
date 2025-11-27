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
    image: "/image/Stephanie-Nkamigbo.webp",
    message:
      "Being part of the organization team for DIUSCADI 2.0 was not just an interesting experience but an amazing opportunity to work alongside people with diverse perspectives yet building meaningful contributions. The Finalist Launchpad Workshop gave me an insight of what life after school looks like. It was indeed a great initiative to actually educate students who are about to graduate on what to expect after graduation and how to go about it. For the first time, I actually had someone educate me on how to prepare my Curriculum Vitae and get prepared for interviews. This program positively impacted a lot in my life and I can’t wait to attend the next one.",
    bgColor: "bg-[#AFCBFF]",
  },
  {
    name: "Okoro Esther Chiamaka",
    image: "/image/Esther-Chiamaka.webp",
    message:
      "DIUSCADI 2023 was a fantastic event for me, and I'm proud to have been a participant. It was an event that taught me the essential skills needed for the contemporary world, and the best part was realizing that one needs little to no capital to start – for example, in digital marketing. The event provided a great networking opportunity, as I met many vibrant youths who are ready to change the world – people of like minds. It was not just about the skills; the seasoned speakers shared life stories that were incredibly inspiring. Their resilience during the early stages of their lives is truly worth emulating. It reinforced my belief that with hard work",
    bgColor: "bg-white",
  },
  {
    name: "Another Participant",
    image: "/image/Mbah-Divine-Chinecherem.webp",
    message:
      "It was a transformative experience that connected me with mentors and peers...",
    bgColor: "bg-[#AFCBFF]",
  },
  {
    name: "Another Participant",
    image: "/image/Azubike-Desiree.webp",
    message:
      "The Life After School seminar by DIUSCADI was amazing. It covered useful skills like Entrepreneurship, interviews technique, digital marketing and even solar panel installation. I personally gained practical knowledge and skills. The dedication of the speakers was also truly commendable. I highly recommend it for students.",
    bgColor: "bg-[#AFCBFF]",
  },
];

const TestimonialSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = testimonials[current];
  const nextItem = testimonials[(current + 1) % testimonials.length];

  return (
    <div className="w-full bg-[#001d33] px-6 py-16">
      {/* ======= HEADER + FULL IMAGE ======= */}
      <div className="text-center mb-20">
        <h4 className="text-white font-semibold uppercase tracking-wider mb-3">
          Trusted Community. True Connections.
        </h4>

        <h2 className="text-3xl sm:text-6xl font-semibold text-white mb-4 leading-snug">
          Past Attendees Are <br /> Raving…
        </h2>

        <div className="relative w-full h-[85vh] mt-8 rounded-2xl overflow-hidden">
          <Image
            src="/image/attendees-banner.png"
            alt="Past Attendees Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* ======= SLIDER SECTION (same background) ======= */}
      <div className="relative min-h-screen flex flex-col items-center justify-center transition-all duration-700">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-6xl w-full">
          {/* LEFT — MAIN TESTIMONIAL */}
          <div
            className={`flex flex-col md:flex-row gap-6 p-6 rounded-3xl shadow-lg ${currentItem.bgColor} flex-1 transition-all duration-700`}
          >
            <Image
              src={currentItem.image}
              alt={currentItem.name}
              width={240}
              height={240}
              className="rounded-3xl object-cover"
            />

            <div className="text-[#001D3D] flex flex-col justify-center md:w-2/3">
              <p className="text-base leading-relaxed">{currentItem.message}</p>
              <h3 className="font-extrabold mt-4 text-lg">
                {currentItem.name}
              </h3>
            </div>
          </div>

          {/* RIGHT — NEXT PREVIEW */}
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

        {/* DOT NAVIGATION */}
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
    </div>
  );
};

export default TestimonialSlider;
