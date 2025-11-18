import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

export default function RegisterHero() {
  return (
    <div className="w-full h-full  text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] flex justify-center overflow-hidden bg-black">
        <Image
          src="/image/dr-umeh-talk.webp" // replace with actual background
          alt="Background"
          fill
          className="object-cover opacity-30 "
        />

        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <Image
            src="/image/DIUSCADI-Icon.webp"
            alt="DIUSCADI Logo"
            width={90}
            height={90}
            className="mb-3"
          />

          <h2 className="text-[#f2b100] text-xl font-semibold tracking-wide mb-2">
            DIUSCADI
          </h2>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-5xl md:text-8xl">
            Register for LASCDSS
            <span className="block mt-2 text-5xl md:text-7xl">#6 🚀</span>
          </h1>

          {/* Features */}
          <div className="flex flex-col md:flex-row gap-6 mt-6 text-base md:text-lg text-gray-200">
            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400 w-5 h-5" />
              100% Free Registration
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400 w-5 h-5" />
              Limited To 1500 Participants
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400 w-5 h-5" />
              For Finalists & Recent Graduates
            </div>
          </div>
        </div>
      </div>

      {/* center Box */}
      <div className="flex justify-center -mt-40 relative z-30">
        <div className="bg-white text-black w-[95%] md:w-[820px] rounded-3xl shadow-lg py-12 text-center">
          <p className="text-5xl font-bold text-orange-500">24</p>
          <p className="text-lg mt-1 font-medium text-gray-700">Seats Left</p>
        </div>
      </div>
    </div>
  );
}
