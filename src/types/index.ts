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

export interface EventForm {
  id?: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  status: "scheduled" | "open" | "closed";
  schedules: ScheduleItem[];
  speakers?: Speaker[];
}
