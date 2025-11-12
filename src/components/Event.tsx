import Image from "next/image";

export default function Event() {
  return (
    <section
      id="about"
      className="py-10 px-4 bg-white flex items-center justify-center"
    >
      <div className="relative">
        {/* Event Image */}
        <Image
          src="/image/image.png"
          alt="event video"
          width={1200}
          height={300}
          className="shadow-lg rounded-2xl"
        />

        {/* Floating Info Card */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#54b435] text-white rounded-xl shadow-lg px-10 py-5 w-[90%] md:w-[80%] flex flex-col md:flex-row items-start justify-between">
          {/* Date Section */}
          <div className="text-left whitespace-normal break-words flex flex-row items-center gap-5">
            <p className="text-sm md:text-base font-semibold mb-1">Date:</p>
            <p className="text-lg md:text-xl leading-snug font-semibold">
              Thursday, 24th <br /> July, 2025
            </p>
          </div>

          {/* Divider Line */}
          <div className="hidden md:block w-px h-10 bg-white/70 mx-6"></div>
          <div className="block md:hidden w-full h-px bg-white/70 self-center"></div>

          {/* Venue Section */}
          <div className="text-left whitespace-normal break-words flex flex-row items-center gap-5">
            <p className="text-sm md:text-base font-semibold mb-1">Venue:</p>
            <p className="text-sm md:text-lg leading-snug font-semibold">
              ASUU Secretariat Hall, <br /> Nnamdi Azikiwe University Awka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
