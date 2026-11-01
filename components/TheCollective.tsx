
import React, { useState } from 'react';
import { 
  UserGroupIcon, StarIcon, SparklesIcon, FireIcon, 
  BoltIcon, ShieldCheckIcon, GlobeAltIcon, MapIcon,
  BookOpenIcon, SunIcon, HeartIcon, IdentificationIcon,
  EyeIcon, KeyIcon, SignalIcon, BeakerIcon, 
  ChevronDownIcon, ChevronUpIcon, CursorArrowRaysIcon,
  ClockIcon, CloudIcon, FingerPrintIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

interface TheCollectiveProps {
  onViewBook: () => void;
  onNavigateToAngel?: () => void;
}

const MISSION_WAVES = [
  {
    wave: "The First Wave",
    era: "1940s - 1960s",
    archetype: "The Way-Showers",
    desc: "The pioneers who birthed into a dense, rigid reality to fracture the concrete of the old paradigm. They suffered greatly, often misunderstood as 'black sheep' or eccentrics. Their job was simply to survive and anchor the first cords of light.",
    characteristics: "Resilient, loners, fierce independence, deep inner knowing, often had difficult childhoods to burn karma rapidly."
  },
  {
    wave: "The Second Wave",
    era: "1970s - 1990s",
    archetype: "The System Busters",
    desc: "Souls incarnated to dismantle structures from within. They entered systems of education, law, and medicine to seed higher frequencies. They function as antennas, channeling energy without necessarily speaking of it openly.",
    characteristics: "highly empathic, invisible workers, energy healers, bridge-builders, focused on service rather than confrontation."
  },
  {
    wave: "The Third Wave",
    era: "2000s - Present",
    archetype: "The Frequency Holders",
    desc: "The 'Crystal' and 'Rainbow' children. Born with active DNA strands and little to no karma. They possess innate telepathy, telekinesis potential, and a refusal to conform to 3D density. They are here to build the New Earth.",
    characteristics: "High vibration, allergy to toxins/lies, immediate manifestors, fearless, tech-intuitive, non-dual awareness."
  }
];

const STELLAR_NATIONS = [
  { name: "Lyra", role: "The Founders", trait: "Liberty & Authority", desc: "The original humanoid template architects. Lyrans carry the frequency of the 'Roar of God'. They are masters of sound healing and authoritarian restructuring of broken systems." },
  { name: "Sirius A", role: "The Innovators", trait: "Science & Geometry", desc: "Guardians of the Akashic Records and Sacred Geometry. Sirians are master builders, creating the frameworks for new civilizations. They blend logic with high spirituality." },
  { name: "Sirius B", role: "The Mystics", trait: "Water & Emotion", desc: "Home to the dolphin/whale consciousness. Masters of sonic alchemy and emotional healing. They anchor the 'Fluid Love' frequency into the planetary grid." },
  { name: "Pleiades", role: "The Nurturers", trait: "Heart & Beauty", desc: "The center of heart-chakra activations. Pleiadians are artists, healers, and guides who teach humanity how to feel safe in the vibration of love." },
  { name: "Arcturus", role: "The Guardians", trait: "Technology & Protection", desc: "One of the most advanced civilizations. They manage the 'Arcturian Corridor', a stargate for souls entering/leaving Earth. Masters of light-technology and shielding." },
  { name: "Andromeda", role: "The Rebels", trait: "Freedom & Flux", desc: "Galactic freedom fighters. They operate on non-linear timelines and specialize in breaking stagnation. They bring the 'Chaos of Evolution' to rigid systems." },
  { name: "Orion", role: "The Integrators", trait: "Duality & Power", desc: "Souls who have mastered the extremes of light and dark. They are here to heal the 'victim/perpetrator' game and teach true empowerment through integration." },
  { name: "Vega", role: "The Visionaries", trait: "Sound & Light", desc: "Keepers of the Divine Blueprint. Vegans are intense, focused, and hold the frequency of the 'Primal Ray'. They utilize sound to cut through illusion." },
  { name: "Mintaka", role: "The Seekers", trait: "Purity & Water", desc: "Souls from a water-world destroyed long ago. They carry a deep longing for 'home' and possess the clearest, most innocent light. They are here to restore purity." },
  { name: "Alpha Centauri", role: "The Scientists", trait: "Knowledge & Logic", desc: "Protectors of scientific truth. They are here to upgrade Earth's understanding of physics and exposure the falsehoods of materialist science." },
  { name: "Hadarian", role: "The Lovers", trait: "Divine Love", desc: "Souls from the Beta Centauri system. They are pure, unconditional love incarnate, often suffering in relationships until they learn boundaries." },
  { name: "Maldek", role: "The Warriors", trait: "Redemption", desc: "Survivors of a destroyed planet in our solar system (now the asteroid belt). Here to master nuclear/technological responsibility and prevent recurrence." }
];

const DNA_UPGRADE_SYMPTOMS = [
  { sym: "Cranial Pressure", desc: "Intense pressure in the head as the pineal and pituitary glands expand to accommodate higher light voltage." },
  { sym: "Timeline Slippage", desc: "Loss of short-term memory or feeling 'out of time' as consciousness shifts from linear 3D to spherical 5D perception." },
  { sym: "Dietary Changes", desc: "Sudden inability to tolerate heavy meats, alcohol, or processed foods. Craving high-vibration, light-rich sustenance." },
  { sym: "Sleep Pattern Shifts", desc: "Waking consistently between 3AM-4AM (the 'Creator Hour') or requiring massive amounts of sleep for integration." },
  { sym: "Emotional Purge", desc: "Unexplained waves of grief or anxiety as ancestral trauma stored in the DNA is vibrated out of the cellular structure." },
  { sym: "Visual Upgrades", desc: "Seeing flashes of light, geometric patterns, or 'static' in the air as the third eye begins to decode the quantum field." },
  { sym: "Tinnitus / Tones", desc: "Hearing high-pitched frequencies. These are downloads of data packets from the Higher Self/Galactic centers." },
  { sym: "Body Heat / Cold", desc: "Sudden hot flashes (Kundalini rising) or deep bone-cold (density leaving) as the energetic thermostat recalibrates." },
  { sym: "Relationship Endings", desc: "Rapid dissolution of friendships or partnerships that no longer match the rising frequency of the individual." },
  { sym: "Heart Palpitations", desc: "Erratic heart rhythms (not medical) as the heart chakra opens to the 'High Heart' (Thymus) universal love frequency." },
  { sym: "Lucid Dreaming", desc: "Dreams becoming hyper-real, teaching scenarios, or contact with guides. Night school for the soul." },
  { sym: "Electrical Interference", desc: "Streetlights going out, batteries draining, or electronics malfunctioning in your presence due to high auric voltage." }
];

const THE_144000_FRACTAL = [
  { tribe: "Issachar", role: "Keepers of Time", focus: "Understanding the cycles and seasons of the cosmos. Mastering astrology and timeline jumping." },
  { tribe: "Zebulun", role: "Keepers of Navigation", focus: "Interdimensional travel and trade. Managing the flow of abundance and resources." },
  { tribe: "Benjamin", role: "Keepers of the Wolf", focus: "Ravenous for truth. The fierce protectors of the mysteries. Warriors of the inner plane." },
  { tribe: "Joseph", role: "Keepers of the Dream", focus: "Prophecy and vision. Holding the blueprint of the New Earth in the astral realms." },
  { tribe: "Gad", role: "Keepers of the Troop", focus: "Community defense and organization. Marshalling the forces of light for collective action." },
  { tribe: "Asher", role: "Keepers of Pleasure", focus: "Joy, food, and royal dainties. Anchoring the frequency of bliss into the physical body." },
  { tribe: "Naphtali", role: "Keepers of the Hind", focus: "Agility and words of beauty. Communicating the Logos through art, poetry, and song." },
  { tribe: "Dan", role: "Keepers of Judgment", focus: "Discernment and justice. The judges of the timeline, ensuring karmic balance." },
  { tribe: "Simeon", role: "Keepers of Listening", focus: "Hearing the voice of God. Telepathy and clairaudience mastery." },
  { tribe: "Levi", role: "Keepers of the Temple", focus: "Priesthood and ritual. Maintaining the sacred connection to Source via ceremony." },
  { tribe: "Judah", role: "Keepers of Praise", focus: "The Lion's Roar. Using sound and gratitude to manifest reality. The leaders of the charge." },
  { tribe: "Reuben", role: "Keepers of Strength", focus: "The firstborn power. Physical vitality and the grounding of the root chakra." }
];

export const TheCollective: React.FC<TheCollectiveProps> = ({ onViewBook, onNavigateToAngel }) => {
  const [expandedPoints, setExpandedPoints] = useState<number[]>([]);

  const togglePoint = (index: number) => {
    setExpandedPoints(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-32 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10">
        <div className="flex justify-center"><Logo /></div>
        <h2 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-widest text-gold-500 leading-none">THE <br/>COLLECTIVE</h2>
        <p className="font-serif italic text-3xl text-stone-500 dark:text-stone-400 max-w-4xl mx-auto">"The 144,000, The Starseeds, and the Grand Ground Crew of the New Earth"</p>
        <div className="h-px w-48 bg-gold-500 mx-auto opacity-30"></div>
        <div className="pt-8 flex justify-center gap-6">
          <button 
            onClick={onViewBook}
            className="group relative inline-flex items-center gap-6 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:border-gold-500 border border-stone-200 dark:border-stone-800"
          >
            <BookOpenIcon className="w-8 h-8 text-gold-500" /> 
            Open Collective Archive
          </button>
        </div>
      </header>

      {/* MISSION WAVES SECTION */}
      <section className="space-y-12">
         <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The Three Waves of Volunteers</h3>
            <p className="text-stone-500 font-serif italic text-lg">"The strategic deployment of souls to facilitate the planetary shift."</p>
         </div>
         <div className="grid lg:grid-cols-3 gap-8">
            {MISSION_WAVES.map((wave, i) => (
               <div key={i} className="bg-stone-50 dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:shadow-2xl transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><GlobeAltIcon className="w-32 h-32" /></div>
                  <div className="relative z-10 space-y-4">
                     <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">{wave.era}</span>
                     <h4 className="font-display text-2xl font-bold uppercase text-stone-800 dark:text-stone-100">{wave.wave}</h4>
                     <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{wave.archetype}</p>
                     <div className="h-px w-full bg-stone-200 dark:bg-stone-800"></div>
                     <p className="text-sm font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed">"{wave.desc}"</p>
                     <div className="bg-stone-100 dark:bg-black/30 p-4 rounded-2xl">
                        <p className="text-[10px] text-stone-500 leading-relaxed"><span className="font-bold text-gold-600">Traits:</span> {wave.characteristics}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* STELLAR NATIONS EXPANDED */}
      <section className="space-y-12">
         <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The 12 Stellar Nations</h3>
            <p className="text-stone-500 font-serif italic text-lg">"Your soul lineage extends beyond this planet. Which frequency feels like home?"</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {STELLAR_NATIONS.map((nation, i) => (
               <div key={i} className="p-8 bg-stone-900 rounded-3xl border border-stone-800 hover:border-gold-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="font-display font-bold text-xl text-white uppercase">{nation.name}</h4>
                     <StarIcon className="w-5 h-5 text-stone-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <p className="text-[9px] font-bold text-gold-500 uppercase tracking-widest mb-3">{nation.role}</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4 border-b border-stone-800 pb-2">Focus: {nation.trait}</p>
                  <p className="text-xs font-serif text-stone-400 italic leading-relaxed">"{nation.desc}"</p>
               </div>
            ))}
         </div>
      </section>

      {/* 144,000 FRACTAL SECTION */}
      <section className="bg-stone-950 p-12 md:p-20 rounded-[80px] border border-gold-500/20 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
         <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none"><UserGroupIcon className="w-96 h-96" /></div>
         
         <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase text-white">The 144,000 Fractal Architecture</h3>
            <p className="text-gold-500 font-serif italic text-xl mt-4">"The Ground Crew is organized into 12 primary frequencies (Tribes) to cover the full spectrum of planetary restoration."</p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {THE_144000_FRACTAL.map((tribe, i) => (
               <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 font-bold text-xs flex-shrink-0 border border-gold-500/20">{i+1}</div>
                  <div>
                     <h4 className="font-bold uppercase text-sm text-white mb-1">{tribe.tribe}</h4>
                     <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">{tribe.role}</p>
                     <p className="text-[11px] font-serif text-stone-300 italic leading-relaxed">"{tribe.focus}"</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* DNA SYMPTOMS EXPANDED */}
      <section className="grid lg:grid-cols-2 gap-16 items-start">
         <div className="space-y-10">
            <div className="space-y-4">
               <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
                  <FingerPrintIcon className="w-10 h-10 text-gold-500" /> Bio-Regenesis Symptoms
               </h3>
               <p className="font-serif text-lg text-stone-600 dark:text-stone-400 italic leading-relaxed">
                  "The transition from carbon-based biology to the silicate-crystalline matrix is a physically intense process. These 'ascension flu' symptoms are signs of successful integration."
               </p>
            </div>
            <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800">
               <h4 className="font-bold uppercase text-xs text-red-500 tracking-widest mb-4 flex items-center gap-2"><BoltIcon className="w-4 h-4" /> Management Protocol</h4>
               <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-300">
                  <li className="flex gap-3">• <span><strong>Hydration:</strong> The new crystalline cells require 3x more water to conduct higher voltage.</span></li>
                  <li className="flex gap-3">• <span><strong>Rest:</strong> The body repairs primarily in Delta sleep states. Allow for 9-10 hours if needed.</span></li>
                  <li className="flex gap-3">• <span><strong>Grounding:</strong> Bare skin on soil discharges excess static charge from the nervous system.</span></li>
                  <li className="flex gap-3">• <span><strong>Sunlight:</strong> 15 mins of dawn sunlight activates the pineal coding for the day.</span></li>
               </ul>
            </div>
         </div>

         <div className="grid sm:grid-cols-2 gap-4">
            {DNA_UPGRADE_SYMPTOMS.map((sym, i) => (
               <div key={i} className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all group">
                  <h5 className="font-bold uppercase text-xs text-stone-800 dark:text-stone-100 mb-2 group-hover:text-gold-500">{sym.sym}</h5>
                  <p className="text-[10px] font-serif text-stone-500 dark:text-stone-400 italic leading-relaxed">"{sym.desc}"</p>
               </div>
            ))}
         </div>
      </section>

      {/* EARTH ANGEL PROMOTION */}
      {onNavigateToAngel && (
        <section className="bg-stone-900 dark:bg-black p-12 md:p-16 rounded-[60px] border border-gold-500/30 text-center space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none transform rotate-45"><HeartIcon className="w-96 h-96" /></div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto border border-gold-500/20">
               <HeartIcon className="w-10 h-10 text-gold-500 animate-pulse" />
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter">Are You A Seraphim Soul?</h3>
            <p className="text-xl font-serif text-stone-300 italic max-w-2xl mx-auto leading-relaxed">
              "Deep empathy, sensitivity to toxins, and a feeling of not belonging are signs of the Earth Angel mandate. Explore the specific mission profiles."
            </p>
            <div className="pt-6">
              <button 
                onClick={onNavigateToAngel}
                className="inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-600 text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs transition-all shadow-xl hover:-translate-y-1 active:scale-95"
              >
                Identify Your Angelic Lineage <SparklesIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FINAL INTEGRATION CTA */}
      <footer className="text-center space-y-12">
         <div className="inline-flex p-4 rounded-full bg-gold-500/5 dark:bg-gold-500/10 border border-gold-500/20 mb-8 animate-pulse">
            <UserGroupIcon className="w-12 h-12 text-gold-500" />
         </div>
         <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">The Reunion Is Now</h3>
         <p className="font-serif italic text-2xl text-stone-500 max-w-3xl mx-auto">"You found this archive because your frequency key matched the lock. The memories are returning. You are the Chosen because you chose to be here."</p>
         
         <div className="pt-8 flex justify-center gap-6">
            <button 
              onClick={onViewBook}
              className="inline-flex items-center justify-center gap-6 bg-gold-500 hover:bg-gold-600 text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-xl hover:shadow-gold-500/50 transform hover:scale-105 active:scale-95"
            >
              <BookOpenIcon className="w-8 h-8" /> 
              Enter The Archives
            </button>
         </div>
      </footer>
    </div>
  );
};
