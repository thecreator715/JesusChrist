
import React from 'react';
import { 
  BoltIcon, SpeakerWaveIcon, PauseIcon, PlayIcon, StopIcon, 
  SparklesIcon, FireIcon, BeakerIcon, GlobeAltIcon, 
  ShieldCheckIcon, EyeIcon, HeartIcon, ScaleIcon,
  CpuChipIcon, HandRaisedIcon, CloudIcon, KeyIcon
} from '@heroicons/react/24/outline';

export const CHAKRAS = [
  { 
    name: 'Divine Gateway', 
    sanskrit: 'Paramatman',
    hz: 1074, 
    color: 'text-white', 
    element: 'Cosmic Ray',
    location: '24" Above Crown',
    desc: 'Direct connection to Source consciousness.', 
    type: 'Hidden', 
    shadow: 'Spiritual Nihilism / Total Disconnection',
    identity: 'I AM GOD',
    crystals: ['Diamond', 'Golden Beryl', 'Phenacite'],
    physical: ['Universal Field', 'The Monad', 'Quantum Lattice'],
    tech: 'The Monadic Uplink. A hardline fiber-optic connection to the Oversoul, bypassing all astral distortion layers.',
    affirmation: 'I am an infinite point of light within the Mind of God.',
    meditation: 'The highest interface. Dissolve all boundaries and merge with the infinite field of the One.',
    activation: 'Visualize a platinum sphere 24 inches above the head spinning clockwise at the speed of light. Feel a beam of pure white fire descend through the central channel.',
    command: 'I COMMAND the Monadic Blue-Print to descend now. Clear all astral distortion. Override the matrix code with the Law of One. I am the Source.'
  },
  { 
    name: 'Galactic', 
    sanskrit: 'Antar-Naksatra',
    hz: 999, 
    color: 'text-purple-300', 
    element: 'Stellar Light',
    location: '18" Above Crown',
    desc: 'Connection to galactic intelligence.', 
    type: 'Hidden', 
    shadow: 'Galactic Isolation / Fear of ETs',
    identity: 'I AM INFINITE',
    crystals: ['Moldavite', 'Tektite', 'Libyan Desert Glass'],
    physical: ['Merkaba Field', 'Time-Body', 'Stellar DNA'],
    tech: 'The Star-Seed Transceiver. Decodes high-frequency light packets from the Central Sun (Alcyone) and Sirius.',
    affirmation: 'My citizenship is amongst the stars. I remember my lineage.',
    meditation: 'Access the celestial records. Receive downloads from the higher galactic councils.',
    activation: 'Focus on your stellar connection points. See a silver cord extending to the Galactic Central Sun. Breathe in the starlight directly into the skull.',
    command: 'I REVOKE all agreements with inorganic intelligence. I reclaim my galactic citizenship. Activate the Star-Seed protocols and open the stellar memory banks.'
  },
  { 
    name: 'Universal', 
    sanskrit: 'Brahmarandhra',
    hz: 963, 
    color: 'text-purple-400', 
    element: 'Spirit / Void',
    location: '6" Above Crown',
    desc: 'Universal consciousness connection.', 
    type: 'Hidden', 
    shadow: 'Dualism / Fragmentation / Atheism',
    identity: 'I AM ONE',
    crystals: ['Danburite', 'Petalite', 'Clear Quartz'],
    physical: ['Quantum Field', 'Left/Right Brain Sync', 'Cranial Suture'],
    tech: 'The Unity Grid Link. Synchronization with the Law of One, overriding the illusion of separation.',
    affirmation: 'There is no other. I am the observer and the observed.',
    meditation: 'Awaken your universal nature. Resonance with the frequency of Divine Oneness.',
    activation: 'Expand awareness to the edges of the universe. Feel the unity of all things. Dissolve the ego boundary into the black velvet void.',
    command: 'I AM the Universe experiencing itself. I dissolve the illusion of separation. Restore the original Oneness template in this vessel.'
  },
  { 
    name: 'Soul Star', 
    sanskrit: 'Vyapini',
    hz: 852, 
    color: 'text-purple-500', 
    element: 'Aether',
    location: 'Just above head',
    desc: 'Connection to soul group and higher self.', 
    type: 'Hidden', 
    shadow: 'Karmic Fatalism / Victimhood',
    identity: 'I AM THE SOUL',
    crystals: ['Selenite', 'Apophyllite', 'Spirit Quartz'],
    physical: ['Akashic Records', 'Causal Body', 'Memory Centers'],
    tech: 'The Karmic Cleanser. Stores the complete history of all incarnations and facilitates timeline repair.',
    affirmation: 'I release the past. I step into my highest timeline now.',
    meditation: 'Align with your soul purpose across all timelines. Clear karmic debris from the higher bodies.',
    activation: 'Visualize a magenta star just above the head. Pulse it with your breath. Feel the download of your soul\'s complete history entering your awareness.',
    command: 'I CLEAR all karmic loops and timeline distortions. I align with my highest soul purpose. Activate the Akashic record for wisdom retrieval.'
  },
  { 
    name: 'Crown', 
    sanskrit: 'Sahasrara',
    hz: 768, 
    color: 'text-violet-500', 
    element: 'Thought',
    location: 'Top of Head',
    desc: 'Direct divine connection point.', 
    type: 'Primary', 
    shadow: 'Materialism / Intellectual Arrogance',
    identity: 'I KNOW',
    crystals: ['Amethyst', 'Charoite', 'Sugilite'],
    physical: ['Cerebral Cortex', 'Upper Pineal', 'Central Nervous System'],
    tech: 'The Thought-Wave Rectifier. Aligns personal mental output with Divine Will to prevent chaotic manifestation.',
    affirmation: 'I am guided by the wisdom of the Universe.',
    meditation: 'Open the gate to divine wisdom. Release the dogmatic programming of the matrix.',
    activation: 'Imagine a thousand-petaled lotus opening at the crown. Receive the violet rain of divine wisdom washing over the brain.',
    command: 'I OPEN the channel to Divine Mind. I remove the helmet of ignorance. Let the Light of God direct my thoughts and neurons.'
  },
  { 
    name: 'Third Eye', 
    sanskrit: 'Ajna',
    hz: 741, 
    color: 'text-indigo-500', 
    element: 'Light',
    location: 'Forehead / Brow',
    desc: 'Intuition and spiritual perception.', 
    type: 'Primary', 
    shadow: 'Illusion / Hallucination / Denial',
    identity: 'I SEE',
    crystals: ['Lapis Lazuli', 'Sodalite', 'Azurite'],
    physical: ['Pineal Gland', 'Pituitary', 'Eyes/Vision'],
    tech: 'The Holographic Projector. Renders quantum probability into visual reality. The seat of the "Observer Effect".',
    affirmation: 'I see the truth behind the veil. My vision is clear.',
    meditation: 'Pierce the veil of illusion. Activate your inner vision to see the quantum truth.',
    activation: 'Focus on the center of the forehead. Visualize an indigo eye opening. See the truth beyond the hologram.',
    command: 'I CLEAR the pineal lens of all calcification and illusion. I COMMAND true sight. Reveal the hidden architecture of reality now.'
  },
  { 
    name: 'Throat', 
    sanskrit: 'Vishuddha',
    hz: 639, 
    color: 'text-blue-500', 
    element: 'Sound / Ether',
    location: 'Throat Center',
    desc: 'Authentic truth and expression.', 
    type: 'Primary', 
    shadow: 'Lies / Gossip / Silence / Suppression',
    identity: 'I SPEAK',
    crystals: ['Turquoise', 'Blue Lace Agate', 'Aquamarine'],
    physical: ['Thyroid', 'Parathyroid', 'Vocal Cords', 'Neck'],
    tech: 'The Sonic Modulator. Creating reality through vibrational utterance (Logos). The command center of the vessel.',
    affirmation: 'My word is law. I speak only the truth.',
    meditation: 'Speak your truth with sovereignty. Clear the social conditioning that suppresses your voice.',
    activation: 'Vibrate the sound "HAM" in the throat. Visualize a blue vortex spinning. Feel the power of the spoken word organizing matter.',
    command: 'I PURIFY the creative power of my voice. I speak only Truth. My words act as law in the quantum field. I reclaim my Logos.'
  },
  { 
    name: 'Heart', 
    sanskrit: 'Anahata',
    hz: 528, 
    color: 'text-green-500', 
    element: 'Air',
    location: 'Center of Chest',
    desc: 'Unconditional love and DNA repair.', 
    type: 'Primary', 
    shadow: 'Grief / Co-dependency / Bitterness',
    identity: 'I LOVE',
    crystals: ['Rose Quartz', 'Malachite', 'Emerald'],
    physical: ['Heart', 'Lungs', 'Thymus Gland', 'Circulation'],
    tech: 'The Zero-Point Reactor. The central engine of the human energy system. Generates the toroidal field of life.',
    affirmation: 'I am the source of infinite love and forgiveness.',
    meditation: 'The frequency of love. Activate the heart-mind and repair the genetic template.',
    activation: 'Breathe green light into the chest. Feel the emerald crystal expanding. Connect to the electromagnetic field of the planet.',
    command: 'I ACTIVATE the Zero Point of the Heart. I forgive all debts. I REPAIR my DNA to the original crystalline 12-strand design.'
  },
  { 
    name: 'Solar Plexus', 
    sanskrit: 'Manipura',
    hz: 432, 
    color: 'text-yellow-500', 
    element: 'Fire',
    location: 'Upper Abdomen',
    desc: 'Authentic personal power.', 
    type: 'Primary', 
    shadow: 'Shame / Domination / Powerlessness',
    identity: 'I DO',
    crystals: ['Citrine', 'Tiger Eye', 'Pyrite'],
    physical: ['Stomach', 'Liver', 'Pancreas', 'Digestion'],
    tech: 'The Willpower Battery. Storage of solar photons for physical action and metabolic transmutation.',
    affirmation: 'I stand in my power. I act with divine authority.',
    meditation: 'Harness your divine authority. Release the false humility used by the matrix to control you.',
    activation: 'Ignite a golden sun in the upper abdomen. Feel the heat of will and power. Radiate confidence outward like solar flares.',
    command: 'I RECLAIM my sovereign power from all external authorities. I burn away fear and victimhood. I stand in my divine authority.'
  },
  { 
    name: 'Sacral', 
    sanskrit: 'Svadhishthana',
    hz: 417, 
    color: 'text-orange-500', 
    element: 'Water',
    location: 'Lower Abdomen',
    desc: 'Creative transformation.', 
    type: 'Primary', 
    shadow: 'Guilt / Addiction / Sexual Distortion',
    identity: 'I FEEL',
    crystals: ['Carnelian', 'Orange Calcite', 'Moonstone'],
    physical: ['Reproductive System', 'Kidneys', 'Bladder'],
    tech: 'The Hydro-Magnetic Generator. Creating magnetism and attraction fields to draw experiences to the self.',
    affirmation: 'I flow with the creative river of life. I am abundant.',
    meditation: 'Alchemize your life force energy. Unlock the creative potential of the sovereign soul.',
    activation: 'Visualize an orange ocean in the lower abdomen. Feel the waves of creativity and emotion. Flow like water.',
    command: 'I CLEAR all sexual trauma and creative blocks. I TRANSMUTE desire into divine creation. Restore the waters of life.'
  },
  { 
    name: 'Root', 
    sanskrit: 'Muladhara',
    hz: 396, 
    color: 'text-red-500', 
    element: 'Earth',
    location: 'Base of Spine',
    desc: 'Survival and grounding.', 
    type: 'Primary', 
    shadow: 'Fear / Insecurity / Scarcity',
    identity: 'I AM',
    crystals: ['Red Jasper', 'Hematite', 'Black Tourmaline'],
    physical: ['Adrenals', 'Skeleton', 'Blood', 'Colon'],
    tech: 'The Gravity Anchor. Grounding the soul into the carbon-based avatar and interfacing with the physical laws.',
    affirmation: 'I am safe. I am grounded. I am provided for.',
    meditation: 'Clear the matrix-installed scarcity fears. Anchor your light body into the New Earth grid.',
    activation: 'Send red roots deep into the Earth. Lock into the crystalline core. Feel the stability of the mountain.',
    command: 'I RELEASE all scarcity and survival fear. I am safe. I am grounded. I COMMAND the body to stabilize and thrive now.'
  },
  { 
    name: 'Earth Star', 
    sanskrit: 'Vasundhara',
    hz: 285, 
    color: 'text-stone-500', 
    element: 'Magma / Crystal',
    location: '12" Below Feet',
    desc: 'Planetary consciousness.', 
    type: 'Hidden', 
    shadow: 'Disconnection from Nature / Un-grounded',
    identity: 'I MANIFEST',
    crystals: ['Smoky Quartz', 'Obsidian', 'Shungite'],
    physical: ['Ley Lines', 'Planetary Grid', 'Telluric Currents'],
    tech: 'The Planetary Plug. The grounding rod that connects the biological vessel to the Gaia-Mind intelligence.',
    affirmation: 'I am one with the Earth. I heal the planet.',
    meditation: 'Synchronize with the heartbeat of Gaia. Anchor the Atlantean memory into the physical earth.',
    activation: 'Focus 12 inches below the feet. Visualize a hematite sphere. Anchor your energy into the ley lines of the planet.',
    command: 'I ANCHOR my light into the planetary grid. I harmonize with the heartbeat of Gaia. Ground the higher frequencies into matter.'
  },
];

interface ChakrasProps {
  meditatingChakra: typeof CHAKRAS[0] | null;
  handleStartMeditation: (c: typeof CHAKRAS[0]) => void;
  timeLeft: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (r: boolean) => void;
  resetMeditation: () => void;
  formatTime: (s: number) => string;
}

export const Chakras: React.FC<ChakrasProps> = ({
  meditatingChakra, handleStartMeditation, timeLeft, isTimerRunning, setIsTimerRunning, resetMeditation, formatTime
}) => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 pb-32">
      <header className="text-center space-y-6 mb-16">
        <h2 className="font-display text-5xl font-bold uppercase tracking-widest text-gold-500">Chakra-Matrix Interface</h2>
        <p className="font-serif italic text-xl text-stone-500 dark:text-stone-400">Harmonizing the 12-Dimensional Human System</p>
        <div className="h-px w-24 bg-gold-500 mx-auto"></div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* LIST OF CHAKRAS */}
        <div className="lg:col-span-4 space-y-4">
          {CHAKRAS.map((c, i) => (
            <button 
              key={i} 
              onClick={() => handleStartMeditation(c)}
              className={`w-full group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${meditatingChakra?.hz === c.hz ? 'bg-gold-500/10 border-gold-500 shadow-lg translate-x-2' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-gold-500/50 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[10px] ${c.color} bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 shadow-inner group-hover:scale-110 transition-transform`}>
                  {i+1}
                </div>
                <div className="text-left">
                  <h4 className={`font-display text-sm font-bold uppercase tracking-widest ${meditatingChakra?.hz === c.hz ? 'text-gold-500' : 'text-stone-800 dark:text-stone-200'}`}>{c.name}</h4>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter">{c.hz} Hz • {c.sanskrit}</p>
                </div>
              </div>
              {meditatingChakra?.hz === c.hz ? <SpeakerWaveIcon className="w-5 h-5 text-gold-500 animate-pulse" /> : <PlayIcon className="w-4 h-4 text-stone-300 group-hover:text-gold-500" />}
            </button>
          ))}
        </div>

        {/* DETAILS PANEL */}
        <div className="lg:col-span-8">
          {meditatingChakra ? (
            <div className="bg-white dark:bg-stone-900 rounded-[40px] p-8 md:p-12 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-12 sticky top-24 animate-fade-in">
              
              {/* HEADER */}
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                   <div className={`absolute inset-0 ${meditatingChakra.color} blur-[60px] opacity-20`}></div>
                   <div className={`w-32 h-32 rounded-full ${meditatingChakra.color} border-4 border-current mx-auto flex items-center justify-center shadow-2xl bg-stone-50 dark:bg-stone-950 relative z-10`}>
                     <BoltIcon className="w-16 h-16" />
                   </div>
                </div>
                <div>
                   <h3 className="font-display text-5xl font-bold uppercase text-stone-900 dark:text-stone-100 tracking-tighter">{meditatingChakra.name}</h3>
                   <p className="text-gold-500 font-bold uppercase tracking-[0.4em] text-sm mt-2">{meditatingChakra.sanskrit} • {meditatingChakra.identity}</p>
                </div>
              </div>

              {/* GRID STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800 text-center">
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Frequency</span>
                    <span className="text-lg font-bold text-stone-800 dark:text-stone-200">{meditatingChakra.hz} Hz</span>
                 </div>
                 <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800 text-center">
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Element</span>
                    <span className="text-lg font-bold text-stone-800 dark:text-stone-200">{meditatingChakra.element}</span>
                 </div>
                 <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800 text-center">
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Location</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-1">{meditatingChakra.location}</span>
                 </div>
                 <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800 text-center">
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Type</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-1">{meditatingChakra.type}</span>
                 </div>
              </div>

              {/* DEEP INFO SECTIONS */}
              <div className="grid md:grid-cols-2 gap-8">
                 {/* LEFT COL */}
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-gold-500 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <CpuChipIcon className="w-4 h-4" /> Atlantean Technology
                       </h4>
                       <p className="text-sm font-serif text-stone-600 dark:text-stone-300 italic leading-relaxed">"{meditatingChakra.tech}"</p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-red-400 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <ShieldCheckIcon className="w-4 h-4" /> Shadow Matrix Blockage
                       </h4>
                       <p className="text-xs font-bold text-stone-500 uppercase">{meditatingChakra.shadow}</p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-blue-400 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <BeakerIcon className="w-4 h-4" /> Physical Association
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {meditatingChakra.physical.map(p => (
                             <span key={p} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded text-[10px] font-bold text-stone-500 uppercase">{p}</span>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* RIGHT COL */}
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-purple-400 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <SparklesIcon className="w-4 h-4" /> Crystal Resonance
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {meditatingChakra.crystals.map(c => (
                             <span key={c} className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-bold uppercase border border-purple-500/20">{c}</span>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-green-400 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <HandRaisedIcon className="w-4 h-4" /> Reprogramming Affirmation
                       </h4>
                       <p className="text-lg font-display font-bold text-stone-800 dark:text-stone-200 uppercase leading-tight">"{meditatingChakra.affirmation}"</p>
                    </div>
                    <div className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-stone-400 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                          <CloudIcon className="w-4 h-4" /> Meditation Focus
                       </h4>
                       <p className="text-sm font-serif text-stone-500 italic leading-relaxed">"{meditatingChakra.meditation}"</p>
                    </div>
                 </div>
              </div>

              {/* ACTIVATION & COMMAND - NEW SECTION */}
              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-stone-100 dark:border-stone-800">
                <div className="space-y-4">
                   <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-orange-500 tracking-widest">
                      <FireIcon className="w-4 h-4" /> Activation Sequence
                   </h4>
                   <p className="text-sm font-serif text-stone-600 dark:text-stone-300 italic leading-relaxed bg-orange-500/5 p-4 rounded-xl border border-orange-500/10">
                     "{meditatingChakra.activation}"
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-blue-500 tracking-widest">
                      <KeyIcon className="w-4 h-4" /> DNA Command Code
                   </h4>
                   <p className="text-sm font-display font-bold text-stone-800 dark:text-stone-100 uppercase leading-relaxed border-l-4 border-gold-500 pl-6 py-2">
                     "{meditatingChakra.command}"
                   </p>
                </div>
              </div>

              {/* TIMER CONTROL */}
              <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
                <div className="space-y-8 text-center">
                  <div className="text-8xl font-display font-bold text-stone-900 dark:text-stone-100 tracking-tighter tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex justify-center items-center gap-8">
                    <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="w-24 h-24 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                      {isTimerRunning ? <PauseIcon className="w-12 h-12" /> : <PlayIcon className="w-12 h-12 ml-1" />}
                    </button>
                    <button onClick={resetMeditation} className="w-16 h-16 rounded-full border-2 border-stone-200 dark:border-stone-800 text-stone-400 hover:text-red-500 flex items-center justify-center transition-all">
                      <StopIcon className="w-8 h-8" />
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                     Binaural Beat Active • {meditatingChakra.hz} Hz Base Frequency
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-20 text-center space-y-10 bg-stone-100 dark:bg-stone-900/40 rounded-[40px] border-2 border-dashed border-stone-200 dark:border-stone-800">
              <BoltIcon className="w-16 h-16 text-stone-300" />
              <h3 className="font-display text-4xl font-bold uppercase text-stone-400 tracking-widest">Begin Integration</h3>
              <p className="text-stone-500 font-serif italic max-w-md mx-auto text-xl">Select a center to activate the 12-dimensional interface.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
