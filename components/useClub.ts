import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { LIBRARY, CUSTOM_BOOKS, Book } from '../data/bookContent';

export const JOIN_PRICE = 1;
export const DEFAULT_CHECKOUT = 'paypal'; // truthy marker: PayPal to PAYPAL_EMAIL unless Club Admin sets an override link
export const PREVIEW_PAGES = 2;
export const DEFAULT_PRICES: Record<string, number> = {
  'christ-of-atlantis': 14.99,
  'samurai-matrix': 9.99,
  'binaural-healing': 9.99,
  'natural-wellness': 7.99,
};

export type Access = 'club' | 'paid';
export interface BookMeta { price?: number; buyUrl?: string; access?: Access; custom?: boolean; book?: Book }
export const PAYPAL_EMAIL = 'divercityrecords@gmail.com';
export const newInvoiceId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** Every payment link carries a unique invoice id (and the buyer's id as `custom`) so the payment can be matched in PayPal. */
export const paypalUrl = (amount: number, item: string, ref?: { invoice?: string; custom?: string | null }) =>
  `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&amount=${amount.toFixed(2)}&currency_code=USD&item_name=${encodeURIComponent(item)}`
  + (ref?.invoice ? `&invoice=${encodeURIComponent(ref.invoice)}` : '') + (ref?.custom ? `&custom=${encodeURIComponent(ref.custom)}` : '');
export type BadgeKey = 'member' | 'collector' | 'keeper';
export const BADGES: Record<BadgeKey, { label: string; hint: string }> = {
  member: { label: 'Club Member', hint: 'Joined the Sovereign Book Club' },
  collector: { label: 'Collector', hint: 'Owns a paid book' },
  keeper: { label: 'Keeper', hint: 'Runs the archive' },
};
export const ARTIFACT_URL = 'https://claude.ai/artifact/8fCp9am7U2nCzgjLkivoLF';
export const PRAYER_PRICE = 1;
export const prayerPayUrl = (invoice: string, uid: string | null) => `${paypalUrl(PRAYER_PRICE, 'Prayer donation - Jesus Christ of Atlantis', { invoice, custom: uid })}&no_shipping=1&no_note=1&rm=1&return=${encodeURIComponent(ARTIFACT_URL)}&cancel_return=${encodeURIComponent(ARTIFACT_URL)}`;
export const validUsername = (n: string) => /^[A-Za-z0-9_.-]{3,20}$/.test(n);
type Owned = Record<string, { books?: Record<string, number> }>;
export interface Review { id: string; bookId: string; uid: string; rating: number; text: string; at: number }
export interface ClubConfig { checkoutUrl?: string }
export interface ReaderState {
  progress: Record<string, number>;            // last page opened per book (0-based)
  favorites: string[];
  bookmarks: Record<string, number[]>;         // saved pages per book (0-based)
  read: Record<string, number[]>;              // pages visited per book (0-based)
  completed: Record<string, number>;           // timestamp a book was finished
  lastRead: Record<string, number>;            // timestamp per book
}
const EMPTY_READER: ReaderState = { progress: {}, favorites: [], bookmarks: {}, read: {}, completed: {}, lastRead: {} };
const normReader = (v: any): ReaderState => ({ ...EMPTY_READER, ...(v || {}) });

const cap = async (name: string): Promise<any> => {
  try { const c = (window as any).claude; return c?.use ? (await c.use(name)) ?? null : null; } catch { return null; }
};
const LS = 'sanctus_club_state';

export function useClub() {
  const [db, setDb] = useState<any>(null);
  const [userCap, setUserCap] = useState<any>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState<ClubConfig>({});
  const [bookMeta, setBookMeta] = useState<Record<string, BookMeta>>({});
  const [members, setMembers] = useState<Record<string, any>>({});
  const [requests, setRequests] = useState<Record<string, any>>({});
  const [donations, setDonations] = useState<Record<string, any>>({});
  const [prayerCredits, setPrayerCredits] = useState<number>(() => { try { return parseInt(localStorage.getItem('sanctus_prayer_credits') || '0') || 0; } catch { return 0; } });
  const creditsRef = useRef(prayerCredits);
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [badges, setBadges] = useState<Record<string, any>>({});
  const [purchases, setPurchases] = useState<Owned>({});
  const [purchaseReqs, setPurchaseReqs] = useState<Owned>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [reader, setReader] = useState<ReaderState>(() => {
    try { return normReader(JSON.parse(localStorage.getItem(LS) || '')); } catch { return EMPTY_READER; }
  });
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef<number | null>(null);
  const readerRef = useRef(reader);
  readerRef.current = reader;
  const allBooksRef = useRef<Book[]>([]);

  // 1. capabilities
  useEffect(() => {
    (async () => {
      const d = await cap('db');
      const u = await cap('user');
      setDb(d); setUserCap(u);
      try { setUid((await u?.id?.()) ?? null); } catch {}
      try { setIsOwner(!!u?.isOwner?.()); setCanEdit(!!u?.canEdit?.() || !!u?.isOwner?.()); } catch {}
      setReady(true);
    })();
  }, []);

  // 2. subscriptions (once per db/uid)
  useEffect(() => {
    if (!db) return;
    const off: (() => void)[] = [];
    const onErr = (e: any) => { if (e?.code !== 'revoked') setError(e?.message || 'Could not reach the club database.'); };
    const toMap = (snap: any) => { const m: Record<string, any> = {}; snap.docs.forEach((d: any) => { m[d.id] = d.data(); }); return m; };
    try {
      off.push(db.doc('club/config').onSnapshot((s: any) => setConfig(s.exists ? (s.data() as ClubConfig) : {}), onErr));
      off.push(db.collection('club_books').onSnapshot((s: any) => {
        const m = toMap(s) as Record<string, BookMeta>;
        Object.keys(CUSTOM_BOOKS).forEach(k => delete CUSTOM_BOOKS[k]);
        Object.entries(m).forEach(([id, v]) => { if (v.custom && v.book) CUSTOM_BOOKS[id] = v.book; });
        setBookMeta(m);
      }, onErr));
      off.push(db.collection('members').onSnapshot((s: any) => setMembers(toMap(s)), onErr));
      off.push(db.collection('requests').onSnapshot((s: any) => setRequests(toMap(s)), onErr));
      off.push(db.collection('donations').onSnapshot((s: any) => setDonations(toMap(s)), onErr));
      off.push(db.collection('profiles').onSnapshot((s: any) => setProfiles(toMap(s)), onErr));
      off.push(db.collection('badges').onSnapshot((s: any) => setBadges(toMap(s)), onErr));
      off.push(db.collection('purchases').onSnapshot((s: any) => setPurchases(toMap(s)), onErr));
      off.push(db.collection('purchase_requests').onSnapshot((s: any) => setPurchaseReqs(toMap(s)), onErr));
      off.push(db.collection('reviews').onSnapshot((s: any) => {
        const list: Review[] = s.docs.map((d: any) => ({ id: d.id, ...(d.data() as any) }));
        list.sort((a, b) => b.at - a.at);
        setReviews(list);
      }, onErr));
      if (uid) {
        off.push(db.doc(`data/users/${uid}/prayer`).onSnapshot((s: any) => { if (s.exists && typeof s.data().credits === 'number') { creditsRef.current = s.data().credits; setPrayerCredits(s.data().credits); } }, onErr));
        off.push(db.doc(`data/users/${uid}/club`).onSnapshot((s: any) => {
          if (s.exists) setReader(normReader(s.data()));
        }, onErr));
      }
    } catch (e: any) { setError(e?.message || 'Club database unavailable.'); }
    return () => off.forEach(f => { try { f(); } catch {} });
  }, [db, uid]);

  // 3. names for people shown on screen
  const idKey = useMemo(() => Array.from(new Set([...Object.keys(members), ...Object.keys(requests), ...Object.keys(purchaseReqs), ...reviews.map(r => r.uid)])).sort().join(','), [members, requests, purchaseReqs, reviews]);
  useEffect(() => {
    if (!userCap?.profiles || !idKey) return;
    userCap.profiles(idKey.split(',')).then((ps: any) => {
      const m: Record<string, string> = {};
      Object.keys(ps || {}).forEach(k => { m[k] = ps[k]?.name || ''; });
      setNames(m);
    }).catch(() => {});
  }, [userCap, idKey]);

  const isMember = !!(uid && members[uid]);
  const hasAccess = isMember || isOwner || canEdit;
  const pending = !!(uid && requests[uid]) && !isMember;
  const checkoutUrl = config.checkoutUrl || DEFAULT_CHECKOUT;

  const allBooks: Book[] = useMemo(
    () => [...Object.values(LIBRARY), ...Object.values(bookMeta).filter(m => m.custom && m.book).map(m => m.book!)],
    [bookMeta]
  );
  const bookMetaUrl = (id: string) => bookMeta[id]?.buyUrl || '';
  allBooksRef.current = allBooks;
  const accessOf = (id: string): Access => bookMeta[id]?.access || 'club';
  const ownsBook = (id: string) => !!(uid && purchases[uid]?.books?.[id]);
  const pendingBook = (id: string) => !!(uid && purchaseReqs[uid]?.books?.[id]) && !ownsBook(id);
  // Club books: members, owner and editors. Paid books: buyers, owner and editors (club membership does not unlock them).
  const canRead = (id: string) => isOwner || canEdit || ownsBook(id) || (accessOf(id) === 'club' && isMember);
  const priceOf = (id: string) => bookMeta[id]?.price ?? DEFAULT_PRICES[id] ?? 9.99;
  const buyUrlOf = (id: string, inv?: string) => bookMeta[id]?.buyUrl || paypalUrl(priceOf(id), (allBooks.find(b => b.id === id)?.title || 'Book') + ' (digital)', { invoice: inv, custom: uid });
  const clubPayUrl = (inv: string) => config.checkoutUrl || paypalUrl(JOIN_PRICE, 'Sovereign Book Club membership', { invoice: inv, custom: uid });
  const ratingOf = (id: string) => {
    const rs = reviews.filter(r => r.bookId === id);
    return { count: rs.length, avg: rs.length ? rs.reduce((a, r) => a + r.rating, 0) / rs.length : 0 };
  };
  const usernameOf = (id: string): string => profiles[id]?.username || '';
  const nameOf = (id: string) => usernameOf(id) || names[id] || (id === uid ? 'You' : 'Member');
  const badgesOf = (id: string): BadgeKey[] => {
    const b = Object.keys(badges[id]?.badges || {}) as BadgeKey[];
    if (id === uid && (isOwner || canEdit) && !b.includes('keeper')) b.push('keeper');
    return b;
  };
  const memberNoOf = (id: string): number | null => badges[id]?.memberNo ?? null;

  const guard = async (fn: () => Promise<void>) => {
    setError(null);
    try { await fn(); } catch (e: any) { setError(e?.message || 'That change was not saved.'); }
  };
  const upsert = async (path: string, data: any) => {
    const ref = db.doc(path); const s = await ref.get();
    if (s.exists) await ref.update(data); else await ref.set(data);
  };

  const requestJoin = (invoice?: string) => guard(async () => { if (!db || !uid) throw new Error('Sign in to join the club.'); await db.doc(`requests/${uid}`).set({ at: Date.now(), invoice: invoice || null }); });
  const approve = (id: string) => guard(async () => {
    const now = Date.now();
    const top = Object.values(badges).reduce((m: number, b: any) => Math.max(m, b?.memberNo || 0), 0);
    await db.doc(`members/${id}`).set({ since: now });
    await upsert(`badges/${id}`, { badges: { member: now }, memberNo: badges[id]?.memberNo || top + 1 });
    await db.doc(`requests/${id}`).delete();
  });
  const decline = (id: string) => guard(async () => { await db.doc(`requests/${id}`).delete(); });
  const revoke = (id: string) => guard(async () => { await db.doc(`members/${id}`).delete(); });
  const saveUsername = (raw: string) => guard(async () => {
    if (!db || !uid) throw new Error('Sign in to set a username.');
    const name = raw.trim();
    if (!validUsername(name)) throw new Error('Usernames are 3 to 20 characters: letters, numbers, dot, dash or underscore.');
    const taken = await db.collection('profiles').where('usernameLower', '==', name.toLowerCase()).get();
    if (taken.docs.some((d: any) => d.id !== uid)) throw new Error('That username is taken. Try another.');
    await upsert(`profiles/${uid}`, { username: name, usernameLower: name.toLowerCase(), updatedAt: Date.now() });
  });
  const writeCredits = (n: number) => {
    creditsRef.current = n; setPrayerCredits(n);
    try { localStorage.setItem('sanctus_prayer_credits', String(n)); } catch {}
    if (db && uid) db.doc(`data/users/${uid}/prayer`).set({ credits: n }).catch(() => {});
  };
  // The page cannot see PayPal, so a claimed $1 grants one prayer immediately and is logged for the owner to reconcile.
  const claimPrayerPayment = async (invoice: string) => {
    writeCredits(creditsRef.current + 1);
    if (db && uid) { try { await upsert(`donations/${uid}`, { claims: { [invoice]: { at: Date.now(), amount: PRAYER_PRICE } }, count: (donations[uid]?.count || 0) + 1 }); } catch {} }
  };
  const consumePrayerCredit = () => writeCredits(Math.max(0, creditsRef.current - 1));
  const saveCheckout = (url: string) => guard(async () => { await upsert('club/config', { checkoutUrl: url.trim() }); });
  const saveBookMeta = (id: string, price: number, buyUrl: string, access: Access) => guard(async () => { await upsert(`club_books/${id}`, { price, buyUrl: buyUrl.trim(), access }); });
  const requestPurchase = (bookId: string, invoice?: string) => guard(async () => { if (!db || !uid) throw new Error('Sign in to buy.'); await upsert(`purchase_requests/${uid}`, { books: { [bookId]: Date.now() }, invoices: { [bookId]: invoice || null } }); });
  const approvePurchase = (buyer: string, bookId: string) => guard(async () => {
    await upsert(`purchases/${buyer}`, { books: { [bookId]: Date.now() } });
    await upsert(`badges/${buyer}`, { badges: { collector: Date.now() } });
    await db.doc(`purchase_requests/${buyer}`).update({ books: { [bookId]: { __delete__: true } } });
  });
  const declinePurchase = (buyer: string, bookId: string) => guard(async () => { await db.doc(`purchase_requests/${buyer}`).update({ books: { [bookId]: { __delete__: true } } }); });
  const addBook = (book: Book, price: number, buyUrl: string, access: Access) => guard(async () => { await db.doc(`club_books/${book.id}`).set({ custom: true, price, buyUrl: buyUrl.trim(), access, book }); });
  const removeBook = (id: string) => guard(async () => { await db.doc(`club_books/${id}`).delete(); });
  const saveReview = (bookId: string, rating: number, text: string) => guard(async () => {
    if (!uid) throw new Error('Sign in to review.');
    await db.doc(`reviews/${bookId}__${uid}`).set({ bookId, uid, rating, text: text.trim().slice(0, 1200), at: Date.now() });
  });
  const deleteReview = (id: string) => guard(async () => { await db.doc(`reviews/${id}`).delete(); });

  const persistReader = useCallback((next: ReaderState) => {
    setReader(next);
    try { localStorage.setItem(LS, JSON.stringify(next)); } catch {}
    if (db && uid) {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => { db.doc(`data/users/${uid}/club`).set(next).catch(() => {}); }, 900);
    }
  }, [db, uid]);
  const recordPage = useCallback((bookId: string, page: number) => {
    const cur = readerRef.current;
    const total = allBooksRef.current.find(b => b.id === bookId);
    const count = total ? (total.pageCount ?? total.pages.length) : 0;
    const seen = cur.read[bookId] || [];
    const read = seen.includes(page) ? seen : [...seen, page].sort((x, y) => x - y);
    const done = count > 0 && read.length >= count;
    const lastRead = Date.now();
    if (cur.progress[bookId] === page && read === seen && (!done || cur.completed[bookId])) return;
    persistReader({
      ...cur,
      progress: { ...cur.progress, [bookId]: page },
      read: { ...cur.read, [bookId]: read },
      lastRead: { ...cur.lastRead, [bookId]: lastRead },
      completed: done && !cur.completed[bookId] ? { ...cur.completed, [bookId]: lastRead } : cur.completed,
    });
  }, [persistReader]);
  const toggleBookmark = (bookId: string, page: number) => {
    const cur = readerRef.current;
    const list = cur.bookmarks[bookId] || [];
    const next = list.includes(page) ? list.filter(x => x !== page) : [...list, page].sort((x, y) => x - y);
    persistReader({ ...cur, bookmarks: { ...cur.bookmarks, [bookId]: next } });
  };
  const resetBookProgress = (bookId: string) => {
    const cur = readerRef.current;
    const drop = <T,>(o: Record<string, T>) => { const c = { ...o }; delete c[bookId]; return c; };
    persistReader({ ...cur, progress: drop(cur.progress), read: drop(cur.read), completed: drop(cur.completed), lastRead: drop(cur.lastRead) });
  };
  const toggleFavorite = (id: string) => {
    const f = reader.favorites.includes(id) ? reader.favorites.filter(x => x !== id) : [...reader.favorites, id];
    persistReader({ ...reader, favorites: f });
  };

  return {
    ready, dbAvailable: !!db, uid, isOwner, canEdit, isMember, hasAccess, pending, error,
    purchaseInvoices: Object.fromEntries(Object.entries(purchaseReqs).map(([u, v]: [string, any]) => [u, v?.invoices || {}])) as Record<string, Record<string, string>>, config, checkoutUrl, clubPayUrl, donations, prayerCredits, claimPrayerPayment, consumePrayerCredit, profiles, badges, usernameOf, badgesOf, memberNoOf, saveUsername, members, requests, reviews, allBooks, nameOf, names,
    priceOf, buyUrlOf, bookMetaUrl, ratingOf, accessOf, canRead, ownsBook, pendingBook, purchaseReqs, requestPurchase, approvePurchase, declinePurchase, reader, recordPage, toggleBookmark, resetBookProgress, toggleFavorite,
    requestJoin, approve, decline, revoke, saveCheckout, saveBookMeta, addBook, removeBook, saveReview, deleteReview,
  };
}
export type Club = ReturnType<typeof useClub>;
