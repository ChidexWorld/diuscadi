import { Calendar, Mic } from "lucide-react";
import ManagementCard from "../ui/ManagementCard";

export interface ManagementItem {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  hoverColor: string;
}

export default function ManagementSection() {
  const items: ManagementItem[] = [
    {
      title: "Events",
      description: "Create and manage upcoming events",
      icon: Calendar,
      href: "/admin/events",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      title: "Speakers",
      description: "Manage speaker profiles and bios",
      icon: Mic,
      href: "/admin/speakers",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4">Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((c, i) => (
          <ManagementCard  key={i} {...c} />
        ))}
      </div>
    </div>
  );
}
