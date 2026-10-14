import { useState } from 'react';
import Modal from '../../components/Modal';

const REVIEWS = [
  { id: 'RV-001', buyer: 'Ahmed Khan', service: 'Wedding Photography', seller: 'Lens & Light Studio', rating: 5, comment: 'Outstanding photography! Will definitely hire again.', date: 'Oct 22, 2024', status: 'Approved' },
  { id: 'RV-002', buyer: 'Sara Malik', service: 'Corporate Catering', seller: 'Grand Feast Co.', rating: 4, comment: 'Good food but slightly delayed service.', date: 'Nov 16, 2024', status: 'Approved' },
  { id: 'RV-003', buyer: 'Ali Hassan', service: 'Sound System', seller: 'Echo Sound Solutions', rating: 2, comment: 'Equipment failed during the event. Very disappointing.', date: 'Oct 31, 2024', status: 'Pending' },
];

export default function AdminReviews() {
  const [action, setAction] = useState<{ type: 'view' | 'approve' | 'hide' | 'delete'; review: (typeof REVIEWS)[number] } | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Reviews Moderation</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Customer', 'Service', 'Seller', 'Rating', 'Review', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REVIEWS.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{r.id}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#0f1f3d]">{r.buyer}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{r.service}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{r.seller}</td>
                  <td className="px-5 py-4 text-sm font-bold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 max-w-xs truncate">{r.comment}</td>
                  <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{r.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setAction({ type: 'view', review: r })} className="text-xs text-[#4f8ef7] hover:underline font-semibold">View</button>
                      <button onClick={() => setAction({ type: 'approve', review: r })} className="text-xs text-emerald-500 hover:underline font-semibold">Approve</button>
                      <button onClick={() => setAction({ type: 'hide', review: r })} className="text-xs text-amber-500 hover:underline font-semibold">Hide</button>
                      <button onClick={() => setAction({ type: 'delete', review: r })} className="text-xs text-red-400 hover:underline font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={Boolean(action)} title={`${action?.type === 'view' ? 'Review details' : `${action?.type ?? ''} review`}`} confirmLabel={action?.type === 'approve' ? 'Approve Review' : action?.type === 'hide' ? 'Hide Review' : action?.type === 'delete' ? 'Delete Review' : undefined} tone={action?.type === 'approve' ? 'success' : action?.type === 'view' ? 'primary' : 'danger'} onClose={() => setAction(null)}>
        {action?.type === 'view' ? <div className="space-y-3"><div className="text-amber-400 text-lg">{'★'.repeat(action.review.rating)}</div><p className="text-slate-800 leading-6">“{action.review.comment}”</p><p className="text-xs text-slate-400">{action.review.buyer} · {action.review.service} · {action.review.date}</p></div> : <p className="font-bold text-slate-800">{action?.type === 'approve' ? 'Approve this review for public display?' : action?.type === 'hide' ? 'Hide this review from the marketplace?' : 'Permanently delete this review? This action cannot be undone.'}</p>}
      </Modal>
    </div>
  );
}
