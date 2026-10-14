import { useNavigate, useParams } from 'react-router';

const FIELDS = ['Service Name', 'Starting Price', 'Location', 'Service Area', 'Availability'];

export default function ServiceForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  return (
    <div className="max-w-4xl space-y-6">
      <div><button onClick={() => nav('/seller/services')} className="text-sm text-slate-500 hover:text-emerald-600 mb-3">← Back to services</button><h1 className="text-2xl font-extrabold text-[#0f1f3d]">{editing ? 'Edit Service' : 'Add New Service'}</h1><p className="text-sm text-slate-500 mt-1">Create a clear, compelling listing that helps customers book confidently.</p></div>
      <form onSubmit={(event) => { event.preventDefault(); window.alert('Service publishing is not connected to a backend. No changes were saved.'); }} className="space-y-5">
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Service details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span><input defaultValue={editing && field === 'Service Name' ? 'Wedding Photography Package' : ''} required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></label>)}
            <label><span className="block text-xs font-bold text-slate-500 mb-1.5">Category</span><select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"><option>Photography</option><option>Catering</option><option>Decoration</option><option>Entertainment</option></select></label>
            <label><span className="block text-xs font-bold text-slate-500 mb-1.5">Pricing Type</span><select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"><option>Fixed price</option><option>Starting from</option><option>Custom quote</option></select></label>
            <label className="sm:col-span-2"><span className="block text-xs font-bold text-slate-500 mb-1.5">Description</span><textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" /></label>
          </div>
        </section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-extrabold text-[#0f1f3d]">Media, packages & features</h2>
          <label className="block border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500 cursor-pointer"><input type="file" multiple className="hidden" />Upload service images</label>
          {['Package Options', 'Features', 'Terms & Conditions'].map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span><textarea rows={3} placeholder={`Add ${field.toLowerCase()}`} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" /></label>)}
        </section>
        <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={() => nav('/seller/services')} className="border border-slate-200 px-5 py-3 rounded-xl text-sm font-bold text-slate-600">Cancel</button>{!editing && <button type="button" onClick={() => window.alert('Draft saving is not connected to a backend. No draft was saved.')} className="border border-emerald-200 px-5 py-3 rounded-xl text-sm font-bold text-emerald-600">Save Draft</button>}<button className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl text-sm font-bold text-white">{editing ? 'Save Changes' : 'Publish Service'}</button></div>
      </form>
    </div>
  );
}
