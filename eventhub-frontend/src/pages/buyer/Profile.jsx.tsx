import { useEffect, useRef, useState } from 'react';
import { api, bookingApi, eventApi, userApi } from '../../api/client';
import { Link } from 'react-router';

export default function BuyerProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', avatarUrl: '' });
  const [stats, setStats] = useState([['Events', '0'], ['Bookings', '0'], ['Reviews', '—']]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => { userApi.profile().then((user) => setProfile({ name: user.name, email: user.email, phone: user.buyerProfile?.phone || '', avatarUrl: user.buyerProfile?.avatarUrl || '' })).catch((err) => setError(err instanceof Error ? err.message : 'Could not load profile.')); eventApi.list().then((page) => setStats((current) => [['Events', String(page.items.length)], current[1], current[2]])).catch(() => {}); bookingApi.list().then((page) => setStats((current) => [current[0], ['Bookings', String(page.items.length)], current[2]])).catch(() => {}); }, []);
  const save = async () => { setError(''); try { await userApi.updateProfile({ name: profile.name, phone: profile.phone || null }); setSaved(true); setEditing(false); } catch (err) { setError(err instanceof Error ? err.message : 'Could not update profile.'); } };
  const uploadAvatar = async (file?: File) => { if (!file) return; const data = new FormData(); data.set('file', file); try { const uploaded = await api.upload<{ url: string }>('/uploads', data); const updated = await userApi.updateProfile({ avatarUrl: uploaded.url }); setProfile((current) => ({ ...current, avatarUrl: updated.buyerProfile?.avatarUrl || uploaded.url })); } catch (err) { setError(err instanceof Error ? err.message : 'Could not upload image.'); } }
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Profile</h1><p className="text-sm text-slate-500 mt-1">Your organizer identity and account activity.</p></div><div className="flex gap-2"><button onClick={() => window.alert('Password changes are not available because authentication is not connected.')} className="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm font-bold">Change Password</button><button onClick={() => editing ? void save() : setEditing(true)} className="bg-[#4f8ef7] text-white px-4 py-2 rounded-xl text-sm font-bold">{editing ? 'Save Profile' : 'Edit Profile'}</button></div></div>
      <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-6">
        <aside className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <img src={profile.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'} alt={profile.name || 'Organizer'} className="size-28 rounded-2xl object-cover mx-auto mb-4" />
          <h2 className="font-extrabold text-[#0f1f3d] text-xl">{profile.name || 'Organizer'}</h2><p className="text-sm text-slate-500 mt-1">Event Organizer · Lahore</p>
          <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => void uploadAvatar(event.target.files?.[0])} /><button onClick={() => fileInput.current?.click()} className="mt-5 text-[#4f8ef7] border border-blue-100 px-4 py-2 rounded-xl text-xs font-bold">Upload Profile Picture</button>
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">{stats.map(([label, value]) => <div key={label}><div className="font-extrabold text-[#0f1f3d]">{value}</div><div className="text-xs text-slate-400">{label}</div></div>)}</div>
        </aside>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Account information</h2>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}{saved && <p role="status" className="text-sm text-emerald-600">Changes saved</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            {[['Full name', profile.name, 'name'], ['Email', profile.email, 'email'], ['Phone', profile.phone, 'phone'], ['Location', 'Lahore, Pakistan', 'location']].map(([label, value, field]) => <label key={label}><span className="block text-xs font-bold text-slate-500 mb-1.5">{label}</span><input disabled={!editing || field === 'email' || field === 'location'} value={value} onChange={(event) => field === 'name' || field === 'phone' ? setProfile((current) => ({ ...current, [field]: event.target.value })) : undefined} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm disabled:bg-slate-50" /></label>)}
            <label className="sm:col-span-2"><span className="block text-xs font-bold text-slate-500 mb-1.5">Bio</span><textarea disabled rows={4} defaultValue="Event organizer based in Lahore, Pakistan." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm disabled:bg-slate-50 resize-none" /></label>
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-4 flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold text-sm text-[#0f1f3d]">Recent booking</p><p className="text-xs text-slate-500 mt-1">Premium Wedding Photography · Confirmed</p></div><Link to="/buyer/bookings" className="text-xs font-bold text-[#4f8ef7]">View bookings →</Link></div>
        </div>
      </div>
    </div>
  );
}
