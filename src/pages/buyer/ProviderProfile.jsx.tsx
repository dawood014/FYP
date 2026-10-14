import { useNavigate } from 'react-router';
import StarRating from '../../components/StarRating';

const PORTFOLIO = [
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop&auto=format',
];

const PACKAGES = [
  { name: 'Basic', price: 'Rs. 30,000', features: ['6-hour coverage', '200 edited photos', 'Online gallery', 'Basic editing'] },
  { name: 'Standard', price: 'Rs. 45,000', features: ['10-hour coverage', '400 edited photos', 'Online gallery', 'Professional editing', '1 videographer'], popular: true },
  { name: 'Premium', price: 'Rs. 75,000', features: ['Full-day coverage', '700+ edited photos', 'Drone shots', 'Same-day highlights', '2 videographers', 'Album'] },
];

export default function ProviderProfile() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      {/* Cover */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="h-40 sm:h-56 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=400&fit=crop&auto=format" alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#0f1f3d] border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-lg">L</div>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-[#0f1f3d]">Lens & Light Studio</h1>
                  <span className="text-xs bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">✓ Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                  <StarRating rating={4.9} />
                  <span className="font-semibold">4.9</span>
                  <span>(128 reviews)</span>
                  <span>·</span>
                  <span>📍 Lahore</span>
                  <span>·</span>
                  <span>340 events</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => nav('/buyer/messages')} className="text-sm font-semibold border border-slate-200 text-[#0f1f3d] px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">💬 Message</button>
              <button onClick={() => nav('/buyer/request-quote')} className="text-sm font-semibold bg-[#4f8ef7] text-white px-4 py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors">Request Quote</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-extrabold text-[#0f1f3d] mb-3">About</h2>
            <p className="text-slate-600 text-sm leading-relaxed">Lens & Light Studio is a premium photography and videography service based in Lahore. With over 8 years of experience covering weddings, corporate events, and private celebrations, we combine artistic vision with technical excellence. Our team of 5 professionals ensures every moment is captured beautifully.</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[['8+ Years', 'Experience'], ['340', 'Events'], ['4.9 ⭐', 'Rating']].map(([val, label]) => (
                <div key={label} className="text-center bg-slate-50 rounded-xl p-3">
                  <div className="font-extrabold text-[#0f1f3d] text-lg">{val}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-extrabold text-[#0f1f3d] mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-3">
              {PORTFOLIO.map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <img src={src} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-extrabold text-[#0f1f3d] mb-4">Packages</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {PACKAGES.map((pkg) => (
                <div key={pkg.name} className={`rounded-xl border-2 p-5 relative ${pkg.popular ? 'border-[#4f8ef7]' : 'border-slate-100'}`}>
                  {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4f8ef7] text-white text-xs font-bold px-3 py-0.5 rounded-full">Most Popular</div>}
                  <div className="font-bold text-[#0f1f3d] text-sm mb-1">{pkg.name}</div>
                  <div className="font-extrabold text-2xl text-[#0f1f3d] mb-4">{pkg.price}</div>
                  <ul className="space-y-1.5 mb-4">
                    {pkg.features.map((f) => <li key={f} className="text-xs text-slate-600 flex items-center gap-1.5"><span className="text-emerald-500">✓</span>{f}</li>)}
                  </ul>
                  <button onClick={() => nav('/buyer/request-quote')} className={`w-full text-xs font-bold py-2 rounded-lg transition-colors ${pkg.popular ? 'bg-[#4f8ef7] text-white hover:bg-[#3a7ae8]' : 'border border-slate-200 text-[#0f1f3d] hover:bg-slate-50'}`}>Choose {pkg.name}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-extrabold text-[#0f1f3d] mb-4">Reviews <span className="text-slate-400 font-normal text-base">(128)</span></h2>
            <div className="space-y-4">
              {[
                { name: 'Sara Malik', rating: 5, date: 'Oct 2024', text: 'Absolutely stunning photos! Professional team, great communication, and delivered well before deadline.' },
                { name: 'Ali Hassan', rating: 5, date: 'Sep 2024', text: 'Used them for our corporate annual dinner. Excellent work, everyone was impressed by the quality.' },
                { name: 'Ayesha Khan', rating: 4, date: 'Aug 2024', text: 'Great photography. Minor delays in delivery but the final result was worth it.' },
              ].map((r) => (
                <div key={r.name} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] flex items-center justify-center text-sm font-bold">{r.name[0]}</div>
                      <div>
                        <div className="text-sm font-bold text-[#0f1f3d]">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.date}</div>
                      </div>
                    </div>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-sm text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-[#0f1f3d] mb-4 text-sm">Services Offered</h3>
            {['Wedding Photography', 'Corporate Photography', 'Event Videography', 'Drone Photography', 'Photo Editing'].map((s) => (
              <div key={s} className="flex items-center gap-2 py-2 border-b border-slate-50 last:border-0">
                <span className="text-emerald-500 text-xs">✓</span>
                <span className="text-sm text-slate-700">{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-[#0f1f3d] mb-4 text-sm">Quick Info</h3>
            {[['Category', 'Photography & Video'], ['Location', 'Lahore, Punjab'], ['Experience', '8+ Years'], ['Response Time', '< 2 hours'], ['Languages', 'Urdu, English']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="font-semibold text-[#0f1f3d] text-right">{v}</span>
              </div>
            ))}
          </div>

          <button onClick={() => nav('/buyer/request-quote')} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            Request Quote →
          </button>
          <button onClick={() => nav('/buyer/messages')} className="w-full border border-slate-200 text-[#0f1f3d] font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">
            💬 Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
