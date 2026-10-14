import { useState } from 'react';
import { useNavigate } from 'react-router';

const REQUESTS = [
  { id: 'REQ-001', event: 'TechCorp Annual Conference', buyer: 'Ahmed Khan', date: 'Oct 20, 2024', location: 'Islamabad', guests: 500, budget: 'Rs. 50,000', service: 'Photography', status: 'New' },
  { id: 'REQ-002', event: 'Nikah Ceremony', buyer: 'Sara Malik', date: 'Nov 5, 2024', location: 'Lahore', guests: 200, budget: 'Rs. 35,000', service: 'Photography & Video', status: 'New' },
  { id: 'REQ-003', event: 'Birthday Celebration', buyer: 'Ali Hassan', date: 'Oct 30, 2024', location: 'Karachi', guests: 80, budget: 'Rs. 20,000', service: 'Photography', status: 'Viewed' },
];

export default function CustomerRequests() {
  const nav = useNavigate();
  const [active, setActive] = useState<typeof REQUESTS[0] | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Customer Requests</h1>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Request list */}
        <div className="lg:col-span-2 space-y-3">
          {REQUESTS.map((r) => (
            <div key={r.id} onClick={() => setActive(r)} className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${active?.id === r.id ? 'border-emerald-500' : 'border-slate-100 hover:border-slate-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#0f1f3d] text-sm">{r.event}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === 'New' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
              </div>
              <div className="text-xs text-slate-500 space-y-0.5">
                <div>👤 {r.buyer}</div>
                <div>📅 {r.date} · 📍 {r.location}</div>
                <div>👥 {r.guests} guests · 💰 {r.budget}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Request detail */}
        <div className="lg:col-span-3">
          {active ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-extrabold text-[#0f1f3d] text-lg">{active.event}</h2>
                  <p className="text-slate-500 text-sm mt-0.5">by {active.buyer}</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">{active.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Service Needed', active.service],
                  ['Event Date', active.date],
                  ['Location', active.location],
                  ['Expected Guests', String(active.guests)],
                  ['Budget', active.budget],
                  ['Request ID', active.id],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-slate-400 mb-0.5">{k}</div>
                    <div className="font-semibold text-[#0f1f3d]">{v}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1.5">Requirements</div>
                <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">Professional photography coverage for the full event. Need candid shots as well as formal portraits. Delivery within 1 week.</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => nav('/seller/messages')} className="flex-1 text-sm font-semibold border border-slate-200 text-slate-700 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">💬 Message</button>
                <button className="flex-1 text-sm font-semibold border border-red-200 text-red-500 py-2.5 rounded-xl hover:bg-red-50 transition-colors">Decline</button>
                <button onClick={() => nav('/seller/create-quote')} className="flex-1 text-sm font-bold bg-emerald-500 text-white py-2.5 rounded-xl hover:bg-emerald-600 transition-colors">Send Quote →</button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center h-full flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-bold text-[#0f1f3d] mb-1">Select a request</p>
              <p className="text-slate-400 text-sm">Click on a request to see its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
