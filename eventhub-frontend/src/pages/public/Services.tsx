import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import StarRating from '../../components/StarRating';
import { apiAssetUrl, categoryApi, listingApi, type Listing } from '../../api/client';

export default function PublicServices() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Services');
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState('');
  const load = () => {
    setError('');
    const category = categories.find((item) => item.name.toLowerCase() === selectedCategory.toLowerCase() || item.slug === selectedCategory.toLowerCase());
    listingApi.list({ pageSize: 100, q: query || undefined, location: location || undefined, categoryId: selectedCategory === 'All Services' ? undefined : category?.id })
      .then((page) => setListings(page.items)).catch((err) => setError(err instanceof Error ? err.message : 'Could not load services.'));
  };
  useEffect(() => { categoryApi.list().then(setCategories).catch(() => setCategories([])); }, []);
  useEffect(() => { load(); }, [categories, selectedCategory]);
  const categoriesList = ['All Services', ...categories.map((item) => item.name)];
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0f1f3d] py-16"><div className="max-w-7xl mx-auto px-4"><p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Event marketplace</p><h1 className="text-4xl font-extrabold text-white mb-4">Find services for every event</h1><p className="text-blue-100/70 max-w-2xl">Compare verified providers, transparent starting prices, portfolios, and customer ratings.</p><div className="mt-8 bg-white rounded-2xl p-2 max-w-3xl flex flex-col sm:flex-row gap-2"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') load(); }} placeholder="What service do you need?" className="flex-1 px-4 py-3 text-sm focus:outline-none"/><select value={location} onChange={(event) => setLocation(event.target.value)} className="px-4 py-3 text-sm text-slate-600 focus:outline-none"><option value="">All locations</option>{['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((city) => <option key={city}>{city}</option>)}</select><button onClick={load} className="bg-[#4f8ef7] text-white font-bold px-6 py-3 rounded-xl text-sm">Search</button></div></div></section>
      <div className="max-w-7xl mx-auto px-4 py-12"><div className="flex flex-wrap gap-2 mb-8">{categoriesList.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={'px-4 py-2 rounded-full text-xs font-bold ' + (selectedCategory === category ? 'bg-[#0f1f3d] text-white' : 'bg-white border border-slate-200 text-slate-600')}>{category}</button>)}</div>{error && <p role="alert" className="text-sm text-red-600 mb-4">{error}</p>}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{listings.map((item) => <article key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow"><img src={apiAssetUrl(item.images[0]?.url || 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&h=440&fit=crop')} alt={item.title} className="w-full h-52 object-cover"/><div className="p-5"><div className="flex items-center justify-between mb-3"><span className="text-xs font-bold text-[#4f8ef7]">{item.category.name}</span><span className="text-xs text-slate-400">{item.location || item.seller.sellerProfile?.location || ''}</span></div><h2 className="font-extrabold text-[#0f1f3d]">{item.title}</h2><p className="text-xs text-slate-500 mt-1">{item.seller.sellerProfile?.businessName || item.seller.name}</p><div className="flex items-center gap-2 mt-3"><StarRating rating={0}/><span className="text-xs font-bold text-slate-600">No reviews yet</span></div><div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><div><p className="text-xs text-slate-400">Starting from</p><p className="font-extrabold text-[#0f1f3d]">{item.currency} {Number(item.price).toLocaleString()}</p></div><Link to={'/buyer/provider/' + item.id} className="bg-blue-50 text-[#4f8ef7] font-bold px-4 py-2 rounded-xl text-xs">View provider</Link></div></div></article>)}</div>{!listings.length && !error && <p className="py-10 text-center text-sm text-slate-400">No services found.</p>}</div>
    </div>
  );
}