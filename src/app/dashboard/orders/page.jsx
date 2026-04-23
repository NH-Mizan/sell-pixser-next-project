"use client";

const sampleOrders = [
  { id: "SPX-1001", item: "Premium Hoodie", status: "Delivered", amount: "Tk 2,450" },
  { id: "SPX-1002", item: "Running Shoes", status: "Processing", amount: "Tk 4,900" },
  { id: "SPX-1003", item: "Smart Watch", status: "Pending", amount: "Tk 6,300" },
];

export default function OrdersPage() {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pry">
          Orders
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Recent orders</h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-slate-600">Order ID</th>
              <th className="px-5 py-4 text-left font-semibold text-slate-600">Item</th>
              <th className="px-5 py-4 text-left font-semibold text-slate-600">Status</th>
              <th className="px-5 py-4 text-right font-semibold text-slate-600">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sampleOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 font-semibold text-slate-900">{order.id}</td>
                <td className="px-5 py-4 text-slate-600">{order.item}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
