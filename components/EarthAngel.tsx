
import React, { useState } from 'react';
import { 
  HeartIcon, SparklesIcon, HandRaisedIcon, EyeIcon, 
  BoltIcon, CloudIcon, SunIcon, MoonIcon, 
  ScaleIcon, ShieldCheckIcon, BeakerIcon,
  ChatBubbleLeftRightIcon, UserPlusIcon, StarIcon,
  FingerPrintIcon, MusicalNoteIcon, SignalIcon,
  GlobeAmericasIcon, FireIcon, LightBulbIcon,
  CpuChipIcon, CheckBadgeIcon, ExclamationTriangleIcon,
  BookOpenIcon, KeyIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

// Helper icons defined before usage
const ArrowPathIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ANGEL_TYPES = [
  {
    title: "The Incarnated Seraph",
    icon: HeartIcon,
    traits: "Sweet-faced, apologizes constantly, prone to co-dependency, professional helpers (nurses, counselors).",
    mission: "To reflect the unconditional love of Source directly into the densest emotional fields. Living emotional buffers.",
    shadow: "Weight gain (protection), toxic relationships, difficulty saying 'no', compassion fatigue."
  },
  {
    title: "The Elemental Soul",
    icon: FireIcon,
    traits: "Fiery temper, obsessive animal lover, prefers nature to people, prone to addiction, playful/mischievous.",
    mission: "To protect the planetary grid (Gaia) and the animal kingdom. They break rigid societal structures.",
    shadow: "Rage against pollution/cruelty, social isolation, substance abuse to numb intensity, ungroundedness."
  },
  {
    title: "The Starperson (Hybrid)",
    icon: SparklesIcon,
    traits: "Almond eyes, tall/thin, obsession with tech/stars, feels 'alien', socially awkward, analytical.",
    mission: "To introduce advanced technology and higher-dimensional logic. Anchoring galactic frequencies.",
    shadow: "Disassociation, feeling 'homesick' for a place they can't remember, avoiding intimacy, superior complexity."
  },
  {
    title: "The Wise One",
    icon: BookOpenIcon,
    traits: "Intense eyes, solemn demeanor, 'old soul', history of practicing magic/healing in past lives.",
    mission: "To re-teach lost ancient wisdoms (Hermeticism, Alchemy). Holding the 'Long Memory' of Atlantis.",
    shadow: "Cardiovascular issues (heartbreak from witch trials), fear of power, judgment of 'unawakened' souls."
  },
  {
    title: "The Cherubic Walk-In",
    icon: UserPlusIcon,
    traits: "Sudden personality change after trauma, miraculous recovery, sense of urgent mission, memory gaps.",
    mission: "Emergency intervention. A high-ranking soul takes over a body to complete a specific timeline correction.",
    shadow: "Total memory loss of childhood, feeling like an imposter, rapid shedding of old friends/family."
  },
  {
    title: "The Mystic Warrior",
    icon: ShieldCheckIcon,
    traits: "Strong sense of justice, protective of the weak, confronts darkness directly, high physical energy.",
    mission: "To actively dismantle matrix structures and defend the innocent. The 'Swords of Michael' in form.",
    shadow: "Burnout, cynicism, seeing enemies everywhere, difficulty resting, adrenal exhaustion."
  },
  {
    title: "The Grid Architect",
    icon: GlobeAmericasIcon,
    traits: "Obsessed with geometry, maps, and ley lines. Feels physical pain when earth is damaged.",
    mission: "Repairing the etheric web of the planet. Often travels to 'random' locations just to anchor light.",
    shadow: "Geopathic stress, feeling unrooted, overwhelming sensation of planetary pain."
  },
  {
    title: "The Sound Alchemist",
    icon: MusicalNoteIcon,
    traits: "Voice changes frequency often, sensitive to noise, musical talent, speaks in 'tones' or light language.",
    mission: "Using sound vibration to shatter matrix density and re-harmonize discordant energy fields.",
    shadow: "Throat chakra blockages, inability to tolerate city noise, silence as a defense mechanism."
  },
  {
    title: "The Cosmic Scribe",
    icon: ChatBubbleLeftRightIcon,
    traits: "Compulsive writer/artist, channels information streams, automatic writing, complex symbol drawing.",
    mission: "Translating higher dimensional light codes into understandable human language or art.",
    shadow: "Carpal tunnel, mental burnout, racing thoughts, difficulty grounding ideas into reality."
  },
  {
    title: "The Blue Ray",
    icon: BoltIcon,
    traits: "Ultra-sensitive but looks tough. Late bloomers. Transformers of the most dense energies.",
    mission: "To pave the way for other lightworkers. They transmute the heaviest lead into gold.",
    shadow: "Deep hidden depression, feeling invisible, chronic fatigue syndrome, holding weight."
  },
  {
    title: "The Galactic Shaman",
    icon: EyeIcon,
    traits: "Bridges star wisdom with earth medicine. Uses crystals, plants, and stars equally.",
    mission: "To unite the sky and the earth. Healing the separation sickness of the human soul.",
    shadow: "Caught between worlds, 'schizotypal' diagnosis risks, energetic overwhelm."
  },
  {
    title: "The Crystal Child (Adult)",
    icon: SunIcon,
    traits: "Large eyes, forgiving nature, telepathic, draws people to them, natural healer.",
    mission: "To demonstrate the next stage of evolution. Living as a fully conscious being.",
    shadow: "Total lack of boundaries, easily manipulated by narcissists, naivety."
  }
];

const SENSITIVITY_DATA = [
  { label: "Empathic Resonance", val: "98%", desc: "Feeling others' emotions as physical sensation." },
  { label: "Barometric Sense", val: "94%", desc: "Physical detection of storms/pressure shifts." },
  { label: "Lie Detection", val: "99%", desc: "Instant somatic knowing of untruth." },
  { label: "Crowd Toxicity", val: "High", desc: "Rapid drain in malls/public spaces." },
  { label: "Solar Flare Impact", val: "Severe", desc: "Headaches/fatigue during solar activity." },
  { label: "Artificial Light", val: "Low Tol.", desc: "Cannot handle fluorescent/LED strobing." },
  { label: "Geopathic Stress", val: "High", desc: "Sensing ley lines or underground water." },
  { label: "Electronics", val: "Disruptive", desc: "Watches stop, bulbs blow out near you." },
  { label: "Food Frequency", val: "Sensitive", desc: "Intolerance to low-vibe/processed food." },
  { label: "Auditory Range", val: "Extended", desc: "Hearing high-pitch frequencies/hums." },
  { label: "Smell Sensitivity", val: "Acute", desc: "Chemical scents cause instant nausea." },
  { label: "Pain Threshold", val: "Variable", desc: "High for self, zero for seeing others in pain." }
];

const MISSION_PROTOCOLS = [
  {
    code: "Protocol 001: Transmutation",
    desc: "The automatic processing of heavy energetic sludge in a room. Acting as living air purifiers, inhaling discord and exhaling harmony. Often unconscious.",
    icon: ArrowPathIcon,
    status: "ALWAYS ACTIVE"
  },
  {
    code: "Protocol 002: The Mirror Effect",
    desc: "Reflecting people's true selves back to them. To a loving person, you appear loving. To a dark person, you appear 'judgmental' simply by existing.",
    icon: EyeIcon,
    status: "PASSIVE"
  },
  {
    code: "Protocol 003: Grid Anchoring",
    desc: "Being positioned in specific geographic locations to act as a human acupuncture needle, pinning high-frequency light into the Earth's crust.",
    icon: MapPinIcon,
    status: "LOCATION LOCKED"
  },
  {
    code: "Protocol 004: Timeline Triage",
    desc: "Intervening in the lives of strangers with a smile, a word, or a touch that prevents a downward spiral and shifts their personal timeline.",
    icon: ClockIcon,
    status: "OPPORTUNISTIC"
  },
  {
    code: "Protocol 005: The Violet Flame",
    desc: "Active invocation of the St. Germain frequencies to incinerate karmic debris within a family line or location.",
    icon: FireIcon,
    status: "ACTIVE"
  },
  {
    code: "Protocol 006: Pillar of Light",
    desc: "Establishing a vertical connection from the Central Sun to the Earth Core, creating a safe zone for others to heal.",
    icon: SunIcon,
    status: "MEDITATIVE"
  },
  {
    code: "Protocol 007: Dreamwalker Ops",
    desc: "Night-time service on the astral plane. Rescuing lost souls, teaching in etheric schools, or fighting astral parasites.",
    icon: MoonIcon,
    status: "SLEEP STATE"
  },
  {
    code: "Protocol 008: Code Injection",
    desc: "Speaking a specific sentence or word that unlocks a dormant DNA layer in the listener. The 'Wake Up' whisper.",
    icon: KeyIcon,
    status: "INTUITIVE"
  }
];

const THE_7_RAYS = [
  { color: "Blue", theme: "Power & Protection", role: "Defender", desc: "The Ray of Michael. Breaking chains, cutting cords, speaking absolute truth." },
  { color: "Yellow", theme: "Wisdom & Illumination", role: "Teacher", desc: "The Ray of Jophiel. Bringing clarity to confusion, teaching higher mind concepts." },
  { color: "Pink", theme: "Love & Comfort", role: "Nurturer", desc: "The Ray of Chamuel. Healing the heart, providing safety for the wounded." },
  { color: "White", theme: "Purity & Resurrection", role: "Purifier", desc: "The Ray of Gabriel. Clearing toxins, resetting the blueprint to original innocence." },
  { color: "Green", theme: "Healing & Science", role: "Healer", desc: "The Ray of Raphael. Working with the body, nature, and sacred geometry." },
  { color: "Gold", theme: "Peace & Service", role: "Peacemaker", desc: "The Ray of Uriel. Resolving conflict, bringing divine justice and service." },
  { color: "Violet", theme: "Freedom & Transmutation", role: "Alchemist", desc: "The Ray of Zadkiel. Turning lead to gold, dissolving karma, liberating souls." }
];

const PHYSICAL_MARKERS = [
  "Ringing in ears (High pitched downloads)",
  "Visual snow or seeing 'sparkles' in air",
  "Feeling vibration/buzzing in the body",
  "Strange markings on skin (star shapes)",
  "Eyes that change color with mood",
  "Lower than average body temperature",
  "Low blood pressure",
  "Hypersensitive nervous system",
  "Autoimmune tendencies (body rejecting density)",
  "Look much younger than chronological age",
  "History of 'miraculous' survival of accidents",
  "Feeling of 'wings' or pain in shoulder blades",
  "Inability to wear watches (batteries die)",
  "Streetlights turning off when passing under",
  "Static shocks are frequent and intense",
  "Need for less food / Pranic nourishment tendency",
  "Disrupted sleep patterns (The 3 AM wake up)",
  "Sensation of heat in hands (Healing palms)",
  "Heart palpitations (Heart chakra expansion)",
  "Dizziness / Vertigo during solar storms"
];

export const EarthAngel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'mission' | 'rays' | 'biology'>('types');

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-24 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 blur-[100px] rounded-full -z-10"></div>
         <div className="flex justify-center mb-6"><Logo /></div>
         <div className="inline-flex items-center gap-2 px-6 py-2 bg-stone-100 dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 text-gold-600 uppercase text-[10px] font-bold tracking-[0.3em]">
            The Seraphim Ground Crew
         </div>
         <h2 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100 leading-none">
            EARTH <span className="text-gold-500">ANGEL</span>
         </h2>
         <p className="font-serif italic text-2xl md:text-3xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">
            "Souls who have volunteered to incarnate into density to anchor the frequency of Unconditional Love."
         </p>
         <div className="h-px w-32 bg-gold-500 mx-auto opacity-30"></div>
      </header>

      {/* CORE IDENTITY DEFINITION */}
      <section className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
           <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
              <SparklesIcon className="w-10 h-10 text-gold-500" /> Origin Identity
           </h3>
           <div className="bg-white dark:bg-stone-900 p-10 rounded-[40px] border border-stone-200 dark:border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none transform rotate-12 scale-150"><HandRaisedIcon className="w-96 h-96" /></div>
             <p className="font-serif text-xl text-stone-600 dark:text-stone-300 italic leading-relaxed">
               "An Earth Angel is a high-frequency soul that originated from the Angelic Realms, Elemental Kingdoms, or Higher Interplanetary Councils, who has chosen to birth into a human body. Unlike souls working through karma, Earth Angels are volunteers on a specific mission of service."
             </p>
             <div className="h-px w-full bg-stone-100 dark:bg-stone-800"></div>
             <ul className="space-y-4">
               {[
                 "Inability to tolerate violence in media or reality.",
                 "Chronic feeling of being 'different' or not belonging to biological family.",
                 "Look younger than chronological age due to high life-force.",
                 "Strangers frequently pour out their life stories to you.",
                 "Feeling a profound 'homesickness' for a place you can't name.",
                 "History of being in abusive relationships (trying to 'save' them)."
               ].map((item, i) => (
                 <li key={i} className="flex gap-4 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0"></div>
                   <span className="text-sm font-bold text-stone-500 uppercase tracking-wide">{item}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* SENSITIVITY SPECTRUM DATA */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-stone-100">The Empathic Load</h3>
              <div className="flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest">
                 <BoltIcon className="w-4 h-4" /> Sensory Data
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              {SENSITIVITY_DATA.map((stat, i) => (
                 <div key={i} className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gold-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                    <div className="relative z-10">
                       <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.1em] mb-1">{stat.label}</p>
                       <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xl font-display font-bold text-stone-800 dark:text-stone-200 truncate">{stat.val}</span>
                       </div>
                       <p className="text-[9px] font-serif italic text-stone-500 dark:text-stone-400 mt-1 leading-tight">{stat.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
              <h4 className="flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-widest mb-2">
                 <ScaleIcon className="w-4 h-4" /> Warning: Compassion Fatigue
              </h4>
              <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400 italic">
                 "Because Earth Angels have porous energy fields, they are susceptible to weight gain (protective layering) and exhaustion. Regular salt baths and solitude are not luxuries, but medical necessities."
              </p>
           </div>
        </div>
      </section>

      {/* NAV TABS */}
      <div className="flex flex-wrap justify-center gap-4">
        {['types', 'mission', 'rays', 'biology'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${activeTab === tab ? 'bg-gold-500 text-white shadow-xl' : 'bg-stone-100 dark:bg-stone-900 text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
          >
            {tab === 'types' ? '12 Archetypes' : tab === 'mission' ? 'Protocols' : tab === 'rays' ? 'The 7 Rays' : 'Biology & Signs'}
          </button>
        ))}
      </div>

      {/* CLASSIFICATION & MISSION TABS */}
      <section className="space-y-12 min-h-[600px]">
         {activeTab === 'types' && (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
             {ANGEL_TYPES.map((type, i) => (
               <div key={i} className="group bg-white dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all hover:shadow-2xl flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-stone-50 dark:bg-stone-950 rounded-full flex items-center justify-center border border-stone-100 dark:border-stone-800 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                        <type.icon className="w-6 h-6" />
                     </div>
                     <h4 className="font-display font-bold uppercase text-base text-stone-800 dark:text-stone-100 leading-tight">{type.title}</h4>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                     <div>
                        <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest">Identification</span>
                        <p className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 leading-relaxed mt-1">"{type.traits}"</p>
                     </div>
                     <div>
                        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Mission</span>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">{type.mission}</p>
                     </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800">
                     <div className="flex items-start gap-2 text-red-400">
                        <ExclamationTriangleIcon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <p className="text-[9px] font-bold uppercase tracking-wide">Shadow: {type.shadow}</p>
                     </div>
                  </div>
               </div>
             ))}
           </div>
         )}

         {activeTab === 'mission' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
             {MISSION_PROTOCOLS.map((proto, i) => (
                <div key={i} className="relative bg-stone-900 p-10 rounded-[50px] border border-gold-500/20 overflow-hidden group">
                   <div className="absolute top-0 right-0 p-24 opacity-5 group-hover:opacity-10 transition-opacity"><Logo /></div>
                   <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex items-start justify-between mb-8">
                         <div className="p-4 bg-gold-500/10 rounded-2xl border border-gold-500/20">
                            <proto.icon className="w-8 h-8 text-gold-500" />
                         </div>
                         <div className="text-right">
                            <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mb-2">{proto.code}</span>
                            <span className="inline-block px-3 py-1 rounded-full border border-stone-700 text-[8px] font-bold uppercase tracking-widest text-green-500 bg-green-900/10">Status: {proto.status}</span>
                         </div>
                      </div>
                      <p className="font-serif text-lg text-stone-300 italic leading-relaxed">"{proto.desc}"</p>
                   </div>
                </div>
             ))}
           </div>
         )}

         {activeTab === 'rays' && (
            <div className="grid gap-6 animate-fade-in">
               <div className="text-center mb-8">
                  <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100">The 7 Rays of Service</h3>
                  <p className="text-stone-500 font-serif italic text-sm mt-2">"Each Earth Angel is primarily aligned with one of the seven cosmic rays, defining their method of service."</p>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {THE_7_RAYS.map((ray, i) => (
                     <div key={i} className="p-8 bg-white dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-full h-2 bg-${ray.color === 'Gold' ? 'yellow' : ray.color.toLowerCase()}-500`}></div>
                        <h4 className="font-display font-bold text-xl uppercase mb-1">{ray.color} Ray</h4>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-4">{ray.theme}</p>
                        <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl mb-4">
                           <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Archetype: {ray.role}</span>
                        </div>
                        <p className="text-xs font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed">"{ray.desc}"</p>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'biology' && (
            <div className="grid lg:grid-cols-2 gap-12 animate-fade-in">
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                     <FingerPrintIcon className="w-8 h-8 text-gold-500" />
                     <h3 className="font-display text-2xl font-bold uppercase">Physical & Etheric Markers</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                     {PHYSICAL_MARKERS.map((marker, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800">
                           <CheckBadgeIcon className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                           <span className="text-xs font-bold text-stone-600 dark:text-stone-300">{marker}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-stone-950 p-10 rounded-[40px] border border-gold-500/20 shadow-xl space-y-6">
                     <div className="flex items-center gap-4">
                        <MoonIcon className="w-8 h-8 text-stone-400" />
                        <h3 className="font-display text-2xl font-bold uppercase text-white">The Dark Night of the Angel</h3>
                     </div>
                     <p className="font-serif text-stone-400 italic leading-relaxed text-sm">
                        "Many Earth Angels suffer from a deep, unexplained depression that is actually a form of 'homesickness.' It is the cellular memory of a higher dimensional existence clashing with the density of 3D Earth. This is not a pathology to be cured, but a frequency discrepancy to be managed."
                     </p>
                     <div className="h-px w-full bg-stone-800"></div>
                     <div>
                        <h4 className="font-bold text-xs uppercase text-gold-500 tracking-widest mb-3">Management Protocols</h4>
                        <ul className="space-y-2 text-xs text-stone-300">
                           <li>• Daily grounding (barefoot on soil) to discharge static.</li>
                           <li>• Immersion in water (imitates the fluidity of higher realms).</li>
                           <li>• Avoidance of violent media (prevents trauma imprint).</li>
                           <li>• Connecting with star family via meditation.</li>
                        </ul>
                     </div>
                  </div>

                  <div className="bg-red-900/10 p-10 rounded-[40px] border border-red-500/20 space-y-4">
                     <h3 className="font-display text-xl font-bold uppercase text-red-500 flex items-center gap-3">
                        <CpuChipIcon className="w-6 h-6" /> Biological Anomalies
                     </h3>
                     <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        High-frequency souls often struggle to interface with biological avatars. This manifests as:
                     </p>
                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-white/5 p-3 rounded-xl">
                           <span className="text-[9px] font-bold uppercase text-stone-300 block mb-1">Nervous System</span>
                           <span className="text-[10px] text-stone-500">Runs at higher voltage; prone to 'frying' or burnout.</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl">
                           <span className="text-[9px] font-bold uppercase text-stone-300 block mb-1">Digestion</span>
                           <span className="text-[10px] text-stone-500">Cannot process heavy proteins or chemicals effectively.</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </section>

      {/* CALL TO SERVICE */}
      <footer className="bg-stone-50 dark:bg-stone-950 p-16 rounded-[80px] border border-stone-200 dark:border-stone-800 text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 70% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 55% 70%, #fde68a 50%, transparent 51%)', backgroundSize: '220px 220px' }}></div>
        
        <HeartIcon className="w-16 h-16 text-gold-500 mx-auto animate-pulse" />
        
        <div className="space-y-6 max-w-3xl mx-auto relative z-10">
          <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The Recruitment Is Over. The Activation Has Begun.</h3>
          <p className="text-xl font-serif text-stone-500 italic leading-relaxed">
            "If you are reading this, you are likely one of the 144,000 Seraphim souls deployed to Earth. Your mission is not to 'save' the world, but to love it into a higher vibration. Remember who you are."
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
           {[
             { label: "Do Not Conform", icon: ShieldCheckIcon },
             { label: "Protect Your Energy", icon: BoltIcon },
             { label: "Speak Your Truth", icon: ChatBubbleLeftRightIcon },
             { label: "Trust Your Heart", icon: HeartIcon }
           ].map((cmd, i) => (
             <div key={i} className="flex flex-col items-center gap-3 p-4 border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900">
                <cmd.icon className="w-6 h-6 text-stone-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-gold-600">{cmd.label}</span>
             </div>
           ))}
        </div>
      </footer>
    </div>
  );
};
