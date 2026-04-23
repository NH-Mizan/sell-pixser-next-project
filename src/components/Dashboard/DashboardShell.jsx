"use client";

import { apiRequest } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBars,
  FaBell,
  FaCog,
  FaShoppingCart,
  FaTachometerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: FaTachometerAlt },
  { href: "/dashboard/profile", label: "Profile", icon: FaUser },
  { href: "/dashboard/orders", label: "Orders", icon: FaShoppingCart },
  { href: "/dashboard/settings", label: "Settings", icon: FaCog },
];

export default function DashboardShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await apiRequest("/api/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/sell-pixer.webp"
                alt="SellPixser"
                width={96}
                height={48}
                className="h-auto w-24"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pry">
                  Account
                </p>
                <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
              </div>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="mb-8 rounded-3xl bg-gradient-to-br from-pink-50 to-sky-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {user?.name || "Customer"}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {user?.phone || user?.email || "Secure OTP session"}
            </p>
          </div>

          <nav className="space-y-2">
            {navigation.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="text-base" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-8 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <FaBars />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Welcome back
                  </p>
                  <h1 className="text-xl font-bold text-slate-900">
                    {user?.name || "Customer"}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600">
                  <FaBell />
                </div>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {(user?.name || "U").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user?.phone || user?.email || "Authenticated"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
