import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../../components/Modal';

const SERVICES = [
  { id: 1, name: 'Wedding Photography Package', category: 'Photography', price: 'Rs. 45,000', status: 'Active', bookings: 12 },
  { id: 2, name: 'Corporate Event Videography', category: 'Videography', price: 'Rs. 60,000', status: 'Active', bookings: 8 },
  { id: 3, name: 'Birthday Photography', category: 'Photography', price: 'Rs. 15,000', status: 'Draft', bookings: 0 },
];

export default function SellerServices() {
  const nav = useNavigate();
  const [services, setServices] = useState(SERVICES);
  const [deleting, setDeleting] = useState<(typeof SERVICES)[number] | null>(null);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Services</h1>
        <button onClick={() => nav('/seller/services/new')} className="text-sm font-bold bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors">+ Add Service</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${svc.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{svc.status}</span>
              <div className="flex gap-1">
                <button onClick={() => nav(`/seller/services/${svc.id}/edit`)} className="text-xs text-[#4f8ef7] hover:underline font-semibold">Edit</button>
                <span className="text-slate-200">·</span>
                <button onClick={() => setDeleting(svc)} className="text-xs text-red-400 hover:underline font-semibold">Delete</button>
              </div>
            </div>
            <h3 className="font-bold text-[#0f1f3d] text-sm mb-1">{svc.name}</h3>
            <p className="text-xs text-slate-500 mb-3">{svc.category}</p>
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-[#0f1f3d]">{svc.price}</div>
              <div className="text-xs text-slate-400">{svc.bookings} bookings</div>
            </div>
          </div>
        ))}

        {/* Add service CTA */}
        <div onClick={() => nav('/seller/services/new')} className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:border-emerald-400 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-2xl mb-3 transition-colors">+</div>
          <div className="font-bold text-slate-500 group-hover:text-emerald-600 text-sm transition-colors">Add New Service</div>
        </div>
      </div>
      <Modal open={Boolean(deleting)} title="Delete service" confirmLabel="Delete Service" tone="danger" onClose={() => setDeleting(null)} onConfirm={() => setServices((current) => current.filter((service) => service.id !== deleting?.id))}>
        <p className="font-semibold text-slate-800 mb-2">Are you sure you want to delete this service?</p>
        <p>This will permanently remove “{deleting?.name}” from your profile and the marketplace.</p>
      </Modal>
    </div>
  );
}
