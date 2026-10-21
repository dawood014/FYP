const SELLERS = [
  { id: 'S-001', business: 'Lens & Light Studio', owner: 'Muhammad Ali', category: 'Photography', rating: 4.9, status: 'Verified', bookings: 340, city: 'Lahore' },
  { id: 'S-002', business: 'Grand Feast Co.', owner: 'Tariq Ahmed', category: 'Catering', rating: 4.8, status: 'Verified', bookings: 280, city: 'Karachi' },
  { id: 'S-003', business: 'Bloom & Décor', owner: 'Ayesha Khan', category: 'Decoration', rating: 4.9, status: 'Verified', bookings: 520, city: 'Lahore' },
  { id: 'S-004', business: 'Royal Venues', owner: 'Kamran Shah', category: 'Venue', rating: 0, status: 'Pending', bookings: 0, city: 'Islamabad' },
];

export default function AdminSellers() {
  const [action, setAction] = useState<{ type: 'view' | 'suspend'; seller: (typeof SELLERS)[number] } | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Sellers Management</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Business', 'Owner', 'Category', 'City', 'Rating', 'Bookings', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SELLERS.map((s) => (
                <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{s.id}</td>
                  <td className="px-5 py-4 font-semibold text-sm text-[#0f1f3d]">{s.business}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.owner}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.category}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{s.city}</td>
                  <td className="px-5 py-4 text-sm font-semibold">{s.rating > 0 ? `${s.rating} ⭐` : '—'}</td>
                  <td className="px-5 py-4 text-sm">{s.bookings}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setAction({ type: 'view', seller: s })} className="text-xs text-[#4f8ef7] hover:underline font-semibold">View</button>
                      <button onClick={() => setAction({ type: 'suspend', seller: s })} className="text-xs text-red-400 hover:underline font-semibold">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={Boolean(action)} title={action?.type === 'view' ? 'Seller details' : 'Suspend seller'} confirmLabel={action?.type === 'suspend' ? 'Suspend Seller' : undefined} tone="danger" onClose={() => setAction(null)}>
        {action?.type === 'view' ? <div className="space-y-4"><div><p className="text-lg font-extrabold text-[#0f1f3d]">{action.seller.business}</p><p className="text-xs text-slate-400">{action.seller.owner} · {action.seller.city}</p></div><div className="grid grid-cols-2 gap-3">{[['Category', action.seller.category], ['Verification', action.seller.status], ['Services', '7 active'], ['Reviews', '128'], ['Bookings', String(action.seller.bookings)], ['Earnings', 'Rs. 1.24M']].map(([label, value]) => <div key={label} className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">{label}</p><p className="font-bold text-slate-700 mt-1">{value}</p></div>)}</div><p className="text-xs text-slate-500">Portfolio includes 24 verified event projects.</p></div> : <div><p className="font-bold text-slate-800">Are you sure you want to suspend this seller?</p><p className="mt-2">Their services will be unavailable while the account is suspended.</p></div>}
      </Modal>
    </div>
  );
}
import { useState } from 'react';
import Modal from '../../components/Modal';
