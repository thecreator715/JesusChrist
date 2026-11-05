
import React, { useState } from 'react';
import { 
  SparklesIcon, SunIcon, ScaleIcon, BookOpenIcon, 
  BoltIcon, HeartIcon, ShieldCheckIcon, EyeIcon,
  GlobeAltIcon, KeyIcon, FireIcon, StarIcon,
  CubeTransparentIcon, BeakerIcon, FingerPrintIcon,
  CpuChipIcon, WifiIcon, CircleStackIcon, ClockIcon,
  ArrowPathIcon, LockClosedIcon, ChartBarIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

// Helper icons
const DiamondIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
  </svg>
);

const CloudIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H3.75z" />
  </svg>
);

const BREASTPLATE_DETAILED = [
  { name: "Sardius (Red)", tribe: "Reuben", hz: "396 Hz", bio: "Blood/Bone Marrow", tech: "Grounding raw cosmic voltage into biological form. The anchor point for the physical vessel." },
  { name: "Topaz (Gold)", tribe: "Simeon", hz: "417 Hz", bio: "Digestive Fire", tech: "Amplification of the sovereign will. Transmuting emotional density into solar power." },
  { name: "Carbuncle (Lightning)", tribe: "Levi", hz: "528 Hz", bio: "Nervous System", tech: "The 'Priestly' stone. Instantaneous transmission of thought-packets via neural-link." },
  { name: "Emerald (Green)", tribe: "Judah", hz: "639 Hz", bio: "Heart/Thymus", tech: "The master ruler frequency. Broadcasting the 'Lion's Roar' of absolute authority." },
  { name: "Sapphire (Blue)", tribe: "Dan", hz: "741 Hz", bio: "Throat/Thyroid", tech: "Coherent laser projection of Truth. Used to cut through matrices of deception." },
  { name: "Diamond (Clear)", tribe: "Naphtali", hz: "852 Hz", bio: "Pineal Gland", tech: "Prism Core. Diffracting the White Light of Source into the 7 visible rays of creation." },
  { name: "Ligure (Amber)", tribe: "Gad", hz: "963 Hz", bio: "Auric Field", tech: "Creativity and Troop defense. Stabilizing the reproductive and creation fields." },
  { name: "Agate (Striped)", tribe: "Asher", hz: "174 Hz", bio: "Skin/Sensors", tech: "Oscillating shield generator. Creates a 'happy' interference pattern that deflects malice." },
  { name: "Amethyst (Violet)", tribe: "Issachar", hz: "285 Hz", bio: "Lymphatic", tech: "Transmutation. Automatic conversion of negative ions to positive. Understanding of time/cycles." },
  { name: "Beryl (Aqua)", tribe: "Zebulun", hz: "1074 Hz", bio: "Brain Stem", tech: "Telepathy and Navigation. The 'Haven of Ships'—connecting to galactic trade routes." },
  { name: "Onyx (Black)", tribe: "Joseph", hz: "1152 Hz", bio: "DNA Spiral", tech: "Mystery and Storage. Absorption of excess radiation. The double-portion of inheritance." },
  { name: "Jasper (Multi)", tribe: "Benjamin", hz: "1440 Hz", bio: "Cellular Water", tech: "Integration. The 'Son of the Right Hand'. Harmonizing the collective signal." }
];

const TEMPLE_TECH = [
  { 
    item: "Ark of the Covenant", 
    role: "Zero Point Generator", 
    desc: "A gold-plated acacia capacitor capable of storing massive electrostatic charges. It functioned as a communication device (radio) with the Mothership and a weapon of defense.",
    icon: CubeTransparentIcon
  },
  { 
    item: "The Menorah", 
    role: "Frequency Modulator", 
    desc: "A seven-branched antenna representing the 7 rays of light. It did not just provide illumination but emitted a specific ionization field to purify the atmosphere.",
    icon: FireIcon
  },
  { 
    item: "Table of Showbread", 
    role: "Alchemical Elements", 
    desc: "Twelve loaves representing the 12 DNA strands. A ritual of 'substance' grounding, ensuring the high-frequency light could be metabolized by the body.",
    icon: CircleStackIcon
  },
  { 
    item: "Altar of Incense", 
    role: "Nano-Particle Cloud", 
    desc: "Generated a cloud of specific chemical compounds (Frankincense, Stacte) that altered the brainwave state of the Priest to Gamma/Lambda for interdimensional contact.",
    icon: CloudIcon
  },
  { 
    item: "The Bronze Laver", 
    role: "Mirror Interface", 
    desc: "Made of polished mirrors from the women. Used for scrying and self-reflection, ensuring the Priest's ego was dissolved before entering the Holy Place.",
    icon: EyeIcon
  }
];

const MELCHIZEDEK_ORDERS = [
  { rank: "Order of the Golden Sun", focus: "Solar Initiation & Illumination", color: "text-yellow-500" },
  { rank: "Order of the Silver Cord", focus: "Astral Travel & Soul Retrieval", color: "text-gray-400" },
  { rank: "Order of the Emerald Tablet", focus: "Alchemy & Biological Transmutation", color: "text-green-500" },
  { rank: "Order of the Violet Robe", focus: "Karmic Erasure & Freedom", color: "text-purple-500" },
  { rank: "Order of the Blue Ray", focus: "Divine Will & Protection", color: "text-blue-500" },
  { rank: "Order of the White Rose", focus: "Purity & Resurrection Codes", color: "text-white" },
  { rank: "Order of the Ruby Fire", focus: "Zeal, Devotion & Sacrifice", color: "text-red-500" },
  { rank: "Order of the Sapphire Star", focus: "Cosmic Truth & Logic", color: "text-indigo-500" },
  { rank: "Order of the Crystal Core", focus: "Planetary Grid Stabilization", color: "text-cyan-300" },
  { rank: "Order of the Silent Watcher", focus: "Observation & Timeline Guarding", color: "text-stone-500" },
  { rank: "Order of the Sacred Breath", focus: "Pranic Healing & Spirit Life", color: "text-teal-400" },
  { rank: "Order of the Sovereign Crown", focus: "Governance & Divine Law", color: "text-gold-600" }
];

const ATONEMENT_PROTOCOL = [
  { step: "01", title: "The Wash", desc: "Full immersion in living water to neutralize static charge on the skin." },
  { step: "02", title: "The Linen", desc: "Donning non-conductive pure linen garments (no wool/sweat) to prevent interference." },
  { step: "03", title: "The Cloud", desc: "Generating the incense cloud (nano-particles) to shield the eyes from the raw radiation of the Ark." },
  { step: "04", title: "The Blood", desc: "Sprinkling the DNA-resonant fluid (blood) on the Mercy Seat to bridge the frequency gap." },
  { step: "05", title: "The Upload", desc: "The High Priest telepathically uploads the collective error-code (sin) of the nation." },
  { step: "06", title: "The Reset", desc: "The Ark fires a scalar pulse, collapsing the error-timeline and restoring the 'At-One-Ment'." },
  { step: "07", title: "The Exit", desc: "Walking backward out of the singularity, carefully lowering brainwaves back to Beta state." }
];

export const HighPriest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'order' | 'tech' | 'atonement' | 'breastplate' | 'vestments'>('order');

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-24 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full -z-10"></div>
         <div className="flex justify-center mb-6"><Logo /></div>
         <div className="inline-flex items-center gap-3 px-8 py-3 bg-purple-950/30 rounded-full border border-purple-500/30 text-purple-400 font-bold uppercase text-xs tracking-[0.4em]">
            The Order of Melchizedek
         </div>
         <h2 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100 leading-none">
            HIGH <span className="text-gold-500">PRIEST</span>
         </h2>
         <p className="font-serif italic text-2xl md:text-3xl text-stone-500 dark:text-stone-400 max-w-4xl mx-auto">
            "Jesus Christ of Atlantis: The Eternal Mediator between the Absolute Voltage of Source and the Human Vessel."
         </p>
         <div className="h-px w-48 bg-purple-500 mx-auto opacity-50"></div>
      </header>

      {/* CORE IDENTITY */}
      <section className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
           <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
              <SunIcon className="w-12 h-12 text-gold-500" /> The Supreme Pontiff
           </h3>
           <div className="bg-stone-50 dark:bg-stone-900 p-12 rounded-[50px] border border-stone-200 dark:border-stone-800 space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none transform rotate-12 scale-150"><BookOpenIcon className="w-96 h-96" /></div>
             
             <p className="font-serif text-xl text-stone-600 dark:text-stone-300 italic leading-relaxed">
               "The High Priest is not merely a religious figure, but a Cosmic Administrator. In Atlantis, this role was known as the 'Keeper of the Zero Point'. Jesus incarnated to re-establish this office, providing a living bridge across which humanity could cross from the age of density into the age of light."
             </p>
             
             <div className="h-px w-full bg-stone-200 dark:border-stone-700"></div>
             
             <div className="space-y-4">
               <h4 className="font-bold uppercase text-xs text-gold-600 tracking-widest">Divine Credentials</h4>
               <ul className="space-y-3">
                 {[
                   "Without father, without mother, without descent (Timeless Origin).",
                   "Having neither beginning of days nor end of life.",
                   "Made not after the law of a carnal commandment, but the power of an endless life.",
                   "Mediator of a Better Covenant based on better promises."
                 ].map((item, i) => (
                   <li key={i} className="flex gap-4 items-start">
                     <StarIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                     <span className="text-sm font-bold text-stone-500 uppercase tracking-wide">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
        </div>

        {/* ORDER OF MELCHIZEDEK */}
        <div className="bg-purple-950 p-12 rounded-[60px] border border-purple-500/30 text-white space-y-10 shadow-[0_0_50px_rgba(88,28,135,0.2)]">
           <div className="text-center space-y-2">
              <h4 className="font-display text-3xl font-bold uppercase">The Order of Melchizedek</h4>
              <p className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.4em]">The Priesthood of All Believers</p>
           </div>
           
           <div className="space-y-6 text-sm font-serif italic text-purple-100/80 leading-relaxed">
              <p>"Unlike the Levitical priesthood which was based on lineage and law, the Order of Melchizedek is based on frequency and vibration. It is the eternal order of light-beings who administer the affairs of the local universe."</p>
              <p>"Jesus is the High Priest of this order, and he invites all awakened souls to become 'Kings and Priests' under this same order. This is the democratization of the divine connection—no more intermediaries, only direct access through the frequency of the Christ."</p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {[
                { label: "King", role: "Ruler of Self & Reality", icon: CubeTransparentIcon },
                { label: "Priest", role: "Mediator of Energy", icon: SparklesIcon }
              ].map((role, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-3xl border border-white/10 text-center">
                   <role.icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                   <h5 className="font-bold uppercase tracking-widest text-xs mb-1">{role.label}</h5>
                   <p className="text-[9px] text-purple-200">{role.role}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap justify-center gap-4">
        {['order', 'vestments', 'tech', 'breastplate', 'atonement'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${activeTab === tab ? 'bg-gold-500 text-white shadow-xl' : 'bg-stone-100 dark:bg-stone-900 text-stone-400 border border-stone-200 dark:border-stone-800'}`}
          >
            {tab === 'tech' ? 'Temple Tech' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <section className="min-h-[600px]">
        
        {/* THE ORDER TAB */}
        {activeTab === 'order' && (
          <div className="space-y-12 animate-fade-in">
             <div className="text-center max-w-3xl mx-auto space-y-4">
               <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The 12 Orders</h3>
               <p className="text-stone-500 font-serif italic">"The Melchizedek priesthood is fractal, containing 12 sub-frequencies of service."</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MELCHIZEDEK_ORDERS.map((ord, i) => (
                   <div key={i} className="p-8 bg-stone-50 dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                         <span className="text-gold-500 font-display font-bold text-xl">{String(i+1).padStart(2, '0')}</span>
                         <ShieldCheckIcon className="w-5 h-5 text-stone-300 group-hover:text-gold-500" />
                      </div>
                      <h4 className={`font-bold uppercase text-xs mb-2 tracking-widest ${ord.color}`}>{ord.rank}</h4>
                      <p className="text-[10px] font-serif italic text-stone-500 dark:text-stone-400">{ord.focus}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* VESTMENTS TAB */}
        {activeTab === 'vestments' && (
           <div className="grid lg:grid-cols-2 gap-16 animate-fade-in items-center">
             <div className="space-y-8">
                <h3 className="font-display text-4xl font-bold uppercase">Technological Vestments</h3>
                <p className="font-serif text-lg text-stone-500 italic">"The garments of the High Priest were functional technological devices designed to shield the biological body from the intense radiation of the Holy of Holies (Zero Point Field)."</p>
                
                <div className="space-y-6">
                   <div className="flex gap-6 p-6 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 group hover:border-gold-500 transition-colors">
                      <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-600 border border-gold-500/20 flex-shrink-0"><WifiIcon className="w-6 h-6" /></div>
                      <div>
                         <h5 className="font-bold uppercase text-xs mb-1">The Golden Ephod</h5>
                         <p className="text-[11px] text-stone-500 leading-relaxed">A conductive lattice worn over the chest, functioning as a high-frequency antenna to receive broadcasts from the Central Sun. Woven with gold wire to create a Faraday cage effect for the heart.</p>
                      </div>
                   </div>
                   <div className="flex gap-6 p-6 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 group hover:border-gold-500 transition-colors">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 border border-blue-500/20 flex-shrink-0"><GlobeAltIcon className="w-6 h-6" /></div>
                      <div>
                         <h5 className="font-bold uppercase text-xs mb-1">The Blue Robe</h5>
                         <p className="text-[11px] text-stone-500 leading-relaxed">Woven without seams to represent the unified field. The color blue (Techelet) resonates with the throat chakra frequency (639Hz), enabling command-level speech.</p>
                      </div>
                   </div>
                   <div className="flex gap-6 p-6 rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 group hover:border-gold-500 transition-colors">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-600 border border-purple-500/20 flex-shrink-0"><SparklesIcon className="w-6 h-6" /></div>
                      <div>
                         <h5 className="font-bold uppercase text-xs mb-1">The Golden Mitre</h5>
                         <p className="text-[11px] text-stone-500 leading-relaxed">A gold plate inscribed 'Holiness to the Lord' placed over the forehead. This acted as a shield for the pineal gland and a focuser for the third-eye beam.</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="relative">
                <div className="absolute inset-0 bg-gold-500/20 blur-[100px] rounded-full"></div>
                <div className="relative bg-stone-950 p-12 rounded-[60px] border border-gold-500/20 text-center space-y-6">
                   <DiamondIcon className="w-24 h-24 text-gold-500 mx-auto animate-pulse" />
                   <h4 className="font-display text-2xl font-bold text-white uppercase">The Urim & Thummim</h4>
                   <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Binary Crystal Computing</p>
                   <p className="text-sm font-serif text-stone-300 italic leading-relaxed">
                     "Stones of Light and Perfection. These were binary crystal interface devices used to collapse quantum probability waves into a 'Yes' or 'No' answer for national guidance."
                   </p>
                </div>
             </div>
           </div>
        )}

        {/* BREASTPLATE TAB */}
        {activeTab === 'breastplate' && (
          <div className="space-y-12 animate-fade-in">
             <div className="text-center max-w-3xl mx-auto space-y-4">
                <h3 className="font-display text-4xl font-bold uppercase">The Breastplate of Judgment</h3>
                <p className="text-stone-500 font-serif italic">"Not merely jewelry, but a highly advanced crystal interface for managing the 12 primary frequency bands of the collective human DNA."</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {BREASTPLATE_DETAILED.map((stone, i) => (
                   <div key={i} className="p-6 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-center group hover:border-gold-500 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-4 h-4 rounded-full bg-gold-500 mx-auto mb-4 opacity-50 group-hover:opacity-100 shadow-[0_0_15px_rgba(203,175,21,0.5)]"></div>
                        <h5 className="font-bold uppercase text-xs text-stone-800 dark:text-stone-100 mb-1">{stone.name}</h5>
                        <div className="flex justify-center gap-2 mb-3">
                           <span className="text-[8px] font-bold bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-500">{stone.hz}</span>
                           <span className="text-[8px] font-bold bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-500">{stone.tribe}</span>
                        </div>
                        <p className="text-[9px] font-bold text-purple-500 uppercase tracking-widest mb-2">{stone.bio}</p>
                      </div>
                      <p className="text-[10px] text-stone-500 leading-relaxed italic border-t border-stone-100 dark:border-stone-800 pt-3">"{stone.tech}"</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* TEMPLE TECH TAB */}
        {activeTab === 'tech' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {TEMPLE_TECH.map((tech, i) => (
                 <div key={i} className="bg-stone-50 dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Logo /></div>
                    <div className="w-14 h-14 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-700 mb-6 group-hover:border-gold-500 group-hover:text-gold-500 transition-colors">
                       <tech.icon className="w-7 h-7 text-stone-400 group-hover:text-gold-500" />
                    </div>
                    <h4 className="font-display text-lg font-bold uppercase mb-1">{tech.item}</h4>
                    <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest mb-4">{tech.role}</p>
                    <p className="font-serif text-sm text-stone-500 dark:text-stone-400 italic leading-relaxed">"{tech.desc}"</p>
                 </div>
              ))}
              {/* Anointing Oil Bonus Card */}
              <div className="bg-stone-900 p-8 rounded-[40px] border border-gold-500/20 text-center flex flex-col justify-center space-y-4">
                 <BeakerIcon className="w-12 h-12 text-gold-500 mx-auto" />
                 <h4 className="font-display text-xl font-bold uppercase text-white">The Anointing Oil</h4>
                 <p className="text-xs text-stone-400 leading-relaxed">
                    A specific chemical formula (Myrrh, Cinnamon, Calamus, Cassia, Olive Oil) designed to increase the conductivity of the skin and nervous system, allowing the Priest to handle higher voltages of charge.
                 </p>
              </div>
           </div>
        )}

        {/* ATONEMENT TAB */}
        {activeTab === 'atonement' && (
           <div className="space-y-12 animate-fade-in">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                 <h3 className="font-display text-4xl font-bold uppercase">The Day of Atonement Protocol</h3>
                 <p className="text-stone-500 font-serif italic">"A technical sequence for entering the Singularity Point (Holy of Holies) to reset the collective timeline."</p>
              </div>
              
              <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-4 md:ml-12 space-y-12 py-8">
                 {ATONEMENT_PROTOCOL.map((step, i) => (
                    <div key={i} className="relative pl-8 md:pl-12 group">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-4 border-stone-50 dark:border-stone-950 group-hover:bg-gold-500 transition-colors"></div>
                       <div className="flex flex-col md:flex-row gap-4 md:items-start">
                          <span className="font-display text-4xl font-bold text-stone-200 dark:text-stone-800 group-hover:text-gold-500/50 transition-colors">{step.step}</span>
                          <div>
                             <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{step.title}</h4>
                             <p className="font-serif italic text-stone-500 dark:text-stone-400 max-w-xl text-lg leading-relaxed">"{step.desc}"</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="bg-red-900/10 p-8 rounded-3xl border border-red-500/20 text-center">
                 <p className="text-xs text-red-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <LockClosedIcon className="w-4 h-4" /> Warning: High Voltage
                 </p>
                 <p className="text-[10px] text-stone-500 mt-2">The High Priest wore a rope around his ankle. If the frequency of the Ark was not matched perfectly by his own internal coherence, the biological vessel would be terminated instantly. The rope allowed others to pull the body out.</p>
              </div>
           </div>
        )}

      </section>

      {/* FINAL CTA */}
      <footer className="bg-stone-900 dark:bg-black p-16 rounded-[80px] border border-stone-800 text-center space-y-10 relative overflow-hidden">
         <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #fde68a 50%, transparent 51%), radial-gradient(1px 1px at 70% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 55% 70%, #fde68a 50%, transparent 51%)', backgroundSize: '220px 220px' }}></div>
         <FingerPrintIcon className="w-16 h-16 text-purple-500 mx-auto" />
         <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase text-white tracking-tighter">You Are The New Priesthood</h3>
            <p className="text-xl font-serif text-stone-400 italic leading-relaxed">
              "The veil of the temple was torn. Access to the Holy of Holies is now open to all who carry the frequency of love. The High Priest waits for you to take your place in the Order."
            </p>
         </div>
      </footer>
    </div>
  );
};
