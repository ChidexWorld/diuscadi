"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import CreateSpeakerForm from "@/components/forms/CreateSpeakerForm";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<unknown[]>([]);
  const [events, setEvents] = useState<unknown[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const sp = await getDocs(collection(db, "speakers"));
      setSpeakers(sp.docs.map((d) => ({ id: d.id, ...d.data() })));

      const ev = await getDocs(collection(db, "events"));
      setEvents(ev.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Speakers</h1>

        <button
          disabled={events.length === 0}
          onClick={() => setOpen(true)}
          className={`px-4 py-2 rounded-lg ${
            events.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white"
          }`}
        >
          {events.length === 0 ? "Create an Event First" : "Add Speaker"}
        </button>
      </div>

      {open && (
        <CreateSpeakerForm events={events} close={() => setOpen(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speakers.map((s) => (
          <div key={s.id} className="bg-white p-4 border rounded-xl">
            <img
              src={s.imageUrl}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="text-sm text-zinc-600">{s.description}</p>
            <p className="text-xs mt-1">Event: {s.eventId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
