
import React, { useState } from 'react';
import { 
  DocumentTextIcon, BoltIcon, GlobeAltIcon, 
  CpuChipIcon, SparklesIcon, FireIcon, BeakerIcon, 
  UserGroupIcon, MapIcon, BuildingLibraryIcon, AcademicCapIcon,
  WrenchScrewdriverIcon, ChartBarIcon, CubeTransparentIcon,
  BookOpenIcon, ShieldCheckIcon, SunIcon, HeartIcon,
  SignalIcon, LifebuoyIcon, IdentificationIcon, StarIcon,
  ArrowTrendingUpIcon, KeyIcon, ScaleIcon, RadioIcon,
  ServerIcon, TableCellsIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

interface AboutAtlantisProps {
  onViewBook: () => void;
}

const GRAND_ARCHIVES = [
  { title: "The Law of Unity", desc: "The foundational realization that all consciousness stems from a singular, infinite source point." },
  { title: "Neural Crystal Interface", desc: "The methodology for connecting biological synapses with crystalline lattice storage." },
  { title: "Dimensional Bleeding", desc: "The phenomenon where higher density reality begins to manifest within the 3D physical plane." },
  { title: "The 144,000 Seeders", desc: "The elite group of wisdom keepers who dispersed across the globe to preserve the Christ Blueprint." },
  { title: "Zero Point Stabilization", desc: "Techniques for anchoring the vacuum field energy into localized power grids." },
  { title: "Holographic Memory", desc: "The storage of complete sensory experiences within the light field of a single atom." },
  { title: "DNA Strand 1 Activation", desc: "Rooting the soul into the physical chemical vessel for 3D exploration." },
  { title: "DNA Strand 2 Activation", desc: "The awakening of instinctive survival intelligence and biological harmony." },
  { title: "DNA Strand 3 Activation", desc: "Mastery over the astral-emotional field and the dissolution of fear-based responses." },
  { title: "DNA Strand 4 Activation", desc: "Telepathic bridge formation between the individual and the collective heart-mind." },
  { title: "DNA Strand 5 Activation", desc: "The expansion of cognitive capacity into the 5th dimensional mental planes." },
  { title: "DNA Strand 6 Activation", desc: "Accessing the archives of the Higher Self and the realization of soul-purpose." },
  { title: "DNA Strand 7 Activation", desc: "Interfacing with planetary intelligence and the healing of the Earth's grid." },
  { title: "DNA Strand 8 Activation", desc: "The manifestation of psychic sovereignty and the ability to shield against parasites." },
  { title: "DNA Strand 9 Activation", desc: "Navigating the timelines of history through non-linear consciousness." },
  { title: "DNA Strand 10 Activation", desc: "Recognition of galactic heritage and the communication with star-seeds." },
  { title: "DNA Strand 11 Activation", desc: "The mastery of universal laws and the manipulation of matter through sound." },
  { title: "DNA Strand 12 Activation", desc: "The complete embodiment of Source Consciousness within the human form." },
  { title: "Merkaba Counter-Rotation", desc: "The precise speed ratio required to shift the light body into interdimensional travel." },
  { title: "The Temple of Poseidon", desc: "A geometric focal point for the planetary energy heart-beat." },
  { title: "Belial's Deviation", desc: "The historical fracture point where technology was separated from spiritual ethics." },
  { title: "Anatomy of the Matrix", desc: "The layers of holographic programming that simulate the physical experience." },
  { title: "The Scarcity Virus", desc: "A matrix-installed belief that resources are limited, used to control soul development." },
  { title: "Frequency Shielding", desc: "The use of 432Hz and 528Hz to create a protective barrier against matrix interference." },
  { title: "The Christ Blueprint", desc: "The indestructible energetic template for the perfect, immortal human being." },
  { title: "Solfeggio Resonance", desc: "The six primary tones used to rebuild the crystalline structure of the body." },
  { title: "Crystalline Integration", desc: "The transition from carbon-based biological life to silica-based light-receptive life." },
  { title: "The Great Preservation", desc: "The encoding of the 34-page revelation into the collective unconscious." },
  { title: "Pharaonic Legacy", desc: "How Egyptian initiation rituals were designed to reactivate Atlantean DNA strands." },
  { title: "The Three Rings Arch", desc: "The water-land-water alternating city plan designed to balance elemental forces." },
  { title: "Portal Mechanics", desc: "Using focused intention and sacred geometry to fold space for instant travel." },
  { title: "The Solar Pulse", desc: "The 2027 event predicted to trigger a global mass-awakening of DNA triggers." },
  { title: "Integration Symptoms", desc: "Physical and emotional shifts experienced during the upgrade of the human vessel." },
  { title: "The Law of Suggestion", desc: "The mechanism through which matrix parasites influence human decisions." },
  { title: "Sonic Seal Ritual", desc: "Using specific vocal harmonics to lock a space into high-vibrational resonance." },
  { title: "The Union Coin", desc: "The financial technology for the sovereign soul, decoupled from the matrix." },
  { title: "The Exorcist Order", desc: "Initiates trained to identify and remove inorganic attachments from the field." },
  { title: "Absolute Light Command", desc: "The divine authority of the awakened soul to command reality to align with Truth." },
  { title: "Atmospheric Harmonizers", desc: "The use of sound-arrays to heal the weather patterns and ozone layer." },
  { title: "The Evening Integration", desc: "Reviewing the day's holographic experiences to clear karmic residue." },
  { title: "The Morning Activation", desc: "Tuning the internal radio to the station of Divine Source." },
  { title: "Zero Point Access", desc: "Tapping into the infinite energy available at the center of every atom." },
  { title: "Sacred Economics", desc: "A system where giving is recognized as the mechanism for infinite receiving." },
  { title: "The Galactic Council", desc: "The benevolent intelligences monitoring Earth's transition into the Golden Age." },
  { title: "12D Shielding", desc: "A spiritual technology for creating a sovereign space impervious to lower frequencies." },
  { title: "Unity Consciousness", desc: "The network of awakened souls acting as a single, coherent planetary body." },
  { title: "The Transition Window", desc: "The 2027-2035 period where old matrix systems will collapse completely." },
  { title: "New Earth Stabilization", desc: "The final phase of the mission where heaven and earth are fully merged." },
  { title: "The Flower of Life", desc: "The master-code geometric containing all the data of the universe." },
  { title: "The Great Tipping Point", desc: "When the square root of 1% of the population awakens, the matrix dissolves." }
];

const TEN_KINGDOMS = [
  { name: "Atlas (Capital)", ruler: "King Atlas", role: "Central Administration", desc: "The center of the empire, housing the Temple of Poseidon and the Great Crystal. The hub of governance and spirituality." },
  { name: "Gadeirus", ruler: "Prince Gadeirus", role: "Trade & Resources", desc: "The eastern gateway (near modern Cadiz, Spain). Controlled the mineral wealth and trade routes to the Mediterranean." },
  { name: "Ampheres", ruler: "Prince Ampheres", role: "Agriculture & Biology", desc: "The breadbasket of Atlantis. Specialized in advanced hydroponics and genetic harmonization of plant life." },
  { name: "Evaemon", ruler: "Prince Evaemon", role: "Healing & Medicine", desc: "The center for biological restoration. Utilized sound and light baths to regenerate limbs and organs." },
  { name: "Mneseus", ruler: "Prince Mneseus", role: "History & Records", desc: "The librarians of the continent. Maintained the crystal skulls and holographic records of human history." },
  { name: "Autochthon", ruler: "Prince Autochthon", role: "Construction & Engineering", desc: "Masters of stone and sound levitation. Responsible for the massive ringed architecture and canals." },
  { name: "Elasippus", ruler: "Prince Elasippus", role: "Animal Communication", desc: "Managed the relationship with the animal kingdom. Specialized in telepathic bonding with horses and dolphins." },
  { name: "Mestor", ruler: "Prince Mestor", role: "Education & Philosophy", desc: "The university sector. Trained initiates in the Law of One and the sciences of the mind." },
  { name: "Azaes", ruler: "Prince Azaes", role: "Art & Culture", desc: "The creative heart. Focused on the use of beauty, music, and sculpture to elevate public consciousness." },
  { name: "Diaprepes", ruler: "Prince Diaprepes", role: "Defense & Shielding", desc: "Managed the atmospheric crystal shield and the integrity of the dimensional barriers." }
];

const CRYSTAL_TECH_SPECS = [
  { name: "The Tuaoi Stone (Firestone)", type: "Power Generation", spec: "A massive, six-sided cylindrical ruby quartz. It gathered solar and cosmic radiation, concentrating it into a 'laser' beam that could power cities or aircraft (Vimanas). Misuse of this stone caused the second cataclysm." },
  { name: "The Omphalos (World Navel)", type: "Grid Stabilization", spec: "A spherical blue stone located in the Temple of Poseidon. It acted as the 'CPU' for the planetary ley-line grid, harmonizing tectonic plates." },
  { name: "The Healing Ray Arrays", type: "Biological Repair", spec: "Arched chambers filled with light-emitting crystals. Patients would lie on a table while specific color frequencies were beamed into their etheric body to knit bone and tissue instantaneously." },
  { name: "The Record Keepers", type: "Data Storage", spec: "Small, triangular crystals encoded with holographic history. They are virtually indestructible and can only be activated by the touch of a person with the matching DNA frequency." },
  { name: "The Communications Obelisks", type: "Telepathy Amp", spec: "Towering granite needles capped with gold and crystal. They amplified telepathic signals, allowing instant mental communication across the continent." }
];

const MASTER_CRYSTALS_DEEP_DIVE = [
  {
    name: "The Blue Ray of Knowledge",
    location: "Islands of Andros (Bahamas)",
    function: "Planetary Database",
    details: "A massive sapphire-composite structure designed to hold the holographic history of the Earth. It operates on a 12-dimensional frequency, accessible only by those with pure intent. It amplifies psychic clarity and telepathic reception."
  },
  {
    name: "The Emerald Ray of Healing",
    location: "Arkansas (Mt. Magazine)",
    function: "Biological Restoration",
    details: "This crystal emits a coherent 528Hz pulse that stabilizes the planetary grid's emotional body. In Atlantis, it was used to regenerate limbs, repair DNA damage from radiation, and reverse aging processes."
  },
  {
    name: "The Sun-Moon Crystal",
    location: "Minas Gerais (Brazil)",
    function: "Balance & Integration",
    details: "A dual-vortex generator that balances the masculine (solar/electric) and feminine (lunar/magnetic) currents of the planet. It prevents pole shifts and stabilizes the magnetosphere."
  },
  {
    name: "The Ruby Fire Crystal",
    location: "Bimini (Underwater)",
    function: "Energy Propulsion",
    details: "The 'Engine' of the system. Originally used to power the Vimana craft and levitation trains. Its frequency is intense and volatile; misuse of this crystal (tuning it too high) cracked the continental shelf."
  },
  {
    name: "The Platinum Crystal",
    location: "Patagonia (Argentina)",
    function: "Interdimensional Comms",
    details: "The uplink to the Galactic Federation. This crystal acts as a subspace transceiver, allowing instantaneous communication across the galaxy without time-delay."
  }
];

const GRID_PHYSICS = [
  {
    principle: "Piezoelectric Resonance",
    desc: "Crystals generate voltage when compressed. Atlantean architecture used the immense weight of stone temples to compress foundation crystals, generating a constant, limitless electrical field."
  },
  {
    principle: "Scalar Wave Propagation",
    desc: "Energy was not transmitted via wires (lossy) but via scalar waves (longitudinal) through the ether. Power was 'broadcast' like radio, and devices simply 'tuned in' to the grid frequency to operate."
  },
  {
    principle: "Telluric Boosting",
    desc: "The grid utilized the Earth's natural ley lines (dragon currents). Temples were built on acupuncture points of Gaia to amplify the natural flow, not replace it."
  },
  {
    principle: "Consciousness Coupling",
    desc: "The crystals were 'living' computers. They required a human operator with specific brainwave coherence (Gamma) to function. The technology locked out low-vibration individuals (fail-safe)."
  }
];

const FALL_TIMELINE = [
  { era: "50,000 BC", event: "The Golden Age", desc: "Peak civilization. Total integration of spirit and technology. Humans lived for 1,000 years. Telepathy was universal." },
  { era: "28,000 BC", event: "The First Fracture", desc: "A minor cataclysm caused by an experiment to drill into the Earth's core using focused sound. A portion of the continent sank." },
  { era: "17,500 BC", event: "The Schism", desc: "Society divided into the 'Sons of the Law of One' (Spiritual) and the 'Sons of Belial' (Material/Ego). Genetic experimentation began." },
  { era: "10,500 BC", event: "The Tuning Error", desc: "The Sons of Belial attempted to tune the Great Crystal to a frequency higher than the Earth could sustain to use it as a weapon. The feedback loop shattered the continental shelf." },
  { era: "9,600 BC", event: "The Final Deluge", desc: "The final sinking. The 'Great Flood' recorded in every culture. The survivors fled to Egypt (Thoth), Yucatan, and the Himalayas." },
  { era: "Present Day", event: "The Return", desc: "The activation of the 'Hall of Records' within the human DNA. The ancient souls have reincarnated to restore the timeline." }
];

export const AboutAtlantis: React.FC<AboutAtlantisProps> = ({ onViewBook }) => {
  const [activeDim, setActiveDim] = useState(0);

  const dimensions = [
    { name: '3D', label: 'Physical Reality', desc: 'The realm of dense matter and individual separation.', hz: '396Hz', focus: 'Survival & Grounding' },
    { name: '4D', label: 'Astral Plane', desc: 'The bridge of emotions, dreams, and psychic impressions.', hz: '417Hz', focus: 'Transformation' },
    { name: '5D', label: 'Mental Expansion', desc: 'The plane of pure thought and quantum potentiality.', hz: '528Hz', focus: 'Love & DNA Repair' },
    { name: '6D-9D', label: 'Galactic Wisdom', desc: 'The collective intelligence of star systems and timelines.', hz: '741Hz', focus: 'Creative Vision' },
    { name: '10D-12D', label: 'Universal Logos', desc: 'The highest interface with the Mind of God/Source.', hz: '963Hz', focus: 'Unity Consciousness' },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-32 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="flex justify-center"><Logo /></div>
        <h2 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-widest text-gold-500 leading-none">ANCIENT <br/>ATLANTIS</h2>
        <p className="font-serif italic text-3xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">"The Crystalline Civilization & The Great Preservation Project"</p>
        <div className="h-px w-48 bg-gold-500 mx-auto opacity-30"></div>
        <div className="pt-12">
          <button 
            onClick={onViewBook}
            className="group relative inline-flex items-center gap-6 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:border-gold-500 border border-stone-200 dark:border-stone-800"
          >
            <BookOpenIcon className="w-8 h-8 text-gold-500" /> 
            Enter the Grand Archives
          </button>
        </div>
      </header>

      {/* DIMENSIONAL MATRIX GRID */}
      <section className="bg-stone-950 p-12 md:p-20 rounded-[80px] border border-gold-500/20 shadow-2xl space-y-16">
        <div className="text-center space-y-4">
           <h3 className="font-display text-4xl font-bold uppercase text-white tracking-tighter">The Dimensional Frequency Matrix</h3>
           <p className="text-gold-500 font-serif italic text-xl">"Mapping the soul's ascent through the 12 Densities of Light"</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {dimensions.map((dim, i) => (
            <button 
              key={i} 
              onClick={() => setActiveDim(i)}
              className={`p-8 rounded-[40px] border transition-all duration-500 text-left flex flex-col justify-between min-h-[300px] ${activeDim === i ? 'bg-gold-500 border-gold-500 scale-105 shadow-[0_0_50px_rgba(203,175,21,0.3)]' : 'bg-stone-900 border-stone-800 hover:border-gold-500/50'}`}
            >
              <div>
                <span className={`text-4xl font-display font-bold ${activeDim === i ? 'text-black' : 'text-gold-500'}`}>{dim.name}</span>
                <h4 className={`text-xs font-bold uppercase tracking-widest mt-2 ${activeDim === i ? 'text-black/80' : 'text-stone-100'}`}>{dim.label}</h4>
              </div>
              
              <div className="space-y-4">
                <div className={`h-px w-full ${activeDim === i ? 'bg-black/20' : 'bg-stone-800'}`}></div>
                <p className={`text-[10px] font-serif italic leading-relaxed ${activeDim === i ? 'text-black' : 'text-stone-400'}`}>
                  "{dim.desc}"
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-bold ${activeDim === i ? 'text-black' : 'text-gold-500'}`}>{dim.hz}</span>
                  <BoltIcon className={`w-4 h-4 ${activeDim === i ? 'text-black' : 'text-stone-600'}`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {activeDim !== null && (
          <div className="p-10 bg-white/5 rounded-[40px] border border-white/10 animate-fade-in text-center">
             <h4 className="text-gold-500 font-bold uppercase tracking-[0.4em] text-xs mb-4">Core Focus: {dimensions[activeDim].focus}</h4>
             <p className="font-serif text-lg text-stone-300 italic max-w-3xl mx-auto">
               In the Atlantean mystery schools, initiates were required to master the resonance of this density before proceeding. The {dimensions[activeDim].name} interface is essential for {dimensions[activeDim].focus.toLowerCase()}.
             </p>
          </div>
        )}
      </section>

      {/* THE 50 GRAND ARCHIVE POINTS */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
           <h3 className="font-display text-5xl font-bold uppercase tracking-tighter text-stone-900 dark:text-stone-100">The Grand Archives of Atlantis</h3>
           <p className="text-stone-500 font-serif italic text-2xl">"50 Pillars of Primordial Wisdom"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {GRAND_ARCHIVES.map((point, i) => (
            <div key={i} className="group bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Logo />
               </div>
               <div className="flex items-center gap-3 mb-6">
                 <span className="text-[10px] font-bold text-gold-500 bg-gold-500/10 px-2 py-1 rounded border border-gold-500/20">{String(i + 1).padStart(2, '0')}</span>
                 <div className="h-px flex-1 bg-stone-100 dark:bg-stone-800"></div>
               </div>
               <h4 className="font-display font-bold uppercase text-xs mb-3 text-stone-800 dark:text-stone-100 group-hover:text-gold-500 transition-colors tracking-widest">{point.title}</h4>
               <p className="text-[11px] font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                 "{point.desc}"
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE TEN KINGDOMS - NEW SECTION */}
      <section className="space-y-12">
         <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The Ten Kingdoms</h3>
            <p className="text-stone-500 font-serif italic">"The geopolitical structure of the Golden Age civilization."</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEN_KINGDOMS.map((kingdom, i) => (
               <div key={i} className="bg-stone-100 dark:bg-stone-900/50 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-blue-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                     <span className="font-display font-bold text-xl uppercase text-blue-500">{kingdom.name}</span>
                     <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{kingdom.ruler}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500 mb-3">{kingdom.role}</p>
                  <p className="text-sm font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed">"{kingdom.desc}"</p>
               </div>
            ))}
         </div>
      </section>

      {/* CORE ARCHITECTURE SECTION */}
      <div className="grid lg:grid-cols-2 gap-20 items-center">
         <div className="space-y-10">
            <h3 className="font-display text-5xl font-bold uppercase tracking-tighter">Crystalline Power Grid</h3>
            <p className="font-serif text-xl text-stone-600 dark:text-stone-400 leading-relaxed italic">
              "The civilization was powered by a planetary-scale grid of monolithic crystals that harvested zero-point energy from the ionosphere and synchronized with the Earth's core resonance."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-8 bg-white dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-xl group hover:border-gold-500 transition-all">
                  <CpuChipIcon className="w-10 h-10 text-gold-500 mb-6" />
                  <h4 className="font-bold uppercase text-xs mb-2">Logos Storage</h4>
                  <p className="text-[10px] text-stone-500 font-serif leading-relaxed">Encoding the collective memory of the universe into crystal lattices for retrieval by initiates.</p>
               </div>
               <div className="p-8 bg-white dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-xl group hover:border-gold-500 transition-all">
                  <GlobeAltIcon className="w-10 h-10 text-gold-500 mb-6" />
                  <h4 className="font-bold uppercase text-xs mb-2">Grid Stabilization</h4>
                  <p className="text-[10px] text-stone-500 font-serif leading-relaxed">Using monolithic arrays to maintain the Earth's magnetic tilt and support biological health.</p>
               </div>
            </div>
         </div>

         {/* CHART: THE THREE RINGS OF POSEIDON */}
         <div className="bg-stone-950 p-12 rounded-[60px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none transform rotate-12 scale-125"><Logo /></div>
            <h4 className="font-display text-2xl font-bold uppercase text-center text-white mb-10">The Rings of Poseidon</h4>
            <div className="space-y-4">
               {[
                  { ring: "Outer Ring", label: "Public Life & Navigation", desc: "Commercial zones and high-tech ports for merchant fleets." },
                  { ring: "Middle Ring", label: "Academic & Scientific Halls", desc: "Laboratories for genetic research and crystal crafting." },
                  { ring: "Inner Ring", label: "The Temple District", desc: "Sacred grounds and the High Palace of the Crystal Heart." },
                  { ring: "Central Axis", label: "The Great Pyramid", desc: "The source point of interdimensional gateway anchoring." }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-2xl border border-stone-800 hover:bg-stone-900 transition-all group">
                     <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-[10px] font-bold text-gold-500 group-hover:bg-gold-500 group-hover:text-black">{i+1}</div>
                     <div>
                        <h5 className="font-bold uppercase text-[10px] text-stone-200">{item.ring}: {item.label}</h5>
                        <p className="text-[9px] text-stone-500 italic mt-1">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* CLASSIFIED CRYSTAL TECHNOLOGY (NEW DEEP DIVE SECTION) */}
      <section className="space-y-16 py-12 border-t border-stone-200 dark:border-stone-800">
         <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-900/20 rounded-full border border-blue-500/30">
               <ServerIcon className="w-4 h-4 text-blue-400" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Classified Technical Schematics</span>
            </div>
            <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100">The Master Crystal Grid</h3>
            <p className="text-stone-500 font-serif italic text-xl">"The hardware of the spirit. The machinery of light."</p>
         </div>

         {/* 1. MASTER CRYSTALS */}
         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <h4 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
                  <RadioIcon className="w-8 h-8 text-gold-500" /> Primary Generator Nodes
               </h4>
               <div className="grid md:grid-cols-2 gap-6">
                  {MASTER_CRYSTALS_DEEP_DIVE.map((crystal, i) => (
                     <div key={i} className="bg-white dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-blue-500 hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <h5 className="font-bold uppercase text-sm text-stone-800 dark:text-stone-200 group-hover:text-blue-500 transition-colors">{crystal.name}</h5>
                           <span className="text-[9px] font-bold text-stone-400 uppercase bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">{crystal.location}</span>
                        </div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">{crystal.function}</p>
                        <p className="text-xs font-serif text-stone-500 dark:text-stone-400 italic leading-relaxed">"{crystal.details}"</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* 2. GRID PHYSICS SIDEBAR */}
            <div className="bg-stone-950 p-10 rounded-[50px] border border-stone-800 space-y-8">
               <div className="flex items-center gap-4 text-gold-500">
                  <TableCellsIcon className="w-8 h-8" />
                  <h4 className="font-display text-xl font-bold uppercase">Grid Physics</h4>
               </div>
               <div className="space-y-8">
                  {GRID_PHYSICS.map((phys, i) => (
                     <div key={i} className="relative pl-6 border-l border-stone-800">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-stone-800 border-2 border-stone-950"></div>
                        <h5 className="text-xs font-bold uppercase text-stone-300 tracking-widest mb-2">{phys.principle}</h5>
                        <p className="text-[11px] font-serif text-stone-500 italic leading-relaxed">{phys.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 3. CRYSTAL TECH SPECS (Existing, now integrated) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {CRYSTAL_TECH_SPECS.map((tech, i) => (
               <div key={i} className="flex flex-col p-8 bg-stone-50 dark:bg-stone-900/50 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900 transition-all">
                  <h4 className="font-display font-bold uppercase text-lg text-stone-900 dark:text-stone-100 mb-2">{tech.name}</h4>
                  <span className="inline-block self-start px-3 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-bold uppercase tracking-widest rounded-full mb-4">{tech.type}</span>
                  <p className="font-serif italic text-stone-600 dark:text-stone-400 text-sm leading-relaxed">"{tech.spec}"</p>
               </div>
            ))}
         </div>
      </section>

      {/* THE FALL - TIMELINE */}
      <section className="relative py-20 bg-red-950/10 dark:bg-red-950/20 rounded-[80px] border border-red-500/20 overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
         <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h3 className="font-display text-5xl font-bold uppercase text-red-500 tracking-tighter">Chronicles of the Fall</h3>
               <p className="text-stone-500 dark:text-stone-400 font-serif italic text-xl mt-4">"The descent from Unity Consciousness into Duality."</p>
            </div>
            
            <div className="space-y-12 border-l-2 border-red-500/20 ml-4 md:ml-0 md:border-l-0 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
               {FALL_TIMELINE.map((event, i) => (
                  <div key={i} className="relative pl-8 md:pl-0 group">
                     <div className="md:hidden absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-stone-950"></div>
                     <div className="space-y-2">
                        <span className="text-red-500 font-display font-bold text-2xl">{event.era}</span>
                        <h4 className="font-bold uppercase text-stone-800 dark:text-stone-100 tracking-widest text-sm">{event.event}</h4>
                        <p className="text-sm font-serif text-stone-600 dark:text-stone-400 italic leading-relaxed">"{event.desc}"</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <footer className="text-center space-y-12">
         <div className="inline-flex p-4 rounded-full bg-gold-500/5 dark:bg-gold-500/10 border border-gold-500/20 mb-8 animate-pulse">
            <SparklesIcon className="w-10 h-10 text-gold-500" />
         </div>
         <h3 className="font-display text-5xl font-bold uppercase tracking-tighter">Enter the Future Testament</h3>
         <p className="font-serif italic text-2xl text-stone-500 max-w-2xl mx-auto">"The memories of Atlantis are returning to help us build the New Earth today."</p>
         
         <div className="pt-8 flex justify-center">
            <button 
              onClick={onViewBook}
              className="inline-flex items-center justify-center gap-6 bg-gold-500 hover:bg-gold-600 text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:shadow-gold-500/50 transform hover:scale-105 active:scale-95"
            >
              <BookOpenIcon className="w-8 h-8" /> 
              View Online Revelation
            </button>
         </div>
      </footer>
    </div>
  );
};
