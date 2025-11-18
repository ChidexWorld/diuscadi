// /types/index.ts

export type ScheduleItem = {
  id?: string;
  time: string;
  title: string;
  description?: string;
};

export type Speaker = {
  id?: string;
  name: string;
  bio?: string;
  imageUrl?: string;
};

export type MediaItem = {
  id?: string;
  url: string;
  type: "image" | "video";
  createdAt: number; // Added createdAt property
};

export interface EventForm {
  id?: string;
  title: string;
  description: string;

  startTime: string;
  endTime: string;
  date: string;

  totalSeats: number;
  seatsTaken: number;
  isActive?: boolean;

  // status: "scheduled" | "open" | "closed";

  schedules: ScheduleItem[];
  speakers?: Speaker[];

  /** ✅ Required for Media upload */
  media?: MediaItem[];
}

export interface activities {
  id: string; // auto or custom
  action: string; // "Event created"
  detail: string; // "Tech Conference"
  createdAt: number; // timestamp (Date.now())
  meta?: { eventId?: string; speakerId?: string; mediaId?: string }; // optional eventId, speakerId, mediaId...
}
