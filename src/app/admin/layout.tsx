"use client";

import Sidebar from "@/components/admin/layout/Sidebar";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        onToggleCollapse={(state) => setCollapsed(state)}
      />

      {/* Main content */}
      <main
        className={`
          flex-1 min-h-screen bg-gray-50 p-6 transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
