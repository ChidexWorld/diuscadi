"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "@/services/eventService";
import { addSpeakerToEvent } from "@/services/speakerService";
import { uploadFile } from "@/services/uploadService";
import { useRouter } from "next/navigation";

export default function NewSpeakerPage() {
  const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const evts = await getAllEvents();
      setEvents(evts);
    })();
  }, []);

  const handleSubmit = async () => {
    if (!eventId) return alert("Please select an event");
    setLoading(true);

    let pictureUrl = "";
    if (file) pictureUrl = await uploadFile(file, "speakers", "image");

    await addSpeakerToEvent(eventId, { name, description, pictureUrl });
    alert("Speaker added successfully!");
    router.push("/dashboard/speakers");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary mb-4">Add Speaker</h1>

      <select
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
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
        placeholder="Speaker Name"
        className="border p-2 w-full mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Speaker Description"
        className="border p-2 w-full mb-3 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Add Speaker"}
      </button>
    </div>
  );
}
