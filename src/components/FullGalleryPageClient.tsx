"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import FullGalleryClient from "@/components/FullGalleryClient";
import { EventForm } from "@/types";

export default function FullGalleryPageClient() {
  const { id } = useParams();
  const eventId = id as string;

  const [event, setEvent] = useState<EventForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const ref = doc(db, "events", eventId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setNotFound(true);
          return;
        }

        setEvent({ id: snap.id, ...(snap.data() as EventForm) });
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading)
    return (
      <div className="p-10 text-center text-blue-600">Loading gallery...</div>
    );

  if (notFound)
    return (
      <div className="p-10 text-center text-red-600">
        Event not found or has no gallery.
      </div>
    );
  if (!event) return null;

  return <FullGalleryClient event={event} eventId={eventId} />;
}
