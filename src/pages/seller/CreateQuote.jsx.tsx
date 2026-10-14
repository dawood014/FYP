import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function CreateQuote() {
  const nav = useNavigate();
  const [sent, setSent] = useState(false);
  const [price, setPrice] = useState('45000');

  if (sent) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <div className="text-5xl mb-4">📤</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Quote Sent!</h2>
        <p className="text-slate-500 text-sm mb-6">Ahmed Khan will be notified of your quotation. You'll hear back soon.</p>
        <button onClick={() => nav('/seller')} className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors text-sm">Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Create Quote</h1>
      <p className="text-slate-500 text-sm -mt-4">For: <span className="font-semibold text-[#0f1f3d]">TechCorp Annual Conference — Ahmed Khan</span></p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-bold text-[#0f1f3d]">Quote Details</h2>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Service</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Photography & Videography</option>
              <option>Photography Only</option>
              <option>Videography Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Price (PKR)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Inclusions</label>
            <textarea rows={4} defaultValue="- 10-hour event coverage&#10;- 400+ edited photos&#10;- 2 videographers&#10;- 5-min highlight reel&#10;- Online gallery in 7 days" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Notes</label>
            <textarea rows={2} defaultValue="30% advance required to confirm booking. We arrive 1 hour before event." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Valid Until</label>
            <input type="date" defaultValue="2024-10-10" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#0f1f3d] rounded-2xl p-6 text-white space-y-4">
          <h2 className="font-bold text-blue-200 text-sm">Live Preview</h2>
          <div>
            <div className="text-blue-300 text-xs mb-1">From</div>
            <div className="font-extrabold text-lg">Lens & Light Studio</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">Service</div>
            <div className="font-semibold text-sm">Photography & Videography</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">For</div>
            <div className="font-semibold text-sm">TechCorp Annual Conference</div>
          </div>
          <hr className="border-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-blue-300 text-sm">Quoted Amount</span>
            <span className="text-2xl font-extrabold">Rs. {parseInt(price || '0').toLocaleString()}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-xs text-blue-300 mb-2">Inclusions</div>
            <ul className="text-xs text-white space-y-1">
              {['10-hour coverage', '400+ edited photos', '2 videographers', 'Highlight reel'].map((f) => (
                <li key={f} className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span>{f}</li>
              ))}
            </ul>
          </div>

          <button onClick={() => setSent(true)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2">
            Send Quote →
          </button>
        </div>
      </div>
    </div>
  );
}
