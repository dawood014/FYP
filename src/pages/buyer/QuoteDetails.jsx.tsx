import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function QuoteDetails() {
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => nav('/buyer/requests')} className="text-slate-500 hover:text-[#0f1f3d] text-sm">← Back</button>
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Quote Details</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        {/* Provider */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0f1f3d] text-white flex items-center justify-center font-bold text-lg">L</div>
            <div>
              <div className="font-extrabold text-[#0f1f3d]">Lens & Light Studio</div>
              <div className="text-xs text-slate-500">Photography · ✓ Verified</div>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Quote Received</span>
        </div>

        {/* Quote Info */}
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Service', 'Photography & Videography'],
            ['Event', 'TechCorp Annual Conference'],
            ['Event Date', 'October 20, 2024'],
            ['Location', 'Islamabad'],
            ['Valid Until', 'October 10, 2024'],
          ].map(([k, v]) => (
            <div key={k} className={`${k === 'Service' || k === 'Event' ? 'col-span-2' : ''}`}>
              <div className="text-xs text-slate-400 mb-0.5">{k}</div>
              <div className="font-semibold text-[#0f1f3d] text-sm">{v}</div>
            </div>
          ))}
        </div>

        <hr className="border-slate-100" />

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#0f1f3d]">Quoted Amount</span>
          <span className="text-2xl font-extrabold text-[#0f1f3d]">Rs. 45,000</span>
        </div>

        {/* Inclusions */}
        <div>
          <h3 className="font-bold text-[#0f1f3d] text-sm mb-3">What's Included</h3>
          <ul className="space-y-2">
            {['10-hour event coverage', '400+ professionally edited photos', 'Online gallery delivery in 7 days', '2 videographers', 'Highlight video (5 min)', 'RAW files available on request'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-emerald-500 font-bold text-xs">✓</span>{f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#0f1f3d] text-sm mb-2">Provider Notes</h3>
          <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3">We will arrive 1 hour before the event starts for setup. A 30% advance is required to confirm the booking.</p>
        </div>

        <div>
          <h3 className="font-bold text-[#0f1f3d] text-sm mb-2">Terms & Conditions</h3>
          <p className="text-xs text-slate-500">30% advance required. Cancellation within 48 hours forfeits the advance. Final delivery in 7–10 business days.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => nav('/buyer/messages')} className="flex-1 text-sm font-semibold border border-slate-200 text-[#0f1f3d] py-3 rounded-xl hover:bg-slate-50 transition-colors">💬 Message</button>
          <button className="flex-1 text-sm font-semibold border border-red-200 text-red-500 py-3 rounded-xl hover:bg-red-50 transition-colors">Decline</button>
          <button onClick={() => setShowModal(true)} className="flex-1 text-sm font-bold bg-[#4f8ef7] text-white py-3 rounded-xl hover:bg-[#3a7ae8] transition-colors">Accept Quote ✓</button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-2">Accept this quotation?</h2>
            <p className="text-slate-500 text-sm mb-6">This will create a booking with Lens & Light Studio for Rs. 45,000. A 30% advance (Rs. 13,500) is required to confirm.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 text-sm transition-colors">Cancel</button>
              <button onClick={() => { setShowModal(false); nav('/buyer/booking'); }} className="flex-1 bg-[#4f8ef7] text-white font-bold py-3 rounded-xl hover:bg-[#3a7ae8] text-sm transition-colors">Confirm & Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
