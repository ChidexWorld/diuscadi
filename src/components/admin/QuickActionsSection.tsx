import { Users, FileText, Settings } from "lucide-react";
import QuickActionButton from "../ui/QuickActionButton";

export interface QuickAction {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export default function QuickActionsSection() {
  const actions: QuickAction[] = [
    { icon: Users, title: "View Attendees", desc: "Manage registrations" },
    { icon: FileText, title: "Reports", desc: "Export analytics" },
    { icon: Settings, title: "Settings", desc: "Configure platform" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a, i) => (
          <QuickActionButton key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
