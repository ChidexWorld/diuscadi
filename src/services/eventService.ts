import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { EventItem } from "@/types";

const eventCollection = collection(db, "events");

export const getAllEvents = async (): Promise<EventItem[]> => {
  const snapshot = await getDocs(eventCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventItem),
  }));
};

export const getEventById = async (id: string): Promise<EventItem | null> => {
  const ref = doc(db, "events", id);
  const snapshot = await getDoc(ref);
  return snapshot.exists()
    ? { id: snapshot.id, ...(snapshot.data() as EventItem) }
    : null;
};

export const createEvent = async (data: EventItem) => {
  return await addDoc(eventCollection, data);
};

export const updateEvent = async (id: string, data: Partial<EventItem>) => {
  const ref = doc(db, "events", id);
  await updateDoc(ref, data);
};

export const deleteEvent = async (id: string) => {
  const ref = doc(db, "events", id);
  await deleteDoc(ref);
};
