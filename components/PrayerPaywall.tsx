import React, { useEffect, useRef, useState } from 'react';
import { ArrowTopRightOnSquareIcon, SparklesIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { prayerPayUrl, PRAYER_PRICE, PAYPAL_EMAIL, newInvoiceId } from './useClub';

interface Props { topic: string; uid: string | null; onClose: () => void; onPaid: (invoice: string) => void; busy?: boolean }

export const PrayerPaywall: React.FC<Props> = ({ topic, uid, onClose, onPaid, busy }) => {
  const invoice = useRef(newInvoiceId('prayer')).current;
  const [clickedAt, setClickedAt] = useState<number | null>(null);
  const [back, setBack] = useState(false);
  const timer = useRef<number | null>(null);

  // Unlock the confirm button once the person has been away and returned (or after a short wait).
  useEffect(() => {
    if (!clickedAt) return;
    const check = () => { if (document.visibilityState === 'visible' && Date.now() - clickedAt > 4000) setBack(true); };
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    timer.current = window.setTimeout(() => setBack(true), 12000);
    return () => { document.removeEventListener('visibilitychange', check); window.removeEventListener('focus', check); if (timer.current) window.clearTimeout(timer.current); };
  }, [clickedAt]);

  return (
    <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="relative w-full sm:max-w-md bg-white dark:bg-stone-900 rounded-t-[32px] sm:rounded-[32px] border border-gold-500/40 shadow-2xl p-6 sm:p-8 space-y-5 text-center max-h-[94dvh] overflow-y-auto" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center text-stone-400"><XMarkIcon className="w-6 h-6" /></button>
        <SparklesIcon className="w-10 h-10 text-gold-500 mx-auto" />
        <div className="space-y-1">
          <h3 className="font-display text-xl font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">Receive your prayer</h3>
          <p className="font-serif italic text-stone-500 text-sm">for “{topic.length > 60 ? topic.slice(0, 57) + '…' : topic}”</p>
        </div>
        <div className="font-display text-6xl font-bold text-gold-500 leading-none">${PRAYER_PRICE}</div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">One dollar per prayer · donated through PayPal</p>

        <ol className="text-left space-y-3 text-sm font-serif text-stone-600 dark:text-stone-300">
          <li className="flex gap-3"><span style={{ width: 24, height: 24, minWidth: 24 }} className="shrink-0 rounded-full bg-gold-500 text-black text-xs font-bold flex items-center justify-center">1</span> Tap the button and send $1 on PayPal. It takes about 20 seconds.</li>
          <li className="flex gap-3"><span style={{ width: 24, height: 24, minWidth: 24 }} className="shrink-0 rounded-full bg-gold-500 text-black text-xs font-bold flex items-center justify-center">2</span> Come back to this page. Your prayer is composed right away.</li>
        </ol>

        <a href={prayerPayUrl(invoice, uid)} target="_blank" rel="noopener noreferrer" onClick={() => setClickedAt(Date.now())}
          className="flex items-center justify-center gap-3 w-full py-5 rounded-full bg-gold-500 text-black font-bold uppercase tracking-[0.2em] text-sm shadow-xl active:scale-[0.98] transition-transform">
          Pay $1 with PayPal <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </a>

        {clickedAt && (
          back ? (
            <button onClick={() => onPaid(invoice)} disabled={busy} className="flex items-center justify-center gap-3 w-full py-5 rounded-full border-2 border-green-600 bg-green-600/10 text-green-700 dark:text-green-400 font-bold uppercase tracking-[0.15em] text-sm disabled:opacity-50 animate-fade-in">
              <CheckCircleIcon className="w-6 h-6" /> I sent my $1. Compose my prayer
            </button>
          ) : (
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 animate-pulse">Waiting for you to return from PayPal…</p>
          )
        )}
        <p className="text-[10px] text-stone-400 leading-relaxed">Payments go to {PAYPAL_EMAIL}. Your donation is recorded with a PayPal reference. Payment questions: {PAYPAL_EMAIL}.</p>
      </div>
    </div>
  );
};
