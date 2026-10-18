export default function AdminCommissions() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Commission Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Booking Value', value: 'Rs. 8.9M', color: 'text-blue-600 bg-blue-50' },
          { label: 'Commission Rate', value: '10%', color: 'text-violet-600 bg-violet-50' },
          { label: 'Total Commission', value: 'Rs. 890K', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Seller Earnings', value: 'Rs. 8.01M', color: 'text-amber-600 bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`text-xs font-bold px-2 py-1 rounded-lg inline-block mb-3 ${s.color}`}>{s.label}</div>
            <div className="text-2xl font-extrabold text-[#0f1f3d]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-bold text-[#0f1f3d] mb-5">Monthly Commission Revenue</h2>
        <div className="flex items-end gap-3 h-40">
          {[{ m: 'May', v: 55000 }, { m: 'Jun', v: 72000 }, { m: 'Jul', v: 60000 }, { m: 'Aug', v: 90000 }, { m: 'Sep', v: 110000 }, { m: 'Oct', v: 89000 }].map((d) => (
            <div key={d.m} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400">{(d.v / 1000).toFixed(0)}K</span>
              <div className="w-full bg-violet-500 rounded-t-lg" style={{ height: `${(d.v / 110000) * 100}%` }} />
              <span className="text-xs text-slate-400">{d.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
