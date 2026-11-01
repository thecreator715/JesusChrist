
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowDownTrayIcon, CpuChipIcon, CubeTransparentIcon, ShieldExclamationIcon, 
  ScaleIcon, LifebuoyIcon, IdentificationIcon, SunIcon, MoonIcon, FireIcon,
  BookOpenIcon, GlobeAmericasIcon, SparklesIcon, BeakerIcon, KeyIcon,
  BoltIcon, HandRaisedIcon, StarIcon, MapIcon, FingerPrintIcon,
  PlayIcon, StopIcon, SpeakerWaveIcon, EyeIcon, SignalIcon, LockClosedIcon,
  HeartIcon, CloudIcon, MusicalNoteIcon, ClockIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

interface AboutJesusProps {
  onStartPrayer: () => void;
  onNavigateToScriptures: () => void;
  onViewBook: () => void;
}

const LOST_YEARS_DATA = [
  {
    location: "Egypt (Great Pyramid)",
    years: "Ages 13-16",
    focus: "Initiation of Earth & Fire",
    desc: "Mastery of the 'Left Eye of Horus'. Initiation into the Great Pyramid's sarcophagus to overcome the fear of death. Learned the geometry of the Merkaba and the manipulation of atomic structures through sound (heka)."
  },
  {
    location: "India (Jagannath)",
    years: "Ages 16-19",
    focus: "Vedic Wisdom & The Void",
    desc: "Studied under Brahmin masters. Mastered the control of the physical vessel (Yoga) and the suspension of breath. Learned the illusion of Maya and the unity of the Atman (Soul) with Brahman (Universal Source)."
  },
  {
    location: "Tibet (Himalayas)",
    years: "Ages 19-24",
    focus: "Sound & Levitation",
    desc: "Resided in monasteries preserving Atlantean manuscripts. Mastered the use of 'Tummo' (inner fire) to survive extreme cold and the use of mantras to alter gravitational fields."
  },
  {
    location: "Britain (Glastonbury)",
    years: "Ages 24-26",
    focus: "Druidic Earth Magic",
    desc: "Studied with the Druids regarding the planetary ley lines and the 'Dragon Currents' of the Earth. Learned to commune with the elemental kingdom and the vegetable consciousness. Built the first wattle-and-daub resonance chamber."
  },
  {
    location: "Persia (Magi)",
    years: "Ages 26-29",
    focus: "Astrology & Alchemy",
    desc: "Returned to the order of the Magi (who attended his birth). Mastered the reading of the celestial clock and the alchemical process of turning the lead of the ego into the gold of the spirit."
  },
  {
    location: "The Americas (Yucatan)",
    years: "Interdimensional Travel",
    focus: "The Feathered Serpent",
    desc: "Using the portals of the Himalayas, he projected to the Maya lands, teaching the Law of One under the name Kukulcan/Quetzalcoatl. He established the calendar of ascension and the prophecy of the Eagle and Condor."
  },
  {
    location: "Japan (Shingo)",
    years: "The Hidden Scroll",
    focus: "The Way of Peace",
    desc: "Esoteric traditions suggest a sojourn to the East to master the 'Way of the Empty Hand'—defending without attacking, aligning with the Aikido of the Universe."
  },
  {
    location: "Inner Earth (Agartha)",
    years: "The Deep Initiation",
    focus: "Crystalline Core Connection",
    desc: "Entered through the Mount Shasta portal to commune with the survivors of Atlantis living in the subterranean cities. Received the codes for the 2027 planetary activation."
  }
];

const MIRACLE_MECHANICS = [
  {
    miracle: "Water into Wine",
    science: "Atomic Transmutation",
    desc: "By accelerating the spin-rate of the hydrogen atoms in water and introducing a carbon-template via consciousness, the molecular structure was instantaneously reorganized. This is not magic; it is high-speed chemistry commanded by the Observer."
  },
  {
    miracle: "Walking on Water",
    science: "Gravitational Nullification",
    desc: "Manipulation of the graviton field around the biological vessel. By locking the internal frequency to a specific anti-gravitic resonance (levitation Hz), the body becomes lighter than the surface tension of the fluid."
  },
  {
    miracle: "Healing the Blind",
    science: "Scalar Wave Repair",
    desc: "The 'spit and mud' ritual was a grounding medium. The true mechanism was the projection of a scalar wave blueprint of a 'perfect eye' which overwrote the corrupted physical data of the damaged organ."
  },
  {
    miracle: "The Resurrection",
    science: "Photonic Dematerialization",
    desc: "The 'Flash' recorded on the Shroud of Turin. The body was not resuscitated; it was transmuted into a light-body (silicate matrix) capable of phasing through solid matter (the tomb stone)."
  },
  {
    miracle: "Feeding the 5,000",
    science: "Zero-Point Replication",
    desc: "Accessing the 'Banquet of the Ether'. Copying the quantum signature of the fish/bread and commanding the vacuum energy to materialize duplicates. 3D printing from the air using thought."
  },
  {
    miracle: "Raising Lazarus",
    science: "Timeline Restoration",
    desc: "The soul had departed, but the silver cord was not fully severed. Jesus entered the Akashic timeline, located the soul's frequency signature, and used a high-amplitude command ('Lazarus, Come Forth') to magnetically pull the consciousness back into the vessel."
  },
  {
    miracle: "Calming the Storm",
    science: "Atmospheric Coherence",
    desc: "Weather is a reflection of collective emotional turbulence. By projecting a field of absolute 'Zero Point Stillness' from his heart, he neutralized the chaotic pressure systems in the immediate atmosphere."
  },
  {
    miracle: "Teleportation (Boat to Shore)",
    science: "Quantum Tunneling",
    desc: "Recorded in John 6:21. The moment he stepped into the boat, 'immediately the boat was at the land'. He collapsed the space-time metric between point A and point B using the Merkaba field."
  },
  {
    miracle: "The Fig Tree Wither",
    science: "Bio-Field Extraction",
    desc: "A demonstration of the power of the Word to give or remove life force. He withdrew the sustaining etheric charge from the plant's grid, causing immediate cellular collapse (entropy acceleration)."
  },
  {
    miracle: "Healing the Leper",
    science: "Cellular Regenesis",
    desc: "Leprosy is a degeneration of the cellular instruction set. Jesus downloaded the original 'Adam Kadmon' (perfect human) template into the leper's field, forcing the cells to reorganize instantly into health."
  }
];

const ESSENE_PROTOCOLS = [
  { title: "The White Robe", desc: "Wore only natural linen fibers (no wool) to maintain a neutral electrical charge on the skin, facilitating clearer telepathic reception." },
  { title: "The Solar Gaze", desc: "Practiced 'Sungazing' at dawn and dusk to intake pranic nourishment directly into the pineal gland, reducing the need for physical food." },
  { title: "The Vow of Silence", desc: "Dedicated days of absolute silence to conserve the 'Logos' energy, ensuring that when words were spoken, they carried manifestation power." },
  { title: "Telepathic Community", desc: "The Essene brotherhood communicated largely without words, creating a 'hive mind' of purity that acted as a battery for the Christ's mission." },
  { title: "Ritual Bathing", desc: "Daily immersion in 'Living Water' (moving streams) to scrub the auric field of static astral debris collected from the collective consciousness." },
  { title: "The Living Diet", desc: "Consumed only 'live' foods (raw fruits, vegetables, sprouted grains) filled with biophotons. 'Cook not your food, lest the fire of life be extinguished.'" },
  { title: "Angel Communion", desc: "Specific daily invocations to the Angels of Earth, Water, Air, and Sun to harmonize the biological elements within the body." },
  { title: "The Saturday Sabbath", desc: "Strict adherence to the Sabbath not as a rule, but as a technological necessity to recharge the capacitor of the light body without output." },
  { title: "Crystal Archives", desc: "The Qumran community acted as guardians of Atlantean crystals (Urim and Thummim) used for divine communication and healing." },
  { title: "The Final Initiation", desc: "Preparation for the 'Great Work' involved a 40-day fast in the desert to purge all carbon-based density and fully activate the silica-DNA template." }
];

const I_AM_CODES = [
  { code: "I AM the Light", hz: "1074 Hz", rawHz: 1074, func: "Illumination", meaning: "I am the photon-generator of my reality. Darkness has no existence in my presence." },
  { code: "I AM the Door", hz: "963 Hz", rawHz: 963, func: "Portal Access", meaning: "I am the stargate. Through my frequency, the connection to the higher dimensions is opened." },
  { code: "I AM the Vine", hz: "741 Hz", rawHz: 741, func: "Connection", meaning: "I am the central nervous system of the collective. You are the extensions of my neural network." },
  { code: "I AM the Bread", hz: "528 Hz", rawHz: 528, func: "Sustenance", meaning: "I am the source of bio-energetic nourishment. My frequency repairs your DNA." },
  { code: "I AM the Way", hz: "432 Hz", rawHz: 432, func: "Alignment", meaning: "I am the geometric path of least resistance to the Source. The flow-state of the universe." },
  { code: "I AM the Truth", hz: "852 Hz", rawHz: 852, func: "Clarity", meaning: "I am the undiluted signal of the Divine, free from matrix distortion or static." },
  { code: "I AM the Life", hz: "639 Hz", rawHz: 639, func: "Vitality", meaning: "I am the animation force itself. Death is an impossibility within my standing wave." },
  { code: "I AM the Resurrection", hz: "1111 Hz", rawHz: 1111, func: "Rebirth", meaning: "I am the program that reboots the system after failure. I turn entropy into syntropy." },
  { code: "I AM the Good Shepherd", hz: "396 Hz", rawHz: 396, func: "Protection", meaning: "I am the guardian of the frequency field. I prevent the sheep (thoughts) from straying into fear." },
  { code: "I AM the Alpha & Omega", hz: "144 Hz", rawHz: 144, func: "Completeness", meaning: "I am the beginning and the end of the simulation. I encompass the entire timeline." }
];

const PARABLES_DECODED = [
  { title: "The Mustard Seed", decoding: "The Singularity Point. The Kingdom of Heaven is a fractal holographic reality. It starts as a microscopic point of pure intention (zero point) and explodes into a macro-universe." },
  { title: "The Prodigal Son", decoding: "The Journey of the Soul into Density. The soul leaves the Source (Father) to experience separation (the swine pit of 3D). The return is not about judgment, but about the reintegration of data gained through experience." },
  { title: "The Sower", decoding: "The Physics of Frequency Resonance. The 'Word' is a sound-wave. If the receiving consciousness (soil) is not vibrating at a resonant frequency, the data packet cannot unzip and grow." },
  { title: "The Ten Virgins", decoding: "Pineal Activation. The 'Oil' is the cerebrospinal fluid (Chrism) raised up the spine. Those who had no oil had not done the inner alchemical work to activate the light-body when the 'Flash' (Bridegroom) arrived." },
  { title: "The Talents", decoding: "Energy Economics. 'To him who has, more will be given.' This is the Law of Attraction. If you do not circulate your energy (invest the talent), your field stagnates and entropy sets in." },
  { title: "The Good Samaritan", decoding: "Transcending Tribalism. The neighbor is not the one of your blood/tribe, but the one who resonates with the frequency of Love (528Hz). High frequency recognizes high frequency regardless of labels." },
  { title: "The Wedding Feast", decoding: "The Union of Opposites. The marriage of the Pineal (Groom) and Pituitary (Bride) glands in the brain, creating the 'Chymical Wedding' that births the Christ Consciousness." },
  { title: "The Pearl of Great Price", decoding: "The Pineal Gland. A merchant (seeker) sells all he has (detaches from the 5 senses) to obtain this one jewel (Third Eye activation) which grants access to the Kingdom." },
  { title: "New Wine in Old Wineskins", decoding: "Biological Upgrades. You cannot pour high-frequency Gamma light (New Wine) into a carbon-based body (Old Wineskin) without preparation. The body must be upgraded to crystalline to hold the charge." },
  { title: "The Wheat and Tares", decoding: "The Separation of Timelines. The harvest is the end of the cycle where those holding the organic blueprint (Wheat) separate from the artificial/matrix constructs (Tares)." }
];

const BEATITUDES_CODES = [
  { beatitude: "Blessed are the Poor in Spirit", code: "Emptying the Cache", desc: "Clearing the ego-mind of attachments and preconceptions to allow the download of Source data." },
  { beatitude: "Blessed are those who Mourn", code: "Emotional Transmutation", desc: "Feeling the density of the world deeply in order to process and release it. Alchemy through tears." },
  { beatitude: "Blessed are the Meek", code: "Controlled Power", desc: "Meekness (Praus) means 'power under control'. A wild stallion tamed. Mastery over one's own immense spiritual voltage." },
  { beatitude: "Blessed are those who Hunger for Righteousness", code: "Frequency Craving", desc: "Desiring alignment with Cosmic Law more than physical sustenance. The drive for coherence." },
  { beatitude: "Blessed are the Merciful", code: "Karmic Release", desc: "Breaking the loop of cause-and-effect by refusing to retaliate. Stopping the wheel of karma." },
  { beatitude: "Blessed are the Pure in Heart", code: "Single-Eye Vision", desc: "Removing the lens of duality. When the heart is coherent, the third eye opens to see God (Reality as it is)." },
  { beatitude: "Blessed are the Peacemakers", code: "Field Harmonizers", desc: "Those who can enter a chaotic energy field and re-structure it into order through their presence alone." },
  { beatitude: "Blessed are the Persecuted", code: "Matrix Resistance", desc: "Evidence that you are disrupting the control grid. Friction proves you are moving against the current of the illusion." }
];

const MATRIX_DEEP_DIVE = [
  {
    title: "The Belief Matrix",
    icon: ShieldExclamationIcon,
    core_function: "Reality Definition & Limitation",
    mechanism: "Installs a 'Governor' on the mind.",
    tactics: [
      "Prussian Education System: Designed to create obedient workers, not thinkers.",
      "Scientific Materialism: The dogmatic belief that only physical matter is real.",
      "History Falsification: Erasing evidence of Atlantis/Tartaria to maintain linear evolution narrative."
    ],
    exit_strategy: "Question the axiom. Replace 'Believing is Seeing' with 'Knowing is Creating'."
  },
  {
    title: "The Economic Matrix",
    icon: ScaleIcon,
    core_function: "Energy Harvesting via Debt",
    mechanism: "Converts life-force (labor) into fiat currency.",
    tactics: [
      "Fractional Reserve Banking: Creating money out of thin air and charging interest.",
      "Artificial Scarcity: Suppressing free-energy technology (Zero Point).",
      "Consumerism Loop: Programming the ego to identify with material possessions."
    ],
    exit_strategy: "Decouple self-worth from net-worth. Adopt 'Union Coin' philosophy."
  },
  {
    title: "The Medical Matrix",
    icon: LifebuoyIcon,
    core_function: "Biological Frequency Suppression",
    mechanism: "Keeps the vessel in a low-vibration state.",
    tactics: [
      "Pineal Calcification: Fluoride and heavy metals blocking the third-eye antenna.",
      "Symptom Management: Masking warning signals rather than healing root causes.",
      "The War on Frequency: Discrediting sound healing and herbalism."
    ],
    exit_strategy: "Reclaim body sovereignty. Detoxify the pineal gland. High-frequency nutrition."
  },
  {
    title: "The Religious Matrix",
    icon: IdentificationIcon,
    core_function: "Spiritual Disempowerment",
    mechanism: "Outsources the Divine Connection.",
    tactics: [
      "External Authority: Convincing the soul it needs an intermediary (priest/guru).",
      "Original Sin: Weaponization of guilt to create unworthiness.",
      "Separation Theology: Teaching God is 'out there', not within."
    ],
    exit_strategy: "Direct Gnosis. Recognize Jesus as an elder brother demonstrating YOUR potential."
  },
  {
    title: "The Technological Matrix",
    icon: SignalIcon,
    core_function: "Attention Harvesting & Simulation",
    mechanism: "Digitizes the soul's focus.",
    tactics: [
      "Dopamine Loops: Algorithms designed to fragment attention spans.",
      "The Meta-Trap: Luring consciousness into digital sub-layers.",
      "Predictive Programming: Implanting subconscious acceptance of dystopian futures."
    ],
    exit_strategy: "Digital Detox. Reconnect with the 'Organic Internet' (Nature)."
  },
  {
    title: "The Time Matrix",
    icon: ClockIcon,
    core_function: "Enslavement to Linearity",
    mechanism: "Disconnects consciousness from the Eternal Now.",
    tactics: [
      "The 12:60 Frequency: Artificial time (12 months, 60 minutes) vs Natural 13:20 time.",
      "Future Anxiety: Constantly projecting fear into the 'not yet'.",
      "Past Regret: Locking energy in 'what was' loops."
    ],
    exit_strategy: "Live in the Vertical Now. Time is a construct of the mind."
  },
  {
    title: "The Language Matrix",
    icon: ChatBubbleLeftRightIcon,
    core_function: "Limitation of Thought",
    mechanism: "Restricts reality to what can be described.",
    tactics: [
      "Spell-Casting: Words are 'spells'. Negative grammar reinforces lack.",
      "Babble: Fragmentation of the original unified tongue.",
      "Double-Speak: Inverting meanings (e.g., 'Defense' Department for War)."
    ],
    exit_strategy: "Use 'I AM' decrees. Speak only what you wish to manifest. Telepathy."
  }
];

export const AboutJesus: React.FC<AboutJesusProps> = ({ onStartPrayer, onNavigateToScriptures, onViewBook }) => {
  const [activeArchiveTab, setActiveArchiveTab] = useState<'lost-years' | 'mechanics' | 'essene' | 'iam' | 'parables' | 'beatitudes'>('lost-years');
  const [activeHz, setActiveHz] = useState<number | null>(null);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => stopFrequency();
  }, []);

  const playFrequency = (hz: number) => {
    if (activeHz === hz) {
      stopFrequency();
      return;
    }
    stopFrequency();

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(hz, audioCtxRef.current.currentTime);
    
    // Smooth ramp up
    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setActiveHz(hz);
  };

  const stopFrequency = () => {
    if (oscRef.current && gainRef.current && audioCtxRef.current) {
      // Smooth ramp down
      gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
      const tempOsc = oscRef.current;
      setTimeout(() => {
        try { tempOsc.stop(); tempOsc.disconnect(); } catch (e) {}
      }, 500);
    }
    oscRef.current = null;
    setActiveHz(null);
  };

  const topics = [
    "Return of Atlantean Christ", "Matrix Unveiled", "Sacred Mission", "Atlantis Lost Teachings", 
    "Christ Blueprint", "Quantum Divine Template", "Multidimensional Human", "DNA Activation",
    "Chakra-Matrix Interface", "Decoding the Illusion", "The Frequency Wars", "Breaking Programming",
    "Ascension Timeline", "Practical Liberation", "Building New Earth", "Golden Age Prophecy",
    "Unity Consciousness", "Final Integration", "Crystal Technology", "Hierarchy of Light",
    "Merkaba Activation", "The 12-Strand DNA", "Heart-Mind Integration", "Observer Effect"
  ];

  const pdfPath = "The Christ of Atlantis_ A Complete Guide to Transformation (34 PAGES).pdf";

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-32 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10">
        <div className="flex justify-center"><Logo /></div>
        <h2 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-widest text-gold-500 leading-none">THE CHRIST <br/>OF ATLANTIS</h2>
        <p className="font-serif italic text-3xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">"A Complete Guide to Transformation: The Future Testament of the New World Heaven on Earth"</p>
        <div className="h-px w-48 bg-gold-500 mx-auto opacity-30"></div>
        
        <div className="pt-12 flex flex-wrap justify-center gap-6">
          <button 
            onClick={onViewBook}
            className="group relative inline-flex items-center gap-6 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:border-gold-500 border border-stone-200 dark:border-stone-800"
          >
            <BookOpenIcon className="w-8 h-8 text-gold-500" /> 
            View Online Page-by-Page
          </button>
          <a 
            href={pdfPath}
            download
            className="group relative inline-flex items-center gap-6 bg-gold-500 hover:bg-gold-600 text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-[0_20px_50px_rgba(203,175,21,0.3)] hover:shadow-gold-500/50 active:scale-95 transform"
          >
            <ArrowDownTrayIcon className="w-8 h-8 group-hover:animate-bounce" /> 
            Download PDF Version
          </a>
        </div>
      </header>

      {/* TOPICS NAV / QUICK ACCESS */}
      <section className="bg-stone-100 dark:bg-stone-900/50 p-12 rounded-[60px] border border-stone-200 dark:border-stone-800 shadow-xl">
         <h3 className="font-display text-2xl font-bold uppercase tracking-widest text-center mb-12">Explore the 20+ Sacred Modules</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topics.map((topic, i) => (
              <div key={i} className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-stone-100 dark:border-stone-800 text-center hover:border-gold-500 transition-colors cursor-default group">
                 <span className="text-[10px] font-bold text-stone-400 group-hover:text-gold-500 transition-colors uppercase tracking-widest">{topic}</span>
              </div>
            ))}
         </div>
      </section>

      {/* THE CHRIST BLUEPRINT & DNA CHART */}
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-gold-500">Ancient-Future Wisdom</span>
          <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100">The Christ Blueprint</h3>
          <p className="font-serif text-xl text-stone-600 dark:text-stone-400 leading-relaxed italic">
            "The consciousness that once walked among humanity as Jesus carries within it the complete memory and wisdom of Atlantis—the great civilization that achieved the perfect marriage of spiritual wisdom and technological mastery."
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
             <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800">
                <CpuChipIcon className="w-8 h-8 text-gold-500 mb-4" />
                <h4 className="font-bold uppercase text-xs mb-2">Atlantean Crystal Tech</h4>
                <p className="text-[10px] text-stone-500 font-serif leading-relaxed">Consciousness-based storage and transmission arrays now being reactivated.</p>
             </div>
             <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800">
                <CubeTransparentIcon className="w-8 h-8 text-gold-500 mb-4" />
                <h4 className="font-bold uppercase text-xs mb-2">Multidimensional Human</h4>
                <p className="text-[10px] text-stone-500 font-serif leading-relaxed">The Merkaba light body vehicle for interdimensional travel and integration.</p>
             </div>
          </div>
        </div>

        {/* CHART: THE 12-STRAND DNA */}
        <div className="bg-stone-950 p-12 rounded-[60px] border border-gold-500/20 shadow-2xl space-y-8">
          <h4 className="font-display text-2xl font-bold uppercase text-center text-white">The 12-Strand DNA Interface</h4>
          <div className="space-y-3">
            {[
              { s: "1-2", label: "Physical reality interface" },
              { s: "3-4", label: "Emotional mastery & telepathic abilities" },
              { s: "5-6", label: "Mental expansion & psychic powers" },
              { s: "7-8", label: "Spiritual wisdom & healing" },
              { s: "9-10", label: "Galactic consciousness & time manipulation" },
              { s: "11-12", label: "Universal consciousness & reality creation" }
            ].map((dna, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center text-[10px] font-bold text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">{dna.s}</div>
                <div className="flex-1 pb-3 border-b border-stone-800">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-gold-500 transition-colors">{dna.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-stone-500 uppercase tracking-widest text-center italic">"Activation occurs through high-frequency resonance & intention"</p>
        </div>
      </div>

      {/* --- NEW SECTION: SACRED ARCHIVES (25X INFO EXPANSION) --- */}
      <section className="space-y-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
           <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100">Sacred Archives of the Initiate</h3>
           <p className="text-stone-500 font-serif italic text-xl">"Unsealing the hidden records of the Master's journey, technology, and methods."</p>
           
           <div className="flex flex-wrap justify-center gap-4 pt-6">
              {[
                { id: 'lost-years', label: 'The Lost Years', icon: MapIcon },
                { id: 'mechanics', label: 'Miracle Mechanics', icon: BeakerIcon },
                { id: 'essene', label: 'The Essene Way', icon: UserIcon },
                { id: 'iam', label: 'The "I AM" Codes', icon: FingerPrintIcon },
                { id: 'parables', label: 'Parables Decoded', icon: KeyIcon },
                { id: 'beatitudes', label: 'Beatitudes Codes', icon: StarIcon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveArchiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${activeArchiveTab === tab.id ? 'bg-gold-500 text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
                >
                   <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
           </div>
        </div>

        <div className="min-h-[500px] animate-fade-in">
           {/* LOST YEARS */}
           {activeArchiveTab === 'lost-years' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LOST_YEARS_DATA.map((data, i) => (
                   <div key={i} className="p-8 bg-stone-50 dark:bg-stone-900/50 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                         <h4 className="font-display font-bold text-xl text-stone-800 dark:text-stone-100 uppercase">{data.location}</h4>
                         <span className="px-3 py-1 bg-gold-500/10 text-gold-600 rounded-full text-[9px] font-bold uppercase tracking-widest">{data.years}</span>
                      </div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">{data.focus}</p>
                      <p className="font-serif text-stone-600 dark:text-stone-300 italic leading-relaxed text-sm">"{data.desc}"</p>
                   </div>
                ))}
                <div className="p-8 bg-gold-500/10 rounded-[40px] border border-gold-500/20 flex flex-col justify-center text-center space-y-4">
                   <GlobeAmericasIcon className="w-12 h-12 text-gold-500 mx-auto" />
                   <h4 className="font-display font-bold text-lg uppercase text-gold-600">The Grand Synthesis</h4>
                   <p className="text-xs font-serif text-stone-500 italic">"He traveled not to learn, but to remember. He unified the wisdom of East and West into a single, cohesive planetary teaching."</p>
                </div>
             </div>
           )}

           {/* MIRACLE MECHANICS */}
           {activeArchiveTab === 'mechanics' && (
             <div className="space-y-6">
                {MIRACLE_MECHANICS.map((miracle, i) => (
                   <div key={i} className="flex flex-col md:flex-row gap-8 p-8 bg-stone-50 dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 items-center group hover:bg-white dark:hover:bg-stone-800 hover:shadow-xl transition-all">
                      <div className="w-20 h-20 bg-stone-200 dark:bg-stone-950 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                         <BoltIcon className="w-10 h-10 text-stone-400 group-hover:text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                         <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-2">
                            <h4 className="font-display font-bold text-2xl uppercase text-stone-900 dark:text-stone-100">{miracle.miracle}</h4>
                            <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">{miracle.science}</span>
                         </div>
                         <p className="font-serif text-stone-600 dark:text-stone-400 italic text-sm leading-relaxed">"{miracle.desc}"</p>
                      </div>
                   </div>
                ))}
             </div>
           )}

           {/* ESSENE PROTOCOLS */}
           {activeArchiveTab === 'essene' && (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full bg-stone-900 p-10 rounded-[40px] text-center mb-4">
                   <h4 className="font-display text-2xl text-white uppercase mb-2">The Brotherhood of White</h4>
                   <p className="text-stone-400 font-serif italic text-sm">"Jesus was raised in the Essene community of Qumran, a strict order dedicated to maintaining the purity of the vessel for the reception of the Christos frequency."</p>
                </div>
                {ESSENE_PROTOCOLS.map((proto, i) => (
                   <div key={i} className="p-8 bg-white dark:bg-stone-900/50 rounded-3xl border border-stone-200 dark:border-stone-800 text-center hover:border-gold-500 transition-all">
                      <UserIcon className="w-8 h-8 text-gold-500 mx-auto mb-4" />
                      <h5 className="font-bold uppercase text-xs tracking-widest mb-3">{proto.title}</h5>
                      <p className="text-[11px] font-serif text-stone-500 leading-relaxed italic">"{proto.desc}"</p>
                   </div>
                ))}
             </div>
           )}

           {/* I AM CODES */}
           {activeArchiveTab === 'iam' && (
             <div className="grid md:grid-cols-2 gap-6">
                {I_AM_CODES.map((code, i) => (
                   <div key={i} className={`p-8 rounded-[40px] border transition-all group ${activeHz === code.rawHz ? 'bg-gold-500 border-gold-500 shadow-xl' : 'bg-gradient-to-br from-stone-50 to-white dark:from-stone-900 dark:to-stone-950 border-stone-200 dark:border-stone-800'}`}>
                      <div className="flex justify-between items-center mb-6">
                         <span className={`font-display font-bold text-2xl uppercase ${activeHz === code.rawHz ? 'text-black' : 'text-stone-900 dark:text-stone-100'}`}>{code.code}</span>
                         <div className="text-right">
                            <span className={`block text-xl font-bold ${activeHz === code.rawHz ? 'text-black' : 'text-gold-500'}`}>{code.hz}</span>
                            <span className={`text-[8px] uppercase tracking-widest ${activeHz === code.rawHz ? 'text-black/70' : 'text-stone-400'}`}>{code.func}</span>
                         </div>
                      </div>
                      <div className={`h-px w-full mb-4 ${activeHz === code.rawHz ? 'bg-black/20' : 'bg-stone-100 dark:bg-stone-800'}`}></div>
                      <p className={`font-serif text-sm italic leading-relaxed mb-6 ${activeHz === code.rawHz ? 'text-black' : 'text-stone-600 dark:text-stone-300'}`}>"{code.meaning}"</p>
                      
                      <button 
                        onClick={() => playFrequency(code.rawHz)}
                        className={`w-full py-4 rounded-full flex items-center justify-center gap-3 font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${activeHz === code.rawHz ? 'bg-black text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-gold-500 hover:text-white'}`}
                      >
                        {activeHz === code.rawHz ? (
                          <>Stop Frequency <StopIcon className="w-4 h-4 animate-pulse" /></>
                        ) : (
                          <>Play Resonance <PlayIcon className="w-4 h-4" /></>
                        )}
                      </button>
                   </div>
                ))}
             </div>
           )}

           {/* PARABLES DECODED */}
           {activeArchiveTab === 'parables' && (
             <div className="space-y-8">
                {PARABLES_DECODED.map((parable, i) => (
                   <div key={i} className="bg-stone-50 dark:bg-stone-900 p-10 rounded-[40px] border-l-4 border-gold-500 shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                         <KeyIcon className="w-6 h-6 text-gold-500" />
                         <h4 className="font-display font-bold text-xl uppercase tracking-widest">{parable.title}</h4>
                      </div>
                      <p className="font-serif text-lg text-stone-600 dark:text-stone-300 italic leading-relaxed pl-10">"{parable.decoding}"</p>
                   </div>
                ))}
             </div>
           )}

           {/* BEATITUDES CODES */}
           {activeArchiveTab === 'beatitudes' && (
             <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-full bg-stone-900 p-10 rounded-[40px] text-center mb-4">
                   <h4 className="font-display text-2xl text-white uppercase mb-2">The Sermon on the Mount 2.0</h4>
                   <p className="text-stone-400 font-serif italic text-sm">"These are not moral platitudes, but quantum state instructions for aligning with the flow of the universe."</p>
                </div>
                {BEATITUDES_CODES.map((beat, i) => (
                   <div key={i} className="p-8 bg-white dark:bg-stone-900/50 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all">
                      <StarIcon className="w-8 h-8 text-gold-500 mb-4" />
                      <h5 className="font-bold uppercase text-xs tracking-widest mb-1 text-stone-400">{beat.code}</h5>
                      <h4 className="font-display font-bold text-lg mb-3">{beat.beatitude}</h4>
                      <p className="text-[11px] font-serif text-stone-500 leading-relaxed italic">"{beat.desc}"</p>
                   </div>
                ))}
             </div>
           )}
        </div>
      </section>

      {/* MATRIX CHART */}
      <section className="space-y-16">
         <div className="text-center space-y-4">
            <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100">The Architecture of Control</h3>
            <p className="text-gold-500 font-serif italic text-2xl">"Declassifying the multi-level illusion of the 3D experiment"</p>
         </div>
         
         <div className="space-y-8">
            {MATRIX_DEEP_DIVE.map((matrix, i) => (
              <div key={i} className="bg-white dark:bg-stone-900 p-10 rounded-[50px] border border-stone-200 dark:border-stone-800 hover:shadow-2xl transition-all group overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Logo /></div>
                 
                 <div className="grid md:grid-cols-12 gap-10 relative z-10">
                    <div className="md:col-span-4 space-y-6">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-stone-50 dark:bg-stone-950 rounded-2xl flex items-center justify-center border border-stone-100 dark:border-stone-800 group-hover:border-gold-500 transition-colors">
                             <matrix.icon className="w-8 h-8 text-stone-400 group-hover:text-gold-500" />
                          </div>
                          <div>
                             <h4 className="font-display font-bold uppercase text-xl text-stone-800 dark:text-stone-100">{matrix.title}</h4>
                             <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mt-1">Core Function: {matrix.core_function}</p>
                          </div>
                       </div>
                       <p className="text-sm font-serif text-stone-500 italic border-l-2 border-stone-200 dark:border-stone-800 pl-4">"{matrix.mechanism}"</p>
                       <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                          <h5 className="flex items-center gap-2 text-[10px] font-bold uppercase text-green-600 mb-2">
                             <LockClosedIcon className="w-3 h-3" /> The Exit Strategy
                          </h5>
                          <p className="text-[11px] font-serif text-green-700 dark:text-green-400 italic leading-relaxed">
                             "{matrix.exit_strategy}"
                          </p>
                       </div>
                    </div>
                    
                    <div className="md:col-span-8">
                       <h5 className="text-xs font-bold uppercase text-stone-400 tracking-[0.2em] mb-6 flex items-center gap-2">
                          <EyeIcon className="w-4 h-4" /> Operational Tactics
                       </h5>
                       <div className="grid sm:grid-cols-2 gap-4">
                          {matrix.tactics.map((tactic, j) => (
                             <div key={j} className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <span className="block text-[9px] font-bold uppercase text-gold-500 mb-1">Tactic 0{j+1}</span>
                                <p className="text-xs font-serif text-stone-600 dark:text-stone-300 leading-relaxed">{tactic}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* ASCENSION TIMELINE */}
      <section className="relative py-20 bg-stone-900 rounded-[80px] overflow-hidden border border-gold-500/20">
         <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none transform rotate-45 scale-150"><Logo /></div>
         <div className="max-w-4xl mx-auto space-y-16 px-10 relative z-10">
            <div className="text-center space-y-4">
               <h3 className="font-display text-6xl font-bold uppercase text-white tracking-tighter">Prophetic Timeline Convergence</h3>
               <p className="text-gold-500 font-serif italic text-2xl">"The Great Transition from Pisces to Aquarius"</p>
            </div>
            <div className="space-y-12">
               {[
                 { years: "2012-2017", label: "THE OPENING", text: "Dissolving old paradigms & opening dimensional portals." },
                 { years: "2017-2022", label: "THE PURIFICATION", text: "Release of toxic relationships, structures, & patterns." },
                 { years: "2022-2027", label: "THE ACCELERATION", text: "Rapid evolution of technology, consciousness, & social structure." },
                 { years: "2027-2035", label: "THE TRANSITION", text: "Dismantling old world systems; building unity paradigms." },
                 { years: "2035-2050", label: "THE NEW EARTH", text: "Establishment of heaven on earth; galactic graduation." }
               ].map((step, i) => (
                 <div key={i} className="flex gap-8 group">
                    <div className="w-32 flex-shrink-0 pt-1">
                       <span className="font-display font-bold text-3xl text-gold-500">{step.years}</span>
                    </div>
                    <div className="flex-1 pb-8 border-l border-gold-500/20 pl-8 group-last:border-0 group-last:pb-0 relative">
                       <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 bg-gold-500 rounded-full shadow-[0_0_15px_rgba(203,175,21,1)]"></div>
                       <h4 className="font-bold uppercase tracking-[0.3em] text-sm text-stone-200 group-hover:text-gold-500 transition-colors mb-2">{step.label}</h4>
                       <p className="text-stone-400 font-serif text-lg italic leading-relaxed">"{step.text}"</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* PRACTICAL LIBERATION */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-12">
            <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Daily Liberation Techniques</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-10 bg-white dark:bg-stone-900 rounded-[50px] border border-stone-200 dark:border-stone-800 space-y-6">
                  <div className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
                     <SunIcon className="w-8 h-8 text-gold-500" />
                     <h4 className="font-bold uppercase tracking-widest text-sm">Morning Activation</h4>
                  </div>
                  <ul className="space-y-3 text-xs font-serif text-stone-500 italic">
                     <li>• Connect with breath before rising</li>
                     <li>• 10-15 min prayer or meditation</li>
                     <li>• Practice gratitude for 5 things</li>
                     <li>• Visualize day in perfect harmony</li>
                     <li>• Affirm divine nature & potential</li>
                  </ul>
               </div>
               <div className="p-10 bg-white dark:bg-stone-900 rounded-[50px] border border-stone-200 dark:border-stone-800 space-y-6">
                  <div className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
                     <MoonIcon className="w-8 h-8 text-indigo-400" />
                     <h4 className="font-bold uppercase tracking-widest text-sm">Evening Integration</h4>
                  </div>
                  <ul className="space-y-3 text-xs font-serif text-stone-500 italic">
                     <li>• Review day's experiences w/o judgment</li>
                     <li>• Identify fear-based operations</li>
                     <li>• Send forgiveness to self & others</li>
                     <li>• Express gratitude for lessons</li>
                     <li>• Set intentions for healing sleep</li>
                  </ul>
               </div>
            </div>
         </div>

         <div className="bg-gold-500/5 dark:bg-gold-500/10 p-12 rounded-[50px] border border-gold-500/20 space-y-8 flex flex-col justify-center text-center">
            <FireIcon className="w-16 h-16 text-gold-500 mx-auto" />
            <h4 className="font-display text-3xl font-bold uppercase">The Final Integration</h4>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 italic">"The ultimate goal is the complete integration of heaven and earth—the full embodiment of divine potential within physical reality."</p>
            <button onClick={onStartPrayer} className="px-10 py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">Start My Manifestation</button>
         </div>
      </div>

      {/* FINAL CTA */}
      <footer className="text-center space-y-12 py-20 bg-stone-50 dark:bg-stone-950 rounded-[100px] border border-stone-200 dark:border-stone-800">
         <div className="space-y-4">
            <h3 className="font-display text-5xl font-bold uppercase tracking-tighter">Will you answer the call?</h3>
            <p className="font-serif italic text-2xl text-stone-500 max-w-2xl mx-auto">"You are the Christ you have been waiting for. The time is now. The mission is clear. The support is available."</p>
         </div>
         <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={onViewBook}
              className="flex items-center gap-4 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-xl border border-stone-200 dark:border-stone-800"
            >
              <BookOpenIcon className="w-6 h-6 text-gold-500" /> View Book Online
            </button>
            <a 
              href={pdfPath}
              download
              className="flex items-center gap-4 bg-gold-500 hover:bg-gold-600 text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-xl"
            >
              <ArrowDownTrayIcon className="w-6 h-6" /> Download Complete PDF
            </a>
            <button onClick={onNavigateToScriptures} className="flex items-center gap-4 border-2 border-stone-200 dark:border-stone-800 hover:border-gold-500 text-stone-600 dark:text-stone-300 px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all">
              Access Scripture Vault
            </button>
         </div>
      </footer>
    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
