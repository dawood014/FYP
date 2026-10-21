import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import StarRating from '../../components/StarRating';
import Icon from '../../components/Icon';

const CATEGORIES = [
  { name: 'Weddings', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=500&fit=crop', count: '240+ providers', slug: 'wedding' },
  { name: 'Birthdays', img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=700&h=500&fit=crop', count: '320+ providers', slug: 'birthday' },
  { name: 'Corporate Events', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&h=500&fit=crop', count: '180+ providers', slug: 'corporate' },
  { name: 'Conferences', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=700&h=500&fit=crop', count: '150+ providers', slug: 'conference' },
  { name: 'Catering', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=700&h=500&fit=crop', count: '210+ providers', slug: 'catering' },
  { name: 'Venues', img: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=700&h=500&fit=crop', count: '95+ providers', slug: 'venues' },
];

const SERVICES = [
  { id: 1, name: 'Premium Wedding Photography', provider: 'Lens & Light Studio', rating: 4.9, reviews: 128, price: 'Rs. 45,000', category: 'Photography', location: 'Lahore', img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=260&fit=crop&auto=format' },
  { id: 2, name: 'Corporate Event Catering', provider: 'Grand Feast Co.', rating: 4.8, reviews: 95, price: 'Rs. 120,000', category: 'Catering', location: 'Karachi', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=260&fit=crop&auto=format' },
  { id: 3, name: 'Professional Sound System', provider: 'Echo Sound Solutions', rating: 4.7, reviews: 67, price: 'Rs. 35,000', category: 'Sound & AV', location: 'Islamabad', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=260&fit=crop&auto=format' },
  { id: 4, name: 'Floral Decoration & Design', provider: 'Bloom & Décor', rating: 4.9, reviews: 211, price: 'Rs. 28,000', category: 'Decoration', location: 'Lahore', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=260&fit=crop&auto=format' },
];

const PROVIDERS = [
  { id: 1, name: 'Lens & Light Studio', specialty: 'Photography & Videography', rating: 4.9, reviews: 128, events: 340, location: 'Lahore', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format' },
  { id: 2, name: 'Grand Feast Co.', specialty: 'Catering & Food Services', rating: 4.8, reviews: 95, events: 280, location: 'Karachi', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format' },
  { id: 3, name: 'Bloom & Décor', specialty: 'Decoration & Florals', rating: 4.9, reviews: 211, events: 520, location: 'Lahore', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format' },
];

const HOW = [
  { step: '01', title: 'Create Your Event', desc: 'Tell us about your event — type, date, location, budget, and required services.' },
  { step: '02', title: 'Find Providers', desc: 'Browse verified service providers filtered to match your event requirements.' },
  { step: '03', title: 'Request Quotes', desc: 'Send requests and compare providers side by side at your own pace.' },
  { step: '04', title: 'Book & Pay Securely', desc: 'Accept a quote, confirm your booking, and pay safely through EventHub.' },
];

export default function Home() {
  const nav = useNavigate();
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#102c2a] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1723832348105-2e69f948135a?w=1800&h=1100&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="hero-cinematic absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081b1a]/95 via-[#102c2a]/88 to-[#102c2a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081b1a]/55 via-transparent to-black/20" />
        <div className="hero-ambient-lights absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <span className="hero-light-orb hero-light-orb-gold" />
          <span className="hero-light-orb hero-light-orb-cream" />
          <span className="hero-light-orb hero-light-orb-mint" />
          <span className="hero-light-sweep" />
        </div>
        <div className="hero-fireworks absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <i className="hero-firework hero-firework-one" />
          <i className="hero-firework hero-firework-two" />
          <i className="hero-firework hero-firework-three" />
          <i className="hero-firework hero-firework-four" />
        </div>
        <div className="absolute -top-40 -left-32 size-96 rounded-full bg-[#c89445]/15 blur-3xl" />
        <div className="absolute -bottom-48 right-1/3 size-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e0b66f] inline-block" />
                Pakistan's trusted event marketplace
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight mb-5">
                Plan Your Event.<br />
                Find the Right Services.<br />
                <span className="text-[#e0b66f]">Book With Confidence.</span>
              </h1>
              <p className="text-emerald-50/70 text-lg leading-relaxed mb-8 max-w-lg">
                Discover trusted event professionals, compare tailored quotes, and manage every booking in one premium planning experience.
              </p>
              <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-black/20 border border-white/20">
                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 px-1">Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#c89445] bg-stone-50">
                      <option value="">Select type</option>
                      {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 px-1">Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#c89445] bg-stone-50">
                      <option value="">Select city</option>
                      {['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 px-1">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#c89445] bg-stone-50" />
                  </div>
                </div>
                <button onClick={() => nav('/buyer/find-services')} className="w-full bg-[#c89445] hover:bg-[#b27c32] text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Find Services
                </button>
              </div>
              <p className="text-emerald-100/55 text-xs mt-3">1,200+ verified providers · 5,000+ events · No platform fee for buyers</p>
            </div>
            <div className="hidden lg:flex justify-end relative">
              <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-black/20">
                <p className="text-[#efd39f] text-xs font-bold uppercase tracking-widest mb-3">Everything in one place</p>
                <h2 className="text-2xl font-extrabold text-white leading-tight">Plan beautifully.<br />Book confidently.</h2>
                <div className="mt-6 space-y-3">
                  {[
                    ['check', 'Verified event professionals'],
                    ['clipboard', 'Tailored quotes for your event'],
                    ['card', 'Secure booking and payments'],
                  ].map(([icon, label]) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                      <div className="size-9 rounded-lg bg-[#c89445]/20 text-[#efd39f] flex items-center justify-center">
                        <Icon name={icon as 'check' | 'clipboard' | 'card'} className="size-4.5" />
                      </div>
                      <span className="text-sm font-semibold text-white/90">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                  <div><p className="text-2xl font-extrabold text-white">5,000+</p><p className="text-xs text-emerald-100/60 mt-1">Events completed</p></div>
                  <div><p className="text-2xl font-extrabold text-white">4.8 / 5</p><p className="text-xs text-emerald-100/60 mt-1">Average rating</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#a56f27] text-sm font-bold uppercase tracking-widest mb-2">Browse by Category</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d]">Popular Event Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} onClick={() => nav(`/buyer/find-services?category=${cat.slug}`)} className="relative h-48 overflow-hidden rounded-2xl text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group">
                <img src={cat.img} alt={cat.name} className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5"><div className="font-extrabold text-white">{cat.name}</div><div className="text-blue-100 text-xs mt-1">{cat.count}</div></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#a56f27] text-sm font-bold uppercase tracking-widest mb-2">Top Rated</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d]">Featured Services</h2>
            </div>
            <Link to="/services" className="text-[#a56f27] font-semibold text-sm hover:underline hidden sm:block">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.id} onClick={() => nav('/buyer/find-services')} className="bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden h-44">
                  <img src={svc.img} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#0f1f3d] text-xs font-bold px-2.5 py-1 rounded-full">{svc.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0f1f3d] text-sm leading-snug mb-1">{svc.name}</h3>
                  <p className="text-slate-500 text-xs mb-2">{svc.provider}</p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRating rating={svc.rating} />
                    <span className="text-slate-700 text-xs font-semibold">{svc.rating}</span>
                    <span className="text-slate-400 text-xs">({svc.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">From</span>
                      <div className="text-[#0f1f3d] font-extrabold text-sm">{svc.price}</div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Icon name="location" className="size-3.5" /> {svc.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#a56f27] text-sm font-bold uppercase tracking-widest mb-2">Top Providers</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d]">Featured Providers</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-200 p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img src={p.img} alt={p.name} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <h3 className="font-extrabold text-[#0f1f3d] text-base mb-0.5">{p.name}</h3>
                <p className="text-slate-500 text-xs mb-3">{p.specialty}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <StarRating rating={p.rating} />
                  <span className="text-xs font-semibold">{p.rating}</span>
                  <span className="text-slate-400 text-xs">({p.reviews})</span>
                </div>
                <p className="text-slate-400 text-xs mb-4">{p.events} events · {p.location}</p>
                <div className="flex gap-2 w-full">
                  <button onClick={() => nav('/buyer/provider/1')} className="flex-1 text-xs font-semibold border border-slate-200 text-[#0f1f3d] py-2 rounded-xl hover:bg-slate-50 transition-colors">View Profile</button>
                  <button onClick={() => nav('/buyer/request-quote')} className="flex-1 text-xs font-semibold bg-[#102c2a] text-white py-2 rounded-xl hover:bg-[#183c39] transition-colors">Request Quote</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#102c2a] relative overflow-hidden">
        <div className="absolute right-0 top-0 size-80 rounded-full bg-[#c89445]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-[#e0b66f] text-sm font-bold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How EventHub Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {HOW.map((item, i) => (
              <div key={i}>
                <div className="w-12 h-12 rounded-2xl bg-[#c89445]/15 border border-[#c89445]/30 flex items-center justify-center mb-4">
                  <span className="text-[#e0b66f] font-extrabold text-sm">{item.step}</span>
                </div>
                <h3 className="font-extrabold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#102c2a] to-[#1d4641] rounded-3xl px-8 py-14 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Start Planning Your Event Today</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">Join 10,000+ event organizers who trust EventHub.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup" className="inline-flex items-center justify-center bg-[#c89445] hover:bg-[#b27c32] text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm">
                Create Your Event — Free
              </Link>
              <Link to="/signup?role=seller" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm border border-white/20">
                List Your Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
