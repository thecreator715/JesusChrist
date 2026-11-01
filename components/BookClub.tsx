import React, { useState, useMemo } from 'react';
import {
  BookOpenIcon, StarIcon, ArrowRightIcon, SparklesIcon, UserGroupIcon, ShieldCheckIcon,
  ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, ListBulletIcon, Squares2X2Icon,
  HeartIcon, DocumentTextIcon, BookmarkIcon as BookmarkIconX, XMarkIcon, LockClosedIcon, CheckCircleIcon, ClockIcon, TrashIcon, BookmarkIcon, FlagIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Logo } from './Logo';
import { ARTIFACT_URL, Club, JOIN_PRICE, PREVIEW_PAGES, BADGES, BadgeKey, PAYPAL_EMAIL, newInvoiceId } from './useClub';
import { Book, pagesOf } from '../data/bookContent';

interface BookClubProps {
  club: Club;
  onReadBook: (bookId: string, page?: number) => void;
}

const money = (n: number) => (n <= 0 ? 'Free' : `$${n.toFixed(2)}`);

const Stars: React.FC<{ value: number; size?: string }> = ({ value, size = 'w-4 h-4' }) => (
  <span className="inline-flex">
    {[1, 2, 3, 4, 5].map(i => (i <= Math.round(value)
      ? <StarSolidIcon key={i} className={`${size} text-gold-500`} />
      : <StarIcon key={i} className={`${size} text-stone-300 dark:text-stone-600`} />))}
  </span>
);

const BADGE_STYLE: Record<BadgeKey, string> = {
  member: 'from-[#f0e08a] via-[#cbaf15] to-[#a28c11] text-black',
  collector: 'from-[#a78bfa] via-[#7c3aed] to-[#5b21b6] text-white',
  keeper: 'from-[#67e8f9] via-[#0ea5e9] to-[#0369a1] text-white',
};
export const BadgePill: React.FC<{ kind: BadgeKey; small?: boolean }> = ({ kind, small }) => (
  <span title={BADGES[kind].hint} className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-br ${BADGE_STYLE[kind]} font-bold uppercase tracking-widest shadow ${small ? 'px-2 py-0.5 text-[8px]' : 'px-3 py-1 text-[10px]'}`}>
    <ShieldCheckIcon className={small ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} /> {BADGES[kind].label}
  </span>
);

const MyMembership: React.FC<{ club: Club }> = ({ club }) => {
  const me = club.uid!;
  const [name, setName] = useState(club.usernameOf(me));
  const [saved, setSaved] = useState(false);
  const badges = club.badgesOf(me);
  const no = club.memberNoOf(me);
  const since = club.members[me]?.since;
  const needsName = !club.usernameOf(me);
  return (
    <section className="max-w-2xl mx-auto p-6 md:p-8 rounded-[32px] border border-gold-500/40 bg-white dark:bg-stone-900 shadow-xl space-y-5 text-left">
      <div className="flex flex-wrap items-center gap-2">
        {badges.map(b => <BadgePill key={b} kind={b} />)}
        {no && <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Member #{String(no).padStart(4, '0')}</span>}
        {since && <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Since {new Date(since).toLocaleDateString()}</span>}
      </div>
      <div className="space-y-2">
        <label htmlFor="club-username" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">{needsName ? 'Choose your username' : 'Your username'}</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input id="club-username" value={name} onChange={e => { setName(e.target.value); setSaved(false); }} maxLength={20} placeholder="e.g. light_walker"
            className="flex-1 px-5 py-3 rounded-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 outline-none focus:ring-2 focus:ring-gold-500 text-sm font-serif" />
          <button onClick={async () => { await club.saveUsername(name); setSaved(true); }} className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest text-[10px]">{saved ? 'Saved' : 'Save username'}</button>
        </div>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Shown on your reviews. Stored with your membership.</p>
      </div>
    </section>
  );
};

const COVERS = ['bg-gold-500', 'bg-red-700', 'bg-blue-600', 'bg-green-600', 'bg-purple-700', 'bg-teal-600'];

export const BookClub: React.FC<BookClubProps> = ({ club, onReadBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [paidClicked, setPaidClicked] = useState(false);
  const joinInvoice = React.useRef(newInvoiceId('club')).current;

  const totalPages = club.allBooks.reduce((a, b) => a + pagesOf(b), 0);
  const memberCount = Object.keys(club.members).length;

  const filtered = useMemo(() => club.allBooks.filter(b => {
    const q = searchQuery.toLowerCase();
    const okSearch = b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    return okSearch && (!showFavoritesOnly || club.reader.favorites.includes(b.id));
  }), [club.allBooks, searchQuery, showFavoritesOnly, club.reader.favorites]);

  const detail = detailId ? club.allBooks.find(b => b.id === detailId) || null : null;
  const scrollToJoin = () => document.getElementById('join-club')?.scrollIntoView({ behavior: 'smooth' });

  const readLabel = (b: Book) => {
    const p = club.reader.progress[b.id];
    if (club.canRead(b.id)) return p ? `Continue · page ${p + 1}` : (club.accessOf(b.id) === 'club' ? 'Read free' : 'Read');
    return `Free preview · ${PREVIEW_PAGES} pages`;
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-24 pb-40">
      {/* HERO */}
      <header className="text-center space-y-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="flex justify-center"><Logo /></div>
        <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-widest text-gold-500 leading-none">THE SOVEREIGN<br /><span className="text-stone-900 dark:text-stone-100">BOOK CLUB</span></h2>
        <p className="font-serif italic text-2xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">
          "{JOIN_PRICE > 0 ? `One dollar to join the club. Prayers are $1 each. Paid books are sold separately.` : 'Read, study, and integrate.'}"
        </p>

        {/* MEMBERSHIP BANNER */}
        <div className="max-w-2xl mx-auto">
          {club.hasAccess ? (
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-green-600/10 border border-green-600/30 text-green-600 dark:text-green-400 font-bold uppercase tracking-widest text-xs">
              <CheckCircleIcon className="w-5 h-5" /> {club.isMember ? 'You are a member. Club books are free for you.' : 'Owner access to every book.'}
            </div>
          ) : club.pending ? (
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-600 font-bold uppercase tracking-widest text-xs">
              <ClockIcon className="w-5 h-5" /> Membership request received. Waiting for approval.
            </div>
          ) : (
            <button onClick={scrollToJoin} className="px-10 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-[0.25em] text-xs shadow-xl transition-all hover:-translate-y-0.5">
              Join for ${JOIN_PRICE} and read club books free
            </button>
          )}
        </div>

        {club.uid && (club.isMember || club.canEdit || club.badgesOf(club.uid).length > 0) && <MyMembership club={club} />}

        {/* STATS */}
        <div className="grid grid-cols-3 w-full max-w-md md:max-w-none md:w-auto md:inline-flex md:flex-wrap justify-center items-center gap-3 md:gap-16 py-5 md:py-6 px-3 md:px-10 mx-auto bg-stone-50/50 dark:bg-stone-900/50 rounded-[28px] md:rounded-full border border-stone-200 dark:border-stone-800 backdrop-blur-sm mt-4">
          {[
            { v: club.allBooks.length, l: 'Volumes', I: BookOpenIcon },
            { v: totalPages, l: 'Total Pages', I: DocumentTextIcon },
            { v: memberCount, l: 'Members', I: UserGroupIcon },
          ].map((s, i) => (
            <React.Fragment key={s.l}>
              {i > 0 && <div className="hidden md:block w-px h-10 bg-stone-200 dark:bg-stone-800"></div>}
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-stone-100">{s.v}</span>
                <span className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-bold text-gold-500 uppercase tracking-wider md:tracking-widest mt-1"><s.I className="w-3 h-3" /> {s.l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        {club.error && <p className="text-xs font-bold text-red-500">{club.error}</p>}
      </header>

      {club.uid && club.hasAccess || (club.uid && club.allBooks.some(b => club.canRead(b.id))) ? <ReadingDashboard club={club} onReadBook={onReadBook} /> : null}

      {/* LIBRARY */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-stone-50 dark:bg-stone-900 p-6 rounded-[30px] border border-stone-200 dark:border-stone-800 shadow-lg">
          <div className="relative w-full md:w-96 group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-gold-500 transition-colors" />
            <input id="club-search" type="text" placeholder="Search the archives..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:ring-2 focus:ring-gold-500 outline-none transition-all text-sm font-serif" />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${showFavoritesOnly ? 'bg-gold-500 text-white' : 'bg-white dark:bg-stone-950 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800'}`}>
              {showFavoritesOnly ? <HeartSolidIcon className="w-4 h-4" /> : <HeartIcon className="w-4 h-4" />} Favorites
            </button>
            <div className="flex bg-white dark:bg-stone-950 rounded-full p-1 border border-stone-200 dark:border-stone-800">
              <button onClick={() => setViewMode('grid')} aria-label="Grid view" className={`p-2.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-gold-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}><Squares2X2Icon className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('list')} aria-label="List view" className={`p-2.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-gold-500 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}><ListBulletIcon className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'flex flex-col gap-6'}>
            {filtered.map(book => {
              const fav = club.reader.favorites.includes(book.id);
              const r = club.ratingOf(book.id);
              const price = club.priceOf(book.id);
              const prog = club.reader.progress[book.id];
              return (
                <div key={book.id} className={`group relative bg-white dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${viewMode === 'list' ? 'flex flex-col md:flex-row items-stretch' : ''}`}>
                  <div className={`absolute top-0 left-0 ${viewMode === 'list' ? 'w-2 h-full' : 'w-full h-2'} ${book.coverColor}`}></div>
                  <div className={`p-8 md:p-10 space-y-6 w-full ${viewMode === 'list' ? 'flex flex-col md:flex-row gap-8 items-start md:items-center justify-between' : ''}`}>
                    <div className={`space-y-6 ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className={`w-14 h-14 ${book.coverColor} rounded-2xl flex items-center justify-center text-white shadow-lg`}><BookOpenIcon className="w-7 h-7" /></div>
                        <button onClick={() => club.toggleFavorite(book.id)} aria-label="Toggle favorite" className="p-2 text-stone-300 hover:text-red-500 transition-colors">
                          {fav ? <HeartSolidIcon className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
                        </button>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-stone-100 leading-tight group-hover:text-gold-500 transition-colors">{book.title}</h3>
                        <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">{book.subtitle}</p>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{book.author}</p>
                      </div>
                    </div>

                    <div className={`space-y-4 ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                      <p className="font-serif text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed line-clamp-3">"{book.description}"</p>
                      <div className="flex items-center gap-3">
                        <Stars value={r.avg} />
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{r.count ? `${r.avg.toFixed(1)} · ${r.count} review${r.count > 1 ? 's' : ''}` : 'No reviews yet'}</span>
                      </div>
                    </div>

                    <div className={`pt-2 w-full ${viewMode === 'list' ? 'md:w-1/4 flex flex-col items-end gap-3' : 'space-y-3'}`}>
                      <div className="flex items-center justify-between gap-3 w-full">
                        <span className="inline-flex px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-widest text-stone-400">{pagesOf(book)} Pages</span>
                        <span className="text-right">
                          {club.accessOf(book.id) === 'club' ? (
                            <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Club book · {club.hasAccess ? 'free for you' : 'free for members'}</span>
                          ) : (
                            <span>
                              <span className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">{money(price)}</span>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">{club.ownsBook(book.id) ? 'You own this' : club.pendingBook(book.id) ? 'Purchase pending' : 'Sold separately'}</span>
                            </span>
                          )}
                        </span>
                      </div>
                      {club.canRead(book.id) && <ProgressRow club={club} book={book} />}
                      <button onClick={() => onReadBook(book.id)} className="w-full py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-[0.15em] text-xs transition-all flex items-center justify-center gap-2">
                        {readLabel(book)} <ArrowRightIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailId(book.id)} className="w-full py-3 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 font-bold uppercase tracking-[0.15em] text-[10px] transition-all">{!club.canRead(book.id) && club.accessOf(book.id) === 'paid' ? `Buy · ${money(price)}` : 'Details & reviews'}</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex p-6 rounded-full bg-stone-100 dark:bg-stone-900 mb-6"><MagnifyingGlassIcon className="w-12 h-12 text-stone-300" /></div>
            <h3 className="font-display text-2xl text-stone-400 uppercase">No Archives Found</h3>
            <p className="text-stone-500 font-serif italic mt-2">Try adjusting your search or filters.</p>
            {showFavoritesOnly && <button onClick={() => setShowFavoritesOnly(false)} className="mt-6 text-gold-500 underline text-xs font-bold uppercase tracking-widest">View All Books</button>}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-stone-950 p-10 md:p-20 rounded-[50px] md:rounded-[80px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none transform rotate-12 scale-150"><StarIcon className="w-96 h-96 text-gold-500" /></div>
        <div className="relative z-10 space-y-14">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tighter">How the Club Works</h3>
            <p className="font-serif text-xl italic text-stone-400 leading-relaxed">The club is $1. Some books are free for members; others are sold separately at their own price.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { t: `Join for $${JOIN_PRICE}`, d: 'One payment, one time. No monthly fee.', I: ShieldCheckIcon },
              { t: 'Club books are free', d: 'Every club book opens in the reader at no further cost.', I: BookOpenIcon },
              { t: 'Buy paid books once', d: 'Books marked with a price are bought individually and kept.', I: DocumentTextIcon },
              { t: 'Pick up where you left off', d: 'Your page, bookmarks and favorites are remembered.', I: BookmarkIconX },
              { t: 'Review and rate', d: 'Members rate each book and leave notes for the club.', I: UserGroupIcon },
            ].map((b, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
                <b.I className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="font-display font-bold uppercase text-stone-100 text-sm mb-3 tracking-wide">{b.t}</h4>
                <p className="text-xs font-serif text-stone-400 italic leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      {!club.hasAccess && (
        <footer id="join-club" className="relative group text-center scroll-mt-24">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-amber-600 rounded-[60px] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-stone-900 p-10 md:p-20 rounded-[58px] border border-stone-200 dark:border-stone-800 space-y-8 shadow-2xl">
            <ShieldCheckIcon className="w-16 h-16 text-gold-500 mx-auto" />
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Join the Sovereign Book Club</h3>
            <div className="font-display text-7xl font-bold text-gold-500">${JOIN_PRICE}</div>
            <p className="text-xl font-serif text-stone-500 italic leading-relaxed max-w-2xl mx-auto">One dollar, once. Read the club books free and join the book club. Prayers are $1 each and paid books are bought separately.</p>

            {!club.runtime ? (
              <a href={ARTIFACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold-500 text-black px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs">Join in the full app <ArrowTopRightOnSquareIcon className="w-5 h-5" /></a>
            ) : club.pending ? (
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-600 font-bold uppercase tracking-widest text-xs"><ClockIcon className="w-5 h-5" /> Request received. You will get access once the club confirms your $1.</div>
            ) : !club.uid ? (
              <p className="text-sm font-serif italic text-stone-500">Sign in to claude.ai to join the club.</p>
            ) : !club.checkoutUrl ? (
              <p className="text-sm font-serif italic text-stone-500">{club.canEdit ? 'Add your PayPal $1 link in Club Admin below to open joining.' : 'Joining opens soon.'}</p>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a href={club.clubPayUrl(joinInvoice)} target="_blank" rel="noopener noreferrer" onClick={() => setPaidClicked(true)}
                    className="flex items-center gap-3 bg-gold-500 hover:bg-gold-600 text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.25em] text-xs transition-all shadow-xl hover:-translate-y-1">
                    1. Pay ${JOIN_PRICE} with PayPal <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </a>
                  <button onClick={() => club.requestJoin(joinInvoice)} disabled={!paidClicked}
                    className="px-12 py-5 rounded-full border-2 border-gold-500 text-gold-600 font-bold uppercase tracking-[0.25em] text-xs transition-all enabled:hover:bg-gold-500 enabled:hover:text-black disabled:opacity-40 disabled:cursor-not-allowed">
                    2. I have paid
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">PayPal opens in a new tab. Come back and tap “I have paid”.</p>
                <p className="text-[10px] text-stone-400 tracking-wider">Payment questions: {PAYPAL_EMAIL}</p>
              </div>
            )}
            {club.error && <p className="text-xs font-bold text-red-500">{club.error}</p>}
          </div>
        </footer>
      )}

      {club.canEdit && <AdminPanel club={club} />}

      {detail && <BookDetail book={detail} club={club} onClose={() => setDetailId(null)} onRead={() => { setDetailId(null); onReadBook(detail.id); }} onReadAt={(pg) => onReadBook(detail.id, pg)} onJoin={() => { setDetailId(null); setTimeout(scrollToJoin, 50); }} />}
    </div>
  );
};

/* ---------- Reading data ---------- */
const ProgressRow: React.FC<{ club: Club; book: Book }> = ({ club, book }) => {
  const total = pagesOf(book);
  const read = (club.reader.read[book.id] || []).length;
  const done = !!club.reader.completed[book.id];
  const marks = (club.reader.bookmarks[book.id] || []).length;
  const pct = Math.min(100, Math.round((read / total) * 100));
  if (!read && !marks) return null;
  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: done ? 'linear-gradient(90deg,#16a34a,#4ade80)' : 'linear-gradient(90deg,#a28c11,#f0e08a)' }}></div>
      </div>
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
        <span>{done ? <span className="text-green-600 inline-flex items-center gap-1"><CheckCircleIcon className="w-3.5 h-3.5" /> Completed</span> : `${read} of ${total} pages read · ${pct}%`}</span>
        {marks > 0 && <span className="inline-flex items-center gap-1 text-gold-600"><BookmarkIcon className="w-3.5 h-3.5" /> {marks}</span>}
      </div>
    </div>
  );
};

const ReadingDashboard: React.FC<{ club: Club; onReadBook: (id: string, page?: number) => void }> = ({ club, onReadBook }) => {
  const books = club.allBooks.filter(b => club.canRead(b.id));
  const r = club.reader;
  const completed = books.filter(b => r.completed[b.id]).length;
  const pagesRead = books.reduce((a, b) => a + (r.read[b.id] || []).length, 0);
  const totalPagesAvail = books.reduce((a, b) => a + pagesOf(b), 0);
  const marks = books.flatMap(b => (r.bookmarks[b.id] || []).map(pg => ({ b, pg })));
  const last = books.filter(b => r.lastRead[b.id]).sort((x, y) => r.lastRead[y.id] - r.lastRead[x.id])[0];
  if (!books.length) return null;
  const tiles = [
    { v: `${completed}/${books.length}`, l: 'Books completed' },
    { v: String(pagesRead), l: `Pages read of ${totalPagesAvail}` },
    { v: String(marks.length), l: 'Bookmarks' },
    { v: last ? new Date(r.lastRead[last.id]).toLocaleDateString() : '—', l: 'Last read' },
  ];
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-stone-900 dark:text-stone-100">Your Reading</h3>
        {last && (
          <button onClick={() => onReadBook(last.id)} className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
            Continue <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {last && <p className="font-serif italic text-stone-500 -mt-3">Pick up {last.title} at page {(r.progress[last.id] ?? 0) + 1}.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {tiles.map(t => (
          <div key={t.l} className="p-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-center">
            <div className="font-display text-2xl md:text-3xl font-bold text-gold-500">{t.v}</div>
            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">{t.l}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">By book</h4>
          {books.map(b => {
            const read = (r.read[b.id] || []).length; const total = pagesOf(b); const pct = Math.round((read / total) * 100);
            return (
              <button key={b.id} onClick={() => onReadBook(b.id)} className="w-full text-left p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-gold-500/60 transition-colors space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-bold uppercase tracking-wide text-stone-800 dark:text-stone-200 truncate">{b.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest shrink-0" style={{ color: r.completed[b.id] ? '#16a34a' : undefined }}>{r.completed[b.id] ? 'Completed' : read ? `${pct}%` : 'Not started'}</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden"><div className="h-full" style={{ width: `${pct}%`, background: r.completed[b.id] ? 'linear-gradient(90deg,#16a34a,#4ade80)' : 'linear-gradient(90deg,#a28c11,#f0e08a)' }}></div></div>
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{read} of {total} pages{r.lastRead[b.id] ? ` · ${new Date(r.lastRead[b.id]).toLocaleDateString()}` : ''}</div>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Bookmarks</h4>
          {marks.length === 0 && <p className="text-sm font-serif italic text-stone-400">Tap the bookmark in the reader to save a page here.</p>}
          <div className="flex flex-wrap gap-2">
            {marks.map(({ b, pg }) => (
              <button key={b.id + pg} onClick={() => onReadBook(b.id, pg)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-xs font-bold text-stone-700 dark:text-stone-200">
                <BookmarkIcon className="w-4 h-4 text-gold-500" /> <span className="truncate max-w-[10rem]">{b.title}</span> · p.{pg + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Book detail & reviews ---------- */
const BookDetail: React.FC<{ book: Book; club: Club; onClose: () => void; onRead: () => void; onReadAt: (page: number) => void; onJoin: () => void }> = ({ book, club, onClose, onRead, onReadAt, onJoin }) => {
  const mine = club.reviews.find(r => r.bookId === book.id && r.uid === club.uid);
  const [rating, setRating] = useState(mine?.rating || 5);
  const [text, setText] = useState(mine?.text || '');
  const [paid, setPaid] = useState(false);
  const buyInvoice = React.useRef(newInvoiceId('book')).current;
  const rs = club.reviews.filter(r => r.bookId === book.id);
  const price = club.priceOf(book.id);
  return (
    <div className="fixed inset-0 z-[90] bg-black/70 flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
      <div className="relative bg-white dark:bg-stone-900 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[40px] md:rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className={`h-2 ${book.coverColor}`}></div>
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 p-2 text-stone-400 hover:text-red-500"><XMarkIcon className="w-6 h-6" /></button>
        <div className="p-8 md:p-12 space-y-8">
          <div className="space-y-2 pr-10">
            <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100">{book.title}</h3>
            <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">{book.subtitle} · {book.author}</p>
          </div>
          <p className="font-serif italic text-stone-600 dark:text-stone-400 leading-relaxed">"{book.description}"</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">{club.accessOf(book.id) === 'club' ? <span className="text-gold-600 text-sm uppercase tracking-widest">Club book · free for members</span> : money(price)}</span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{pagesOf(book)} pages</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onRead} className="flex-1 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-[0.15em] text-xs">{club.canRead(book.id) ? 'Read' : `Free preview · ${PREVIEW_PAGES} pages`}</button>
            {!club.canRead(book.id) && club.accessOf(book.id) === 'club' && <button onClick={onJoin} className="flex-1 py-4 rounded-full border-2 border-gold-500 text-gold-600 font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2"><LockClosedIcon className="w-4 h-4" /> Join for ${JOIN_PRICE} to read free</button>}
          </div>
          {club.canRead(book.id) && (
            <div className="space-y-3">
              <ProgressRow club={club} book={book} />
              {(club.reader.bookmarks[book.id] || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(club.reader.bookmarks[book.id] || []).map(pg => (
                    <button key={pg} onClick={() => { onClose(); onReadAt(pg); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-[11px] font-bold"><BookmarkIcon className="w-3.5 h-3.5 text-gold-500" /> Page {pg + 1}</button>
                  ))}
                </div>
              )}
              {!!club.reader.read[book.id]?.length && <button onClick={() => club.resetBookProgress(book.id)} className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-red-500">Reset my progress for this book</button>}
            </div>
          )}
          {!club.canRead(book.id) && club.accessOf(book.id) === 'paid' && (
            !club.runtime ? (
              <a href={ARTIFACT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gold-500 text-black font-bold uppercase tracking-[0.15em] text-xs">Buy in the full app <ArrowTopRightOnSquareIcon className="w-4 h-4" /></a>
            ) : club.pendingBook(book.id) ? (
              <div className="flex items-center gap-3 px-6 py-4 rounded-3xl bg-gold-500/10 border border-gold-500/40 text-gold-600 font-bold uppercase tracking-widest text-[10px]"><ClockIcon className="w-5 h-5" /> Purchase received. Access opens once the payment is confirmed.</div>
            ) : !club.uid ? (
              <p className="text-xs font-serif italic text-stone-500">Sign in to claude.ai to buy this book.</p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={club.buyUrlOf(book.id, buyInvoice)} target="_blank" rel="noopener noreferrer" onClick={() => setPaid(true)} className="flex-1 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2">1. Pay {money(price)} with PayPal <ArrowTopRightOnSquareIcon className="w-4 h-4" /></a>
                <button disabled={!paid} onClick={() => club.requestPurchase(book.id, buyInvoice)} className="flex-1 py-4 rounded-full border-2 border-gold-500 text-gold-600 font-bold uppercase tracking-[0.15em] text-xs disabled:opacity-40 disabled:cursor-not-allowed">2. I have paid</button>
              </div>
            )
          )}

          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100">Reviews ({rs.length})</h4>
            {club.isMember || club.canEdit || club.ownsBook(book.id) ? (
              <div className="space-y-3 p-5 rounded-3xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map(i => (
                  <button key={i} onClick={() => setRating(i)} aria-label={`${i} stars`}>{i <= rating ? <StarSolidIcon className="w-7 h-7 text-gold-500" /> : <StarIcon className="w-7 h-7 text-stone-300" />}</button>
                ))}</div>
                <textarea id={`review-${book.id}`} value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="What did this book give you?"
                  className="w-full p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 outline-none focus:ring-2 focus:ring-gold-500 text-sm font-serif" />
                <button onClick={() => club.saveReview(book.id, rating, text)} className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest text-[10px]">{mine ? 'Update review' : 'Post review'}</button>
              </div>
            ) : <p className="text-xs font-serif italic text-stone-500">Members and buyers can rate and review.</p>}
            {rs.length === 0 && <p className="text-sm font-serif italic text-stone-400">No reviews yet.</p>}
            {rs.map(r => (
              <div key={r.id} className="p-5 rounded-3xl border border-stone-100 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3"><Stars value={r.rating} size="w-3.5 h-3.5" /><span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{club.nameOf(r.uid)}</span>{(club.badges[r.uid]?.badges ? Object.keys(club.badges[r.uid].badges) as BadgeKey[] : []).map(k => <BadgePill key={k} kind={k} small />)}</div>
                  {(r.uid === club.uid || club.canEdit) && <button onClick={() => club.deleteReview(r.id)} aria-label="Delete review" className="text-stone-300 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>}
                </div>
                {r.text && <p className="text-sm font-serif text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">{r.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Owner / editor admin ---------- */
const field = 'w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 outline-none focus:ring-2 focus:ring-gold-500 text-sm font-serif';
const btn = 'px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-widest text-[10px]';

const BookRow: React.FC<{ book: Book; club: Club }> = ({ book, club }) => {
  const [price, setPrice] = useState(String(club.priceOf(book.id)));
  const [url, setUrl] = useState(club.bookMetaUrl ? club.bookMetaUrl(book.id) : '');
  const [access, setAccess] = useState<'club' | 'paid'>(club.accessOf(book.id));
  const custom = !(book.id in { 'christ-of-atlantis': 1, 'samurai-matrix': 1, 'binaural-healing': 1, 'natural-wellness': 1 });
  return (
    <div className="grid md:grid-cols-[1fr_140px_110px_1fr_auto] gap-3 items-center p-4 rounded-3xl border border-stone-200 dark:border-stone-800">
      <span className="font-display text-xs font-bold uppercase tracking-wide text-stone-800 dark:text-stone-200">{book.title}</span>
      <select id={`access-${book.id}`} aria-label={`Access for ${book.title}`} className={field} value={access} onChange={e => setAccess(e.target.value as 'club' | 'paid')}>
        <option value="club">Club (free for members)</option>
        <option value="paid">Paid (sold separately)</option>
      </select>
      <input id={`price-${book.id}`} aria-label={`Price for ${book.title}`} className={field} value={price} onChange={e => setPrice(e.target.value)} inputMode="decimal" placeholder="Price" />
      <input id={`buy-${book.id}`} aria-label={`Buy link for ${book.title}`} className={field} value={url} onChange={e => setUrl(e.target.value)} placeholder="PayPal link (blank = auto $ link)" />
      <div className="flex gap-2">
        <button className={btn} onClick={() => club.saveBookMeta(book.id, Math.max(0, parseFloat(price) || 0), url, access)}>Save</button>
        {custom && <button aria-label="Remove book" className="p-3 text-stone-400 hover:text-red-500" onClick={() => club.removeBook(book.id)}><TrashIcon className="w-5 h-5" /></button>}
      </div>
    </div>
  );
};

const AdminPanel: React.FC<{ club: Club }> = ({ club }) => {
  const [checkout, setCheckout] = useState(club.config.checkoutUrl || '');
  const [nb, setNb] = useState({ title: '', subtitle: '', author: '', description: '', price: '9.99', buy: '', text: '', access: 'paid' as 'club' | 'paid' });
  const preqs = Object.entries(club.purchaseReqs).flatMap(([u, v]) => Object.entries(v.books || {}).map(([b, at]) => ({ u, b, at: at as number })));
  const reqs = Object.entries(club.requests);
  const mems = Object.entries(club.members);

  const add = () => {
    if (!nb.title.trim() || !nb.text.trim()) return;
    const id = nb.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || `book-${Date.now()}`;
    const chunks = nb.text.split(/\n\s*---+\s*\n/).map(s => s.trim()).filter(Boolean);
    const book: Book = {
      id, title: nb.title.trim(), subtitle: nb.subtitle.trim() || 'Club Selection', author: nb.author.trim() || 'Sovereign Press',
      description: nb.description.trim() || 'A new addition to the archive.', coverColor: COVERS[club.allBooks.length % COVERS.length],
      pages: chunks.map((c, i) => ({ page: i + 1, title: c.split('\n')[0].slice(0, 60), content: c })),
    };
    club.addBook(book, Math.max(0, parseFloat(nb.price) || 0), nb.buy, nb.access);
    setNb({ title: '', subtitle: '', author: '', description: '', price: '9.99', buy: '', text: '', access: 'paid' });
  };

  return (
    <section className="space-y-10 p-8 md:p-12 rounded-[40px] border-2 border-dashed border-gold-500/40 bg-stone-50 dark:bg-stone-900/60">
      <div className="space-y-2">
        <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100">Club Admin</h3>
        <p className="font-serif italic text-sm text-stone-500">Only editors see this section.</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">$1 checkout link</h4>
        <p className="text-xs font-serif text-stone-500">Members pay ${JOIN_PRICE} through PayPal to {PAYPAL_EMAIL} by default, with a unique reference on every payment. Paste a different PayPal link here to override it.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input id="checkout-url" className={field} value={checkout} onChange={e => setCheckout(e.target.value)} placeholder="https://www.paypal.com/..." />
          <button className={btn} onClick={() => club.saveCheckout(checkout)}>Save link</button>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Pending requests ({reqs.length})</h4>
        <p className="text-xs font-serif text-stone-500">Check your payment dashboard for the $1, then approve.</p>
        {reqs.length === 0 && <p className="text-sm font-serif italic text-stone-400">Nobody is waiting.</p>}
        {reqs.map(([id, r]) => (
          <div key={id} className="flex items-center justify-between gap-3 p-4 rounded-3xl border border-stone-200 dark:border-stone-800">
            <div><span className="font-serif text-sm text-stone-800 dark:text-stone-200">{club.names[id] || 'Unnamed member'}</span><span className="block text-[10px] text-stone-400 uppercase tracking-widest">{new Date(r.at).toLocaleString()}{r.invoice ? ` · ref ${r.invoice}` : ''}</span></div>
            <div className="flex gap-2"><button className={btn} onClick={() => club.approve(id)}>Approve</button><button className="px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-500 font-bold uppercase tracking-widest text-[10px]" onClick={() => club.decline(id)}>Decline</button></div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Prayer donations claimed ({Object.values(club.donations).reduce((a: number, d: any) => a + (d?.count || 0), 0)})</h4>
        <p className="text-xs font-serif text-stone-500">Each claim is a person saying they sent $1 for a prayer, with a PayPal reference. Claims turn green once the matching payment is found in PayPal.</p>
        {Object.keys(club.donations).length === 0 && <p className="text-sm font-serif italic text-stone-400">No claims yet.</p>}
        {Object.entries(club.donations).map(([id, d]: [string, any]) => {
          const claims = Object.entries(d?.claims || {}) as [string, any][];
          const verified = Object.keys(d?.verified || {}).length;
          const last = claims.map(([, c]) => (typeof c === 'object' ? c.at : Number(c)) || 0).sort((a, b) => b - a)[0];
          const times = [last];
          return (
            <div key={id} className="flex items-center justify-between gap-3 p-4 rounded-3xl border border-stone-200 dark:border-stone-800">
              <div><span className="font-serif text-sm text-stone-800 dark:text-stone-200">{club.usernameOf(id) || club.names[id] || 'Unnamed visitor'}</span><span className="block text-[10px] text-stone-400 uppercase tracking-widest">Last claim {times[0] ? new Date(times[0]).toLocaleString() : ''}</span></div>
              <span className="text-right"><span className="block font-display font-bold text-gold-500">{d?.count || claims.length} × $1</span><span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: verified >= (d?.count || claims.length) ? '#16a34a' : '#d97706' }}>{verified} verified in PayPal</span></span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Book purchases waiting ({preqs.length})</h4>
        {preqs.length === 0 && <p className="text-sm font-serif italic text-stone-400">No purchases waiting.</p>}
        {preqs.map(x => (
          <div key={x.u + x.b} className="flex items-center justify-between gap-3 p-4 rounded-3xl border border-stone-200 dark:border-stone-800">
            <div><span className="font-serif text-sm text-stone-800 dark:text-stone-200">{club.names[x.u] || 'Unnamed buyer'} bought {club.allBooks.find(b => b.id === x.b)?.title || x.b}</span><span className="block text-[10px] text-stone-400 uppercase tracking-widest">{money(club.priceOf(x.b))} · {new Date(x.at).toLocaleString()}{club.purchaseInvoices[x.u]?.[x.b] ? ` · ref ${club.purchaseInvoices[x.u][x.b]}` : ''}</span></div>
            <div className="flex gap-2"><button className={btn} onClick={() => club.approvePurchase(x.u, x.b)}>Approve</button><button className="px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-500 font-bold uppercase tracking-widest text-[10px]" onClick={() => club.declinePurchase(x.u, x.b)}>Decline</button></div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Members ({mems.length})</h4>
        {mems.length === 0 && <p className="text-sm font-serif italic text-stone-400">No members yet.</p>}
        {mems.map(([id, m]) => (
          <div key={id} className="flex items-center justify-between gap-3 p-4 rounded-3xl border border-stone-200 dark:border-stone-800">
            <div><span className="font-serif text-sm text-stone-800 dark:text-stone-200">{club.usernameOf(id) || club.names[id] || 'No username yet'}</span> {club.badgesOf(id).map(k => <BadgePill key={k} kind={k} small />)}<span className="block text-[10px] text-stone-400 uppercase tracking-widest">{club.memberNoOf(id) ? `#${String(club.memberNoOf(id)).padStart(4, '0')} · ` : ''}Joined {new Date(m.since).toLocaleDateString()}</span></div>
            <button className="px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-500 hover:text-red-500 font-bold uppercase tracking-widest text-[10px]" onClick={() => club.revoke(id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Books: access and prices</h4>
        <p className="text-xs font-serif text-stone-500">Choose Club or Paid for each book. Club books are free for $1 members. Paid books are bought one at a time at their own price (members do not get them free). Leave the PayPal link blank to use an automatic PayPal link for that price.</p>
        {club.allBooks.map(b => <BookRow key={b.id + club.priceOf(b.id) + club.accessOf(b.id)} book={b} club={club} />)}
      </div>

      <div className="space-y-3">
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Add a book</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <input id="nb-title" className={field} placeholder="Title" value={nb.title} onChange={e => setNb({ ...nb, title: e.target.value })} />
          <input id="nb-subtitle" className={field} placeholder="Subtitle" value={nb.subtitle} onChange={e => setNb({ ...nb, subtitle: e.target.value })} />
          <input id="nb-author" className={field} placeholder="Author" value={nb.author} onChange={e => setNb({ ...nb, author: e.target.value })} />
          <input id="nb-price" className={field} placeholder="Shelf price" inputMode="decimal" value={nb.price} onChange={e => setNb({ ...nb, price: e.target.value })} />
          <select id="nb-access" className={field} value={nb.access} onChange={e => setNb({ ...nb, access: e.target.value as 'club' | 'paid' })}><option value="paid">Paid (sold separately)</option><option value="club">Club (free for members)</option></select>
          <input id="nb-buy" className={field} placeholder="PayPal link (optional)" value={nb.buy} onChange={e => setNb({ ...nb, buy: e.target.value })} />
          <textarea id="nb-desc" rows={2} className={`${field} md:col-span-2`} placeholder="Short description" value={nb.description} onChange={e => setNb({ ...nb, description: e.target.value })} />
          <textarea id="nb-text" rows={8} className={`${field} md:col-span-2`} placeholder={'Full text. Put a line with --- between pages. The first line of each page becomes its chapter title.'} value={nb.text} onChange={e => setNb({ ...nb, text: e.target.value })} />
        </div>
        <button className={btn} onClick={add}>Add to library</button>
      </div>
      {club.error && <p className="text-xs font-bold text-red-500">{club.error}</p>}
    </section>
  );
};
