import { Link } from 'react-router';
import StarRating from '../../components/StarRating';

const SERVICES = [
  ['Premium Wedding Photography', 'Lens & Light Studio', 'Photography', 'Rs. 45,000', 4.9, 'Lahore', 'photo-1606216794074-735e91aa2c92'],
  ['Corporate Event Catering', 'Grand Feast Co.', 'Catering', 'Rs. 120,000', 4.8, 'Karachi', 'photo-1555244162-803834f70033'],
  ['Floral Event Styling', 'Bloom & Décor', 'Decoration', 'Rs. 28,000', 4.9, 'Lahore', 'photo-1519225421980-715cb0215aed'],
  ['Professional Sound & AV', 'Echo Sound Solutions', 'Entertainment', 'Rs. 35,000', 4.7, 'Islamabad', 'photo-1470229722913-7c0e2dbbafd3'],
  ['Luxury Banquet Venue', 'Royal Venues', 'Venues', 'Rs. 180,000', 4.8, 'Islamabad', 'photo-1507504031003-b417219a0fde'],
  ['Conference Production', 'Summit Experiences', 'Corporate', 'Rs. 95,000', 4.9, 'Karachi', 'photo-1505373877841-8d25f7d46678'],
] as const;

export default function PublicServices() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0f1f3d] py-16">
        <div className="max-w-7xl mx-auto px-4"><p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Event marketplace</p><h1 className="text-4xl font-extrabold text-white mb-4">Find services for every event</h1><p className="text-blue-100/70 max-w-2xl">Compare verified providers, transparent starting prices, portfolios, and customer ratings.</p><div className="mt-8 bg-white rounded-2xl p-2 max-w-3xl flex flex-col sm:flex-row gap-2"><input placeholder="What service do you need?" className="flex-1 px-4 py-3 text-sm focus:outline-none" /><select className="px-4 py-3 text-sm text-slate-600 focus:outline-none"><option>All locations</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option></select><button className="bg-[#4f8ef7] text-white font-bold px-6 py-3 rounded-xl text-sm">Search</button></div></div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">{['All Services', 'Photography', 'Catering', 'Decoration', 'Entertainment', 'Venues'].map((category, i) => <button key={category} className={`px-4 py-2 rounded-full text-xs font-bold ${i === 0 ? 'bg-[#0f1f3d] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{category}</button>)}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(([name, provider, category, price, rating, location, photo], i) => <article key={name} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow"><img src={`https://images.unsplash.com/${photo}?w=700&h=440&fit=crop`} alt={name} className="w-full h-52 object-cover" /><div className="p-5"><div className="flex items-center justify-between mb-3"><span className="text-xs font-bold text-[#4f8ef7]">{category}</span><span className="text-xs text-slate-400">{location}</span></div><h2 className="font-extrabold text-[#0f1f3d]">{name}</h2><p className="text-xs text-slate-500 mt-1">{provider}</p><div className="flex items-center gap-2 mt-3"><StarRating rating={rating} /><span className="text-xs font-bold text-slate-600">{rating}</span></div><div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><div><p className="text-xs text-slate-400">Starting from</p><p className="font-extrabold text-[#0f1f3d]">{price}</p></div><Link to={`/buyer/provider/${i + 1}`} className="bg-blue-50 text-[#4f8ef7] font-bold px-4 py-2 rounded-xl text-xs">View provider</Link></div></div></article>)}
        </div>
      </div>
    </div>
  );
}
