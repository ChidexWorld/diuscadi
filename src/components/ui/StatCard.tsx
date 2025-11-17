import { BarChart3 } from "lucide-react";
import { Stat } from "../admin/QuickStatsSection";

export default function StatCard({ label, value, change }: Stat) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-zinc-900">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change}</p>
        </div>
        <div className="bg-zinc-100 p-3 rounded-lg">
          <BarChart3 size={24} className="text-zinc-600" />
        </div>
      </div>
    </div>
  );
}
