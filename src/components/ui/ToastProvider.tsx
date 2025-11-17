// /components/ui/ToastProvider.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type Toast = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

const ToastContext = createContext<
  { toast: (type: Toast["type"], message: string) => void } | undefined
>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: Toast["type"], message: string) => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}`;
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-xs px-4 py-2 rounded shadow-md text-sm ${
              t.type === "success"
                ? "bg-green-600 text-white"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-white"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
 