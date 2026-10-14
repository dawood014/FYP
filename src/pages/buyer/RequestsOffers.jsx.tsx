import { useState } from 'react';
import { useNavigate } from 'react-router';

const TABS = ['Pending', 'Quotes', 'Accepted', 'Declined'];

const REQUESTS = {
  Pending: [
    { id: 'R-003', provider: 'Echo Sound Solutions', service: 'Sound & AV', event: 'TechCorp Conference', date: 'Oct 20, 2024', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700' },
    { id: 'R-004', provider: 'Royal Venues', service: 'Venue', event: 'TechCorp Conference', date: 'Oct 20, 2024', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700' },
  ],
  Quotes: [
    { id: 'R-001', provider: 'Lens & Light Studio', service: 'Photography', event: 'TechCorp Conference', date: 'Oct 20, 2024', status: 'Quote Received', price: 'Rs. 45,000', statusColor: 'bg-blue-50 text-blue-700' },
    { id: 'R-002', provider: 'Grand Feast Co.', service: 'Catering', event: 'Sara & Ali Wedding', date: 'Nov 15, 2024', status: 'Quote Received', price: 'Rs. 120,000', statusColor: 'bg-blue-50 text-blue-700' },
  ],
  Accepted: [
    { id: 'R-005', provider: 'Bloom & Décor', service: 'Decoration', event: 'Sara & Ali Wedding', date: 'Nov 15, 2024', status: 'Accepted', price: 'Rs. 28,000', statusColor: 'bg-emerald-50 text-emerald-700' },
  ],
  Declined: [],
};

export default function RequestsOffers() {
  const nav = useNavigate();
  const [tab, setTab] = useState('Quotes');
  const items = REQUESTS[tab as keyof typeof REQUESTS];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Requests & Offers</h1>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${tab === t ? 'text-[#4f8ef7] border-b-2 border-[#4f8ef7]' : 'text-slate-500 hover:text-slate-700'}`}>
              {t} {REQUESTS[t as keyof typeof REQUESTS].length > 0 && <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${tab === t ? 'bg-[#4f8ef7]/10' : 'bg-slate-100'}`}>{REQUESTS[t as keyof typeof REQUESTS].length}</span>}
            </button>
          ))}
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-bold text-[#0f1f3d] mb-1">No {tab.toLowerCase()} requests</p>
              <p className="text-slate-400 text-sm">Requests in this category will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((r: any) => (
                <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold flex-shrink-0">{r.id}</div>
                    <div>
                      <div className="font-semibold text-[#0f1f3d] text-sm">{r.provider}</div>
                      <div className="text-xs text-slate-500">{r.service} · {r.event} · {r.date}</div>
                      {r.price && <div className="text-sm font-extrabold text-[#0f1f3d] mt-1">{r.price}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-13 sm:ml-0">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.statusColor}`}>{r.status}</span>
                    {tab === 'Quotes' && (
                      <>
                        <button onClick={() => nav('/buyer/quote-details')} className="text-xs font-semibold text-[#4f8ef7] border border-[#4f8ef7]/30 px-3 py-1.5 rounded-lg hover:bg-[#4f8ef7]/5 transition-colors">View Quote</button>
                        <button onClick={() => nav('/buyer/messages')} className="text-xs font-semibold border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Message</button>
                      </>
                    )}
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
