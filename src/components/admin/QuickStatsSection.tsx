"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import StatCard from "../ui/StatCard";

export interface Stat {
  label: string;
  value: string | number;
  change?: string;
}

export default function QuickStatsSection() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [membersCount, setMembersCount] = useState("—"); // until implemented todo 
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);

    try {
      const eventsSnap = await getDocs(collection(db, "events"));
      const events = eventsSnap.docs.map((d) => d.data());

      const eventCount = events.length;

      // Sum all speakers
      const speakerCount = events.reduce((acc: number, ev: { speakers?: { length: number }[] }) => {
        return acc + (ev.speakers ? ev.speakers.length : 0);
      }, 0);

      setTotalEvents(eventCount);
      setTotalSpeakers(speakerCount);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const stats: Stat[] = [
    {
      label: "Total Events",
      value: loading ? "…" : totalEvents,
      change: "",
    },
    {
      label: "Active Speakers",
      value: loading ? "…" : totalSpeakers,
      change: "",
    },
    {
      label: "Members Registered",
      value: membersCount, // placeholder
      change: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  );
}
