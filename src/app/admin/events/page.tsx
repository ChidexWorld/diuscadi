// /app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm } from "@/types";
import EventCard from "@/components/admin/EventCard";
import CreateEventForm from "@/components/admin/CreateEventForm";
import EditEventModal from "@/components/admin/modal/EditEventModal";
import ConfirmDeleteModal from "@/components/admin/modal/ConfirmDeleteModal";

export default function EventsPage() {
  const [events, setEvents] = useState<EventForm[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventForm | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadEvents = async () => {
    const snap = await getDocs(collection(db, "events"));
    setEvents(snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventForm) })));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const onEdit = (event: EventForm) => {
    setSelectedEvent(event);
    setOpenEdit(true);
  };

  const onDeleteRequest = (id: string) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setShowDelete(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </div>

      {openCreate && (
        <CreateEventForm
          close={() => setOpenCreate(false)}
          onSaved={() => loadEvents()}
        />
      )}

      {openEdit && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          close={() => setOpenEdit(false)}
          onSaved={() => loadEvents()}
        />
      )}

      {showDelete && deleteId && (
        <ConfirmDeleteModal
          title="Delete this event?"
          onCancel={() => setShowDelete(false)}
          onConfirm={() => deleteEvent(deleteId)}
        />
      )}
    </div>
  );
}
