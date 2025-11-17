import type { QuickAction } from "../admin/QuickActionsSection";

export default function QuickActionButton({
  icon: Icon,
  title,
  desc,
}: QuickAction) {
  return (
    <button className="bg-white rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50 transition-colors text-left">
      <Icon size={20} className="text-zinc-600 mb-2" />
      <p className="font-medium text-zinc-900">{title}</p>
      <p className="text-sm text-zinc-500 mt-1">{desc}</p>
    </button>
  );
}
