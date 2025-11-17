import StatCard from "../ui/StatCard";

export interface Stat {
  label: string;
  value: string;
  change: string;
}

export default function QuickStatsSection() {
  const stats: Stat[] = [
    { label: "Total Events", value: "12", change: "+3 this month" },
    { label: "Active Speakers", value: "28", change: "+5 this month" },
    { label: "Attendees", value: "1,247", change: "+156 this week" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  );
}
