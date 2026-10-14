const BOOKINGS = [
  { id: 'BK-001', buyer: 'Ahmed Khan', seller: 'Lens & Light Studio', service: 'Photography', event: 'TechCorp Conference', amount: 45000, commission: 4500, date: 'Oct 20, 2024', status: 'Confirmed' },
  { id: 'BK-002', buyer: 'Sara Malik', seller: 'Bloom & Décor', service: 'Decoration', event: 'Sara & Ali Wedding', amount: 28000, commission: 2800, date: 'Nov 15, 2024', status: 'Pending Payment' },
  { id: 'BK-003', buyer: 'Ali Hassan', seller: 'Grand Feast Co.', service: 'Catering', event: 'Birthday Bash', amount: 15000, commission: 1500, date: 'Oct 30, 2024', status: 'Completed' },
];

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Bookings Management</h1>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Buyer', 'Seller', 'Service', 'Event', 'Amount', 'Commission', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-4 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => (
                <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-xs font-bold text-slate-400">{b.id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#0f1f3d]">{b.buyer}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{b.seller}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{b.service}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{b.event}</td>
                  <td className="px-4 py-4 text-sm font-semibold">Rs. {b.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-emerald-600 font-semibold">Rs. {b.commission.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : b.status === 'Pending Payment' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
