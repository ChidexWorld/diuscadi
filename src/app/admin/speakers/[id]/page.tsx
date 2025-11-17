"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAllEvents } from "@/services/eventService";
import {
  updateSpeakerInEvent,
  getSpeakersByEvent,
} from "@/services/speakerService";
import { uploadFile } from "@/services/uploadService";

export default function EditSpeakerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
  const [speaker, setSpeaker] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const evts = await getAllEvents();
      setEvents(evts);
      // find speaker by looping events
      for (const evt of evts) {
        const speakers = await getSpeakersByEvent(evt.id);
        const found = speakers.find((s) => s.id === id);
        if (found) {
          setEventId(evt.id);
          setSpeaker(found);
          break;
        }
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSave = async () => {
    if (!eventId || !speaker) return;
    let pictureUrl = speaker.pictureUrl;
    if (file) pictureUrl = await uploadFile(file, "speakers", "image");

    await updateSpeakerInEvent(eventId, id as string, {
      ...speaker,
      pictureUrl,
    });
    alert("Speaker updated!");
    router.push("/dashboard/speakers");
  };

  if (loading) return <p className="p-6">Loading speaker...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary mb-4">Edit Speaker</h1>

      <select
        value={eventId}
        disabled
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="">Select Event</option>
        {events.map((evt) => (
          <option key={evt.id} value={evt.id}>
            {evt.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="border p-2 w-full mb-3 rounded"
        value={speaker.name}
        onChange={(e) => setSpeaker({ ...speaker, name: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mb-3 rounded"
        value={speaker.description}
        onChange={(e) =>
          setSpeaker({ ...speaker, description: e.target.value })
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
