import React, { useMemo, useState } from 'react';
import {
  MicrophoneIcon, EnvelopeIcon, VideoCameraIcon, MapPinIcon, ShieldCheckIcon,
  SparklesIcon, HeartIcon, BoltIcon, FireIcon, CheckIcon, ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

export const BOOKING_EMAIL = 'JESUSCHRISTOFATLANTIS@GMAIL.COM';
export const FEE_DIGITAL = 5000;
export const FEE_IN_PERSON = 10000;

const money = (n: number) => '$' + n.toLocaleString('en-US');

type Format = 'digital' | 'in-person';

const EVENT_TYPES = [
  'Conference / keynote',
  'Survivor or advocacy event',
  'Faith community / church',
  'School or university',
  'Corporate / team event',
  'Podcast / online summit',
  'Other',
];

const CHAPTERS = [
  { icon: ShieldCheckIcon, kicker: 'Chapter I', title: 'Taken', text: 'Kidnapped and trafficked by a secret society running human trafficking crimes. A story most people are afraid to believe, told by someone who lived it.' },
  { icon: FireIcon, kicker: 'Chapter II', title: 'Attacked', text: 'The attacks from them, and the attacks that came afterward. Millions were stolen. The goal was to break a person. It did not work.' },
  { icon: BoltIcon, kicker: 'Chapter III', title: 'Survived', text: 'How I made it through, one day at a time, and what that refusal to quit taught me about faith, courage and who you are underneath everything taken from you.' },
  { icon: SparklesIcon, kicker: 'Chapter IV', title: 'Thrived', text: 'How I rose above it all. Not just surviving, but building, creating and leading from the other side. This is the part your audience carries home.' },
];

const TAKEAWAYS = [
  'Survival is not the finish line. Thriving is.',
  'How to keep going when everything has been taken',
  'Turning the worst chapter into a mission',
  'Faith, resilience and refusing to be defined by what was done to you',
  'Rising above betrayal, attacks and loss',
];

export const Speaker: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [phone, setPhone] = useState('');
  const [format, setFormat] = useState<Format>('digital');
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [audience, setAudience] = useState('');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false);
  const [copied, setCopied] = useState(false);

  const fee = format === 'digital' ? FEE_DIGITAL : FEE_IN_PERSON;
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const valid = name.trim().length > 1 && emailOk;

  const subject = `Speaking Booking Inquiry: ${org.trim() || name.trim() || 'New inquiry'} (${format === 'digital' ? 'Digital' : 'In person'})`;
  const body = useMemo(() => ([
    'Hello,',
    '',
    'I would like to inquire about booking you as a speaker.',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    phone.trim() ? `Phone: ${phone.trim()}` : null,
    org.trim() ? `Organization: ${org.trim()}` : null,
    `Event type: ${eventType}`,
    `Format: ${format === 'digital' ? 'Digital' : 'In person'} (listed fee ${money(fee)})`,
    date.trim() ? `Event date: ${date.trim()}` : null,
    location.trim() ? `Location: ${location.trim()}` : null,
    audience.trim() ? `Expected audience: ${audience.trim()}` : null,
    '',
    message.trim() ? 'About our event:\n' + message.trim() : '',
    '',
    'Thank you,',
    name.trim(),
  ] as (string | null)[]).filter((v): v is string => v !== null).join('\n'), [name, email, phone, org, eventType, format, fee, date, location, audience, message]);

  const mailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const onSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) { e.preventDefault(); setTried(true); }
  };

  const copyDetails = async () => {
    if (!valid) { setTried(true); return; }
    const text = `To: ${BOOKING_EMAIL}\nSubject: ${subject}\n\n${body}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* ignore */ }
  };

  const input = 'w-full rounded-2xl bg-black/30 border border-white/10 focus:border-gold-500/70 focus:ring-2 focus:ring-gold-500/20 outline-none px-4 py-3.5 text-[16px] text-stone-100 placeholder:text-stone-500 transition';
  const label = 'block mb-2 font-sans font-bold uppercase text-[9px] tracking-[0.25em] text-gold-500/80';

  return (
    <div className="animate-fade-in -mx-0 pb-32 md:pb-24 overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-b-[36px] md:rounded-[48px] md:mt-6 md:mx-6 text-center px-5 md:px-12 pt-14 pb-16 md:py-24"
        style={{ background: 'radial-gradient(120% 90% at 50% 0%, #3b2a0a 0%, #1a1208 38%, #07060a 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 70% 20%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 85% 65%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 35% 75%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 55% 50%, #fde68a 50%, transparent 51%)', backgroundSize: '260px 260px' }} />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/40 bg-gold-500/10">
            <MicrophoneIcon className="w-4 h-4 text-gold-400" />
            <span className="font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-400">Now Booking Speaking Engagements</span>
          </div>
          <h1 className="font-display font-bold uppercase leading-[1.05] text-[34px] sm:text-5xl md:text-7xl tracking-wide text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg,#fff7d6 0%,#fbbf24 55%,#b45309 100%)' }}>
            Taken. Survived.<br />Risen.
          </h1>
          <p className="font-serif italic text-lg md:text-2xl text-stone-300 leading-relaxed">
            A kidnapped and trafficked survivor of secret society human trafficking crimes tells how he lived through it, was attacked, had millions stolen, and rose above it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="#book-speaker" onClick={(e) => { e.preventDefault(); document.getElementById('book-speaker')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-bold uppercase text-[10px] tracking-[0.25em] text-stone-950 shadow-2xl shadow-gold-500/30 active:scale-95 transition"
              style={{ background: 'linear-gradient(135deg,#fde68a,#f59e0b 55%,#b45309)' }}>
              <EnvelopeIcon className="w-4 h-4" /> Book a Speaking Inquiry
            </a>
            <a href="#speaker-story" onClick={(e) => { e.preventDefault(); document.getElementById('speaker-story')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold-500/40 text-gold-300 font-sans font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-gold-500/10 transition">
              Read the Story
            </a>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="px-5 md:px-12 max-w-4xl mx-auto -mt-8 md:mt-14 relative z-10">
        <div className="rounded-[28px] border border-gold-500/30 p-6 md:p-10 text-center shadow-2xl"
          style={{ background: 'linear-gradient(145deg, rgba(251,191,36,0.14), rgba(120,53,15,0.18) 60%, rgba(0,0,0,0.5))' }}>
          <HeartIcon className="w-7 h-7 text-gold-400 mx-auto mb-4" />
          <p className="font-serif italic text-xl md:text-3xl leading-snug text-stone-100">
            “My story is priceless, and I guarantee it will move you like no other story of survival you have ever heard.”
          </p>
          <p className="mt-5 font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-500">Jesus Christ of Atlantis</p>
        </div>
      </section>

      {/* STORY */}
      <section id="speaker-story" className="px-5 md:px-12 max-w-5xl mx-auto mt-14 md:mt-24 scroll-mt-20">
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <p className="font-sans font-bold uppercase text-[9px] tracking-[0.35em] text-gold-500">The Journey</p>
          <h2 className="font-display font-bold uppercase text-2xl md:text-5xl tracking-widest text-stone-900 dark:text-stone-100">What You Will Hear</h2>
          <div className="h-px w-24 bg-gold-500/50 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {CHAPTERS.map((c, i) => (
            <div key={c.title} className="relative overflow-hidden rounded-[28px] p-6 md:p-8 border border-gold-500/20 shadow-xl"
              style={{ background: `linear-gradient(${140 + i * 25}deg, #1c1409 0%, #0d0a14 70%)` }}>
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-2xl opacity-25" style={{ background: 'radial-gradient(circle,#f59e0b,transparent 70%)' }} />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ width: 48, height: 48, background: 'linear-gradient(135deg,#fde68a,#b45309)' }}>
                  <c.icon className="w-6 h-6 text-stone-950" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-500/80">{c.kicker}</p>
                  <h3 className="font-display font-bold uppercase text-xl tracking-widest text-gold-300 mt-1">{c.title}</h3>
                  <p className="font-serif text-[16px] leading-relaxed text-stone-300 mt-2">{c.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/70 p-6 md:p-10">
          <p className="font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-500 mb-4">Your Audience Leaves With</p>
          <ul className="space-y-3">
            {TAKEAWAYS.map(t => (
              <li key={t} className="flex gap-3 items-start">
                <CheckIcon className="w-5 h-5 text-gold-500 mt-0.5" style={{ minWidth: 20 }} />
                <span className="font-serif text-[17px] md:text-xl text-stone-700 dark:text-stone-200 leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEES */}
      <section className="px-5 md:px-12 max-w-4xl mx-auto mt-14 md:mt-24">
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <p className="font-sans font-bold uppercase text-[9px] tracking-[0.35em] text-gold-500">Speaking Fees</p>
          <h2 className="font-display font-bold uppercase text-2xl md:text-5xl tracking-widest text-stone-900 dark:text-stone-100">Bring It To Your Stage</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {([
            { f: 'digital' as Format, icon: VideoCameraIcon, title: 'Digital', price: FEE_DIGITAL, blurb: 'Live virtual keynote for your event, summit, congregation or classroom, anywhere in the world.' },
            { f: 'in-person' as Format, icon: MapPinIcon, title: 'In Person', price: FEE_IN_PERSON, blurb: 'Face to face on your stage. The full, unfiltered experience of the story in the room.' },
          ]).map(o => (
            <button key={o.f} type="button" onClick={() => { setFormat(o.f); document.getElementById('book-speaker')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-left rounded-[28px] p-6 md:p-8 border transition active:scale-[0.98] ${format === o.f ? 'border-gold-500 shadow-2xl shadow-gold-500/20' : 'border-gold-500/20'}`}
              style={{ background: o.f === 'in-person' ? 'linear-gradient(145deg,#3b2a0a,#120d05 70%)' : 'linear-gradient(145deg,#1b1a2e,#0a0910 70%)' }}>
              <o.icon className="w-8 h-8 text-gold-400" />
              <p className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-gold-500/80 mt-4">{o.title}</p>
              <p className="font-display font-bold text-4xl md:text-5xl text-transparent bg-clip-text mt-1" style={{ backgroundImage: 'linear-gradient(180deg,#fff7d6,#f59e0b)' }}>{money(o.price)}</p>
              <p className="font-serif text-[16px] leading-relaxed text-stone-300 mt-3">{o.blurb}</p>
            </button>
          ))}
        </div>
        <p className="text-center font-serif italic text-stone-500 dark:text-stone-400 mt-5 text-[15px]">Availability and final details are confirmed by email after your inquiry.</p>
      </section>

      {/* BOOKING FORM */}
      <section id="book-speaker" className="px-5 md:px-12 max-w-3xl mx-auto mt-14 md:mt-24 scroll-mt-20">
        <div className="rounded-[32px] md:rounded-[44px] border border-gold-500/30 p-5 sm:p-8 md:p-12 shadow-2xl"
          style={{ background: 'linear-gradient(160deg,#241a0a 0%,#0e0b14 60%,#07060a 100%)' }}>
          <div className="text-center space-y-3 mb-8">
            <EnvelopeIcon className="w-9 h-9 text-gold-400 mx-auto" />
            <h2 className="font-display font-bold uppercase text-2xl md:text-4xl tracking-widest text-gold-300">Booking Inquiry</h2>
            <p className="font-serif text-stone-300 text-[16px] md:text-lg">Tell me about your event. Pressing send opens your email app with everything filled in, addressed to {BOOKING_EMAIL.toLowerCase()}.</p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10">
              {([['digital', 'Digital', FEE_DIGITAL], ['in-person', 'In Person', FEE_IN_PERSON]] as [Format, string, number][]).map(([f, t, p]) => (
                <button key={f} type="button" onClick={() => setFormat(f)}
                  className={`py-3 rounded-xl font-sans font-bold uppercase text-[10px] tracking-[0.2em] transition ${format === f ? 'text-stone-950 shadow-lg' : 'text-stone-400'}`}
                  style={format === f ? { background: 'linear-gradient(135deg,#fde68a,#f59e0b)' } : undefined}>
                  {t} · {money(p)}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={label}>Your name *</label>
                <input className={input} value={name} onChange={e => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
                {tried && name.trim().length < 2 && <p className="text-red-400 text-xs mt-1.5">Please add your name.</p>}
              </div>
              <div>
                <label className={label}>Your email *</label>
                <input className={input} type="email" inputMode="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@organization.com" autoComplete="email" />
                {tried && !emailOk && <p className="text-red-400 text-xs mt-1.5">Please add a valid email.</p>}
              </div>
              <div>
                <label className={label}>Organization</label>
                <input className={input} value={org} onChange={e => setOrg(e.target.value)} placeholder="Company, church, school…" autoComplete="organization" />
              </div>
              <div>
                <label className={label}>Phone</label>
                <input className={input} type="tel" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Optional" autoComplete="tel" />
              </div>
              <div>
                <label className={label}>Event type</label>
                <select className={input} value={eventType} onChange={e => setEventType(e.target.value)}>
                  {EVENT_TYPES.map(t => <option key={t} value={t} className="text-black">{t}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>Event date</label>
                <input className={input} value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. March 14, 2027" />
              </div>
              <div>
                <label className={label}>{format === 'digital' ? 'Platform / time zone' : 'City & venue'}</label>
                <input className={input} value={location} onChange={e => setLocation(e.target.value)} placeholder={format === 'digital' ? 'Zoom, Teams… / PST' : 'City, State, venue'} />
              </div>
              <div>
                <label className={label}>Expected audience</label>
                <input className={input} inputMode="numeric" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. 500" />
              </div>
            </div>

            <div>
              <label className={label}>About your event</label>
              <textarea className={input + ' min-h-[130px] resize-y'} value={message} onChange={e => setMessage(e.target.value)} placeholder="Theme, audience, what you hope people take away…" />
            </div>

            <a href={valid ? mailto : '#book-speaker'} onClick={onSend}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-full font-sans font-bold uppercase text-[11px] tracking-[0.25em] text-stone-950 shadow-2xl shadow-gold-500/30 active:scale-[0.98] transition"
              style={{ background: 'linear-gradient(135deg,#fde68a,#f59e0b 55%,#b45309)' }}>
              <EnvelopeIcon className="w-5 h-5" /> Open Email &amp; Send Inquiry · {money(fee)}
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              <button type="button" onClick={copyDetails} className="inline-flex items-center gap-2 text-gold-400 font-sans font-bold uppercase text-[9px] tracking-[0.25em] py-2">
                {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
                {copied ? 'Copied. Paste into any email' : 'Email app did not open? Copy details'}
              </button>
              <a href={`mailto:${BOOKING_EMAIL}`} className="text-stone-400 text-sm break-all underline decoration-gold-500/40">{BOOKING_EMAIL.toLowerCase()}</a>
            </div>
          </div>
        </div>

        <p className="text-center font-serif italic text-stone-500 dark:text-stone-400 mt-6 text-[14px] leading-relaxed px-2">
          Content note for organizers: this talk discusses kidnapping, human trafficking and violence in survivor-told terms. Please plan with your audience in mind.
        </p>
      </section>
    </div>
  );
};
