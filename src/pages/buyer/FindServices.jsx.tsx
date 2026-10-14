import { useState } from 'react';
import { useNavigate } from 'react-router';
import StarRating from '../../components/StarRating';

const PROVIDERS = [
  { id: 1, name: 'Lens & Light Studio', category: 'Photography', rating: 4.9, reviews: 128, location: 'Lahore', price: 'Rs. 45,000', verified: true, img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=220&fit=crop&auto=format', available: true },
  { id: 2, name: 'Grand Feast Co.', category: 'Catering', rating: 4.8, reviews: 95, location: 'Karachi', price: 'Rs. 120,000', verified: true, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=220&fit=crop&auto=format', available: true },
  { id: 3, name: 'Echo Sound Solutions', category: 'Sound & AV', rating: 4.7, reviews: 67, location: 'Islamabad', price: 'Rs. 35,000', verified: true, img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=220&fit=crop&auto=format', available: false },
  { id: 4, name: 'Bloom & Décor', category: 'Decoration', rating: 4.9, reviews: 211, location: 'Lahore', price: 'Rs. 28,000', verified: true, img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=220&fit=crop&auto=format', available: true },
];

const CATEGORIES = ['All', 'Photography', 'Catering', 'Decoration', 'Sound & AV', 'Venue', 'Transportation'];

export default function FindServices() {
  const nav = useNavigate();
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? PROVIDERS : PROVIDERS.filter((p) => p.category === cat);

  return (
    <div className="space-y-6">
      {/* Context bar */}
      <div className="bg-[#0f1f3d] rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <p className="text-white/60 text-xs mb-1">Finding providers for</p>
          <div className="flex flex-wrap gap-2 text-sm text-white font-semibold">
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full">Corporate Conference</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full">500 Guests</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full">Oct 20</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full">Islamabad</span>
          </div>
        </div>
        <button onClick={() => nav('/buyer/event-workspace')} className="text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5 rounded-lg transition-colors">← Event Workspace</button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters */}
        <aside className="bg-white rounded-2xl border border-slate-100 p-5 h-fit">
          <h3 className="font-bold text-[#0f1f3d] mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</label>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg mb-0.5 transition-colors ${cat === c ? 'bg-[#4f8ef7]/10 text-[#4f8ef7] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>{c}</button>
              ))}
            </div>
            <hr className="border-slate-100" />
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Location</label>
              <select className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
                <option>All Cities</option>
                {['Lahore', 'Karachi', 'Islamabad'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Min Rating</label>
              <select className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
                <option>Any Rating</option>
                <option>4+ stars</option>
                <option>4.5+ stars</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Verification</label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#4f8ef7]" />
                Verified only
              </label>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 text-sm"><span className="font-bold text-[#0f1f3d]">{filtered.length}</span> providers found</p>
            <select className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
              <option>Top Rated</option>
              <option>Lowest Price</option>
              <option>Most Reviews</option>
            </select>
          </div>

          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="sm:flex">
                <div className="sm:w-48 h-40 sm:h-auto relative flex-shrink-0">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  {!p.available && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white text-xs font-bold bg-red-500 px-2 py-1 rounded-full">Unavailable</span></div>}
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-extrabold text-[#0f1f3d]">{p.name}</h3>
                          {p.verified && <span className="text-xs bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full">✓ Verified</span>}
                        </div>
                        <p className="text-slate-500 text-sm">{p.category} · 📍 {p.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-slate-400">Starting from</div>
                        <div className="font-extrabold text-[#0f1f3d]">{p.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <StarRating rating={p.rating} />
                      <span className="text-sm font-bold">{p.rating}</span>
                      <span className="text-slate-400 text-sm">({p.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => nav('/buyer/provider/1')} className="flex-1 text-sm font-semibold border border-slate-200 text-[#0f1f3d] py-2 rounded-xl hover:bg-slate-50 transition-colors">View Profile</button>
                    <button onClick={() => nav('/buyer/request-quote')} disabled={!p.available} className="flex-1 text-sm font-semibold bg-[#4f8ef7] text-white py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Request Quote</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
