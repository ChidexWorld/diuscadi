"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { EventForm } from "@/types";
import { useToast } from "../ui/ToastProvider";
import { useState } from "react";

const FormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  whatsapp: z.string().min(10),
  email: z.string().email(),
  gender: z.enum(["Male", "Female"]),
  university: z.string().min(2),
  department: z.string().min(2),
  faculty: z.string().min(2),
  level: z.string().min(1),
  regNumber: z.string().min(3),
  referrer: z.string().min(1),
  course: z.string().min(1),
  expectations: z.string().min(5),
});

type FormType = z.infer<typeof FormSchema>;

interface RegistrationFormProps {
  activeEvent: EventForm;
}

export default function RegistrationForm({
  activeEvent,
}: RegistrationFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true);

      const seatsLeft = activeEvent.totalSeats - activeEvent.seatsTaken;

      if (seatsLeft <= 0) {
        alert("Sorry, no seats left.");
        return;
      }

      // Save member
      await addDoc(collection(db, "members"), {
        ...data,
        eventId: activeEvent.id,
        registeredAt: new Date(),
      });

      // Update seats taken
      //   await updateDoc(doc(db, "events", activeEvent.id), {
      //     seatsTaken: activeEvent.seatsTaken + 1,
      //   });

      if (!activeEvent.id) {
        throw new Error("Event ID is missing.");
      }

      await updateDoc(doc(db, "events", activeEvent.id), {
        seatsTaken: (activeEvent.seatsTaken ?? 0) + 1,
      });

      toast("success", "Event created successfully");

      // ✅ Clear form here
      reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create event";
      toast("error", message);
      console.error("Create event error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center m-5 px-4  text-start ">
      <div className="bg-white w-full md:w-[820px] rounded-3xl shadow-lg p-8 md:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
        >
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">First Name</label>
            <input
              {...register("firstName")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Last Name</label>
            <input
              {...register("lastName")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Whatsapp */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Whatsapp Number</label>
            <input
              {...register("whatsapp")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="08012345678"
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              {...register("email")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="Male" {...register("gender")} />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Female" {...register("gender")} />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* University */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium">
              Name of your University
            </label>
            <input
              {...register("university")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="University name"
            />
            {errors.university && (
              <p className="text-red-500 text-sm mt-1">
                {errors.university.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Department</label>
            <input
              {...register("department")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Faculty */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Faculty</label>
            <input
              {...register("faculty")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.faculty && (
              <p className="text-red-500 text-sm mt-1">
                {errors.faculty.message}
              </p>
            )}
          </div>

          {/* Level */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Level In School</label>
            <select
              {...register("level")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select Level</option>
              <option value="100 Level">100 Level</option>
              <option value="200 Level">200 Level</option>
              <option value="300 Level">300 Level</option>
              <option value="400 Level">400 Level</option>
              <option value="500 Level">500 Level</option>
              <option value="600 Level">600 Level</option>
              <option value="Graduate">Graduate</option>
            </select>

            {errors.level && (
              <p className="text-red-500 text-sm mt-1">
                {errors.level.message}
              </p>
            )}
          </div>

          {/* Reg Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Reg Number</label>
            <input
              {...register("regNumber")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.regNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.regNumber.message}
              </p>
            )}
          </div>

          {/* Referrer */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium">
              How did you hear about this event?
            </label>
            <select
              {...register("referrer")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select option</option>
              <option value="friend">Friend</option>
              <option value="social media">Social Media</option>
              <option value="campus announcement">Campus Announcement</option>
            </select>
            {errors.referrer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.referrer.message}
              </p>
            )}
          </div>

          {/* Track */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium">Choose a Track</label>
            <select
              {...register("course")}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select your track</option>
              <option>Digital Marketing</option>
              <option>ICT Prospects</option>
              <option>Confectionary</option>
              <option>Solar & CCTV Installation</option>
              <option>Tailoring & Fashion Design</option>
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
          </div>

          {/* Expectations */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium">
              What are your expectations from this event?
            </label>
            <textarea
              {...register("expectations")}
              rows={4}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Write something..."
            />
            {errors.expectations && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expectations.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`
    w-full py-4 rounded-xl font-semibold text-lg text-white
    transition-all duration-200 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-md active:shadow-sm"
    }
  `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
