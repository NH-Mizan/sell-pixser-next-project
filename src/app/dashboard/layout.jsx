"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUser,
  FaShoppingCart,
  FaCog,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem href="/dashboard" icon={<FaTachometerAlt />} label="Overview" />
          <NavItem href="/dashboard/profile" icon={<FaUser />} label="Profile" />
          <NavItem href="/dashboard/orders" icon={<FaShoppingCart />} label="Orders" />
          
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <div className="flex items-center gap-4">
            <FaBell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 text-gray-700"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
