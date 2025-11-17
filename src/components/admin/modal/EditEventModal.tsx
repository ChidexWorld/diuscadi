// /components/modals/EditEventModal.tsx
"use client";

import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm, ScheduleItem } from "@/types";

interface Props {
  event: EventForm;
  close: () => void;
  onSaved?: () => void;
}

export default function EditEventModal({ event, close, onSaved }: Props) {
  const [form, setForm] = useState<EventForm>(event);

  const updateSchedule = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    const updated = [...form.schedules];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, schedules: updated });
  };

  const addSchedule = () =>
    setForm((prev) => ({
      ...prev,
      schedules: [...prev.schedules, { time: "", title: "", description: "" }],
    }));

  const removeSchedule = (index: number) => {
    setForm((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const saveChanges = async () => {
    if (!event.id) return;
    const ref = doc(db, "events", event.id);
    await updateDoc(ref, {
      title: form.title,
      description: form.description,
      startTime: form.startTime,
      endTime: form.endTime,
      status: form.status,
      schedules: form.schedules,
      speakers: form.speakers || [],
      updatedAt: serverTimestamp(),
    });
    onSaved?.();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

        <input
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />

        <textarea
          className="input mt-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            className="input"
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
          <input
            className="input"
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>

        <select
          className="input mt-3"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as EventForm["status"] })
          }
        >
          <option value="scheduled">Scheduled</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <h3 className="font-medium text-lg mt-4 mb-2">Schedules</h3>

        {form.schedules.map((sch, idx) => (
          <div key={idx} className="border p-3 rounded-lg mb-3 relative">
            <button
              onClick={() => removeSchedule(idx)}
              className="absolute top-2 right-2 text-red-500 text-sm cursor-pointer"
            >
              Remove
            </button>

            <input
              className="input mb-2"
              value={sch.time}
              placeholder="Time"
              onChange={(e) => updateSchedule(idx, "time", e.target.value)}
            />
            <input
              className="input mb-2"
              value={sch.title}
              placeholder="Title"
              onChange={(e) => updateSchedule(idx, "title", e.target.value)}
            />
            <textarea
              className="input"
              value={sch.description}
              placeholder="Description"
              onChange={(e) =>
                updateSchedule(idx, "description", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={addSchedule}
          className="px-3 py-2 mt-2 bg-zinc-200 rounded-lg"
        >
          + Add Schedule
        </button>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
