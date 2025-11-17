"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  CalendarDays,
  LayoutGrid,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  onLogout,
  onToggleCollapse,
}: {
  onLogout: () => void;
  onToggleCollapse: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Notify dashboard layout when collapsed/expanded
  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      onToggleCollapse(next);
      return next;
    });
  };

  // Add `exact: true` for links that should match only exactly (no nested routes)
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutGrid className="h-5 w-5" />,
      match: "/admin",
      exact: true, // <-- only active when pathname === "/admin"
    },
    {
      label: "Events",
      href: "/admin/events",
      icon: <CalendarDays className="h-5 w-5" />,
      match: "/admin/events",
      exact: false, // <-- active for "/admin/events" and nested routes
    },
  ];

  const isActive = (match: string, exact?: boolean) => {
    if (!pathname) return false;
    if (exact) return pathname === match;
    return pathname === match || pathname.startsWith(match + "/");
  };

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        aria-label="Open menu"
      >
        <Menu />
      </button>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-50 
          transition-all duration-300

          /* widths */
          ${mobileOpen ? "w-64" : ""}
          ${collapsed ? "md:w-20" : "md:w-64"}

          /* mobile slide */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-5 relative">
          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex absolute -right-3 top-10 bg-white shadow p-1 rounded-full border"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>

          {/* LOGO / TITLE */}
          {!collapsed && (
            <h1 className="text-2xl font-semibold mb-8 transition-opacity duration-300">
              Admin Panel
            </h1>
          )}

          {/* NAVIGATION */}
          <nav className="space-y-2 flex-1" aria-label="Main navigation">
            {links.map((item) => {
              const active = isActive(item.match, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 py-2.5 px-3 rounded-lg transition group
                    ${
                      active
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className={`
              flex items-center gap-3 py-2.5 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition
            `}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
