import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Speaker } from "@/types";

export const getSpeakersByEvent = async (
  eventId: string
): Promise<Speaker[]> => {
  const snapshot = await getDocs(collection(db, `events/${eventId}/speakers`));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Speaker),
  }));
};

export const addSpeakerToEvent = async (eventId: string, speaker: Speaker) => {
  await addDoc(collection(db, `events/${eventId}/speakers`), speaker);
};

export const deleteSpeakerFromEvent = async (
  eventId: string,
  speakerId: string
) => {
  await deleteDoc(doc(db, `events/${eventId}/speakers/${speakerId}`));
};

export const updateSpeakerInEvent = async (
  eventId: string,
  speakerId: string,
  data: Partial<Speaker>
) => {
  const ref = doc(db, `events/${eventId}/speakers/${speakerId}`);
  await updateDoc(ref, data);
};
