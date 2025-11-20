"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { EventForm, MediaItem } from "@/types";

export default function FullGalleryClient({
  event,
//   eventId,
}: {
  event: EventForm;
  eventId: string;
}) {
const media = event.media ?? [];

const images = media.filter((m: MediaItem) => m.type === "image");
const videos = media.filter((m: MediaItem) => m.type === "video");


  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href={`/gallery`}
          className="text-blue-600 hover:text-purple-600 transition"
        >
          ← Back
        </Link>

        <h2 className="text-3xl font-bold text-blue-800">
          Full Gallery – {event.title}
        </h2>
      </div>

      {/* IMAGES */}
      {images.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Images</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((item: MediaItem) => (
              <div
                key={item.id}
                className="relative h-48 rounded-xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-lg transition group"
              >
                <Image
                  src={item.url}
                  alt="Event Image"
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIDEOS */}
      {videos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Videos</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((item: MediaItem) => (
              <div
                key={item.id}
                className="relative h-48 rounded-xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-lg transition group"
              >
                <video
                  src={item.url}
                  className="object-cover w-full h-full group-hover:scale-105 transition"
                  controls
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY */}
      {media.length === 0 && (
        <p className="text-gray-500 text-center text-lg mt-10">
          No media uploaded for this event.
        </p>
      )}
    </div>
  );
}
