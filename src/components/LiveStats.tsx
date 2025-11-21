const LiveStats = () => {
  return (
    <section className="bg-[#001525] rounded-[40px] text-white px-6 sm:px-12 py-12 text-center">
      {/* Applications Open */}
      <div className="flex justify-center mb-8">
        <div className="bg-white text-[#001525] rounded-full px-8 py-6 font-semibold text-sm sm:text-base">
          APPLICATIONS ARE OPEN
        </div>
      </div>

      {/* Description */}
      <p className="text-white text-xl sm:text-4xl leading-relaxed mb-12">
        Join us to discover how you can leverage your skills <br /> to create
        wealth and build a successful future
      </p>

      {/* Stats Section */}
      <div className="bg-white rounded-4xl md:rounded-full text-[#001525] flex flex-col sm:flex-row justify-center items-center w-full max-w-3xl mx-auto px-6 py-6 sm:py-8 gap-5">
        {/* Item 1 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
          <h3 className="text-4xl font-bold">10</h3>
          <p className="text-sm font-semibold">Speakers</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-10 w-[1px] bg-[#001525] mx-8"></div>
        <div className="block sm:hidden h-[1px] w-full bg-[#001525] mx-8"></div>

        {/* Item 2 */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <h3 className="text-4xl font-bold">1500</h3>
          <p className="text-sm font-semibold">Participants</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-10 w-[1px] bg-[#001525] mx-8"></div>
        <div className="block sm:hidden h-[1px] w-full bg-[#001525] mx-8"></div>

        {/* Item 3 */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <h3 className="text-4xl font-bold">15</h3>
          <p className="text-sm font-semibold">Workshops</p>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
