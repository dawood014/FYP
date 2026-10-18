import { useEffect, useState } from 'react';
import { sellerApi } from '../../api/client';

export default function BusinessProfile() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ businessName: '', description: '', phone: '', location: '', website: '' });
  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [key]: event.target.value }));
  useEffect(() => { sellerApi.profile().then((profile) => setForm({ businessName: String(profile.businessName || ''), description: String(profile.description || ''), phone: String(profile.phone || ''), location: String(profile.location || ''), website: String(profile.website || '') })).catch((err) => setError(err instanceof Error ? err.message : 'Could not load business profile.')); }, []);
  const save = async () => { setError(''); try { await sellerApi.updateProfile({ businessName: form.businessName, description: form.description || undefined, phone: form.phone || undefined, location: form.location || undefined, website: form.website || undefined }); setSaved(true); setTimeout(() => setSaved(false), 3000); } catch (err) { setError(err instanceof Error ? err.message : 'Could not save profile.'); } };
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-[#0f1f3d]">Business Profile</h1><p className="text-sm text-slate-500 mt-1">Present your experience, services, and availability to customers.</p></div>
        {saved && <span className="text-emerald-600 text-sm font-semibold">✓ Changes saved</span>}
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {[['Rating', '4.9 / 5'], ['Reviews', '128'], ['Events completed', '340'], ['Experience', '8+ years']].map(([label, value]) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5"><p className="text-xs font-bold text-slate-400">{label}</p><p className="text-xl font-extrabold text-[#0f1f3d] mt-2">{value}</p></div>
        ))}
      </div>

      {/* Cover & Logo */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] relative">
          <button className="absolute bottom-3 right-3 text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">Change Cover</button>
        </div>
        <div className="px-6 pb-5">
          <div className="-mt-8 flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#4f8ef7] border-4 border-white flex items-center justify-center text-white text-xl font-extrabold shadow-md">L</div>
            <button className="mb-1 text-xs text-[#4f8ef7] font-semibold border border-[#4f8ef7]/30 px-3 py-1 rounded-lg hover:bg-[#4f8ef7]/5 transition-colors">Change Logo</button>
            <span className="mb-1 ml-auto text-xs bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full">✓ Verified</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        <h2 className="font-bold text-[#0f1f3d]">Business Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Business Name</label><input value={form.businessName} onChange={set('businessName')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Owner Name</label><input defaultValue="Muhammad Ali" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Business Category</label><input defaultValue="Photography & Videography" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Business Description</label><textarea rows={3} value={form.description} onChange={set('description')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" /></div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Phone</label><input value={form.phone} onChange={set('phone')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Email</label><input defaultValue="info@lenslightstudio.pk" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">City</label>
            <select value={form.location} onChange={set('location')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">Select city</option><option>Lahore</option>
              {['Karachi', 'Islamabad', 'Peshawar'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Experience</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>8–10 years</option>
            </select>
          </div>
          <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Website</label><input value={form.website} onChange={set('website')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}<button onClick={() => void save()} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">Save Changes</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5"><h2 className="font-extrabold text-[#0f1f3d]">Portfolio</h2><button className="text-xs font-bold text-emerald-600">Manage Portfolio</button></div>
          <div className="grid grid-cols-3 gap-3">
            {['photo-1519225421980-715cb0215aed', 'photo-1511285560929-80b456fea0bc', 'photo-1606216794074-735e91aa2c92'].map((photo) => <img key={photo} src={`https://images.unsplash.com/${photo}?w=300&h=220&fit=crop`} alt="Event portfolio" className="w-full h-28 object-cover rounded-xl" />)}
          </div>
        </section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5"><h2 className="font-extrabold text-[#0f1f3d]">Services</h2><button className="text-xs font-bold text-emerald-600">Manage Services</button></div>
          {['Wedding Photography', 'Corporate Videography', 'Private Event Coverage'].map((service) => <div key={service} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"><span className="text-sm font-semibold text-slate-700">{service}</span><span className="text-xs text-emerald-600 font-bold">Active</span></div>)}
        </section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5"><h2 className="font-extrabold text-[#0f1f3d]">Availability</h2><button className="text-xs font-bold text-emerald-600">Manage Availability</button></div>
          <p className="text-sm text-slate-600">Accepting bookings for the next 90 days</p><p className="text-xs text-slate-400 mt-2">Typically responds within 2 hours</p>
        </section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Business Hours</h2>
          {[['Monday–Friday', '9:00 AM – 7:00 PM'], ['Saturday', '10:00 AM – 6:00 PM'], ['Sunday', 'By appointment']].map(([day, time]) => <div key={day} className="flex justify-between py-2 text-sm"><span className="text-slate-500">{day}</span><span className="font-semibold text-slate-700">{time}</span></div>)}
        </section>
      </div>
    </div>
  );
}
