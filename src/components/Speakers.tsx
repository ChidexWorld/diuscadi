"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  startTime: string;
  totalSeats: number;
}

const useCarousel = (length: number, interval = 5000) => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((i) => (i === length - 1 ? 0 : i + 1));
  const prev = () => setCurrent((i) => (i === 0 ? length - 1 : i - 1));

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [current, length]);

  return { current, next, prev };
};

const Speakers: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const { current, next, prev } = useCarousel(speakers.length, 5000);

  // Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart - touchEnd > 50) next();
    if (touchStart - touchEnd < -50) prev();
  };

  // Motion variants
  const fadeSlide = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const slideChange = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0, transition: { duration: 0.45 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.35 } },
  };

  // 🔥 Fetch ONLY the active event
  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();
          setSpeakers(eventData.speakers || []);
        } else {
          console.warn("No active event found.");
        }
      } catch (err) {
        console.error("Error fetching active event:", err);
      }
    };

    fetchActiveEvent();
  }, []);

  const speaker = speakers[current] || null;

  return (
    <section className="py-16 md:py-30 bg-white text-center" id="speakers">
      <motion.div
        className="max-w-4xl mx-auto mb-14 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlide}
      >
        <h4 className="text-[#002b55] font-semibold uppercase tracking-wider mb-3">
          2025 Speakers
        </h4>
        <h2 className="text-3xl sm:text-6xl font-semibold text-[#001d33] mb-4 leading-snug">
          Learn From The Best <br /> Minds In The Field
        </h2>
        <p className="text-[001d33] text-lg">
          We’re bringing together the most audacious thinkers, doers and
          professionals in Nigeria, working in a variety of fields.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-between bg-[#eaf2ff] rounded-3xl p-6 md:p-12 shadow-md max-w-6xl mx-auto w-[95%] gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeSlide}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {speaker ? (
          <>
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={slideChange}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 md:pr-10 text-left"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#002b55] mb-4">
                  {speaker.title} <br /> {speaker.name}
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{speaker.bio}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={prev}
                    className="w-10 h-10 flex items-center justify-center border-2 border-[#002b55] text-[#002b55] rounded-full hover:bg-[#002b55] hover:text-white transition"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 flex items-center justify-center border-2 border-[#002b55] text-[#002b55] rounded-full hover:bg-[#002b55] hover:text-white transition"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-2 mt-6">
                  {speakers.map((_, index) => (
                    <span
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        current === index ? "bg-[#002b55]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={speaker.imageUrl + current}
                variants={slideChange}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex justify-center md:justify-end"
              >
                <Image
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  width={380}
                  height={420}
                  className="rounded-2xl w-[240px] sm:w-[280px] md:w-[340px] lg:w-[380px] object-cover shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          // Fallback design when no speakers
          <div className="flex-1 text-center py-20">
            <p className="text-xl text-gray-600 font-medium mb-4">
              No speakers available at the moment.
            </p>
            <p className="text-gray-400">
              Please check back later for updates on our amazing speakers.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Speakers;
