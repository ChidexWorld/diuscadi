import ActivityItem from "../ui/ActivityItem";

export interface Activity {
  action: string;
  detail: string;
  time: string;
}

export default function RecentActivitySection() {
  const activities: Activity[] = [
    {
      action: "New event created",
      detail: "Tech Summit 2025",
      time: "2 hours ago",
    },
    {
      action: "Speaker added",
      detail: "Jane Smith joined",
      time: "5 hours ago",
    },
    {
      action: "Event published",
      detail: "AI Workshop went live",
      time: "1 day ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((a, i) => (
          <ActivityItem key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
