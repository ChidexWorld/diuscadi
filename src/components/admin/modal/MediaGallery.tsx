"use client";

import { MediaItem } from "@/types";
import Image from "next/image";

interface Props {
  media: MediaItem[];
  onPreview: (item: MediaItem) => void;
}

export default function MediaGallery({ media, onPreview }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {media.map((m, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition"
          onClick={() => onPreview(m)}
        >
          {m.type === "image" ? (
            <Image
              src={m.url}
              alt="Event media"
              width={800}
              height={400}
              className="w-full h-40 object-cover"
            />
          ) : (
            <video src={m.url} className="w-full h-40 object-cover bg-black" />
          )}
        </div>
      ))}
    </div>
  );
}
