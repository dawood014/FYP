import { useState } from 'react';

const REQUESTS = [
  { id: 'VR-001', business: 'Grand Feast Co.', owner: 'Muhammad Tariq', category: 'Catering', submitted: 'Oct 1, 2024', status: 'Pending', docs: ['CNIC', 'Business Registration'] },
  { id: 'VR-002', business: 'Royal Venues', owner: 'Kamran Shah', category: 'Venue', submitted: 'Oct 3, 2024', status: 'Pending', docs: ['CNIC', 'Property Documents'] },
  { id: 'VR-003', business: 'Echo Sound Solutions', owner: 'Usman Farooq', category: 'Sound & AV', submitted: 'Sep 28, 2024', status: 'Under Review', docs: ['CNIC'] },
];

export default function AdminVerification() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const update = (id: string, s: string) => setStatuses((p) => ({ ...p, [id]: s }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Seller Verification</h1>
      <p className="text-slate-500 text-sm -mt-4">Review and approve seller verification requests.</p>

      <div className="space-y-4">
        {REQUESTS.map((r) => {
          const status = statuses[r.id] || r.status;
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-[#0f1f3d]">{r.business}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span>
                  </div>
                  <p className="text-slate-500 text-sm">Owner: {r.owner} · Category: {r.category}</p>
                  <p className="text-slate-400 text-xs mt-0.5">Submitted: {r.submitted} · ID: {r.id}</p>
                </div>
                {status === 'Pending' || status === 'Under Review' ? (
                  <div className="flex gap-2">
                    <button onClick={() => update(r.id, 'Rejected')} className="text-sm font-semibold border border-red-200 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors">Reject</button>
                    <button onClick={() => update(r.id, 'Approved')} className="text-sm font-bold bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors">Approve</button>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">{status === 'Approved' ? '✓ Verified' : '✗ Rejected'}</span>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Documents Submitted</p>
                <div className="flex gap-2">
                  {r.docs.map((d) => (
                    <span key={d} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">
                      📄 {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
