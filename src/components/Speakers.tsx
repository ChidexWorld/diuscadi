
"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Professor {
  name: string;
  title: string;
  imageUrl: string;
  experience: string[];
}

const professors: Professor[] = [
  {
    title: "Associate Prof",
    name: "A.F Nwofor",
    imageUrl: "/images/prof1.jpg",
    experience: [
      "Florence has over 32 years of experience in Information and Knowledge Management in the higher education industry. She has garnered experience in Serials Management, Cataloguing and indexing.",
      "She is well versed in issues of collection and preservation of indigenous knowledge, oral history and culture.",
      "Her experience positions her as a seasoned information management consultant with a capacity to provide advice on training for career librarians, Library management and administration, Library use and development amongst others.",
    ],
  },
  {
    title: "Dr",
    name: "Emeka Okafor",
    imageUrl: "/images/prof2.jpg",
    experience: [
      "Emeka has 20+ years of teaching and research experience in information systems and digital knowledge.",
      "He specializes in electronic cataloguing and digital library transformation strategies.",
    ],
  },
  {
    title: "Prof",
    name: "Ngozi Eze",
    imageUrl: "/images/prof3.jpg",
    experience: [
      "Ngozi is a distinguished academic with expertise in archives and heritage studies.",
      "She has contributed to numerous projects on documentation and preservation of African indigenous knowledge.",
    ],
  },
  {
    title: "Dr",
    name: "Okey Umeh",
    imageUrl: "/images/prof4.jpg",
    experience: [
      "Okey has led major research on modern library technology integration.",
      "He is passionate about developing advanced information retrieval systems.",
    ],
  },
  {
    title: "Assoc. Prof",
    name: "Chika Nnamani",
    imageUrl: "/images/prof5.jpg",
    experience: [
      "Chika has dedicated over 25 years to academic excellence in library and information science.",
      "She focuses on student mentorship and effective resource management in academic institutions.",
    ],
  },
];

const Speakers: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? professors.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === professors.length - 1 ? 0 : prev + 1));
  };

  const prof = professors[current];

  return (
    <section className="py-20 bg-white text-center">
      {/* ===== HEADER ===== */}
      <div className="max-w-4xl mx-auto mb-16">
        <h4 className="text-[#002b55] font-semibold uppercase tracking-wider mb-3">
          2024 Speakers
        </h4>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#002b55] leading-snug mb-4">
          Learn From The Best <br /> Minds In The Field
        </h2>
        <p className="text-gray-600 text-lg">
          We’re bringing together the most audacious thinkers, doers and
          professionals in Nigeria, working in a variety of fields.
        </p>
      </div>

      {/* ===== SLIDER ===== */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#eaf2ff] rounded-3xl p-8 md:p-12 shadow-md max-w-6xl mx-auto transition-all duration-700 ease-in-out">
        {/* Left Content */}
        <div className="flex-1 md:pr-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002b55] mb-4">
            {prof.title} <br /> {prof.name}
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed text-left">
            {prof.experience.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center border-2 border-[#002b55] text-[#002b55] rounded-full hover:bg-[#002b55] hover:text-white transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center border-2 border-[#002b55] text-[#002b55] rounded-full hover:bg-[#002b55] hover:text-white transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-6">
            {professors.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-[#002b55]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <img
            src={prof.imageUrl}
            alt={prof.name}
            className="rounded-2xl w-[300px] md:w-[350px] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Speakers;
