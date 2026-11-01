import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ChevronLeftIcon, ChevronRightIcon, XMarkIcon, ListBulletIcon, BookmarkIcon, LockClosedIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { LIBRARY, getBook, BookPage, pagesOf } from '../data/bookContent';
import { loadBookPages } from '../services/bookLoader';

interface BookReaderProps {
  bookId?: string;
  onClose: () => void;
  /** When set, only pages 1..previewPages are readable (preview mode). */
  previewPages?: number;
  startPage?: number;
  onProgress?: (bookId: string, page: number) => void;
  onJoin?: () => void;
  /** Synced reading data (members). When omitted, bookmarks stay on this device only. */
  bookmarks?: number[];
  onToggleBookmark?: (page: number) => void;
  readPages?: number[];
}

type ThemeKey = 'night' | 'sepia' | 'paper';
interface Prefs { size: number; theme: ThemeKey; font: 'serif' | 'sans'; spacing: 'snug' | 'normal' | 'roomy' }

const THEMES: Record<ThemeKey, { name: string; bg: string; bar: string; text: string; sub: string; line: string; chip: string }> = {
  night: { name: 'Night', bg: '#0c0a09', bar: '#171412', text: '#e7e5e4', sub: '#a8a29e', line: '#292524', chip: '#292524' },
  sepia: { name: 'Sepia', bg: '#f4ecd8', bar: '#eadfc4', text: '#433422', sub: '#8a7456', line: '#d9c9a3', chip: '#e2d4b2' },
  paper: { name: 'Paper', bg: '#fafaf9', bar: '#f0efed', text: '#1c1917', sub: '#78716c', line: '#e0deda', chip: '#e7e5e4' },
};
const SPACING = { snug: 1.55, normal: 1.75, roomy: 2 } as const;
const GOLD = '#cba415';
const PREFS_KEY = 'sanctus_reader_prefs';
const DEFAULT_PREFS: Prefs = { size: 19, theme: 'night', font: 'serif', spacing: 'normal' };

const loadPrefs = (): Prefs => {
  try { return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }; } catch { return DEFAULT_PREFS; }
};

export const BookReader: React.FC<BookReaderProps> = ({ bookId = 'christ-of-atlantis', onClose, previewPages, startPage = 0, onProgress, onJoin, bookmarks: bmProp, onToggleBookmark, readPages }) => {
  const book = getBook(bookId) || LIBRARY['christ-of-atlantis'];
  const [loaded, setLoaded] = useState<BookPage[] | null>(book.pages.length ? book.pages : null);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loadPct, setLoadPct] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const pages: BookPage[] = loaded || [];
  const totalPages = pagesOf(book);
  const lastIndex = previewPages ? Math.min(previewPages, totalPages) - 1 : totalPages - 1;
  const isPreview = !!previewPages && lastIndex < totalPages - 1;

  useEffect(() => {
    if (loaded) return;
    let alive = true;
    setLoadErr(null);
    loadBookPages(book, (d, t) => alive && setLoadPct(Math.round((d / t) * 100)))
      .then(p => alive && setLoaded(p))
      .catch(e => alive && setLoadErr(e?.message || 'Could not open this book.'));
    return () => { alive = false; };
  }, [bookId, attempt]);

  const [currentPage, setCurrentPage] = useState(Math.min(startPage, lastIndex));
  const [sheet, setSheet] = useState<null | 'toc' | 'settings'>(null);
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [localBookmarks, setBookmarks] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('sanctus_bm_' + bookId) || '[]'); } catch { return []; }
  });
  const bookmarks = bmProp ?? localBookmarks;
  const readSet = useMemo(() => new Set(readPages || []), [readPages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const th = THEMES[prefs.theme];

  const go = useCallback((i: number) => setCurrentPage(Math.max(0, Math.min(i, lastIndex))), [lastIndex]);
  const next = useCallback(() => setCurrentPage(p => Math.min(p + 1, lastIndex)), [lastIndex]);
  const prev = useCallback(() => setCurrentPage(p => Math.max(p - 1, 0)), []);

  const setPref = <K extends keyof Prefs>(k: K, v: Prefs[K]) => setPrefs(p => {
    const n = { ...p, [k]: v };
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(n)); } catch {}
    return n;
  });

  const toggleBookmark = () => onToggleBookmark ? onToggleBookmark(currentPage) : setBookmarks(b => {
    const n = b.includes(currentPage) ? b.filter(x => x !== currentPage) : [...b, currentPage].sort((a, c) => a - c);
    try { localStorage.setItem('sanctus_bm_' + bookId, JSON.stringify(n)); } catch {}
    return n;
  });

  useEffect(() => { onProgress?.(bookId, currentPage); scrollRef.current?.scrollTo({ top: 0 }); }, [currentPage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      else if (e.key === 'Escape') { if (sheet) setSheet(null); else onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, sheet, onClose]);

  // lock background scroll while the reader is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY, t: Date.now() }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current; touch.current = null;
    if (!s || sheet) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50 && Date.now() - s.t < 600) { dx < 0 ? next() : prev(); }
  };

  const page = pages[currentPage] || { page: currentPage + 1, title: book.title, content: '' };
  const words = useMemo(() => pages.map(p => p.content.split(/\s+/).filter(Boolean).length), [loaded]);
  const minsLeft = useMemo(() => {
    const left = words.slice(currentPage).reduce((a, b) => a + b, 0);
    return Math.max(1, Math.round(left / 220));
  }, [words, currentPage, loaded]);
  const pct = Math.round(((currentPage + 1) / totalPages) * 100);
  const fontFamily = prefs.font === 'serif' ? "'Lora', Georgia, serif" : "'Inter', system-ui, sans-serif";
  const atEnd = currentPage >= lastIndex;

  const iconBtn = 'h-11 w-11 flex items-center justify-center rounded-full transition-colors active:scale-95';
  const chip = (active: boolean): React.CSSProperties => ({ background: active ? GOLD : th.chip, color: active ? '#000' : th.text });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col select-none" style={{ background: th.bg, color: th.text, height: '100dvh' }}>
      {/* TOP BAR */}
      <header className="relative z-10 flex items-center gap-1 px-2 sm:px-5" style={{ background: th.bar, borderBottom: `1px solid ${th.line}`, paddingTop: 'env(safe-area-inset-top)' }}>
        <button onClick={onClose} aria-label="Close book" className={iconBtn} style={{ color: th.sub }}><XMarkIcon className="w-6 h-6" /></button>
        <div className="flex-1 min-w-0 px-2 text-center">
          <h2 className="font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] truncate" style={{ color: th.text }}>{book.title}</h2>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] truncate" style={{ color: GOLD }}>{isPreview ? 'Free preview' : book.subtitle}</p>
        </div>
        <button onClick={toggleBookmark} aria-label="Bookmark this page" className={iconBtn} style={{ color: bookmarks.includes(currentPage) ? GOLD : th.sub }}>
          {bookmarks.includes(currentPage) ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
        </button>
        <button onClick={() => setSheet('toc')} aria-label="Contents" className={iconBtn} style={{ color: th.sub }}><ListBulletIcon className="w-6 h-6" /></button>
        <button onClick={() => setSheet('settings')} aria-label="Text settings" className={`${iconBtn} font-display font-bold text-base`} style={{ color: th.sub }}>Aa</button>
      </header>
      <div className="h-[3px] w-full" style={{ background: th.line }}><div className="h-full transition-all duration-300" style={{ width: `${pct}%`, background: GOLD }}></div></div>

      {/* PAGE */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ WebkitOverflowScrolling: 'touch' }}>
        <article className="mx-auto w-full max-w-[40rem] px-5 sm:px-8 pt-8 sm:pt-14 pb-10" style={{ fontFamily }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: th.sub, fontFamily: "'Inter', sans-serif" }}>Page {page.page} of {totalPages}</p>
          <h1 className="font-display font-bold uppercase tracking-[0.12em] leading-snug mb-7" style={{ color: GOLD, fontSize: 'clamp(1.05rem, 4.2vw, 1.5rem)' }}>{page.title}</h1>
          {!loaded && (
            <div className="py-16 text-center space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              {loadErr ? (
                <>
                  <p className="text-sm" style={{ color: th.sub }}>{loadErr}</p>
                  <button onClick={() => setAttempt(a => a + 1)} className="px-8 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] text-black" style={{ background: GOLD }}>Try again</button>
                </>
              ) : (
                <>
                  <div className="mx-auto w-48 h-1.5 rounded-full overflow-hidden" style={{ background: th.line }}><div className="h-full transition-all" style={{ width: `${loadPct}%`, background: GOLD }}></div></div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: th.sub }}>Opening book… {loadPct}%</p>
                </>
              )}
            </div>
          )}
          <div className="break-words selection:bg-yellow-500/30" style={{ fontSize: `${prefs.size}px`, lineHeight: SPACING[prefs.spacing], WebkitUserSelect: 'text', userSelect: 'text' }}>
            {page.content.split('\n\n').filter(b => b.trim()).map((b, i) => b.startsWith('## ') ? (
              <h2 key={i} className="font-display font-bold uppercase tracking-[0.1em] leading-snug mt-8 mb-3" style={{ color: GOLD, fontSize: '0.78em' }}>{b.slice(3)}</h2>
            ) : (
              <p key={i} className="whitespace-pre-wrap" style={{ marginBottom: '0.9em' }}>{b}</p>
            ))}
          </div>

          {isPreview && atEnd && (
            <div className="mt-10 p-6 rounded-3xl text-center space-y-3" style={{ border: `1px solid ${GOLD}66`, background: `${GOLD}18` }}>
              <h3 className="font-display text-base font-bold uppercase tracking-widest" style={{ color: GOLD }}>End of free preview</h3>
              <p className="text-sm italic" style={{ color: th.sub }}>Keep reading: join the Sovereign Book Club for $1 (club books), or buy this book from the Book Club page.</p>
              {onJoin && <button onClick={onJoin} className="px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] text-black" style={{ background: GOLD, fontFamily: "'Inter', sans-serif" }}>See options</button>}
            </div>
          )}
          {!isPreview && atEnd && (
            <p className="mt-12 text-center font-display text-xs uppercase tracking-[0.4em]" style={{ color: th.sub }}>— The End —</p>
          )}
          <p className="mt-12 text-center text-[10px] uppercase tracking-[0.2em]" style={{ color: th.sub, fontFamily: "'Inter', sans-serif" }}>© {book.author}</p>
        </article>
      </div>

      {/* BOTTOM BAR */}
      <footer className="relative z-10 px-3 sm:px-6 pt-2" style={{ background: th.bar, borderTop: `1px solid ${th.line}`, paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-2 sm:gap-4 max-w-3xl mx-auto">
          <button onClick={prev} disabled={currentPage === 0} aria-label="Previous page" className={`${iconBtn} disabled:opacity-25`} style={{ background: th.chip, color: th.text }}><ChevronLeftIcon className="w-6 h-6" /></button>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <input type="range" aria-label="Jump to page" min={0} max={Math.max(lastIndex, 1)} value={currentPage} onChange={e => go(parseInt(e.target.value))} className="w-full h-6 cursor-pointer" style={{ accentColor: GOLD }} />
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest" style={{ color: th.sub }}>
              <span>{readPages ? `${readSet.size}/${totalPages} read` : `${pct}%`}</span><span>{atEnd && isPreview ? 'Preview end' : `~${minsLeft} min left`}</span>
            </div>
          </div>
          <button onClick={next} disabled={atEnd} aria-label="Next page" className={`${iconBtn} disabled:opacity-25`} style={{ background: GOLD, color: '#000' }}><ChevronRightIcon className="w-6 h-6" /></button>
        </div>
      </footer>

      {/* SHEETS */}
      {sheet && <div className="absolute inset-0 z-20 bg-black/55" onClick={() => setSheet(null)} />}
      {sheet === 'toc' && (
        <section className="absolute z-30 inset-x-0 bottom-0 sm:inset-y-0 sm:right-auto sm:w-96 flex flex-col rounded-t-[28px] sm:rounded-none max-h-[78dvh] sm:max-h-none" style={{ background: th.bar, color: th.text, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Contents</h3>
            <button onClick={() => setSheet(null)} aria-label="Close contents" className={iconBtn} style={{ color: th.sub }}><XMarkIcon className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            {pages.map((p, i) => {
              const locked = i > lastIndex;
              return (
                <button key={i} disabled={locked} onClick={() => { go(i); setSheet(null); }} className="w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 disabled:opacity-40"
                  style={{ background: currentPage === i ? `${GOLD}22` : 'transparent', border: `1px solid ${currentPage === i ? GOLD + '88' : 'transparent'}` }}>
                  <span className="text-[10px] font-bold w-7 shrink-0" style={{ color: th.sub }}>{p.page}</span>
                  <span className="flex-1 text-sm leading-snug" style={{ fontFamily, color: currentPage === i ? GOLD : th.text }}>{p.title}</span>
                  {readSet.has(i) && i !== currentPage && <span className="text-[11px] shrink-0 font-bold" style={{ color: '#22c55e' }} aria-label="read">✓</span>}
                  {bookmarks.includes(i) && <BookmarkSolidIcon className="w-4 h-4 shrink-0" style={{ color: GOLD }} />}
                  {locked && <LockClosedIcon className="w-4 h-4 shrink-0" style={{ color: th.sub }} />}
                </button>
              );
            })}
          </div>
        </section>
      )}
      {sheet === 'settings' && (
        <section className="absolute z-30 inset-x-0 bottom-0 sm:inset-x-auto sm:right-4 sm:bottom-auto sm:top-16 sm:w-96 rounded-t-[28px] sm:rounded-3xl p-5 space-y-5 shadow-2xl" style={{ background: th.bar, color: th.text, paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))', fontFamily: "'Inter', sans-serif" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Reading settings</h3>
            <button onClick={() => setSheet(null)} aria-label="Close settings" className={iconBtn} style={{ color: th.sub }}><XMarkIcon className="w-5 h-5" /></button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest" style={{ color: th.sub }}><span>Text size</span><span>{prefs.size}px</span></div>
            <div className="flex items-center gap-3">
              <button onClick={() => setPref('size', Math.max(14, prefs.size - 1))} aria-label="Smaller text" className="h-11 w-11 rounded-full text-sm font-bold" style={chip(false)}>A</button>
              <input type="range" aria-label="Text size" min={14} max={32} value={prefs.size} onChange={e => setPref('size', parseInt(e.target.value))} className="flex-1 h-6" style={{ accentColor: GOLD }} />
              <button onClick={() => setPref('size', Math.min(32, prefs.size + 1))} aria-label="Larger text" className="h-11 w-11 rounded-full text-xl font-bold" style={chip(false)}>A</button>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: th.sub }}>Theme</span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(THEMES) as ThemeKey[]).map(k => (
                <button key={k} onClick={() => setPref('theme', k)} className="h-12 rounded-2xl text-xs font-bold" style={{ background: THEMES[k].bg, color: THEMES[k].text, border: `2px solid ${prefs.theme === k ? GOLD : THEMES[k].line}` }}>{THEMES[k].name}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: th.sub }}>Font</span>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPref('font', 'serif')} className="h-11 rounded-2xl text-sm font-bold" style={{ ...chip(prefs.font === 'serif'), fontFamily: "'Lora', serif" }}>Serif</button>
                <button onClick={() => setPref('font', 'sans')} className="h-11 rounded-2xl text-sm font-bold" style={chip(prefs.font === 'sans')}>Sans</button>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: th.sub }}>Spacing</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['snug', 'normal', 'roomy'] as const).map(k => (
                  <button key={k} onClick={() => setPref('spacing', k)} aria-label={`${k} line spacing`} className="h-11 rounded-2xl text-[10px] font-bold uppercase" style={chip(prefs.spacing === k)}>{k === 'normal' ? 'Mid' : k}</button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-center" style={{ color: th.sub }}>Swipe left or right to turn pages.</p>
        </section>
      )}
    </div>
  );
};
