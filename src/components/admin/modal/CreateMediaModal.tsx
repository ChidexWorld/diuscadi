"use client";

import { useState } from "react";
import { EventForm, MediaItem } from "@/types";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/ToastProvider";
import Image from "next/image";

interface Props {
  event: EventForm;
  close: () => void;
  onSaved?: () => void;
}

export default function CreateMediaModal({ event, close, onSaved }: Props) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
const [preview, setPreview] = useState<(string | File)[]>([]);

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(ev.target.files || []);
    setFiles(selected);
    setPreview(selected.map((f) => URL.createObjectURL(f)));
  };

  const uploadToCloudinary = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return {
      id: crypto.randomUUID(), // 🔥 UNIQUE ID FIX
      url: data.secure_url,
      type: file.type.startsWith("video") ? "video" : "image",
      createdAt: Date.now(),
    } satisfies MediaItem;
  };

  const handleSave = async () => {
    if (!event.id) return;
    if (files.length === 0) {
      toast("error", "Please select at least one file");
      return;
    }

    setLoading(true);

    try {
      const uploaded: MediaItem[] = [];

      for (const f of files) {
        const uploadedItem = await uploadToCloudinary(f);
        uploaded.push(uploadedItem);
      }

      const finalMedia = [...(event.media || []), ...uploaded];

      await updateDoc(doc(db, "events", event.id), { media: finalMedia });

      toast("success", "Media uploaded successfully");
      onSaved?.();
      close();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      toast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Upload Images & Videos</h2>

        {/* FILE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={onFileChange}
          className="w-full mb-4"
        />

        {/* PREVIEWS */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {preview.map((file, i) => {
            const isVideo =
              typeof file === "string"
                ? file.endsWith(".mp4") || file.startsWith("blob:") // blob video fallback
                : file.type?.startsWith("video");

            const src =
              typeof file === "string" ? file : URL.createObjectURL(file);

            return (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden border h-24 flex items-center justify-center bg-black"
              >
                {isVideo ? (
                  <video
                    src={src}
                    className="h-full w-full object-cover"
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`Preview ${i}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={close} className="px-4 py-2">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {loading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
