import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Logs an activity to the "activities" collection in Firestore
 *
 * @param action - Short description (e.g. "New event created")
 * @param detail - Additional info (e.g. event title)
 * @param userId - Optional: who performed the action
 */
export async function logActivity(
  action: string,
  detail: string,
  userId?: string
) {
  try {
    const activitiesRef = collection(db, "activities");

    await addDoc(activitiesRef, {
      action,
      detail,
      userId: userId || null,
      createdAt: serverTimestamp(),
    });

    console.log("Activity logged successfully");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
