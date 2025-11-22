"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const LiveStats = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [inView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className="bg-[#001525] rounded-[40px] text-white px-6 sm:px-12 py-12 text-center"
    >
      {/* Tag */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white text-[#001525] rounded-full px-8 py-6 font-semibold text-sm sm:text-base">
          APPLICATIONS ARE OPEN
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial="hidden"
        animate={controls}
        variants={fadeUp}
        transition={{ delay: 0.3 }}
        className="text-white text-xl sm:text-4xl leading-relaxed mb-12"
      >
        Join us to discover how you can leverage your skills <br /> to create
        wealth and build a successful future
      </motion.p>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeUp}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-4xl md:rounded-full text-[#001525] flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl mx-auto px-6 py-6 sm:py-8 gap-5"
      >
        {/* Speakers */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <h3 className="text-4xl font-bold">
            <CountUp start={0} end={hasAnimated ? 10 : 0} duration={1.5} />
          </h3>
          <p className="text-sm font-semibold">Speakers</p>
        </div>

        <div className="hidden sm:block h-10 w-[1px] bg-[#001525] mx-8"></div>
        <div className="block sm:hidden h-[1px] w-full bg-[#001525]"></div>

        {/* Participants */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <h3 className="text-4xl font-bold">
            <CountUp
              start={0}
              end={hasAnimated ? 1500 : 0}
              duration={2}
              separator=","
            />
          </h3>
          <p className="text-sm font-semibold">Participants</p>
        </div>

        <div className="hidden sm:block h-10 w-[1px] bg-[#001525] mx-8"></div>
        <div className="block sm:hidden h-[1px] w-full bg-[#001525]"></div>

        {/* Workshops */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <h3 className="text-4xl font-bold">
            <CountUp start={0} end={hasAnimated ? 15 : 0} duration={1.5} />
          </h3>
          <p className="text-sm font-semibold">Workshops</p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LiveStats;
