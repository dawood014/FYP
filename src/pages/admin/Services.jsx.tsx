import { useState } from 'react';
import Modal from '../../components/Modal';

const SERVICES = [
  { id: 'SVC-001', name: 'Premium Wedding Photography', provider: 'Lens & Light Studio', category: 'Photography', price: 'Rs. 45,000', rating: 4.9, date: 'Oct 18, 2024', status: 'Approved' },
  { id: 'SVC-002', name: 'Corporate Catering', provider: 'Grand Feast Co.', category: 'Catering', price: 'Rs. 120,000', rating: 4.8, date: 'Oct 21, 2024', status: 'Approved' },
  { id: 'SVC-003', name: 'Floral Decoration', provider: 'Bloom & Décor', category: 'Decoration', price: 'Rs. 28,000', rating: 4.9, date: 'Oct 24, 2024', status: 'Pending' },
];

export default function AdminServices() {
  const [action, setAction] = useState<{ type: 'view' | 'approve' | 'reject' | 'hide'; service: (typeof SERVICES)[number] } | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Service Moderation</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Service', 'Provider', 'Category', 'Price', 'Rating', 'Submitted', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{s.id}</td>
                  <td className="px-5 py-4 font-semibold text-sm text-[#0f1f3d]">{s.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.provider}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.category}</td>
                  <td className="px-5 py-4 text-sm font-semibold">{s.price}</td>
                  <td className="px-5 py-4 text-sm font-semibold">{s.rating} / 5</td>
                  <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{s.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setAction({ type: 'view', service: s })} className="text-xs text-[#4f8ef7] hover:underline font-semibold">View</button>
                      <button onClick={() => setAction({ type: 'approve', service: s })} className="text-xs text-emerald-500 hover:underline font-semibold">Approve</button>
                      <button onClick={() => setAction({ type: 'reject', service: s })} className="text-xs text-red-400 hover:underline font-semibold">Reject</button>
                      <button onClick={() => setAction({ type: 'hide', service: s })} className="text-xs text-slate-400 hover:underline font-semibold">Hide</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={Boolean(action)} title={`${action?.type === 'view' ? 'Service details' : action?.type ?? ''}`} confirmLabel={action?.type === 'approve' ? 'Approve Service' : action?.type === 'reject' ? 'Confirm Reject' : action?.type === 'hide' ? 'Hide Service' : undefined} tone={action?.type === 'approve' ? 'success' : action?.type === 'view' ? 'primary' : 'danger'} onClose={() => setAction(null)}>
        {action?.type === 'view' && <div className="space-y-3"><p className="text-lg font-extrabold text-[#0f1f3d]">{action.service.name}</p><p>{action.service.provider} · {action.service.category}</p><div className="rounded-xl bg-slate-50 p-4">Price: <strong>{action.service.price}</strong><br />Rating: <strong>{action.service.rating} / 5</strong><br />Submitted: <strong>{action.service.date}</strong></div></div>}
        {action?.type === 'approve' && <p className="font-bold text-slate-800">Are you sure you want to approve this service?</p>}
        {action?.type === 'reject' && <label><span className="block font-bold text-slate-800 mb-2">Rejection reason</span><textarea rows={4} className="w-full border border-slate-200 rounded-xl p-3 resize-none" placeholder="Explain what needs to be corrected..." /></label>}
        {action?.type === 'hide' && <p className="font-bold text-slate-800">Are you sure you want to hide this service from the marketplace?</p>}
      </Modal>
    </div>
  );
}
