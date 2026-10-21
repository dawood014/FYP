import { useNavigate } from 'react-router';

const PROGRESS_STEPS = ['Event Created', 'Finding Services', 'Quotes', 'Bookings', 'Completed'];

const REQUIRED_SERVICES = [
  { name: 'Photography', status: 'Quote Received', statusColor: 'bg-emerald-50 text-emerald-700', provider: 'Lens & Light Studio' },
  { name: 'Catering', status: 'Not Selected', statusColor: 'bg-slate-100 text-slate-500', provider: null },
  { name: 'Sound & AV', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700', provider: 'Echo Sound Solutions' },
  { name: 'Decoration', status: 'Not Selected', statusColor: 'bg-slate-100 text-slate-500', provider: null },
];

const RECOMMENDED = [
  { name: 'Grand Feast Co.', specialty: 'Catering', rating: 4.8, price: 'Rs. 120,000', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format' },
  { name: 'Bloom & Décor', specialty: 'Decoration', rating: 4.9, price: 'Rs. 28,000', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format' },
  { name: 'Royal Venues', specialty: 'Venue', rating: 4.7, price: 'Rs. 200,000', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=80&h=80&fit=crop&auto=format' },
];

export default function EventWorkspace() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-xs bg-amber-400/20 text-amber-200 px-2.5 py-1 rounded-full font-semibold">Planning</span>
            <h1 className="text-2xl font-extrabold mt-2">TechCorp Annual Conference</h1>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-blue-200">
              <span>📅 October 20, 2024</span>
              <span>📍 Islamabad</span>
              <span>👥 500 Guests</span>
              <span>💰 Rs. 500,000 budget</span>
            </div>
          </div>
          <button className="self-start text-xs border border-white/30 text-white/80 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">Edit Event</button>
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-2">
          {PROGRESS_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i === 1 ? 'bg-[#4f8ef7] text-white' : i < 1 ? 'bg-emerald-400 text-white' : 'bg-white/20 text-white/50'}`}>
                {i < 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === 1 ? 'text-white font-bold' : 'text-white/50'}`}>{s}</span>
              {i < PROGRESS_STEPS.length - 1 && <div className={`flex-1 h-px ${i < 1 ? 'bg-emerald-400' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Required Services */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Required Services</h2>
          <div className="space-y-3">
            {REQUIRED_SERVICES.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-semibold text-sm text-[#0f1f3d]">{svc.name}</div>
                  {svc.provider && <div className="text-xs text-slate-500 mt-0.5">{svc.provider}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${svc.statusColor}`}>{svc.status}</span>
                  <button onClick={() => nav('/buyer/find-services')} className="text-xs font-semibold text-[#4f8ef7] hover:underline">
                    {svc.provider ? 'View Quote' : 'Find Provider'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => nav('/buyer/find-services')} className="mt-4 w-full border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium py-3 rounded-xl hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-colors">
            + Add More Services
          </button>
        </div>

        {/* Recommended */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Recommended Providers</h2>
          <div className="space-y-4">
            {RECOMMENDED.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#0f1f3d] truncate">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.specialty} · ⭐ {p.rating}</div>
                  <div className="text-xs font-bold text-[#4f8ef7] mt-0.5">From {p.price}</div>
                </div>
                <button onClick={() => nav('/buyer/request-quote')} className="text-xs bg-[#4f8ef7] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#3a7ae8] transition-colors font-semibold shrink-0">Quote</button>
              </div>
            ))}
          </div>
          <button onClick={() => nav('/buyer/find-services')} className="mt-4 w-full text-xs text-[#4f8ef7] font-semibold hover:underline">Browse all providers →</button>
        </div>
      </div>
    </div>
  );
}
