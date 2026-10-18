export default function Earnings() {
  const TRANSACTIONS = [
    { id: 'TXN-001', event: 'TechCorp Conference', buyer: 'Ahmed Khan', date: 'Oct 22, 2024', total: 100000, commission: 10000, net: 90000, status: 'Paid' },
    { id: 'TXN-002', event: 'Sara & Ali Wedding', buyer: 'Sara Malik', date: 'Nov 16, 2024', total: 60000, commission: 6000, net: 54000, status: 'Pending' },
    { id: 'TXN-003', event: 'Birthday Bash', buyer: 'Ali Hassan', date: 'Sep 10, 2024', total: 20000, commission: 2000, net: 18000, status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Earnings</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings', value: 'Rs. 162,000', sub: 'All time', color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Pending', value: 'Rs. 54,000', sub: 'Awaiting', color: 'bg-amber-50 text-amber-700' },
          { label: 'Net Earnings', value: 'Rs. 108,000', sub: 'After commission', color: 'bg-blue-50 text-blue-700' },
          { label: 'Commission Paid', value: 'Rs. 18,000', sub: '10% of total', color: 'bg-violet-50 text-violet-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`text-xs font-bold mb-3 px-2 py-1 rounded-lg inline-block ${s.color}`}>{s.label}</div>
            <div className="text-xl font-extrabold text-[#0f1f3d]">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Commission example */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-bold text-[#0f1f3d] mb-4">Commission Structure</h2>
        <div className="bg-slate-50 rounded-xl p-4 grid sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-extrabold text-[#0f1f3d]">Rs. 100,000</div>
            <div className="text-sm text-slate-500 mt-1">Booking Value</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-red-500">− Rs. 10,000</div>
            <div className="text-sm text-slate-500 mt-1">EventHub Commission (10%)</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-500">Rs. 90,000</div>
            <div className="text-sm text-slate-500 mt-1">Your Earnings</div>
          </div>
        </div>
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-extrabold text-[#0f1f3d]">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Event', 'Buyer', 'Date', 'Total', 'Commission', 'Net', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{t.id}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#0f1f3d]">{t.event}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{t.buyer}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{t.date}</td>
                  <td className="px-5 py-4 text-sm font-semibold">Rs. {t.total.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-red-500 font-semibold">− Rs. {t.commission.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-emerald-600 font-bold">Rs. {t.net.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{t.status}</span>
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
