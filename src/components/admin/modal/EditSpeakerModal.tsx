// /components/modals/EditSpeakerModal.tsx
"use client";

import { useState } from "react";
import { EventForm, Speaker } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/ToastProvider";

interface Props {
  event: EventForm;
  speaker: Speaker;
  close: () => void;
  onSaved?: () => void;
}

export default function EditSpeakerModal({
  event,
  speaker,
  close,
  onSaved,
}: Props) {
  const [name, setName] = useState(speaker.name || "");
  const [bio, setBio] = useState(speaker.bio || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
const { toast } = useToast();

  const uploadToServer = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Upload failed");
    return data.url as string;
  };

  const handleSave = async () => {
    if (!event.id || !speaker.id) return;
    setLoading(true);
    try {
      let imageUrl = speaker.imageUrl;
      if (file) {
        imageUrl = await uploadToServer(file);
      }

      // replace speaker in array
      const updatedSpeakers = (event.speakers || []).map((s) =>
        s.id === speaker.id
          ? { ...s, name: name.trim(), bio: bio.trim(), imageUrl }
          : s
      );

      const ref = doc(db, "events", event.id);
      await updateDoc(ref, { speakers: updatedSpeakers });

      toast("success", "Speaker updated");
      onSaved?.();
      close();
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Failed to update speaker";
      toast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Edit Speaker</h2>

        <input
          className="input mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="input mb-3"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="block mb-3">
          <span className="text-sm text-zinc-700">
            Replace Photo (optional)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-2"
          />
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={close} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
