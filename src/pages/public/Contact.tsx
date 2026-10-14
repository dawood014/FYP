import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[.8fr_1.2fr] gap-8">
        <div className="bg-[#0f1f3d] rounded-3xl p-8 text-white">
          <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-3">Contact us</p><h1 className="text-3xl font-extrabold mb-4">We are here to help</h1><p className="text-blue-100/70 text-sm leading-7 mb-8">Talk to our marketplace support team about your account, booking, payment, or provider profile.</p>
          <div className="space-y-5 text-sm"><p><span className="block text-blue-300 text-xs mb-1">Email</span>support@eventhub.pk</p><p><span className="block text-blue-300 text-xs mb-1">Phone</span>+92 300 123 4567</p><p><span className="block text-blue-300 text-xs mb-1">Location</span>Lahore, Pakistan</p><p><span className="block text-blue-300 text-xs mb-1">Support hours</span>Monday–Saturday, 9am–7pm</p></div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-white border border-slate-100 rounded-3xl p-8">
          <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-6">Send a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {['Name', 'Email', 'Phone', 'Subject'].map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span><input required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></label>)}
            <label className="sm:col-span-2"><span className="block text-xs font-bold text-slate-500 mb-1.5">Message</span><textarea required rows={6} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] resize-none" /></label>
          </div>
          <button className="mt-5 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold px-6 py-3 rounded-xl text-sm">{sent ? 'Message Sent' : 'Send Message'}</button>
        </form>
      </div>
    </div>
  );
}
