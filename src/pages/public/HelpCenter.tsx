import { Link } from 'react-router';

const TOPICS = ['Account Help', 'Booking Help', 'Payment Help', 'Service Provider Help'];
const FAQS = ['How do I request a quote?', 'Are providers verified?', 'How are payments protected?', 'Can I cancel a booking?'];

export default function HelpCenter() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0f1f3d] py-20 text-center px-4"><h1 className="text-4xl font-extrabold text-white mb-4">How can we help?</h1><div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 flex"><input placeholder="Search help articles..." className="flex-1 px-4 py-3 text-sm focus:outline-none" /><button className="bg-[#4f8ef7] text-white font-bold px-6 rounded-xl text-sm">Search</button></div></section>
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">{TOPICS.map((topic, i) => <div key={topic} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"><div className="size-10 rounded-xl bg-blue-50 text-[#4f8ef7] flex items-center justify-center font-extrabold mb-4">0{i + 1}</div><h2 className="font-extrabold text-[#0f1f3d]">{topic}</h2><p className="text-xs text-slate-500 mt-2">Guides and answers for common questions.</p></div>)}</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-5">Frequently asked questions</h2>
        <div className="grid md:grid-cols-2 gap-4">{FAQS.map((faq) => <details key={faq} className="bg-white rounded-2xl border border-slate-100 p-5"><summary className="font-bold text-sm text-[#0f1f3d] cursor-pointer">{faq}</summary><p className="text-sm text-slate-500 mt-3 leading-6">Our support team and marketplace tools are designed to make this simple. Follow the guided steps in your dashboard or contact us for personal help.</p></details>)}</div>
        <div className="mt-12 bg-blue-50 rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h2 className="font-extrabold text-[#0f1f3d]">Still need help?</h2><p className="text-sm text-slate-500 mt-1">Our support specialists are ready to assist.</p></div><Link to="/contact" className="bg-[#4f8ef7] text-white font-bold px-5 py-3 rounded-xl text-sm text-center">Contact Support</Link></div>
      </div>
    </div>
  );
}
