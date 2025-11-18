"use client";

import Sidebar from "@/components/admin/layout/Sidebar";
import { auth } from "@/config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const router = useRouter();

  // AUTH GUARD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login"); // redirect if not logged in
      } else {
        setAllowed(true);
      }
      setChecking(false);
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  // Loading gate while checking auth
  if (checking) {
    return (
      <div className="p-10 text-center text-zinc-500">
        Checking authentication...
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        onToggleCollapse={(state) => setCollapsed(state)}
      />

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen bg-gray-50 p-6 transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
}