import { useState } from 'react';
import { Link } from 'react-router';

export default function BuyerProfile() {
  const [editing, setEditing] = useState(false);
  const stats = [['Events', '8'], ['Bookings', '14'], ['Reviews', '9']];
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Profile</h1><p className="text-sm text-slate-500 mt-1">Your organizer identity and account activity.</p></div><div className="flex gap-2"><button onClick={() => window.alert('Password changes are not available because authentication is not connected.')} className="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm font-bold">Change Password</button><button onClick={() => { if (editing) window.alert('Profile editing is local to this prototype. No account changes were saved.'); setEditing(!editing); }} className="bg-[#4f8ef7] text-white px-4 py-2 rounded-xl text-sm font-bold">{editing ? 'Save Profile' : 'Edit Profile'}</button></div></div>
      <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-6">
        <aside className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Ahmed Khan" className="size-28 rounded-2xl object-cover mx-auto mb-4" />
          <h2 className="font-extrabold text-[#0f1f3d] text-xl">Ahmed Khan</h2><p className="text-sm text-slate-500 mt-1">Event Organizer · Lahore</p>
          <button onClick={() => window.alert('Profile picture uploads are not connected to a backend. No image was uploaded.')} className="mt-5 text-[#4f8ef7] border border-blue-100 px-4 py-2 rounded-xl text-xs font-bold">Upload Profile Picture</button>
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">{stats.map(([label, value]) => <div key={label}><div className="font-extrabold text-[#0f1f3d]">{value}</div><div className="text-xs text-slate-400">{label}</div></div>)}</div>
        </aside>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Account information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[['Full name', 'Ahmed Khan'], ['Email', 'ahmed@example.com'], ['Phone', '+92 300 123 4567'], ['Location', 'Lahore, Pakistan']].map(([label, value]) => <label key={label}><span className="block text-xs font-bold text-slate-500 mb-1.5">{label}</span><input disabled={!editing} defaultValue={value} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm disabled:bg-slate-50" /></label>)}
            <label className="sm:col-span-2"><span className="block text-xs font-bold text-slate-500 mb-1.5">Bio</span><textarea disabled={!editing} rows={4} defaultValue="I organize corporate conferences, community experiences, and private celebrations across Lahore." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm disabled:bg-slate-50 resize-none" /></label>
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-4 flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold text-sm text-[#0f1f3d]">Recent booking</p><p className="text-xs text-slate-500 mt-1">Premium Wedding Photography · Confirmed</p></div><Link to="/buyer/bookings" className="text-xs font-bold text-[#4f8ef7]">View bookings →</Link></div>
        </div>
      </div>
    </div>
  );
}
