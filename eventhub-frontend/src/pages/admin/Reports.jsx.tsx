import { useState } from 'react';

const FILTERS = ['7 Days', '30 Days', '3 Months', '1 Year'];

export default function AdminReports() {
  const [period, setPeriod] = useState('30 Days');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Reports</h1>
        <div className="flex gap-2 bg-white border border-slate-200 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setPeriod(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${period === f ? 'bg-violet-500 text-white' : 'text-slate-500 hover:text-slate-700'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'New Users', value: '1,240', sub: `in last ${period}` },
          { label: 'Events Created', value: '340', sub: `in last ${period}` },
          { label: 'Bookings', value: '520', sub: `in last ${period}` },
          { label: 'Revenue', value: 'Rs. 2.4M', sub: `in last ${period}` },
          { label: 'Commission', value: 'Rs. 240K', sub: '10% of revenue' },
          { label: 'Popular Service', value: 'Photography', sub: '35% of bookings' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="text-xl font-extrabold text-[#0f1f3d] mb-0.5">{s.value}</div>
            <div className="text-sm font-bold text-slate-600">{s.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Booking by category */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-bold text-[#0f1f3d] mb-5">Bookings by Service Category</h2>
        <div className="space-y-3">
          {[
            { cat: 'Photography', count: 182, pct: 35 },
            { cat: 'Catering', count: 130, pct: 25 },
            { cat: 'Decoration', count: 104, pct: 20 },
            { cat: 'Sound & AV', count: 62, pct: 12 },
            { cat: 'Other', count: 42, pct: 8 },
          ].map((r) => (
            <div key={r.cat} className="flex items-center gap-4">
              <div className="w-28 text-sm text-slate-600 font-medium">{r.cat}</div>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${r.pct}%` }} />
              </div>
              <div className="w-20 text-right text-sm font-semibold text-[#0f1f3d]">{r.count} <span className="text-slate-400 font-normal">({r.pct}%)</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
