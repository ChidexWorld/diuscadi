"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, easeOut, Variants } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How many participants can register?",
    answer:
      "There’s a limit of 800 registrants to attend on a first come first serve basis.",
  },
  {
    question:
      "How can I contact DIUSCADI for inquiries or partnership opportunities?",
    answer:
      "For inquiries or partnership opportunities, please contact DIUSCADI via email at info@diuscadi.org.ng or reach out to us through our phone number +234 803 590 6416. We look forward to hearing from you.",
  },
  {
    question: "Are there any fees associated with attending DIUSCADI event?",
    answer:
      "No, there are no fees associated with attending the Life After School Career Development Seminar Series.",
  },
  {
    question: "How can I support DIUSCADI as a sponsor or volunteer?",
    answer:
      "You can support DIUSCADI by visiting our sponsorship page at https://diuscadi.org.ng/sponsor or by contacting us directly at +234 803 590 6416.",
  },
  {
    question:
      "How can I stay updated on upcoming DIUSCADI events and workshops?",
    answer:
      "To stay updated on upcoming DIUSCADI seminars and workshops, follow our social media platforms and subscribe to our email for updates.",
  },
  {
    question: "How can I participate in the LASCDSS workshops",
    answer:
      "Participation is strictly physical / in-person. There will however be a recording re-cap of some of the key moments so if you cannot make it in person do check out our YouTube for updates on the video recap",
  },
  {
    question: "Where is the location for this event?",
    answer:
      "ASUU Multipurpose Hall, Nnamdi Azikiwe University Awka. (Google maps link: https://maps.app.goo.gl/1uyy5eZVVs548ren7)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
};


const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-white to-[#f5f9ff]"
      id="faqs"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#001B3E] mb-12">
          Frequently Asked <br /> Questions
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-[#001B3E] text-lg md:text-xl hover:bg-gray-50 transition"
                >
                  {faq.question}

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-4 text-[#001B3E] text-[15px] md:text-lg leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
