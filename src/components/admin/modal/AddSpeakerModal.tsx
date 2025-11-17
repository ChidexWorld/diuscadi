"use client";

import { useState } from "react";
import { EventForm, Speaker } from "@/types";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/ToastProvider";
import { X } from "lucide-react";

interface Props {
  event: EventForm;
  close: () => void;
  onSaved?: () => void;
}

export default function AddSpeakerModal({ event, close, onSaved }: Props) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

 const uploadToCloudinary = async (file: File) => {
   const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
   const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

   if (!CLOUD_NAME) {
     throw new Error("Cloudinary cloud name missing — check .env.local");
   }

   if (!UPLOAD_PRESET) {
     throw new Error("Cloudinary upload preset missing — check .env.local");
   }

   const fd = new FormData();
   fd.append("file", file);
   fd.append("upload_preset", UPLOAD_PRESET);

   const res = await fetch(
     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
     { method: "POST", body: fd }
   );

   const data = await res.json();

   if (!res.ok) throw new Error(data.error?.message || "Upload failed");
   return data.secure_url as string;
 };


  const handleSave = async () => {
    if (!name.trim()) {
      toast("error", "Please enter speaker name");
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | undefined = undefined;
      if (file) imageUrl = await uploadToCloudinary(file);

      const speaker: Speaker = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        name: name.trim(),
        bio: bio.trim(),
        imageUrl,
      };

      const ref = doc(db, "events", event.id!);
      await updateDoc(ref, {
        speakers: arrayUnion(speaker),
      });

      toast("success", "Speaker added");
      onSaved?.();
      close();
    } catch (err) {
      console.error(err);
      toast(
        "error",
        err instanceof Error ? err.message : "Failed to add speaker"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Add Speaker</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Speaker Name
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter speaker name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Speaker Photo
            </label>

            <div className="border-2 border-dashed rounded-xl p-5 text-center hover:bg-gray-50 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                id="speaker-upload"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />

              {!file ? (
                <label
                  htmlFor="speaker-upload"
                  className="text-gray-600 cursor-pointer"
                >
                  Click to upload or drag a file here
                </label>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <p className="text-sm text-gray-700">{file.name}</p>
                  <button
                    className="text-xs text-red-500"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Add Speaker"}
          </button>
        </div>
      </div>
    </div>
  );
}
