import type { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  tone?: 'primary' | 'danger' | 'success';
  onClose: () => void;
  onConfirm?: () => void;
};

export default function Modal({ open, title, children, confirmLabel, tone = 'primary', onClose, onConfirm }: ModalProps) {
  if (!open) return null;
  const toneClass = tone === 'danger' ? 'bg-red-600 hover:bg-red-700' : tone === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-violet-600 hover:bg-violet-700';
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-extrabold text-[#0f1f3d]">{title}</h2>
          <button onClick={onClose} aria-label="Close modal" className="text-slate-400 hover:text-slate-700 text-xl">×</button>
        </div>
        <div className="p-6 text-sm text-slate-600">{children}</div>
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-white">Cancel</button>
          {confirmLabel && <button onClick={() => { onConfirm?.(); onClose(); }} className={`${toneClass} px-4 py-2 rounded-xl text-white text-sm font-bold`}>{confirmLabel}</button>}
        </div>
      </div>
    </div>
  );
}
