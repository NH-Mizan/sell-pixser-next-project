"use client";

import { useAuthSession } from "@/components/Auth/AuthSessionProvider";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaShieldAlt } from "react-icons/fa";

function InfoCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-3 text-slate-500">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white">
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-base font-semibold text-slate-900">{value || "Not available"}</p>
    </div>
  );
}

export default function ProfilePage() {
  const user = useAuthSession();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              {(user?.name || "U").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user?.name || "Customer"}</h2>
              <p className="text-sm text-slate-500">
                Secure OTP verified account
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Session active
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard label="Phone" value={user?.phone} icon={<FaPhone />} />
        <InfoCard label="Email" value={user?.email} icon={<FaEnvelope />} />
        <InfoCard label="Address" value={user?.address} icon={<FaMapMarkerAlt />} />
        <InfoCard label="Security" value="OTP + cookie session" icon={<FaShieldAlt />} />
      </section>
    </div>
  );
}
