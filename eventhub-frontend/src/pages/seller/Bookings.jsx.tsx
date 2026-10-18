import { useState } from 'react';

const TABS = ['Pending', 'Confirmed', 'In Progress', 'Completed'];

const ALL_BOOKINGS = {
  Pending: [{ id: 'BK-003', event: 'Birthday Bash', buyer: 'Ali Hassan', date: 'Oct 30, 2024', amount: 'Rs. 15,000', service: 'Photography' }],
  Confirmed: [{ id: 'BK-001', event: 'TechCorp Conference', buyer: 'Ahmed Khan', date: 'Oct 20, 2024', amount: 'Rs. 45,000', service: 'Photography & Video' }],
  'In Progress': [],
  Completed: [{ id: 'BK-002', event: 'Sara & Ali Wedding', buyer: 'Sara Malik', date: 'Sep 15, 2024', amount: 'Rs. 60,000', service: 'Photography & Video' }],
};

export default function SellerBookings() {
  const [tab, setTab] = useState('Confirmed');
  const items = ALL_BOOKINGS[tab as keyof typeof ALL_BOOKINGS];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Bookings</h1>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3.5 text-xs sm:text-sm font-semibold transition-colors ${tab === t ? 'text-emerald-600 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-700'}`}>{t}</button>
          ))}
        </div>
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-bold text-[#0f1f3d]">No {tab.toLowerCase()} bookings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((b: any) => (
                <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{b.id}</div>
                    <div>
                      <div className="font-semibold text-sm text-[#0f1f3d]">{b.event}</div>
                      <div className="text-xs text-slate-500">{b.buyer} · {b.service} · {b.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0f1f3d]">{b.amount}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tab === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : tab === 'Pending' ? 'bg-amber-50 text-amber-700' : tab === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-700'}`}>{tab}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
