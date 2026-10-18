const PAYMENTS = [
  { id: 'TXN-001', booking: 'BK-001', buyer: 'Ahmed Khan', seller: 'Lens & Light Studio', amount: 13500, method: 'Card', status: 'Successful', date: 'Oct 1, 2024' },
  { id: 'TXN-002', booking: 'BK-002', buyer: 'Sara Malik', seller: 'Bloom & Décor', amount: 8400, method: 'JazzCash', status: 'Successful', date: 'Oct 5, 2024' },
  { id: 'TXN-003', booking: 'BK-003', buyer: 'Ali Hassan', seller: 'Grand Feast Co.', amount: 4500, method: 'EasyPaisa', status: 'Failed', date: 'Oct 7, 2024' },
];

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Payments</h1>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['Transaction', 'Booking', 'Buyer', 'Seller', 'Amount', 'Method', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{p.id}</td>
                  <td className="px-5 py-4 text-xs font-bold text-[#4f8ef7]">{p.booking}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#0f1f3d]">{p.buyer}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.seller}</td>
                  <td className="px-5 py-4 text-sm font-bold">Rs. {p.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.method}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.status === 'Successful' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
