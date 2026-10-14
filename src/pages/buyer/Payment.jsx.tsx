import { useState } from 'react';

const METHODS = [
  { id: 'card', label: 'Debit / Credit Card', icon: '💳' },
  { id: 'jazzcash', label: 'JazzCash', icon: '📱' },
  { id: 'easypaisa', label: 'EasyPaisa', icon: '💚' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
];

export default function Payment() {
  const [method, setMethod] = useState('card');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Payment</h1>

      <div className="grid sm:grid-cols-5 gap-6">
        {/* Payment form */}
        <div className="sm:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h2 className="font-bold text-[#0f1f3d]">Payment Method</h2>
          <div className="space-y-2">
            {METHODS.map((m) => (
              <label key={m.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${method === m.id ? 'border-[#4f8ef7] bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="text-[#4f8ef7]" />
                <span className="text-xl">{m.icon}</span>
                <span className="font-semibold text-sm text-[#0f1f3d]">{m.label}</span>
              </label>
            ))}
          </div>

          {method === 'card' && (
            <div className="space-y-3 pt-2">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Card Number</label><input placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Expiry</label><input placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">CVV</label><input placeholder="123" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">Name on Card</label><input placeholder="Ahmed Khan" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
            </div>
          )}

          <button onClick={() => window.alert('Payment gateway is not configured. No payment was processed.')} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            Pay Rs. 13,500 & Confirm →
          </button>
          <p className="text-xs text-slate-400 text-center">🔒 Secured by EventHub. Your payment is protected.</p>
        </div>

        {/* Order summary */}
        <div className="sm:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-[#0f1f3d] mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600"><span>Provider</span><span className="font-semibold text-right">Lens & Light Studio</span></div>
              <div className="flex justify-between text-slate-600"><span>Service</span><span className="font-semibold text-right">Photography & Video</span></div>
              <div className="flex justify-between text-slate-600"><span>Event</span><span className="font-semibold text-right">TechCorp Conference</span></div>
              <div className="flex justify-between text-slate-600"><span>Date</span><span className="font-semibold">Oct 20, 2024</span></div>
              <hr className="border-slate-100 my-3" />
              <div className="flex justify-between text-slate-600"><span>Booking Amount</span><span className="font-semibold">Rs. 45,000</span></div>
              <div className="flex justify-between text-slate-600"><span>Advance (30%)</span><span className="font-semibold text-[#4f8ef7]">Rs. 13,500</span></div>
              <div className="flex justify-between text-slate-600"><span>Platform Fee</span><span className="font-bold text-emerald-600">Rs. 0</span></div>
              <hr className="border-slate-100 my-3" />
              <div className="flex justify-between font-extrabold text-[#0f1f3d] text-base"><span>Total Due Now</span><span>Rs. 13,500</span></div>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-emerald-700 text-xs font-semibold">✓ Rs. 0 platform fee for buyers</p>
            <p className="text-emerald-600 text-xs mt-1">Remaining balance of Rs. 31,500 due after event completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
