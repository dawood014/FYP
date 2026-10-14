import { useState } from 'react';

const DISPUTES = [
  { id: 'DSP-001', booking: 'BK-001', buyer: 'Ahmed Khan', seller: 'Lens & Light Studio', reason: 'Photos not delivered within promised time', date: 'Oct 25, 2024', status: 'Open' },
  { id: 'DSP-002', booking: 'BK-003', buyer: 'Ali Hassan', seller: 'Grand Feast Co.', reason: 'Food quality did not match what was agreed', date: 'Nov 2, 2024', status: 'Under Review' },
];

export default function AdminDisputes() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const update = (id: string, s: string) => setStatuses((p) => ({ ...p, [id]: s }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Disputes</h1>
      <div className="space-y-4">
        {DISPUTES.map((d) => {
          const status = statuses[d.id] || d.status;
          return (
            <div key={d.id} className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{d.id}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : status === 'Closed' ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-700'}`}>{status}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1"><span className="font-semibold">Booking:</span> {d.booking} · <span className="font-semibold">Buyer:</span> {d.buyer} · <span className="font-semibold">Seller:</span> {d.seller}</p>
                  <p className="text-sm font-semibold text-[#0f1f3d]">"{d.reason}"</p>
                  <p className="text-xs text-slate-400 mt-1">{d.date}</p>
                </div>
                {status !== 'Resolved' && status !== 'Closed' && (
                  <div className="flex gap-2">
                    <button onClick={() => update(d.id, 'Resolved')} className="text-sm font-bold bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors">Resolve</button>
                    <button onClick={() => update(d.id, 'Closed')} className="text-sm font-semibold border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">Close</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
