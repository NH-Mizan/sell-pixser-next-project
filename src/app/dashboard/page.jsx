"use client";

import { useAuthSession } from "@/components/Auth/AuthSessionProvider";

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h3 className={`mt-3 text-3xl font-bold ${accent}`}>{value}</h3>
    </div>
  );
}

export default function DashboardOverviewPage() {
  const user = useAuthSession();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pry">
          Overview
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Hello, {user?.name || "Customer"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Your account is protected with OTP-based authentication and a secure
          session cookie. This dashboard stays server-verified before it renders.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="Account Status" value="Authenticated" accent="text-emerald-600" />
        <StatCard label="Primary Phone" value={user?.phone || "Not set"} accent="text-slate-900" />
        <StatCard label="Session Type" value="HTTP-only Cookie" accent="text-sky-600" />
      </section>
    </div>
  );
}
