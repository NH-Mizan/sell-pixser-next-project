'use client';
export default function Overview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value="1,245" />
        <StatCard title="Pending Orders" value="32" />
        <StatCard title="Revenue" value="$12,450" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-indigo-600">{value}</h3>
    </div>
  );
}
