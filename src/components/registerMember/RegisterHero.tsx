"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import RegistrationForm from "./RegistrationForm";
import { EventForm } from "@/types"; // <-- your interface

export default function RegisterHero() {
  const [eventData, setEventData] = useState<EventForm | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const q = query(collection(db, "events"), where("isActive", "==", true));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const event = {
          id: docSnap.id,
          ...docSnap.data(),
        } as EventForm;

        setEventData(event);
      }
    };

    fetchEvent();
  }, []);

  const seatsLeft =
    eventData && eventData.totalSeats && eventData.seatsTaken !== undefined
      ? eventData.totalSeats - eventData.seatsTaken
      : null;

  return (
    <div className="w-full h-full text-white">
      {/* Hero section */}
      <div className="relative w-full h-[600px] flex justify-center overflow-hidden bg-black">
        <Image
          src="/image/dr-umeh-talk.webp"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />

        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <Image
            src="/image/DIUSCADI-Icon.webp"
            alt="Logo"
            width={90}
            height={90}
            className="mb-3"
          />

          <h2 className="text-[#f2b100] text-xl font-semibold tracking-wide mb-2">
            DIUSCADI
          </h2>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Register for {eventData?.title || "Loading..."}
          </h1>

          <span className="block mt-2 text-5xl md:text-7xl">
            #{eventData?.id?.slice(-1) || "…"} 🚀
          </span>

          {/* Features */}
          <div className="flex flex-col md:flex-row gap-6 mt-6 text-base md:text-lg text-gray-200">
            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400" /> 100% Free Registration
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400" /> Limited to{" "}
              {eventData?.totalSeats || "..."} Seats
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-yellow-400" /> For Finalists &
              Graduates
            </div>
          </div>
        </div>
      </div>

      {/* SEATS BOX */}
      <div className="flex justify-center -mt-32 relative z-30">
        <div className="bg-[#fafafa] text-black w-[95%] md:w-[820px] rounded-3xl shadow-lg py-12 text-center">
          <p className="text-5xl font-bold text-orange-500">
            {seatsLeft !== null ? seatsLeft : "..."}
          </p>
          <p className="text-lg mt-1 font-medium text-gray-700">Seats Left</p>

          {eventData && <RegistrationForm activeEvent={eventData} />}
        </div>
      </div>
    </div>
  );
}
