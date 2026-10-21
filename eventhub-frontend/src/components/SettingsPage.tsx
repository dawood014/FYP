import { useState } from 'react';

type Group = { title: string; fields: string[] };

export default function SettingsPage({ title, groups, accent = 'blue' }: { title: string; groups: Group[]; accent?: 'blue' | 'emerald' | 'violet' }) {
  const [saved, setSaved] = useState(false);
  const ring = accent === 'emerald' ? 'focus:ring-emerald-500' : accent === 'violet' ? 'focus:ring-violet-500' : 'focus:ring-[#4f8ef7]';
  const button = accent === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' : accent === 'violet' ? 'bg-violet-600 hover:bg-violet-700' : 'bg-[#4f8ef7] hover:bg-[#3a7ae8]';
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-[#0f1f3d]">{title}</h1><p className="text-sm text-slate-500 mt-1">Manage your preferences, security, and account information.</p></div>
        {saved && <span className="text-emerald-600 text-sm font-semibold">Changes saved</span>}
      </div>
      {groups.map((group) => (
        <section key={group.title} className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">{group.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.fields.map((field) => {
              const isToggle = /Notifications|Authentication|Visibility|Preferences|Registration|Approval|Moderation/.test(field);
              return isToggle ? (
                <label key={field} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                  <span className="text-sm font-semibold text-slate-700">{field}</span>
                  <input type="checkbox" defaultChecked className="size-4 accent-blue-600" />
                </label>
              ) : (
                <label key={field} className="block">
                  <span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span>
                  <input defaultValue={field.includes('Email') ? 'hello@eventhub.pk' : ''} placeholder={`Enter ${field.toLowerCase()}`} className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 ${ring}`} />
                </label>
              );
            })}
          </div>
        </section>
      ))}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} className={`${button} text-white font-bold px-6 py-3 rounded-xl text-sm`}>Save Changes</button>
        <button className="border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm">Logout</button>
        <button className="border border-red-200 text-red-600 font-bold px-6 py-3 rounded-xl text-sm">Delete Account</button>
      </div>
    </div>
  );
}
