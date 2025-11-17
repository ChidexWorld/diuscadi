"use client";

import { MediaItem } from "@/types";
import Image from "next/image";

interface Props {
  item: MediaItem | null;
  close: () => void;
  onDelete: (id: string) => void;
}

export default function MediaPreviewModal({ item, close, onDelete }: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-9    max-w-3xl w-full relative">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-black text-lg font-bold"
        >
          ✕
        </button>

        {/* Full preview */}
        <div className="flex justify-center">
          {item.type === "image" ? (
            <Image
              src={item.url}
              alt="Full preview"
              width={1000}
              height={600}
              className="rounded-lg max-h-[70vh] object-contain"
            />
          ) : (
            <video
              src={item.url}
              controls
              className="rounded-lg max-h-[70vh]"
            />
          )}
        </div>

        {/* Delete button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onDelete(item.id!)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete Media
          </button>
        </div>
      </div>
    </div>
  );
}
