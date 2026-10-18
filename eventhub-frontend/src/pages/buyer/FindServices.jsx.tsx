import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import StarRating from '../../components/StarRating';
import { apiAssetUrl, categoryApi, listingApi, type Listing } from '../../api/client';

export default function FindServices() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const [cat, setCat] = useState(searchParams.get('category') || 'All');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { categoryApi.list().then(setCategories).catch(() => setCategories([])); }, []);
  useEffect(() => {
    setError('');
    const category = categories.find((item) => item.name.toLowerCase() === cat.toLowerCase() || item.slug === cat.toLowerCase());
    listingApi.list({ pageSize: 100, categoryId: cat === 'All' ? undefined : category?.id, location: location || undefined })
      .then((page) => setListings(page.items)).catch((err) => setError(err instanceof Error ? err.message : 'Could not load services.'));
  }, [cat, location, categories]);
  const cards = listings.map((item) => ({
    id: item.id,
    name: item.seller.sellerProfile?.businessName || item.seller.name,
    category: item.category.name,
    rating: 0,
    reviews: 0,
    location: item.location || item.seller.sellerProfile?.location || 'Location not specified',
    price: item.currency + ' ' + Number(item.price).toLocaleString(),
    verified: Boolean(item.seller.sellerProfile?.isVerified),
    img: apiAssetUrl(item.images[0]?.url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=220&fit=crop&auto=format'),
    available: true,
  }));
  const filters = ['All', ...categories.map((item) => item.name)];
  return (
    <div className="space-y-6">
      <div className="bg-[#0f1f3d] rounded-2xl p-4 flex flex-wrap items-center gap-3"><div className="flex-1"><p className="text-white/60 text-xs mb-1">Finding providers for</p><div className="flex flex-wrap gap-2 text-sm text-white font-semibold"><span className="bg-white/10 px-2.5 py-0.5 rounded-full">Services</span><span className="bg-white/10 px-2.5 py-0.5 rounded-full">{location || 'All locations'}</span></div></div><button onClick={() => nav('/buyer/events')} className="text-xs text-white/60 hover:text-white border border-white/20 px-3 py-1.5 rounded-lg transition-colors">← My Events</button></div>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="bg-white rounded-2xl border border-slate-100 p-5 h-fit"><h3 className="font-bold text-[#0f1f3d] mb-4">Filters</h3><div className="space-y-4"><div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</label>{filters.map((item) => <button key={item} onClick={() => setCat(item)} className={'block w-full text-left text-sm py-1.5 px-2 rounded-lg mb-0.5 transition-colors ' + (cat === item ? 'bg-[#4f8ef7]/10 text-[#4f8ef7] font-semibold' : 'text-slate-600 hover:bg-slate-50')}>{item}</button>)}</div><hr className="border-slate-100"/><div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Location</label><select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"><option value="">All Cities</option>{['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((city) => <option key={city}>{city}</option>)}</select></div></div></aside>
        <div className="lg:col-span-3 space-y-4"><div className="flex items-center justify-between"><p className="text-slate-500 text-sm"><span className="font-bold text-[#0f1f3d]">{cards.length}</span> providers found</p></div>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          {cards.map((item) => <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"><div className="sm:flex"><div className="sm:w-48 h-40 sm:h-auto relative flex-shrink-0"><img src={item.img} alt={item.name} className="w-full h-full object-cover"/></div><div className="flex-1 p-5 flex flex-col justify-between"><div><div className="flex items-start justify-between gap-2"><div><div className="flex items-center gap-2 mb-1"><h3 className="font-extrabold text-[#0f1f3d]">{item.name}</h3>{item.verified && <span className="text-xs bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full">✓ Verified</span>}</div><p className="text-slate-500 text-sm">{item.category} · 📍 {item.location}</p></div><div className="text-right shrink-0"><div className="text-xs text-slate-400">Starting from</div><div className="font-extrabold text-[#0f1f3d]">{item.price}</div></div></div><div className="flex items-center gap-1.5 mt-2"><StarRating rating={item.rating}/><span className="text-sm font-bold">—</span><span className="text-slate-400 text-sm">({item.reviews} reviews)</span></div></div><div className="flex gap-2 mt-4"><button onClick={() => nav('/buyer/provider/' + item.id)} className="flex-1 text-sm font-semibold border border-slate-200 text-[#0f1f3d] py-2 rounded-xl hover:bg-slate-50 transition-colors">View Profile</button><button onClick={() => nav('/buyer/request-quote?listingId=' + item.id)} className="flex-1 text-sm font-semibold bg-[#4f8ef7] text-white py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors">Request Quote</button></div></div></div></div>)}
          {!cards.length && !error && <p className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-sm text-slate-400">No services found.</p>}
        </div>
      </div>
    </div>
  );
}