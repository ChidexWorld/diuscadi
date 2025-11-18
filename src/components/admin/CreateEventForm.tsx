// /components/admin/CreateEventForm.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useToast } from "@/components/ui/ToastProvider";
import { logActivity } from "@/utils/logActivity";
import { auth } from "@/config/firebase";

/**
 * Zod schema for validation
 */
const ScheduleSchema = z.object({
  id: z.string().optional(),
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Schedule title is required"),
  description: z.string().optional(),
});

const EventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (val) => {
        const selected = new Date(val).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: "Date cannot be in the past" }
    ),
  startTime: z.string().min(1, "Start time required"),
  endTime: z.string().min(1, "End time required"),
  totalSeats: z.number().min(1, "Total seats must be at least 1"),
  schedules: z.array(ScheduleSchema).optional(),
});

type FormValues = z.infer<typeof EventSchema>;

type Props = {
  close: () => void;
  onSaved: () => Promise<void>;
};

export default function CreateEventForm({ close, onSaved }: Props) {
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      totalSeats: 200, // default

      schedules: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const addSchedule = () =>
    append({
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      time: "",
      title: "",
      description: "",
    });

  const onSubmit = async (values: FormValues) => {
    try {
      // 1️⃣ Get all existing events
      const eventsSnapshot = await getDocs(collection(db, "events"));

      // 2️⃣ Loop through and deactivate all
      const updatePromises = eventsSnapshot.docs.map((docSnap) =>
        updateDoc(docSnap.ref, { isActive: false })
      );

      await Promise.all(updatePromises);

      // 3️⃣ Create the new event as active
      await addDoc(collection(db, "events"), {
        ...values,
        totalSeats: values.totalSeats,
        seatsTaken: 0,
        isActive: true, // new event is the only active one
        createdAt: serverTimestamp(),
      });

      // 4️⃣ Log
      const user = auth.currentUser;
      await logActivity("New event created", values.title, user?.uid);

      toast("success", "Event created successfully");

      await onSaved();
      close();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create event";
      toast("error", message);
      console.error("Create event error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={() => {
          if (!isSubmitting) close();
        }}
      />

      {/* modal */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-4">Create Event</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium block mb-1">Title</label>
            <input
              className="input w-full"
              {...register("title")}
              placeholder="Event title"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Description
            </label>
            <textarea
              className="input w-full"
              {...register("description")}
              placeholder="Short description"
              disabled={isSubmitting}
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium block mb-1">Date</label>
            <input
              className="input w-full"
              type="date"
              {...register("date")}
              disabled={isSubmitting}
            />
            {errors.date && (
              <p className="text-xs text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">
                Start Time
              </label>
              <input
                className="input w-full"
                type="time"
                {...register("startTime")}
                disabled={isSubmitting}
              />
              {errors.startTime && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">End Time</label>
              <input
                className="input w-full"
                type="time"
                {...register("endTime")}
                disabled={isSubmitting}
              />
              {errors.endTime && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Total Seats */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Total Seats
            </label>
            <input
              type="number"
              className="input w-full"
              {...register("totalSeats", { valueAsNumber: true })}
              disabled={isSubmitting}
              placeholder="200"
            />
            {errors.totalSeats && (
              <p className="text-xs text-red-600 mt-1">
                {errors.totalSeats.message}
              </p>
            )}
          </div>

          {/* Status
          <div>
            <label className="text-sm font-medium block mb-1">Status</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <select
                  {...field}
                  className="input w-full"
                  disabled={isSubmitting}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              )}
            />
          </div> */}

          {/* Schedules */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-lg">Schedules</h3>
              <button
                type="button"
                onClick={addSchedule}
                className="px-3 py-1 bg-zinc-200 rounded text-sm"
                disabled={isSubmitting}
              >
                + Add Schedule
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-3 relative">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-red-500 text-sm cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs block mb-1">Time</label>
                      <input
                        className="input w-full"
                        {...register(`schedules.${index}.time`)}
                        placeholder="07:30"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="text-xs block mb-1">Title</label>
                      <input
                        className="input w-full"
                        {...register(`schedules.${index}.title`)}
                        placeholder="Opening remarks"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-xs block mb-1">Description</label>
                    <textarea
                      className="input w-full"
                      {...register(`schedules.${index}.description`)}
                      placeholder="Optional description"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2"
              onClick={() => close()}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg text-white transition-all duration-300 active:scale-95
    ${
      isSubmitting
        ? "bg-slate-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/30"
    }`}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
