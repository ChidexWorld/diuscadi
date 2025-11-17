import type { Activity } from "../admin/RecentActivitySection";

export default function ActivityItem({ action, detail, time }: Activity) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
      <div>
        <p className="font-medium text-zinc-900">{action}</p>
        <p className="text-sm text-zinc-500">{detail}</p>
      </div>
      <p className="text-sm text-zinc-400">{time}</p>
    </div>
  );
}
