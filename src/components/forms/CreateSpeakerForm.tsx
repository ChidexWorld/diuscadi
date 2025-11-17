"use client";

import { useState } from "react";
import axios from "axios";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  close: () => void;
  events: unknown[];
}

export default function CreateSpeakerForm({ close, events }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    eventId: "",
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_PRESET");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
      formData
    );

    setForm((prev) => ({ ...prev, imageUrl: res.data.secure_url }));
  };

  const createSpeaker = async () => {
    await addDoc(collection(db, "speakers"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="font-bold text-xl mb-4">Add Speaker</h2>

        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="input mt-3"
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="input mt-3"
          onChange={(e) => setForm({ ...form, eventId: e.target.value })}
        >
          <option>Select Event</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>

        <input
          className="input mt-3"
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files![0])}
        />

        {form.imageUrl && (
          <img src={form.imageUrl} className="w-24 h-24 mt-3 rounded-lg" />
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close}>Cancel</button>
          <button
            onClick={createSpeaker}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Save Speaker
          </button>
        </div>
      </div>
    </div>
  );
}
