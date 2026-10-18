import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { categoryApi, listingApi, type Listing } from '../../api/client';

const FIELDS = ['Service Name', 'Starting Price', 'Location', 'Service Area', 'Availability'];

export default function ServiceForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [values, setValues] = useState<Record<string, string>>({ 'Service Name': '', 'Starting Price': '', Location: '', 'Service Area': '', Availability: '' });
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { categoryApi.list().then(setCategories).catch((err) => setError(err instanceof Error ? err.message : 'Could not load categories.')); if (id) listingApi.get(Number(id)).then((listing: Listing) => { setValues((current) => ({ ...current, 'Service Name': listing.title, 'Starting Price': String(listing.price), Location: listing.location || '' })); setCategoryId(String(listing.category.id)); setDescription(listing.description); }).catch((err) => setError(err instanceof Error ? err.message : 'Could not load service.')); }, [id]);
  const submit = async (status: 'PENDING' | 'DRAFT') => {
    setError(''); setBusy(true);
    try {
      const input = { title: values['Service Name'], price: Number(values['Starting Price']), location: values.Location || null, categoryId: Number(categoryId), description, status };
      if (editing && id) await listingApi.update(Number(id), input); else await listingApi.create(input);
      nav('/seller/services');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not save service.'); }
    finally { setBusy(false); }
  };
  return (
    <div className="max-w-4xl space-y-6">
      <div><button onClick={() => nav('/seller/services')} className="text-sm text-slate-500 hover:text-emerald-600 mb-3">← Back to services</button><h1 className="text-2xl font-extrabold text-[#0f1f3d]">{editing ? 'Edit Service' : 'Add New Service'}</h1><p className="text-sm text-slate-500 mt-1">Create a clear, compelling listing that helps customers book confidently.</p></div>
      <form onSubmit={(event) => { event.preventDefault(); void submit('PENDING'); }} className="space-y-5">
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-extrabold text-[#0f1f3d] mb-5">Service details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span><input value={values[field] || ''} onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))} required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></label>)}
            <label><span className="block text-xs font-bold text-slate-500 mb-1.5">Category</span><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
            <label><span className="block text-xs font-bold text-slate-500 mb-1.5">Pricing Type</span><select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"><option>Fixed price</option><option>Starting from</option><option>Custom quote</option></select></label>
            <label className="sm:col-span-2"><span className="block text-xs font-bold text-slate-500 mb-1.5">Description</span><textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} required minLength={20} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" /></label>
          </div>
        </section>
        <section className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-extrabold text-[#0f1f3d]">Media, packages & features</h2>
          <label className="block border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500 cursor-pointer"><input type="file" multiple className="hidden" />Upload service images</label>
          {['Package Options', 'Features', 'Terms & Conditions'].map((field) => <label key={field}><span className="block text-xs font-bold text-slate-500 mb-1.5">{field}</span><textarea rows={3} placeholder={`Add ${field.toLowerCase()}`} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" /></label>)}
        </section>
        <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={() => nav('/seller/services')} className="border border-slate-200 px-5 py-3 rounded-xl text-sm font-bold text-slate-600">Cancel</button>{!editing && <button type="button" disabled={busy} onClick={() => void submit('DRAFT')} className="border border-emerald-200 px-5 py-3 rounded-xl text-sm font-bold text-emerald-600">Save Draft</button>}{error && <p role="alert" className="text-sm text-red-600 mr-auto">{error}</p>}<button disabled={busy} className="bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl text-sm font-bold text-white">{editing ? 'Save Changes' : 'Publish Service'}</button></div>
      </form>
    </div>
  );
}
