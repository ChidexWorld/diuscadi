import React from "react";

const ApplicationSection: React.FC = () => {
  return (
    <section className="bg-[#005BFF] rounded-[50px] text-center text-white px-6 py-20">
      {/* Button */}
      <div className="flex justify-center mb-8">
        <div className="bg-white text-[#0A0A0A] font-semibold px-8 py-4 rounded-full text-sm md:text-base shadow-md">
          APPLICATIONS ARE OPEN
        </div>
      </div>

      {/* Text */}
      <h2 className="text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
        Don&apos;t miss this opportunity to kickstart your career. <br />
        Register now to secure your spot at <span className="font-semibold">DIUSCADI 5.0</span>
      </h2>

      {/* White Rounded Bar */}
      <div className="mt-10 flex justify-center">
        <div className="bg-white h-[60px] w-[90%] md:w-[80%] rounded-full"></div>
      </div>
    </section>
  );
};

export default ApplicationSection;
