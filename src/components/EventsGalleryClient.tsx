"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm, MediaItem } from "@/types";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

function EventGalleryCard({ event }: { event: EventForm }) {
  const media = event.media ?? [];

const images = media
  .filter((m) => m.type === "image")
  .sort((a, b) => b.createdAt - a.createdAt)
  .slice(0, 3);

const videos = media
  .filter((m) => m.type === "video")
  .sort((a, b) => b.createdAt - a.createdAt)
  .slice(0, 3);


  const hasMore = media.length > 6; // show VIEW ALL if true

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">{event.title}</h2>

        {hasMore && (
          <Link 
            href={`/gallery/${event.id}`}
            className="text-blue-700 font-medium hover:text-purple-600 transition"
          >
            View All →
          </Link>
        )}
      </div>

      {/* IMAGES SECTION */}
      {images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.slice(0, 6).map((item) => (
              <GalleryItem key={item.id} media={item} />
            ))}
          </div>
        </div>
      )}

      {/* VIDEOS SECTION */}
      {videos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.slice(0, 6).map((item) => (
              <GalleryItem key={item.id} media={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryItem({ media }: { media: MediaItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
    >
      {/* Image */}
      {media.type === "image" && (
        <picture>
          <source srcSet={media.url} type="image/webp" />
          <img
            src={media.url}
            alt="Event media"
            className="w-full h-56 object-cover group-hover:brightness-75 transition"
          />
        </picture>
      )}

      {/* Video */}
      {media.type === "video" && (
        <div className="relative">
          <video
            src={media.url}
            className="w-full h-56 object-cover brightness-75 group-hover:brightness-50 transition"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="text-white w-12 h-12 opacity-80" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function GallerySkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="h-10 w-48 mx-auto bg-blue-100 animate-pulse rounded-xl mb-10"></div>

      <div className="flex flex-col gap-16">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow animate-pulse"
          >
            <div className="h-6 w-40 bg-blue-100 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="h-56 bg-blue-50 rounded-xl"></div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventsGalleryClient() {
  const [events, setEvents] = useState<EventForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!navigator.onLine) {
          setOffline(true);
          return;
        }

        const snapshot = await getDocs(collection(db, "events"));
        const data: EventForm[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as EventForm),
        }));

        const withGallery = data.filter(
          (event) => event.media && event.media.length > 0
        );

        setEvents(withGallery);
      } catch {
        setError("Failed to load events gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (offline) {
    return (
      <div className="text-center py-20 text-blue-700 font-semibold">
        You are offline. Please reconnect to view galleries.
      </div>
    );
  }

  if (loading) return <GallerySkeleton />;
  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 pt-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
        Events Gallery
      </h1>

      <div className="flex flex-col gap-16">
        {events.map((event) => (
          <EventGalleryCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
