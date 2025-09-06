export default function Orders() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Order ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">#001</td>
            <td className="p-2">T-Shirt</td>
            <td className="p-2 text-green-600">Completed</td>
            <td className="p-2">$25</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">#002</td>
            <td className="p-2">Shoes</td>
            <td className="p-2 text-yellow-600">Pending</td>
            <td className="p-2">$80</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
