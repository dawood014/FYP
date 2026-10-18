import { useState } from 'react';
import Modal from '../../components/Modal';

const USERS = [
  { id: 'U-001', name: 'Ahmed Khan', role: 'Organizer', email: 'ahmed@example.com', city: 'Islamabad', status: 'Active', joined: 'Jan 2024', events: 4 },
  { id: 'U-002', name: 'Sara Malik', role: 'Organizer', email: 'sara@techcorp.pk', city: 'Lahore', status: 'Active', joined: 'Feb 2024', events: 2 },
  { id: 'U-003', name: 'Ali Hassan', role: 'Organizer', email: 'ali@gmail.com', city: 'Karachi', status: 'Suspended', joined: 'Mar 2024', events: 1 },
  { id: 'U-004', name: 'Muhammad Ali', role: 'Provider', email: 'info@lenslightstudio.pk', city: 'Lahore', status: 'Active', joined: 'Dec 2023', events: 340 },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState<{ type: 'view' | 'edit' | 'suspend'; user: (typeof USERS)[number] } | null>(null);
  const filtered = USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Users</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-full sm:w-64" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Name', 'Role', 'Email', 'City', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{u.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-xs">{u.name[0]}</div>
                      <span className="font-semibold text-sm text-[#0f1f3d]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${u.role === 'Provider' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{u.email}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{u.city}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{u.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setAction({ type: 'view', user: u })} className="text-xs text-[#4f8ef7] hover:underline font-semibold">View</button>
                      <button onClick={() => setAction({ type: 'edit', user: u })} className="text-xs text-amber-500 hover:underline font-semibold">Edit</button>
                      <button onClick={() => setAction({ type: 'suspend', user: u })} className="text-xs text-red-400 hover:underline font-semibold">{u.status === 'Active' ? 'Suspend' : 'Restore'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={Boolean(action)} title={action?.type === 'view' ? 'User details' : action?.type === 'edit' ? 'Edit user' : 'Suspend user'} confirmLabel={action?.type === 'edit' ? 'Save Changes' : action?.type === 'suspend' ? 'Suspend User' : undefined} tone={action?.type === 'suspend' ? 'danger' : 'primary'} onClose={() => setAction(null)}>
        {action?.type === 'view' && <div className="space-y-4"><div className="flex items-center gap-3"><div className="size-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-extrabold">{action.user.name[0]}</div><div><p className="font-extrabold text-[#0f1f3d]">{action.user.name}</p><p className="text-xs text-slate-400">{action.user.id} · Joined {action.user.joined}</p></div></div><div className="grid grid-cols-2 gap-3">{[['Email', action.user.email], ['Phone', '+92 300 1234567'], ['Role', action.user.role], ['Status', action.user.status], ['Booking history', `${action.user.events} records`], ['Activity', 'Active today']].map(([label, value]) => <div key={label} className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">{label}</p><p className="font-semibold text-slate-700 mt-1">{value}</p></div>)}</div></div>}
        {action?.type === 'edit' && <div className="grid gap-4">{['Name', 'Email', 'Phone', 'Role'].map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1">{field}</span><input defaultValue={field === 'Name' ? action.user.name : field === 'Email' ? action.user.email : ''} className="w-full border border-slate-200 rounded-xl px-4 py-3" /></label>)}</div>}
        {action?.type === 'suspend' && <div><p className="font-bold text-slate-800">Are you sure you want to suspend this user?</p><p className="mt-2">They will lose access to marketplace actions until restored.</p></div>}
      </Modal>
    </div>
  );
}
