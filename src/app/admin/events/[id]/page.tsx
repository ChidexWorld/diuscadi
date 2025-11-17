// /app/events/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm, Speaker } from "@/types";

import { useToast } from "@/components/ui/ToastProvider";
import EditSpeakerModal from "@/components/admin/modal/EditSpeakerModal";
import AddSpeakerModal from "@/components/admin/modal/AddSpeakerModal";
import ConfirmDeleteModal from "@/components/admin/modal/ConfirmDeleteModal";

interface Props {
  params: { id: string };
}

export default function EventDetailsPage({ params }: Props) {
  const [event, setEvent] = useState<EventForm | null | undefined>(undefined);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteSpeakerId, setDeleteSpeakerId] = useState<string | null>(null);
const { toast } = useToast();

  const loadEvent = async () => {
    const ref = doc(db, "events", params.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      setEvent(null);
      return;
    }
    setEvent({ id: snap.id, ...(snap.data() as EventForm) });
  };

  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSpeakerSaved = () => {
    loadEvent();
  };

  const onEdit = (sp: Speaker) => {
    setEditingSpeaker(sp);
    setOpenEdit(true);
  };

  const onDeleteRequest = (id: string) => {
    setDeleteSpeakerId(id);
    setShowDelete(true);
  };

  const handleDeleteSpeaker = async () => {
    if (!event?.id || !deleteSpeakerId) return;
    try {
      const updated = (event.speakers || []).filter(
        (s) => s.id !== deleteSpeakerId
      );
      await updateDoc(doc(db, "events", event.id), { speakers: updated });
      toast("success", "Speaker removed");
      setShowDelete(false);
      setDeleteSpeakerId(null);
      loadEvent();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
      toast("error", "Failed to remove speaker");
    }
  };

  if (event === undefined) return <div className="p-6">Loading...</div>;
  if (event === null) return <div className="p-6">Event not found</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-zinc-600 mt-2">{event.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-zinc-500">Status: {event.status}</p>
          <button
            onClick={() => setOpenAdd(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            + Add Speaker
          </button>
        </div>
      </div>

      {/* Schedule timeline */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Schedule</h2>
        <ul className="relative border-l border-zinc-300 mt-4 pl-6">
          {event.schedules.map((sch, i) => (
            <li key={i} className="mb-6 relative">
              <div className="absolute -left-3 top-1 w-3 h-3 bg-blue-600 rounded-full"></div>
              <p className="font-semibold">
                {sch.time} — {sch.title}
              </p>
              {sch.description && (
                <p className="text-zinc-500">{sch.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Speakers */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Speakers</h2>
        </div>

        {!event.speakers || event.speakers.length === 0 ? (
          <p className="text-sm text-zinc-500 mt-2">No speakers yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {event.speakers.map((sp) => (
              <div
                key={sp.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={sp.imageUrl || "/placeholder.png"}
                  alt={sp.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-semibold">{sp.name}</p>
                  <p className="text-sm text-zinc-500">{sp.bio}</p>
                </div>

                <div className="flex flex-row sm:flex-col gap-2">
                  <button
                    onClick={() => onEdit(sp)}
                    className="text-blue-600 text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteRequest(sp.id!)}
                    className="text-red-500 text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {openAdd && (
        <AddSpeakerModal
          event={event}
          close={() => setOpenAdd(false)}
          onSaved={onSpeakerSaved}
        />
      )}

      {openEdit && editingSpeaker && (
        <EditSpeakerModal
          event={event}
          speaker={editingSpeaker}
          close={() => {
            setOpenEdit(false);
            setEditingSpeaker(null);
          }}
          onSaved={onSpeakerSaved}
        />
      )}

      {showDelete && deleteSpeakerId && (
        <ConfirmDeleteModal
          title="Delete this speaker?"
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDeleteSpeaker}
        />
      )}
    </div>
  );
}
