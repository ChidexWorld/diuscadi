"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { Member } from "@/types";

type DateValue =
  | { seconds: number; nanoseconds?: number }
  | string
  | number
  | Date
  | null
  | undefined;

export default function AdminEventMembersClient({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle?: string;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Member | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    const col = collection(db, "members");
    // listen in realtime to members for this event, newest first
    const q = query(
      col,
      where("eventId", "==", eventId),
      orderBy("registeredAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data: Member[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Member, "id">),
        }));
        setMembers(data);
        setLoading(false);
        setPage(1);
      },
      (err) => {
        console.error("Members listener error", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [eventId]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return members;
    return members.filter((m) => {
      return (
        (m.firstName || "").toLowerCase().includes(s) ||
        (m.lastName || "").toLowerCase().includes(s) ||
        (m.email || "").toLowerCase().includes(s) ||
        (m.regNumber || "").toLowerCase().includes(s) ||
        (m.whatsapp || "").toLowerCase().includes(s)
      );
    });
  }, [members, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  function formatDate(val: DateValue) {
    if (!val) return "-";

    if (val instanceof Date) return val.toLocaleString();
    if (typeof val === "string" || typeof val === "number")
      return new Date(val).toLocaleString();

    // firebase timestamp-like object
    if (typeof val === "object" && "seconds" in val) {
      const d = new Date(
        val.seconds * 1000 + (val.nanoseconds ?? 0) / 1_000_000
      );
      return d.toLocaleString();
    }

    return "-";
  }

  function exportCSV(list: Member[]) {
    const header = [
      "id",
      "firstName",
      "lastName",
      "email",
      "regNumber",
      "course",
      "department",
      "faculty",
      "level",
      "whatsapp",
      "university",
      "registeredAt",
    ];
    const rows = list.map((m) => [
      m.id,
      m.firstName || "",
      m.lastName || "",
      m.email || "",
      m.regNumber || "",
      m.course || "",
      m.department || "",
      m.faculty || "",
      m.level || "",
      m.whatsapp || "",
      m.university || "",
      formatDate(m.registeredAt),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventTitle || eventId}-members.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
              Registered Members
            </h1>
            {eventTitle && (
              <p className="text-sm text-slate-500">
                Event: <span className="font-medium">{eventTitle}</span>
              </p>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or reg no..."
                className="w-full md:w-72 px-4 py-2 rounded-lg border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              />
              <button
                onClick={() => {
                  setSearch("");
                }}
                aria-label="clear search"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <button
              onClick={() => exportCSV(filtered)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Export CSV
            </button>

            <div className="text-sm text-slate-600">
              {filtered.length} total
            </div>
          </div>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg overflow-hidden">
          {/* table for md+, cards for mobile */}
          <div className="hidden md:block">
            <table className="w-full table-auto">
              <thead className="bg-slate-50 border-b">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Reg No</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Registered At</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      Loading members...
                    </td>
                  </tr>
                ) : pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No members found.
                    </td>
                  </tr>
                ) : (
                  pageData.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">
                          {m.firstName} {m.lastName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {m.faculty || "-"} • {m.department || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {m.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {m.regNumber || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">{m.course || "-"}</td>
                      <td className="px-6 py-4 text-sm">{m.level || "-"}</td>
                      <td className="px-6 py-4 text-sm">
                        {formatDate(m.registeredAt)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelected(m)}
                          className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* mobile list */}
          <div className="md:hidden">
            {loading ? (
              <div className="p-6 text-center text-slate-500">
                Loading members...
              </div>
            ) : pageData.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No members found.
              </div>
            ) : (
              <div className="space-y-3 p-4">
                {pageData.map((m) => (
                  <article
                    key={m.id}
                    className="bg-white border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {m.firstName} {m.lastName}
                        </h3>
                        <p className="text-sm text-slate-500">{m.email}</p>
                        <p className="text-sm text-slate-500">
                          {m.course || "-"} • {m.level || "-"}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">
                          {formatDate(m.registeredAt)}
                        </div>
                        <button
                          onClick={() => setSelected(m)}
                          className="mt-2 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* pagination footer */}
          <div className="border-t px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {(page - 1) * pageSize + 1} -{" "}
              {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border disabled:opacity-40"
              >
                Previous
              </button>
              <div className="text-sm">
                Page {page} / {pageCount}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="px-3 py-1 rounded border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* details modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelected(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p className="text-sm text-slate-500">{selected.email}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Registration ID</div>
                  <div className="font-medium">{selected.id}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Registered At</div>
                  <div className="font-medium">
                    {formatDate(selected.registeredAt)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Course</div>
                  <div className="font-medium">{selected.course || "-"}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Department</div>
                  <div className="font-medium">
                    {selected.department || "-"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Faculty</div>
                  <div className="font-medium">{selected.faculty || "-"}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">
                    Contact (WhatsApp)
                  </div>
                  <div className="font-medium">{selected.whatsapp || "-"}</div>
                </div>
                <div className="col-span-full space-y-2">
                  <div className="text-xs text-slate-400">Expectations</div>
                  <div className="font-medium text-sm">
                    {selected.expectations || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => exportCSV([selected])}
                  className="px-4 py-2 border rounded-lg"
                >
                  Export member
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
