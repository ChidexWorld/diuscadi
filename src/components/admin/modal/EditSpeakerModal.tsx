// /components/modals/EditSpeakerModal.tsx
"use client";

import { useState } from "react";
import { EventForm, Speaker } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/ToastProvider";
import { logActivity } from "@/utils/logActivity";

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
  const { toast } = useToast();

  const [name, setName] = useState(speaker.name || "");
  const [bio, setBio] = useState(speaker.bio || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    speaker.imageUrl || null
  );

  const [saving, setSaving] = useState(false);

  const uploadToServer = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Failed to upload image");
    }

    return data.url as string;
  };

  const handleSave = async () => {
    if (!event.id || !speaker.id) return;
    setSaving(true);

    try {
      let imageUrl = speaker.imageUrl;

      if (file) {
        imageUrl = await uploadToServer(file);
      }

      const updatedSpeakers = (event.speakers || []).map((s) =>
        s.id === speaker.id ? { ...s, name, bio, imageUrl } : s
      );

      await updateDoc(doc(db, "events", event.id), {
        speakers: updatedSpeakers,
      });

      // ✅ ACTIVITY LOG (matching your exact API)
      await logActivity(
        "Speaker updated",
        `Speaker "${name}" was updated for event "${event.title}"`
      );

      toast("success", "Speaker updated successfully");
      onSaved?.();
      close();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update speaker";
      toast("error", errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (file?: File | null) => {
    if (!file) {
      setFile(null);
      return;
    }
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Speaker</h2>

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 rounded-full object-cover mx-auto border"
            />
          </div>
        )}

        <label className="block mb-3">
          <span className="text-sm font-medium">Name</span>
          <input
            className="mt-1 w-full rounded-lg border p-2 outline-none focus:ring focus:ring-blue-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Speaker Name"
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium">Bio</span>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border p-2 outline-none focus:ring focus:ring-blue-200"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Speaker Bio"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Replace Photo (optional)</span>
          <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm"
            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
