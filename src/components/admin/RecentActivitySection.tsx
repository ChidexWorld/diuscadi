"use client";

import { useEffect, useState } from "react";
import ActivityItem from "../ui/ActivityItem";
import { db } from "@/config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export interface Activity {
  action: string;
  detail: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function RecentActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Activity);
      setActivities(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Convert timestamp
  const timeAgo = (timestamp?: { seconds: number }) => {
    if (!timestamp) return "Just now";
    const diffMs = Date.now() - timestamp.seconds * 1000;
    const diffH = diffMs / (1000 * 60 * 60);

    if (diffH < 1) return `${Math.floor(diffH * 60)} min ago`;
    if (diffH < 24) return `${Math.floor(diffH)} hours ago`;
    return `${Math.floor(diffH / 24)} days ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4">
        Recent Activity
      </h2>

      {/* EMPTY STATE */}
      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-zinc-500">No activity done yet</p>
      ) : (
        <div className="space-y-4">
          {activities.map((a, i) => (
            <ActivityItem
              key={i}
              action={a.action}
              detail={a.detail}
              time={timeAgo(a.createdAt)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
