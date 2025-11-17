"use client";
import EventForm from "@/components/admin/CreateEventForm";

export default function NewEventPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary mb-4">Create Event</h1>
      <EventForm />
    </div>
  );
}
