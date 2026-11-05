import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MicrophoneIcon, EnvelopeIcon, VideoCameraIcon, MapPinIcon, ShieldCheckIcon,
  SparklesIcon, HeartIcon, BoltIcon, FireIcon, CheckIcon, ClipboardDocumentIcon,
  ChevronDownIcon, ArrowPathIcon, UserGroupIcon, BanknotesIcon, GlobeAltIcon,
} from '@heroicons/react/24/outline';

export const BOOKING_EMAIL = 'JESUSCHRISTOFATLANTIS@GMAIL.COM';
export const FEE_DIGITAL = 5000;
export const FEE_IN_PERSON = 10000;
export const FEE_COACHING = 100;
const money = (n: number) => '$' + n.toLocaleString('en-US');
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

type Format = 'digital' | 'in-person' | 'coaching';

const EVENT_TYPES = [
  'Conference / keynote', 'Survivor or advocacy event', 'Faith community / church',
  'School or university', 'Corporate / team event', 'Podcast / online summit', 'Other',
];

const TALKS = [
  { id: 'Keynote: What Doesn\'t Kill You', icon: MicrophoneIcon, len: '45-60 min', text: 'The full story, start to finish: sold by a fake family, survived, and made stronger. Built to move a whole room.' },
  { id: 'Fireside Conversation', icon: HeartIcon, len: '30-45 min', text: 'A guided, honest Q&A with your host. Personal, unscripted, and open to your audience\'s questions.' },
  { id: 'Resilience Workshop', icon: BoltIcon, len: '60-90 min', text: 'Turn the story into tools: how to keep going, rebuild trust and forge strength out of what was done to you.' },
  { id: 'Survivor Leadership Talk', icon: UserGroupIcon, len: '30-45 min', text: 'For teams and organizations: leading, rebuilding and thriving after betrayal and loss.' },
];

const TIMELINE = [
  { icon: UserGroupIcon, tag: 'The Lie', title: 'A Family That Was Never Real', text: 'It began inside a fake family. People who played the part of love while holding a very different plan. The deepest betrayal is the one that wears a familiar face.' },
  { icon: ShieldCheckIcon, tag: 'The Sale', title: 'Taken and Sold', text: 'Kidnapped and trafficked by a secret society running human trafficking crimes. Sold by the people who were supposed to protect me. No one should ever have to hear that sentence about their own life.' },
  { icon: FireIcon, tag: 'The Fire', title: 'Dealing With It', text: 'How do you deal with it? Not all at once. One hour, one breath, one refusal to give up at a time. This is the raw middle of the story, and the part that teaches the most.' },
  { icon: BanknotesIcon, tag: 'The Attacks', title: 'Attacked and Robbed', text: 'My family robbed me of my identity and stole millions, claiming I was dead so they could take it. That identity theft is an ongoing situation, and I am still fighting it. They wanted me broken, silent and poor. They got none of the three.' },
  { icon: BoltIcon, tag: 'The Forge', title: 'Made Stronger', text: 'What does not kill you truly makes you stronger. I am living proof. Every attempt to crush me became part of the strength I stand on today.' },
  { icon: SparklesIcon, tag: 'The Rise', title: 'Risen, and Giving Back', text: 'I survived, I thrived, and now I turn that pain into purpose: speaking so others know they can rise, and funding food for people who need it.' },
];

const FORGE = [
  { took: 'My family', forged: 'A chosen family and a fierce sense of who I am. Blood did not define me; courage did.' },
  { took: 'My freedom', forged: 'A freedom I will never take for granted, and the drive to help others find theirs.' },
  { took: 'My identity', forged: 'An identity no one can forge or steal, because it lives in who I am, not in paperwork.' },
  { took: 'My money', forged: 'The knowledge that wealth is built, not given, and that I can build it again.' },
  { took: 'My peace', forged: 'Peace I made myself, through faith and discipline, that no one can take twice.' },
  { took: 'My voice', forged: 'A voice that now fills stages and tells the truth they tried to bury.' },
];

const TAKEAWAYS = [
  'What does not kill you truly makes you stronger, and how to make that real',
  'How to keep going when the people closest to you were the betrayal',
  'Turning the worst chapter of your life into a mission',
  'Faith, discipline and refusing to be defined by what was done to you',
  'Rising above attacks, loss and being counted out',
];

const FAQ = [
  { q: 'How do I book?', a: 'Fill out the inquiry form below. It opens your email app with everything filled in, addressed to JESUSCHRISTOFATLANTIS@GMAIL.COM. Availability and final details are confirmed by email.' },
  { q: 'What are the fees?', a: 'Digital engagements are $5,000 and in-person engagements are $10,000.' },
  { q: 'We are a small group or a smaller event. Is there flexibility?', a: 'Yes. The listed fees are for conferences and larger events. For smaller groups, classrooms and individuals, pricing is flexible. Send an inquiry and we will work something out.' },
  { q: 'How does coaching work?', a: 'Coaching is $100 a month and includes two one-hour sessions to work on your goals and find where you can improve, using the systems and knowledge I provide. It suits business owners, teachers, leaders and individuals. Pricing can be adjusted, so just inquire.' },
  { q: 'Where does the money go?', a: 'Speaking booking proceeds go toward speaking fees and donations to UNIONCOIN, a charity that feeds individuals through a digital trust fund. Exact allocation is confirmed by email.' },
  { q: 'Is the content safe for my audience?', a: 'The story is told from a survivor\'s perspective and covers kidnapping, human trafficking, betrayal and violence. It is about survival and strength, not graphic detail. Please plan with your audience in mind, and mention any guidelines in your inquiry.' },
  { q: 'Can the talk be customized?', a: 'Yes. Choose a format in the form (keynote, fireside, workshop or leadership talk) and tell me about your audience and goals.' },
];

/** Fades and lifts children into view as they scroll on. Falls back to visible. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    const el = ref.current; if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(22px)', transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>{children}</div>;
};

const Eyebrow: React.FC<{ kicker: string; title: string; sub?: string }> = ({ kicker, title, sub }) => (
  <div className="text-center mb-8 md:mb-12 space-y-3">
    <p className="font-sans font-bold uppercase text-[9px] tracking-[0.35em] text-gold-500">{kicker}</p>
    <h2 className="font-display font-bold uppercase text-2xl md:text-5xl tracking-widest text-stone-900 dark:text-stone-100">{title}</h2>
    {sub && <p className="font-serif italic text-stone-500 dark:text-stone-400 text-[16px] md:text-xl max-w-2xl mx-auto">{sub}</p>}
    <div className="h-px w-24 bg-gold-500/50 mx-auto" />
  </div>
);

export const Speaker: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [phone, setPhone] = useState('');
  const [format, setFormat] = useState<Format>('digital');
  const [talk, setTalk] = useState(TALKS[0].id);
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [audience, setAudience] = useState('');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [showBar, setShowBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    let heroGone = false, formSeen = false;
    const upd = () => setShowBar(heroGone && !formSeen);
    const a = new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting; upd(); });
    const b = new IntersectionObserver(([e]) => { formSeen = e.isIntersecting; upd(); });
    if (heroRef.current) a.observe(heroRef.current);
    if (formRef.current) b.observe(formRef.current);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);

  const fee = format === 'digital' ? FEE_DIGITAL : format === 'in-person' ? FEE_IN_PERSON : FEE_COACHING;
  const coaching = format === 'coaching';
  const feeLabel = coaching ? `${money(fee)}/mo` : money(fee);
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const valid = name.trim().length > 1 && emailOk;

  const subject = coaching ? `Coaching Inquiry: ${name.trim() || 'New inquiry'}` : `Speaking Booking Inquiry: ${org.trim() || name.trim() || 'New inquiry'} (${format === 'digital' ? 'Digital' : 'In person'})`;
  const body = useMemo(() => ([
    'Hello,', '',
    coaching ? 'I would like to inquire about your coaching ($100/month, two 1-hour sessions).' : 'I would like to inquire about booking you as a speaker.', '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    phone.trim() ? `Phone: ${phone.trim()}` : null,
    org.trim() ? `Organization: ${org.trim()}` : null,
    `Event type: ${eventType}`,
    coaching ? 'Interested in: 1-on-1 or small-group coaching' : `Talk: ${talk}`,
    coaching ? `Plan: Coaching, ${feeLabel} (open to adjusting price)` : `Format: ${format === 'digital' ? 'Digital' : 'In person'} (listed fee ${money(fee)})`,
    date.trim() ? `Event date: ${date.trim()}` : null,
    location.trim() ? `Location: ${location.trim()}` : null,
    audience.trim() ? `Expected audience: ${audience.trim()}` : null,
    '',
    message.trim() ? (coaching ? 'My goals:\n' : 'About our event:\n') + message.trim() : '',
    '', 'Thank you,', name.trim(),
  ] as (string | null)[]).filter((v): v is string => v !== null).join('\n'),
  [name, email, phone, org, eventType, talk, format, fee, coaching, feeLabel, date, location, audience, message]);

  const mailto = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const onSend = (e: React.MouseEvent<HTMLAnchorElement>) => { if (!valid) { e.preventDefault(); setTried(true); } };
  const copyDetails = async () => {
    if (!valid) { setTried(true); return; }
    try { await navigator.clipboard.writeText(`To: ${BOOKING_EMAIL}\nSubject: ${subject}\n\n${body}`); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* ignore */ }
  };

  const input = 'w-full rounded-2xl bg-black/30 border border-white/10 focus:border-gold-500/70 focus:ring-2 focus:ring-gold-500/20 outline-none px-4 py-3.5 text-[16px] text-stone-100 placeholder:text-stone-500 transition';
  const label = 'block mb-2 font-sans font-bold uppercase text-[9px] tracking-[0.25em] text-gold-500/80';
  const goldBtn = { background: 'linear-gradient(135deg,#fde68a,#f59e0b 55%,#b45309)' };
  const cur = TIMELINE[step];

  return (
    <div className="animate-fade-in pb-40 md:pb-24 overflow-x-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden rounded-b-[36px] md:rounded-[48px] md:mt-6 md:mx-6 text-center px-5 md:px-12 pt-14 pb-20 md:py-28"
        style={{ background: 'radial-gradient(120% 90% at 50% 0%, #4a3208 0%, #1a1208 38%, #07060a 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 70% 20%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 85% 65%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 35% 75%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 55% 50%, #fde68a 50%, transparent 51%)', backgroundSize: '260px 260px' }} />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/40 bg-gold-500/10">
            <MicrophoneIcon className="w-4 h-4 text-gold-400" />
            <span className="font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-400">Now Booking Speaking Engagements</span>
          </div>
          <h1 className="font-display font-bold uppercase leading-[1.05] text-[32px] sm:text-5xl md:text-7xl tracking-wide text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(180deg,#fff7d6 0%,#fbbf24 55%,#b45309 100%)' }}>
            What Doesn’t Kill You<br />Makes You Stronger
          </h1>
          <p className="font-serif italic text-lg md:text-2xl text-stone-300 leading-relaxed">
            Sold by a fake family. Kidnapped and trafficked by a secret society. Attacked, robbed of millions, and still standing. This is the story of how I survived, thrived, and turned it into strength.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={() => goTo('book-speaker')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-bold uppercase text-[10px] tracking-[0.25em] text-stone-950 shadow-2xl shadow-gold-500/30 active:scale-95 transition" style={goldBtn}>
              <EnvelopeIcon className="w-4 h-4" /> Book a Speaking Inquiry
            </button>
            <button onClick={() => goTo('speaker-story')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold-500/40 text-gold-300 font-sans font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-gold-500/10 transition">
              Follow the Journey
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[['Digital', money(FEE_DIGITAL)], ['In Person', money(FEE_IN_PERSON)]].map(([t, p]) => (
              <span key={t} className="px-4 py-2 rounded-full bg-black/40 border border-gold-500/25 font-sans font-bold uppercase text-[9px] tracking-[0.2em] text-gold-300">{t} · {p}</span>
            ))}
            <span className="px-4 py-2 rounded-full bg-black/40 border border-gold-500/25 font-sans font-bold uppercase text-[9px] tracking-[0.2em] text-gold-300">Coaching · $100/mo</span>
            <span className="px-4 py-2 rounded-full bg-black/40 border border-gold-500/25 font-sans font-bold uppercase text-[9px] tracking-[0.2em] text-gold-300">Funds UNIONCOIN</span>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <Reveal className="px-5 md:px-12 max-w-4xl mx-auto -mt-10 md:mt-14 relative z-10">
        <div className="rounded-[28px] border border-gold-500/30 p-6 md:p-10 text-center shadow-2xl" style={{ background: 'linear-gradient(145deg, rgba(251,191,36,0.16), rgba(120,53,15,0.2) 60%, rgba(0,0,0,0.55))' }}>
          <HeartIcon className="w-7 h-7 text-gold-400 mx-auto mb-4" />
          <p className="font-serif italic text-xl md:text-3xl leading-snug text-stone-100">
            “My story is priceless, and I guarantee it will move you like no other story of survival you have ever heard.”
          </p>
          <p className="mt-5 font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-500">Jesus Christ of Atlantis</p>
        </div>
      </Reveal>

      {/* INTERACTIVE JOURNEY */}
      <section id="speaker-story" className="px-5 md:px-12 max-w-5xl mx-auto mt-16 md:mt-28 scroll-mt-20">
        <Eyebrow kicker="The Journey" title="Six Chapters of Survival" sub="Tap each chapter to walk through the story." />
        <Reveal>
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-5 px-5 md:mx-0 md:px-0 md:justify-center" style={{ scrollbarWidth: 'none' }}>
            {TIMELINE.map((t, i) => (
              <button key={t.tag} onClick={() => setStep(i)}
                className={`shrink-0 px-4 py-3 rounded-full font-sans font-bold uppercase text-[9px] tracking-[0.2em] border transition ${i === step ? 'text-stone-950 border-transparent shadow-lg' : i < step ? 'border-gold-500/50 text-gold-400 bg-gold-500/10' : 'border-stone-300 dark:border-stone-700 text-stone-500'}`}
                style={i === step ? goldBtn : undefined}>
                {i + 1}. {t.tag}
              </button>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden mt-2">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${((step + 1) / TIMELINE.length) * 100}%`, background: 'linear-gradient(90deg,#b45309,#fbbf24)' }} />
          </div>
          <div key={step} className="animate-fade-in mt-5 relative overflow-hidden rounded-[32px] border border-gold-500/25 p-7 md:p-12 shadow-2xl min-h-[250px]"
            style={{ background: `linear-gradient(${135 + step * 20}deg, #2a1d0a 0%, #0d0a14 75%)` }}>
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle,#f59e0b,transparent 70%)' }} />
            <div className="relative flex items-start gap-4 md:gap-6">
              <div className="shrink-0 rounded-2xl flex items-center justify-center" style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#fde68a,#b45309)' }}>
                <cur.icon className="w-7 h-7 text-stone-950" />
              </div>
              <div className="min-w-0">
                <p className="font-sans font-bold uppercase text-[9px] tracking-[0.3em] text-gold-500/80">Chapter {step + 1} of {TIMELINE.length} · {cur.tag}</p>
                <h3 className="font-display font-bold uppercase text-xl md:text-3xl tracking-widest text-gold-300 mt-1">{cur.title}</h3>
              </div>
            </div>
            <p className="relative font-serif text-[17px] md:text-xl leading-relaxed text-stone-200 mt-5">{cur.text}</p>
            <div className="relative flex justify-between mt-7">
              <button disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))} className="px-5 py-3 rounded-full border border-gold-500/30 text-gold-300 font-sans font-bold uppercase text-[9px] tracking-[0.2em] disabled:opacity-30">Back</button>
              {step < TIMELINE.length - 1
                ? <button onClick={() => setStep(s => s + 1)} className="px-6 py-3 rounded-full text-stone-950 font-sans font-bold uppercase text-[9px] tracking-[0.2em]" style={goldBtn}>Next Chapter</button>
                : <button onClick={() => goTo('book-speaker')} className="px-6 py-3 rounded-full text-stone-950 font-sans font-bold uppercase text-[9px] tracking-[0.2em]" style={goldBtn}>Book the Talk</button>}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FORGE */}
      <section className="px-5 md:px-12 max-w-5xl mx-auto mt-16 md:mt-28">
        <Eyebrow kicker="The Strength Forge" title="What They Took, What It Forged" sub="Tap a card. Everything taken became something stronger." />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {FORGE.map((f, i) => (
            <Reveal key={f.took} delay={i * 70} className={i === FORGE.length - 1 && FORGE.length % 2 ? 'sm:col-span-2' : ''}>
              <button type="button" onClick={() => setFlipped(s => ({ ...s, [i]: !s[i] }))}
                className="w-full text-left rounded-[28px] p-6 md:p-8 border transition-all duration-500 active:scale-[0.98] min-h-[150px] relative overflow-hidden"
                style={{ borderColor: flipped[i] ? 'rgba(251,191,36,0.7)' : 'rgba(120,113,108,0.35)', background: flipped[i] ? 'linear-gradient(145deg,#5a3d0c,#1c1409 75%)' : 'linear-gradient(145deg,#1a1a1f,#09090c 75%)', boxShadow: flipped[i] ? '0 0 40px rgba(245,158,11,0.25)' : 'none' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-sans font-bold uppercase text-[9px] tracking-[0.3em]" style={{ color: flipped[i] ? '#fbbf24' : '#a8a29e' }}>{flipped[i] ? 'It forged' : 'They took'}</p>
                  <ArrowPathIcon className="w-4 h-4 text-gold-500/70" />
                </div>
                {flipped[i]
                  ? <p className="font-serif text-[17px] md:text-xl leading-relaxed text-gold-100" style={{ color: '#fef3c7' }}>{f.forged}</p>
                  : <p className="font-display font-bold uppercase text-2xl md:text-3xl tracking-widest text-stone-300">{f.took}</p>}
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal>
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
        </Reveal>
      </section>

      {/* TALK FORMATS */}
      <section className="px-5 md:px-12 max-w-5xl mx-auto mt-16 md:mt-28">
        <Eyebrow kicker="Talk Formats" title="Choose Your Experience" />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {TALKS.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <button type="button" onClick={() => { setTalk(t.id); goTo('book-speaker'); }}
                className={`w-full h-full text-left rounded-[28px] p-6 md:p-8 border transition active:scale-[0.98] ${talk === t.id ? 'border-gold-500 shadow-2xl shadow-gold-500/20' : 'border-gold-500/20'}`}
                style={{ background: 'linear-gradient(145deg,#1d1409,#0b0910 75%)' }}>
                <div className="flex items-center justify-between">
                  <t.icon className="w-8 h-8 text-gold-400" />
                  <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 font-sans font-bold uppercase text-[8px] tracking-[0.2em] text-gold-400">{t.len}</span>
                </div>
                <h3 className="font-display font-bold uppercase text-lg tracking-widest text-gold-300 mt-4">{t.id}</h3>
                <p className="font-serif text-[16px] leading-relaxed text-stone-300 mt-2">{t.text}</p>
                <p className="font-sans font-bold uppercase text-[9px] tracking-[0.25em] text-gold-500 mt-4">{talk === t.id ? 'Selected' : 'Select & book'}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEES */}
      <section className="px-5 md:px-12 max-w-4xl mx-auto mt-16 md:mt-28">
        <Eyebrow kicker="Speaking Fees" title="Bring It To Your Stage" />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {([
            { f: 'digital' as Format, icon: VideoCameraIcon, title: 'Digital', price: FEE_DIGITAL, blurb: 'A live virtual keynote for your event, summit, congregation or classroom, anywhere in the world.' },
            { f: 'in-person' as Format, icon: MapPinIcon, title: 'In Person', price: FEE_IN_PERSON, blurb: 'Face to face on your stage. The full, unfiltered experience of the story in the room.' },
          ]).map(o => (
            <button key={o.f} type="button" onClick={() => { setFormat(o.f); goTo('book-speaker'); }}
              className={`text-left rounded-[28px] p-6 md:p-8 border transition active:scale-[0.98] ${format === o.f ? 'border-gold-500 shadow-2xl shadow-gold-500/20' : 'border-gold-500/20'}`}
              style={{ background: o.f === 'in-person' ? 'linear-gradient(145deg,#3b2a0a,#120d05 70%)' : 'linear-gradient(145deg,#1b1a2e,#0a0910 70%)' }}>
              <o.icon className="w-8 h-8 text-gold-400" />
              <p className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-gold-500/80 mt-4">{o.title}</p>
              <p className="font-display font-bold text-4xl md:text-5xl text-transparent bg-clip-text mt-1" style={{ backgroundImage: 'linear-gradient(180deg,#fff7d6,#f59e0b)' }}>{money(o.price)}</p>
              <p className="font-serif text-[16px] leading-relaxed text-stone-300 mt-3">{o.blurb}</p>
            </button>
          ))}
        </div>
      </section>

      <p className="text-center font-serif italic text-stone-500 dark:text-stone-400 mt-5 text-[15px] px-5">Smaller group or event? Pricing is flexible. See coaching and small-group options below.</p>

      {/* SMALLER EVENTS + COACHING */}
      <section id="coaching" className="px-5 md:px-12 max-w-4xl mx-auto mt-16 md:mt-28 scroll-mt-20">
        <Eyebrow kicker="Not a Conference?" title="Small Group or Individual" sub="Don’t let the big numbers scare you. Smaller groups and events get flexible pricing. Just inquire." />
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] md:rounded-[44px] border border-gold-500/40 p-6 md:p-12 shadow-2xl" style={{ background: 'linear-gradient(150deg,#3b2a0a 0%,#150f08 55%,#0b0910 100%)' }}>
            <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle,#f59e0b,transparent 70%)' }} />
            <div className="relative grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <p className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-gold-500/80">1-on-1 Coaching</p>
                <p className="font-display font-bold text-6xl md:text-7xl text-transparent bg-clip-text mt-2" style={{ backgroundImage: 'linear-gradient(180deg,#fff7d6,#f59e0b)' }}>$100</p>
                <p className="font-sans font-bold uppercase text-[10px] tracking-[0.25em] text-gold-300 mt-1">per month</p>
                <p className="font-serif italic text-stone-300 mt-3 text-[16px]">2 sessions · 1 hour each</p>
              </div>
              <div className="md:col-span-3 space-y-4">
                <p className="font-serif text-[17px] md:text-xl leading-relaxed text-stone-200">True coaching and motivation, one on one. Two full one-hour sessions every month to work on your goals and find where you can improve, using the systems and knowledge I provide.</p>
                <ul className="space-y-2.5">
                  {['Business owners and professionals sharpening their goals', 'Teachers and leaders preparing to speak to students or teams', 'Individuals who want real accountability and a way through hard times', 'Small groups welcome. Pricing is flexible, just ask'].map(t => (
                    <li key={t} className="flex gap-3 items-start"><CheckIcon className="w-5 h-5 text-gold-400 mt-0.5" style={{ minWidth: 20 }} /><span className="font-serif text-[16px] md:text-lg text-stone-300 leading-snug">{t}</span></li>
                  ))}
                </ul>
                <button onClick={() => { setFormat('coaching'); goTo('book-speaker'); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-bold uppercase text-[10px] tracking-[0.25em] text-stone-950 shadow-2xl shadow-gold-500/30 active:scale-95 transition" style={goldBtn}>
                  <EnvelopeIcon className="w-4 h-4" /> Inquire About Coaching
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* IMPACT */}
      <section className="px-5 md:px-12 max-w-5xl mx-auto mt-16 md:mt-28">
        <Eyebrow kicker="Your Booking Does More" title="Fees That Feed People" sub="Speaking booking proceeds go toward speaking fees and donations to UNIONCOIN, a charity feeding individuals through a digital trust fund." />
        <Reveal>
          <div className="rounded-[32px] md:rounded-[44px] border border-gold-500/30 p-6 md:p-12 shadow-2xl" style={{ background: 'linear-gradient(150deg,#2a1d0a 0%,#0c0a12 65%)' }}>
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4">
              {[
                { icon: MicrophoneIcon, t: 'Your Booking', d: 'You book a speaking engagement. Digital $5,000 or in person $10,000.' },
                { icon: BanknotesIcon, t: 'Fees & Donations', d: 'Funds cover speaking fees and donations to UNIONCOIN.' },
                { icon: GlobeAltIcon, t: 'Digital Trust Fund', d: 'UNIONCOIN holds donations in a digital trust fund.' },
                { icon: HeartIcon, t: 'Individuals Fed', d: 'The fund goes to feeding individuals in need.' },
              ].map((s, i, a) => (
                <React.Fragment key={s.t}>
                  <div className="flex-1 rounded-3xl bg-black/30 border border-white/10 p-5 text-center">
                    <div className="mx-auto rounded-2xl flex items-center justify-center" style={{ width: 48, height: 48, background: 'linear-gradient(135deg,#fde68a,#b45309)' }}>
                      <s.icon className="w-6 h-6 text-stone-950" />
                    </div>
                    <p className="font-display font-bold uppercase text-sm tracking-widest text-gold-300 mt-3">{s.t}</p>
                    <p className="font-serif text-[15px] text-stone-300 mt-1.5 leading-snug">{s.d}</p>
                  </div>
                  {i < a.length - 1 && <ChevronDownIcon className="w-5 h-5 text-gold-500 mx-auto md:-rotate-90 shrink-0 self-center" />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-center font-serif italic text-stone-400 mt-6 text-[15px]">Exact allocation is confirmed by email with every booking.</p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-12 max-w-3xl mx-auto mt-16 md:mt-28">
        <Eyebrow kicker="Questions" title="Before You Book" />
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={f.q} className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/70 overflow-hidden">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left">
                <span className="font-display font-bold uppercase text-[13px] md:text-base tracking-widest text-stone-800 dark:text-stone-100">{f.q}</span>
                <ChevronDownIcon className="w-5 h-5 text-gold-500 transition-transform" style={{ minWidth: 20, transform: faqOpen === i ? 'rotate(180deg)' : 'none' }} />
              </button>
              {faqOpen === i && <p className="px-5 md:px-6 pb-5 md:pb-6 font-serif text-[16px] md:text-lg leading-relaxed text-stone-600 dark:text-stone-300">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="book-speaker" ref={formRef} className="px-5 md:px-12 max-w-3xl mx-auto mt-16 md:mt-28 scroll-mt-20">
        <div className="rounded-[32px] md:rounded-[44px] border border-gold-500/30 p-5 sm:p-8 md:p-12 shadow-2xl" style={{ background: 'linear-gradient(160deg,#241a0a 0%,#0e0b14 60%,#07060a 100%)' }}>
          <div className="text-center space-y-3 mb-8">
            <EnvelopeIcon className="w-9 h-9 text-gold-400 mx-auto" />
            <h2 className="font-display font-bold uppercase text-2xl md:text-4xl tracking-widest text-gold-300">Booking Inquiry</h2>
            <p className="font-serif text-stone-300 text-[16px] md:text-lg">Tell me about your event or goals. Pressing send opens your email app with everything filled in, addressed to {BOOKING_EMAIL.toLowerCase()}.</p>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10">
              {([['digital', 'Digital', '$5,000'], ['in-person', 'In Person', '$10,000'], ['coaching', 'Coaching', '$100/mo']] as [Format, string, string][]).map(([f, t, p]) => (
                <button key={f} type="button" onClick={() => setFormat(f)}
                  className={`py-3 px-1 rounded-xl font-sans font-bold uppercase text-[9px] tracking-[0.12em] leading-tight transition ${format === f ? 'text-stone-950 shadow-lg' : 'text-stone-400'}`}
                  style={format === f ? { background: 'linear-gradient(135deg,#fde68a,#f59e0b)' } : undefined}>
                  {t}<br /><span className="opacity-80">{p}</span>
                </button>
              ))}
            </div>
            {!coaching && <div>
              <label className={label}>Talk format</label>
              <select className={input} value={talk} onChange={e => setTalk(e.target.value)}>
                {TALKS.map(t => <option key={t.id} value={t.id} className="text-black">{t.id} ({t.len})</option>)}
              </select>
            </div>}
            {coaching && <p className="font-serif italic text-gold-200 text-[15px] leading-relaxed rounded-2xl border border-gold-500/25 bg-gold-500/5 p-4" style={{ color: '#fde68a' }}>Coaching is $100 a month for two 1-hour sessions. Price is flexible for individuals and small groups, so tell me what works for you.</p>}
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
              {!coaching && <div>
                <label className={label}>Event type</label>
                <select className={input} value={eventType} onChange={e => setEventType(e.target.value)}>
                  {EVENT_TYPES.map(t => <option key={t} value={t} className="text-black">{t}</option>)}
                </select>
              </div>}
              <div>
                <label className={label}>{coaching ? 'Preferred start' : 'Event date'}</label>
                <input className={input} value={date} onChange={e => setDate(e.target.value)} placeholder={coaching ? 'e.g. January' : 'e.g. March 14, 2027'} />
              </div>
              <div>
                <label className={label}>{coaching ? 'Time zone' : format === 'digital' ? 'Platform / time zone' : 'City & venue'}</label>
                <input className={input} value={location} onChange={e => setLocation(e.target.value)} placeholder={coaching ? 'e.g. PST' : format === 'digital' ? 'Zoom, Teams… / PST' : 'City, State, venue'} />
              </div>
              <div>
                <label className={label}>{coaching ? 'People (1 or a group)' : 'Expected audience'}</label>
                <input className={input} inputMode="numeric" value={audience} onChange={e => setAudience(e.target.value)} placeholder={coaching ? 'e.g. 1' : 'e.g. 500'} />
              </div>
            </div>
            <div>
              <label className={label}>{coaching ? 'Your goals' : 'About your event'}</label>
              <textarea className={input + ' min-h-[130px] resize-y'} value={message} onChange={e => setMessage(e.target.value)} placeholder={coaching ? 'What do you want to work on? Business, speaking to students, life…' : 'Theme, audience, what you hope people take away…'} />
            </div>
            <a href={valid ? mailto : '#book-speaker'} onClick={onSend}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-full font-sans font-bold uppercase text-[11px] tracking-[0.25em] text-stone-950 shadow-2xl shadow-gold-500/30 active:scale-[0.98] transition" style={goldBtn}>
              <EnvelopeIcon className="w-5 h-5" /> Open Email &amp; Send Inquiry · {feeLabel}
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
          Content note for organizers: this talk discusses kidnapping, human trafficking, betrayal and violence in survivor-told terms. Please plan with your audience in mind.
        </p>
      </section>

      {/* STICKY MOBILE CTA */}
      {showBar && (
        <div className="fixed left-0 right-0 bottom-0 z-30 md:hidden pl-4 pr-24 pt-3 animate-fade-in" style={{ paddingBottom: 'max(0.9rem, env(safe-area-inset-bottom))', background: 'linear-gradient(180deg, transparent, rgba(7,6,10,0.95) 35%)' }}>
          <button onClick={() => goTo('book-speaker')} className="w-full py-4 rounded-full font-sans font-bold uppercase text-[10px] tracking-[0.2em] text-stone-950 shadow-2xl shadow-gold-500/30" style={goldBtn}>
            Inquire · Talks &amp; Coaching
          </button>
        </div>
      )}
    </div>
  );
};
