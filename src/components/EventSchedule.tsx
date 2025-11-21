import {
  LineChart,
  Clock,
  Presentation,
  Users,
  Coffee,
  Utensils,
  Network,
  Award,
} from "lucide-react"; // icons

const EventSchedule = () => {
  // Schedule data
  const schedules = [
    {
      time: "7:30 AM",
      title: "Registration",
      icon: <LineChart className="text-[#001525]" size={24} />,
    },
    {
      time: "8:00 AM",
      title: "Opening Remarks",
      icon: <Clock className="text-[#001525]" size={24} />,
    },
    {
      time: "8:30 AM",
      title: "Keynote Speeches",
      icon: <Presentation className="text-[#001525]" size={24} />,
    },
    {
      time: "10:00 AM",
      title: "Breakout Sessions",
      icon: <Users className="text-[#001525]" size={24} />,
    },
    {
      time: "1:00 PM",
      title: "Lunch Break",
      icon: <Utensils className="text-[#001525]" size={24} />,
    },
    {
      time: "2:00 PM",
      title: "Panel Discussions",
      icon: <Coffee className="text-[#001525]" size={24} />,
    },
    {
      time: "3:00 PM",
      title: "Networking",
      icon: <Network className="text-[#001525]" size={24} />,
    },
    {
      time: "4:00 PM",
      title: "Closing & Awards",
      icon: <Award className="text-[#001525]" size={24} />,
    },
  ];

  return (
    <section className="bg-white px-6 sm:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-[#0067ff] text-3xl sm:text-6xl font-semibold mb-6">
          Event Schedule
        </h2>

        <div className="flex flex-col sm:flex-row gap-10">
          {/* Left Description */}
          <div className="sm:w-1/2 text-[#001525] text-sm sm:text-base leading-relaxed">
            <p>
              We strive to a very impactful event for recent graduates, at any
              stage of life and business. We&apos;re focused on just 10%
              <span className="font-bold"> ACTIONABLE TALKS </span> & 90%
              <span className="font-bold"> PRACTICAL WORKSHOPS!</span>
            </p>
          </div>

          {/* Right Schedule List */}
          <div className="sm:w-1/2 flex flex-col gap-4">
            {schedules.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-between px-5 py-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <p className="text-[#001525] font-medium text-sm sm:text-base">
                    {item.time}
                  </p>
                </div>
                <p className="text-[#001525] font-semibold text-sm sm:text-base">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
