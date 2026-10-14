import { useState } from 'react';

const METRICS = [['Total Revenue', 'Rs. 1.24M', '+18%'], ['Total Bookings', '86', '+12%'], ['Total Services', '7', '+1'], ['Profile Views', '4,820', '+24%'], ['Service Views', '12,460', '+16%'], ['Customer Inquiries', '238', '+9%'], ['Average Rating', '4.9', '+0.2']];
const BARS = [45, 58, 52, 72, 65, 82, 76, 92, 86, 100, 94, 108];

export default function Analytics() {
  const [period, setPeriod] = useState('30 Days');
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-extrabold text-[#0f1f3d]">Analytics</h1><p className="text-sm text-slate-500 mt-1">Performance insights across your marketplace presence.</p></div><div className="flex bg-white border border-slate-200 p-1 rounded-xl">{['7 Days', '30 Days', '3 Months', '1 Year'].map((item) => <button key={item} onClick={() => setPeriod(item)} className={`px-3 py-2 rounded-lg text-xs font-bold ${period === item ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}>{item}</button>)}</div></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{METRICS.map(([label, value, change]) => <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5"><p className="text-xs font-bold text-slate-400">{label}</p><div className="flex items-end justify-between mt-3"><span className="text-2xl font-extrabold text-[#0f1f3d]">{value}</span><span className="text-xs font-bold text-emerald-600">{change}</span></div></div>)}</div>
      <div className="grid lg:grid-cols-3 gap-5">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6"><div className="flex justify-between mb-8"><div><h2 className="font-extrabold text-[#0f1f3d]">Revenue & bookings</h2><p className="text-xs text-slate-400 mt-1">{period} performance</p></div><span className="text-emerald-600 font-bold text-sm">Rs. 286,000</span></div><div className="h-56 flex items-end gap-2 border-b border-slate-100">{BARS.map((height, i) => <div key={i} className="flex-1 bg-emerald-100 hover:bg-emerald-400 rounded-t-md transition-colors" style={{ height: `${height}px` }} />)}</div><div className="flex justify-between text-xs text-slate-400 mt-3"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span></div></section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6"><h2 className="font-extrabold text-[#0f1f3d] mb-6">Service performance</h2>{[['Wedding Photography', '42%'], ['Corporate Video', '31%'], ['Birthday Package', '18%'], ['Other', '9%']].map(([name, value], i) => <div key={name} className="mb-5"><div className="flex justify-between text-xs font-bold text-slate-600 mb-2"><span>{name}</span><span>{value}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 bg-emerald-500 rounded-full" style={{ width: value }} /></div></div>)}</section>
      </div>
    </div>
  );
}
