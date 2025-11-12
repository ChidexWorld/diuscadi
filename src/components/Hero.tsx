export default function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-8 px-4 bg-gradient-to-br from-green-50 via-white to-orange-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-8xl tracking-wider font-black mb-6">
            <span style={{ color: "rgb(0, 29, 51)" }}>Unlock Your Future</span>
            <br />
            <span style={{ color: "rgb(0, 29, 51)" }}>At </span>
            <span className="text-blue-600 underline decoration-blue-600">
              LASCADS
            </span>
            <span style={{ color: "rgb(0, 29, 51)" }}> </span>
            <span className="text-orange-500 underline decoration-blue-600">
              S6
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto font-medium"
            style={{ color: "rgb(0, 29, 51)" }}
          >
            DIUSCADI&apos;S Life After School Career Development Seminar is
            packaged to practically expose participants to the real world job
            situations, opportunities, decision making & deep knowledge of
            entrepreneurship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#register"
              className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl uppercase"
            >
              Register for Free
            </a>
            <a
              href="#about"
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-all uppercase"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}