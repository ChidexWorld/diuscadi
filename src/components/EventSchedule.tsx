"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
};

export default function EventSchedule() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Fetch active event schedules
  useEffect(() => {
    const loadActiveEvent = async () => {
      try {
        // Query for active event
        const q = query(
          collection(db, "events"),
          where("isActive", "==", true)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const eventData = snap.docs[0].data(); // first active event
          setSchedules(eventData.schedules || []);
        }
      } catch (error) {
        console.error("Error fetching active event schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    loadActiveEvent();
  }, []);

  return (
    <section className="bg-white px-6 sm:px-12 py-16" id="schedule">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          variants={fadeUp}
          className="text-[#0067ff] text-3xl sm:text-6xl font-semibold mb-6"
        >
          Event Schedule
        </motion.h2>

        <div className="flex flex-col sm:flex-row gap-10">
          {/* LEFT STATIC TEXT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            variants={fadeUp}
            className="w-full sm:w-[30%] text-[#001525] text-sm sm:text-base leading-relaxed sm:sticky sm:top-28 self-start h-fit"
          >
            <p>
              We strive to a very impactful event for recent graduates, at any
              stage of life and business. We&apos;re focused on just 10%
              <span className="font-bold"> ACTIONABLE TALKS </span> & 90%
              <span className="font-bold"> PRACTICAL WORKSHOPS!</span>
            </p>
          </motion.div>

          {/* RIGHT: SCHEDULE LIST */}
          <motion.div
            className="w-full sm:w-[70%] flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {loading ? (
              <p className="text-gray-500">Loading schedules...</p>
            ) : schedules.length === 0 ? (
              <p className="text-gray-500">
                No schedules found for the active event.
              </p>
            ) : (
              schedules.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between px-5 py-4 hover:shadow-md transition-shadow gap-2"
                >
                  <p className="text-[#001525] font-medium text-normal sm:text-xl">
                    {item.time}
                  </p>

                  <p className="text-[#001525] font-semibold text-normal sm:text-xl">
                    {item.title}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
