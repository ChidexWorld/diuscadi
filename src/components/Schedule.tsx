export default function Schedule() {
  return (
    <section id="schedule" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Event Schedule</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-lg p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Series 5 Coming Soon</h3>
            <p className="text-xl text-gray-700 mb-6">
              Theme: <span className="font-bold text-green-600">&quot;Turn Your Skills into Wealth for Life-After School&quot;</span>
            </p>
            <p className="text-lg text-gray-600">
              Date, time, and venue details will be announced soon. Register now to receive updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
