// /components/EventCard.tsx
"use client";

import Link from "next/link";
import { EventForm } from "@/types";

interface Props {
  event: EventForm;
  onEdit: (e: EventForm) => void;
  onDeleteRequest: (id: string) => void;
}

export default function EventCard({ event, onEdit, onDeleteRequest }: Props) {
  return (
    <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-xl">
          <Link href={`/admin/events/${event.id}`}>{event.title}</Link>
        </h3>
        <p className="text-sm text-zinc-600">{event.description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* Active Status with green/red coloring */}
        <p
          className={`text-xs font-medium ${
            event.isActive ? "text-green-600" : "text-red-500"
          }`}
        >
          {event.isActive ? "Active" : "Inactive"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(event)}
            className="text-blue-600 text-sm cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => onDeleteRequest(event.id!)}
            className="text-red-500 text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
