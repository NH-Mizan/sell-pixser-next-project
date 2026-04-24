"use client";

import { FaPrint } from "react-icons/fa";

export default function InvoiceActions() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      <FaPrint />
      Print invoice
    </button>
  );
}
