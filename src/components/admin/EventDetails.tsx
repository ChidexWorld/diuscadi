"use client";

import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm, MediaItem, Speaker } from "@/types";

import { useToast } from "@/components/ui/ToastProvider";
import EditSpeakerModal from "@/components/admin/modal/EditSpeakerModal";
import AddSpeakerModal from "@/components/admin/modal/AddSpeakerModal";
import ConfirmDeleteModal from "@/components/admin/modal/ConfirmDeleteModal";
import MediaGallery from "./modal/MediaGallery";
import CreateMediaModal from "./modal/CreateMediaModal";
import Image from "next/image";
import MediaPreviewModal from "./modal/MediaPreviewModal";
import { useRouter } from "next/navigation";

interface Props {
  eventId: string;
}

export default function EventDetails({ eventId }: Props) {
  const [event, setEvent] = useState<EventForm | null | undefined>(undefined);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteSpeakerId, setDeleteSpeakerId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [openMedia, setOpenMedia] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const loadEvent = useCallback(async () => {
    const ref = doc(db, "events", eventId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      setEvent(null);
      return;
    }

    setEvent({ id: snap.id, ...(snap.data() as EventForm) });
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const onSpeakerSaved = () => loadEvent();
  const onMediaSaved = () => loadEvent();

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
    } catch {
      toast("error", "Failed to remove speaker");
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!event?.id) return;

    try {
      const updated = (event.media || []).filter((m) => m.id !== mediaId);

      await updateDoc(doc(db, "events", event.id), { media: updated });

      toast("success", "Media deleted");
      setPreviewItem(null);
      loadEvent();
    } catch {
      toast("error", "Failed to delete media");
    }
  };

  /* ----------------------- SKELETON UI ------------------------- */
  if (event === undefined)
    return (
      <div className="p-6 animate-pulse">
        <div className="w-24 mb-4">
          <div className="h-8 bg-gray-300 rounded" />
        </div>

        <div className="h-10 bg-gray-300 rounded w-1/2 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-200 rounded-lg h-24" />
          ))}
        </div>

        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );

  if (event === null) return <div className="p-6">Event not found</div>;

  /* ------------------------------------------------------------- */

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      {/* Event Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-zinc-600 mt-2">{event.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-zinc-500">Date</p>
            <p className="font-semibold">{event.date}</p>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-zinc-500">Start Time</p>
            <p className="font-semibold">{event.startTime}</p>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <p className="text-sm text-zinc-500">End Time</p>
            <p className="font-semibold">{event.endTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-zinc-500">Status: {event.status}</p>

          <button
            onClick={() => setOpenAdd(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            + Add Speaker
          </button>

          <button
            onClick={() => setOpenMedia(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            + Add Media
          </button>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Schedule</h2>
        <ul className="relative border-l border-zinc-300 mt-4 pl-6">
          {event.schedules.map((sch, i) => (
            <li key={i} className="mb-6 relative">
              <div className="absolute -left-3 top-1 w-3 h-3 bg-blue-600 rounded-full" />
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
        <h2 className="text-xl font-semibold">Speakers</h2>

        {!event.speakers || event.speakers.length === 0 ? (
          <p className="text-sm text-zinc-500 mt-2">No speakers yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {event.speakers.map((sp) => (
              <div
                key={sp.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Image
                  src={sp.imageUrl || "/placeholder.png"}
                  alt={sp.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-semibold">{sp.name}</p>
                  <p className="text-sm text-zinc-500">{sp.bio}</p>
                </div>

                <div className="flex flex-row sm:flex-col gap-2">
                  <button
                    onClick={() => onEdit(sp)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteRequest(sp.id!)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MEDIA */}
      <div className="mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Event Media</h2>
          <button
            onClick={() => setOpenMedia(true)}
            className="text-sm bg-purple-600 text-white px-3 py-2 rounded-lg"
          >
            + Add Media
          </button>
        </div>

        {!event.media || event.media.length === 0 ? (
          <p className="text-sm text-zinc-500 mt-2">No media uploaded yet.</p>
        ) : (
          <MediaGallery
            media={event.media}
            onPreview={(item) => setPreviewItem(item)}
          />
        )}
      </div>

      {/* MODALS */}
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

      {openMedia && (
        <CreateMediaModal
          event={event}
          close={() => setOpenMedia(false)}
          onSaved={onMediaSaved}
        />
      )}

      {previewItem && (
        <MediaPreviewModal
          item={previewItem}
          close={() => setPreviewItem(null)}
          onDelete={handleDeleteMedia}
        />
      )}
    </div>
  );
}
