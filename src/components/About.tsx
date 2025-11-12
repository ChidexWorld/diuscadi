import Image from "next/image";
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

  return (
    <section
      id="about"
      className="py-20 px-20 bg-gray-50 text-[#001d33] flex flex-col items-center"
    >
      {/* Top Section */}
      <div className="text-center mb-10 px-4">
        <p className="text-[#001d33] text-bold sm:text-lg mb-2">
          Why should you attend #LASCDSS5?
        </p>
        <h2 className="text-3xl sm:text-6xl font-semibold text-[#001d33]">
          Career Growth Starts Here.
        </h2>
      </div>

      {/* Highlights Cards */}
      <div className="flex flex-col items-center w-full max-w-5xl mb-20 space-y-4 sm:space-y-5">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white shadow-md rounded-md py-6 px-4 sm:px-6 flex items-center gap-3 sm:gap-4 text-[#001d33] hover:shadow-lg transition-shadow"
          >
            {item.icon}
            <p className=" md:text-2xl leading-snug">{item.text}</p>
          </div>
        ))}
      </div>

      {/* What to Expect Section */}
      <div className="text-center mb-12 px-4">
        <p className="text-[#001d33] text-base sm:text-lg mb-2">
          What to expect at #LASCDSS5
        </p>
        <h2 className="text-3xl sm:text-6xl font-semibold text-[#001d33]">
          Turn Your Skills into <br />
          Wealth for Life-After <br /> School
        </h2>
      </div>

      {/* Content Section (Text + Image) */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Left - Writeup */}
        <div className="md:w-1/2 text-[#001d33] leading-relaxed space-y-4 mb-10 md:mb-0 text-sm sm:text-lg">
          <p className="text-justify first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]">
            Life after tertiary education is definitely not a bed of roses. With
            the continuous rise in the rate of unemployment, and competitive and
            harsh labour market, many graduates find themselves unprepared for
            the transition into the realities of the universal workforce.
          </p>

          <p className="font-bold">
            My name is Dr. Ikechukwu Umeh, founder DIUSCADI, and the convener of
            Life After School Career Development Seminar Series (LASCADSS).
          </p>

          <p className="font-bold">DIUSCADI’s mission</p>
          <p>
            is to bridge the gap in transition from academia to professionalism
            seamlessly via our Life After School Career Development Seminar
            series organized for fresh graduates and undergraduate students.
          </p>

          <p className="font-bold">DIUSCADI’s vision</p>
          <p>
            is to achieve a situation where finalist students of the Nigerian
            tertiary institutions and fresh graduates discover their talents in
            hard and soft skills early enough to become entrepreneurs,
            employers, employable, and successfully fit into the Nigerian labour
            market. LASCADSS workshops empower young graduates to transform
            their academic skills into entrepreneurial ventures and meaningful
            careers.
          </p>

          {/* Button */}
          <div className="flex justify-center md:justify-start">
            <button className="mt-4 border border-[#0067ff] text-[#0067ff] bg-white px-5 sm:px-6 py-2 rounded-full hover:bg-[#0067ff] hover:text-white transition-all text-sm sm:text-base">
              See all Volunteers
            </button>
          </div>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full sm:w-4/5">
            <Image
              src="/image/dr-umeh.png"
              alt="Dr. Ikechukwu Umeh"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
