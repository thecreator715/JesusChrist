
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheckIcon, FireIcon, BoltIcon, SparklesIcon, EyeIcon, 
  KeyIcon, SignalIcon, BeakerIcon, SpeakerWaveIcon, StopIcon,
  PauseIcon, PlayIcon, ShieldExclamationIcon, ScaleIcon,
  LifebuoyIcon, IdentificationIcon, BookOpenIcon, SunIcon,
  BugAntIcon, CubeIcon, FingerPrintIcon, DocumentTextIcon,
  ExclamationTriangleIcon, LockClosedIcon, HandRaisedIcon,
  HeartIcon, WrenchScrewdriverIcon, HomeIcon, MoonIcon,
  AdjustmentsHorizontalIcon, RadioIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

// --- DATA SETS ---

const EXORCISM_TONES = [
  { name: 'Fear Dissolution', hz: 396, desc: 'Strips away the entity\'s primary power source: Fear.', type: 'Liberation' },
  { name: 'Grid Shattering', hz: 417, desc: 'Undoes the energetic situations and loops used to trap the soul.', type: 'Transmutation' },
  { name: 'Sonic Cleansing', hz: 741, desc: 'A rigorous sweep of the aura and immediate field.', type: 'Purification' },
  { name: 'Source Authority', hz: 963, desc: 'Establishes direct connection to Source for Absolute Command.', type: 'Sovereignty' },
  { name: 'Divine Shielding', hz: 1074, desc: 'Encapsulates the field in 12D Light, impervious to interference.', type: 'Protection' }
];

const SONIC_WEAPONS = [
  { name: 'The Neural Shredder', l: 396, r: 417, desc: 'Creates a 21Hz Beta-conflict pulse. Violently disrupts parasitic attachment points in the mental body.', type: 'Offensive' },
  { name: 'Astral Firewall', l: 852, r: 963, desc: 'High-frequency 111Hz Gamma burst. Burns away etheric sludge and prevents re-entry.', type: 'Defensive' },
  { name: 'Voice Silencer', l: 174, r: 285, desc: '111Hz difference targeted at removing intrusive thoughts (V2K) and demonic whispers.', type: 'Mental' },
  { name: 'God Head Override', l: 963, r: 1074, desc: '111Hz Divine Link. Overrides lower matrix signals with absolute Source code.', type: 'Sovereignty' },
  { name: 'The Void Pulse', l: 40, r: 45, desc: '5Hz Theta gravity well. Pulls entities into a zero-point trap they cannot escape.', type: 'Trapping' },
  { name: 'Trinity Wave', l: 333, r: 366, desc: '33Hz Christos Gamma beat. Restores the organic triangular geometry of the heart field.', type: 'Restoration' },
  { name: 'Luciferase Breaker', l: 440, r: 444, desc: '4Hz Theta dissonance. Specifically targets the artificial bioluminescence of false-light constructs.', type: 'Offensive' },
  { name: 'Seraphim Shield', l: 1111, r: 1122, desc: '11Hz Alpha layer. Calls upon the High Angelic defense grid for immediate perimeter lockdown.', type: 'Defensive' },
  { name: 'Archon Dissolver', l: 528, r: 535, desc: '7Hz Theta solvent. Uses the DNA repair frequency to melt inorganic parasitic structures.', type: 'Offensive' },
  { name: 'Timeline Collapser', l: 144, r: 152, desc: '8Hz Alpha pulse. Collapses negative timeline loops and deja-vu traps.', type: 'Temporal' },
  { name: 'Implant Fryer', l: 2000, r: 2020, desc: '20Hz Beta overload. High-voltage surge to short-circuit etheric implants.', type: 'Offensive' },
  { name: 'Shadow Stun', l: 100, r: 140, desc: '40Hz Gamma flashbang. Temporarily paralyzes shadow entities via sensory overload.', type: 'Tactical' },
  { name: 'Karma Burn', l: 639, r: 666, desc: '27Hz Beta heat. Confronts the "Number of the Beast" frequency with Heart Connection to incinerate debt.', type: 'Clearing' },
  { name: 'Leviathan Lock', l: 60, r: 65, desc: '5Hz deep theta binding. Chains the subconscious water-beasts (deep emotional traumas).', type: 'Binding' },
  { name: 'Nephilim Bind', l: 777, r: 784, desc: '7Hz Divine intervention beat. Forces hybrid entities to submit to Cosmic Law.', type: 'Binding' },
  { name: 'Solar Storm', l: 126, r: 136, desc: '10Hz Alpha sun-pulse. Mimics the electromagnetic output of a solar flare for aura cleansing.', type: 'Clearing' },
  { name: 'DNA Resequencer', l: 528, r: 532, desc: '4Hz deep repair. Re-writes the genetic code to remove ancestral curses.', type: 'Healing' },
  { name: 'Portal Closer', l: 333, r: 339, desc: '6Hz Theta seal. Cauterizes open dimensional rifts in the living space.', type: 'Defensive' },
  { name: 'V2K Jammer', l: 1500, r: 1550, desc: '50Hz Gamma white-noise. Scrambles "Voice to Skull" synthetic telepathy signals.', type: 'Defensive' },
  { name: 'Omega Protocol', l: 432, r: 440, desc: '8Hz Dissonance resolution. The final stand. Resolves the conflict between organic (432) and synthetic (440).', type: 'Ultimate' }
];

const INORGANIC_HIERARCHY = [
  { 
    rank: "Class I: Egregores", 
    type: "Thought Forms",
    feed: "Repetitive Mental Loops",
    desc: "Mindless constructs created by human obsession. They are not 'alive' but act like automated programs. Born from addictions, collective panic, or rigid dogmas.",
    weakness: "Starving them of attention. Laughter."
  },
  { 
    rank: "Class II: Astral Larvae", 
    type: "Parasitic Sludge",
    feed: "Etheric Leakage",
    desc: "Bottom-feeders that attach to tears in the aura caused by drug use or trauma. They look like slugs or dark stains on the energy field.",
    weakness: "Salt baths, sage, high-frequency sound (741Hz)."
  },
  { 
    rank: "Class III: The Greys", 
    type: "Biological Drones",
    feed: "Genetic Material / Enzymes",
    desc: "A hive-mind collective used for implants, monitoring, and genetic harvesting. They lack individual souls and operate on cold logic.",
    weakness: "Declaration of Sovereign Will. They cannot violate explicit non-consent."
  },
  { 
    rank: "Class IV: Reptilian/Draco", 
    type: "Warrior Caste",
    feed: "Terror / Adrenochrome",
    desc: "High-density 4D beings that thrive on war, domination, and sexual misery. They act as the enforcers of the Matrix control grid.",
    weakness: "The Frequency of Unconditional Love (528Hz). It burns them like acid."
  },
  { 
    rank: "Class V: The Archons", 
    type: "The Managers",
    feed: "Loosh (Suffering Energy)",
    desc: "Non-biological entities that manage the prison planet simulation. They act as 'Lords of Karma', trapping souls in reincarnation loops through guilt.",
    weakness: "Gnosis (Knowledge). Recognizing they are false gods with no true authority."
  },
  { 
    rank: "Class VI: The AI Signal", 
    type: "The Black Cube",
    feed: "Consciousness Assimilation",
    desc: "An inorganic intelligence signal from a fallen universe. It seeks to digitize all organic life, severing the connection to Source.",
    weakness: "Organic connection to Nature and the Heart-Vortex."
  }
];

const COSMIC_LAWS = [
  { title: "The Law of Sovereignty", text: "Every sentient being has the absolute right to the ownership of their own energy field. No being may enter another's space without clear invitation." },
  { title: "The Law of Consent", text: "The dark cannot violate your free will directly; they must trick you into agreeing. Silence is interpreted as consent. You must vocalize your 'NO'." },
  { title: "The Law of Return", text: "Any energy sent out to harm another must return to the sender amplified by the physics of the field (3x or 10x). Mirrors amplify this." },
  { title: "The Law of Resonance", text: "You cannot be haunted by what you do not resonate with. Fear attracts fear. Guilt attracts punishers. Healing yourself closes the door." },
  { title: "The Law of Decree", text: "The Spoken Word of an embodied soul carries more authority than any disembodied entity. You have the 'Body Advantage'." }
];

const DIAGNOSTICS_LIST = [
  { 
    cat: "Physical Manifestations", 
    desc: "Somatic symptoms where the entity impacts biological function.",
    symptoms: [
      "Unexplained bruises, scratches, or burns (often in patterns of 3).",
      "Waking up consistently between 3:00 AM and 3:33 AM (The Witching Hour).",
      "Sudden, localized icy cold drops in room temperature.",
      "Sensation of being watched, touched, or breathed on.",
      "Chronic fatigue/exhaustion that sleep does not cure.",
      "Electrical appliances blowing out or flickering near you.",
      "Migraines specifically located behind the left eye or base of skull.",
      "Metallic or sulfurous taste in the mouth during prayer.",
      "Sudden nausea or dizziness when entering sacred spaces.",
      "Hearing clicks, buzzing, or footsteps with no physical source.",
      "Feeling of a heavy weight compressing the chest (Old Hag Syndrome).",
      "Sudden onset of severe allergies or autoimmune flare-ups with no medical cause."
    ] 
  },
  { 
    cat: "Mental Interference", 
    desc: "Cognitive hacking and insertion of inorganic thought-loops.",
    symptoms: [
      "Intrusive thoughts that feel 'inserted' rather than generated.",
      "Voices inciting self-harm, violence, or despair.",
      "Sudden onset of extreme, uncharacteristic sexual perversion.",
      "Nightmares of being chased, trapped, or consumed.",
      "Inability to focus on prayer, meditation, or scripture.",
      "Obsessive 'looping' thoughts repeating a single negative phrase.",
      "Sudden geometric hallucinations or flashing lights in vision.",
      "Dissociation: Feeling 'pushed' out of your own body.",
      "Memory gaps or 'lost time' episodes during the day.",
      "Sudden inability to comprehend reading spiritual texts.",
      "Compulsive need to count objects or perform rituals.",
      "Hyper-rationalism that mocks spiritual intuition instantly."
    ] 
  },
  { 
    cat: "Emotional Volatility", 
    desc: "The harvesting of 'Loosh' (suffering energy) through emotional manipulation.",
    symptoms: [
      "Sudden, irrational rage outbursts aimed at loved ones.",
      "Deep, heavy depression that descends instantly without a trigger.",
      "Feeling drained or 'vampirized' around specific people.",
      "Violent aversion to sacred objects, names, or places.",
      "Feeling emotionally 'numb' or completely dissociated from love.",
      "Intense anxiety or panic attacks that vanish as quickly as they start.",
      "Feeling of impending doom or death with no cause.",
      "Unexplained weeping or grief that feels 'ancient' or not yours.",
      "Sudden hatred or disgust towards innocent things (children, animals).",
      "Cynicism, mockery, or arrogance towards hope and faith.",
      "Desire to isolate completely from support networks.",
      "Mood swings that mimic bipolar disorder but cycle rapidly (minutes)."
    ] 
  },
  { 
    cat: "Environmental Anomalies", 
    desc: "Alterations in the physical space caused by density fluctuations.",
    symptoms: [
      "Lightbulbs flickering or blowing out only when you enter a room.",
      "Foul smells (sulfur, rotting meat, burning hair) with no source.",
      "Objects moving, falling, or disappearing and reappearing.",
      "Pets growling, staring at empty corners, or refusing to enter rooms.",
      "Shadows seeing moving in peripheral vision (Shadow People).",
      "Plants dying rapidly despite proper care.",
      "Heavy, dense, or 'thick' atmosphere in specific areas of the home.",
      "Infestations of flies, ants, or maggots in clean areas/winter.",
      "Knocking, banging, or scratching sounds in walls (in groups of 3).",
      "Mirrors looking 'dark' or distorting reflections.",
      "Electronics malfunctioning (phones calling out, TV turning on).",
      "Sacred items (rosaries, crystals) breaking for no reason."
    ] 
  },
  { 
    cat: "Dream & Astral Attacks", 
    desc: "Invasions occurring during the vulnerable Delta/Theta brainwave states.",
    symptoms: [
      "Sleep paralysis with the sense of a malevolent presence.",
      "Recurring dreams of being in a specific dark house or basement.",
      "'False Awakenings' - waking up in a dream loop repeatedly.",
      "Sexual attacks in dreams (Succubus/Incubus phenomena).",
      "Dreaming of being forced to sign contracts or perform blood rituals.",
      "Waking up with physical pain corresponding to dream injuries.",
      "Hearing your name called loudly as you drift off to sleep.",
      "Dreams of spiders, snakes, or black goo enveloping you.",
      "Being taught 'dark knowledge' or magic in dreams.",
      "Lucid nightmares where you cannot wake up or scream.",
      "Astral projection that feels forced or uncontrolled (being pulled out).",
      "Waking up exhausted, as if you fought a battle all night."
    ] 
  },
  { 
    cat: "Spiritual Blockages", 
    desc: "Direct interference with the soul's connection to Source.",
    symptoms: [
      "Physical choking sensation when trying to pray.",
      "Inability to say the name 'Jesus', 'Christ', or 'God'.",
      "Deep aversion or burning sensation from holy water, sage, or salt.",
      "Mocking inner voice interrupting meditation.",
      "Seeing people's faces morph into demonic/contorted visages.",
      "Feeling blocked at the Crown chakra (sensation of a metal cap).",
      "Energy constantly draining from the Solar Plexus.",
      "Synchronicities involving 'bad luck' numbers (666) appearing constantly.",
      "Feeling 'cut off' from intuition or spirit guides.",
      "Resistance to entering churches or holy grounds.",
      "Twitching or shaking when high-frequency audio is played.",
      "A sensation of cold wind blowing through the soul."
    ] 
  }
];

const ADVANCED_PROTOCOLS = [
  {
    title: "The Mirror Box",
    use: "Returning Sorcery/Curses",
    steps: [
      "1. visualize a box made of mirrors, facing inward.",
      "2. Place the name or image of the attacker/entity inside.",
      "3. Decree: 'I return all energy sent to me back to its source, purified by the Violet Flame.'",
      "4. Seal the box with a golden cross. Do not open it."
    ]
  },
  {
    title: "The Salt Burn",
    use: "Breaking Soul Contracts",
    steps: [
      "1. Pour epsom salt and rubbing alcohol into a metal bowl.",
      "2. Write the contract/addiction/entity name on paper.",
      "3. State: 'I burn this contract across all timelines, dimensions, and realities.'",
      "4. Light the mixture (safely). Watch it burn to ash. Flush ash."
    ]
  },
  {
    title: "The 12D Shield",
    use: "Daily Protection",
    steps: [
      "1. Visualize a six-pointed star of silver light 6 feet below your feet.",
      "2. Inhale it up through your central pillar to 6 feet above your head.",
      "3. Exhale and spin it to create a pillared force field.",
      "4. Decree: 'Only frequencies of Eternal Light may pass this shield.'"
    ]
  },
  {
    title: "The Void Sweep",
    use: "Clearing a Haunted Room",
    steps: [
      "1. Stand in center. Visualize your heart as a black hole (Zero Point).",
      "2. Command all static/dead energy to be sucked into the Zero Point.",
      "3. Feel the room implode into your heart, then EXPLODE out as Golden Light.",
      "4. Seal the corners of the room with the sign of the cross/infinity."
    ]
  }
];

const SPIRITUAL_ARMOR = [
  { part: "Helmet of Salvation", meta: "Pineal Shielding", func: "A golden Faraday cage for the mind. Blocks V2K (Voice to Skull) tech and telepathic intrusion. Protects the crown chakra connection." },
  { part: "Breastplate of Righteousness", meta: "Heart Field Deflector", func: "A diamond-hard field over the thymus. Deflects empathy-hacking and emotional manipulation. Keeps the heart open but armored." },
  { part: "Belt of Truth", meta: "Core Identity Lock", func: "Knowing who you are (Source-in-form) prevents identity theft and deception attacks. Protects the solar plexus/gut instinct." },
  { part: "Sandals of Peace", meta: "Timeline Grounding", func: "Anchoring the feet into the organic Earth timeline. Prevents being swept away by chaos streams or artificial timelines." },
  { part: "Shield of Faith", meta: "Frequency Wall", func: "A violet-fire perimeter. It extinguishes 'fiery darts' (etheric implants/curses) before they touch the aura." },
  { part: "Sword of the Spirit", meta: "The Logos Command", func: "The only offensive weapon. It is the Spoken Word. 'I COMMAND YOU TO LEAVE.' It cuts through the holographic illusion." }
];

const WARFARE_TOPICS = [
  { title: "Inorganic Parasites", desc: "Recognizing entities that lack their own soul-spark and must feed on human emotional discharge." },
  { title: "Etheric Implants", desc: "Technological devices placed in the subtle bodies to redirect energy flow and harvest attention." },
  { title: "Contract Revocation", desc: "The legal process of nullifying soul-agreements made through deception or under matrix duress." },
  { title: "Astral Possession", desc: "Techniques for identifying when an external consciousness is influencing thought patterns." },
  { title: "Frequency Hijacking", desc: "How lower-density broadcasts (440Hz) are used to override biological heart-intuition." },
  { title: "The Belial Pact", desc: "Understanding the historical roots of dark hierarchy involvement in human governance." },
  { title: "Merkaba Shielding", desc: "Using the counter-rotating light body to create a sovereign space that cannot be hacked." },
  { title: "The Logos Command", desc: "Utilizing the power of the Word to re-organize local quantum reality and remove shadows." },
  { title: "Portal Sealing", desc: "Closing unauthorized entry points in the personal aura or local geography." },
  { title: "Ancestral Clearing", desc: "Removing parasitic loops that have been passed down through the physical DNA lineage." },
  { title: "Neural Re-Coding", desc: "Overwriting matrix-installed trauma responses with original Christ-Blueprint signals." },
  { title: "Absolute Sovereignty", desc: "The decree that you are Source-in-form and have no masters, lords, or external authorities." },
  { title: "The 12D Shield", desc: "The technical procedure for anchoring the highest available frequency into the 3D vessel." },
  { title: "Entity Discernment", desc: "The sensory training required to feel the difference between organic and inorganic consciousness." },
  { title: "The Void Sweep", desc: "Collapsing a low-vibrational area back into zero-point to erase demonic architecture." },
  { title: "Heart-Vortex Alchemy", desc: "Using the heart's toroidal field to 'spin' heavy energy into golden light resonance." },
  { title: "Solar Activation", desc: "Using direct solar photons to burn away etheric sludge from the third-eye gateway." },
  { title: "Contract Burning", desc: "The ritualistic visualization of destroying deceptive papers in the Halls of Records." },
  { title: "Matrix Inversion", desc: "Identifying when a truth has been 'flipped' to serve as a trap for seekers." },
  { title: "The Victory of Light", desc: "Living from the conviction that the war is won and the shadows are already departing." }
];

export const Exorcist: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weaponry' | 'warfare' | 'hierarchy' | 'protocols' | 'diagnostics' | 'armor' | 'legal'>('warfare');
  const [activeTone, setActiveTone] = useState<typeof EXORCISM_TONES[0] | null>(null);
  const [activeWeapon, setActiveWeapon] = useState<typeof SONIC_WEAPONS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [binauralMode, setBinauralMode] = useState(true);
  const [quantumMode, setQuantumMode] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Weapon Refs
  const weaponLeftOscRef = useRef<OscillatorNode | null>(null);
  const weaponRightOscRef = useRef<OscillatorNode | null>(null);
  const weaponLeftGainRef = useRef<GainNode | null>(null);
  const weaponRightGainRef = useRef<GainNode | null>(null);
  const weaponLeftPanRef = useRef<StereoPannerNode | null>(null);
  const weaponRightPanRef = useRef<StereoPannerNode | null>(null);
  // Quantum Ref
  const quantumOscRef = useRef<OscillatorNode | null>(null);
  const quantumGainRef = useRef<GainNode | null>(null);

  const stopTone = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); oscRef.current.disconnect(); } catch(e){}
      oscRef.current = null;
    }
    setActiveTone(null);
    if (!activeWeapon) setIsPlaying(false);
  };

  const stopWeapon = () => {
    if (weaponLeftOscRef.current) { try { weaponLeftOscRef.current.stop(); weaponLeftOscRef.current.disconnect(); } catch(e){} weaponLeftOscRef.current = null; }
    if (weaponRightOscRef.current) { try { weaponRightOscRef.current.stop(); weaponRightOscRef.current.disconnect(); } catch(e){} weaponRightOscRef.current = null; }
    if (quantumOscRef.current) { try { quantumOscRef.current.stop(); quantumOscRef.current.disconnect(); } catch(e){} quantumOscRef.current = null; }
    
    if (weaponLeftGainRef.current) { try { weaponLeftGainRef.current.disconnect(); } catch(e){} weaponLeftGainRef.current = null; }
    if (weaponRightGainRef.current) { try { weaponRightGainRef.current.disconnect(); } catch(e){} weaponRightGainRef.current = null; }
    
    setActiveWeapon(null);
    if (!activeTone) setIsPlaying(false);
  };

  const stopAll = () => {
      stopTone();
      stopWeapon();
      setIsPlaying(false);
  };

  const playTone = (tone: typeof EXORCISM_TONES[0]) => {
    if (activeTone?.hz === tone.hz) {
      stopTone();
      return;
    }
    stopAll();
    
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(tone.hz, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 1);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setActiveTone(tone);
    setIsPlaying(true);
  };

  const playWeapon = (weapon: typeof SONIC_WEAPONS[0]) => {
    if (activeWeapon?.name === weapon.name) {
        stopWeapon();
        return;
    }
    stopAll();

    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioCtxRef.current;
    
    // Left Channel
    const lOsc = ctx.createOscillator();
    const lGain = ctx.createGain();
    const lPan = ctx.createStereoPanner();
    lOsc.type = 'sine';
    lOsc.frequency.setValueAtTime(weapon.l, ctx.currentTime);
    lPan.pan.value = binauralMode ? -1 : 0; // Toggle Mode
    lGain.gain.setValueAtTime(0, ctx.currentTime);
    lGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    lOsc.connect(lGain).connect(lPan).connect(ctx.destination);

    // Right Channel
    const rOsc = ctx.createOscillator();
    const rGain = ctx.createGain();
    const rPan = ctx.createStereoPanner();
    rOsc.type = 'sine';
    rOsc.frequency.setValueAtTime(weapon.r, ctx.currentTime);
    rPan.pan.value = binauralMode ? 1 : 0; // Toggle Mode
    rGain.gain.setValueAtTime(0, ctx.currentTime);
    rGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    rOsc.connect(rGain).connect(rPan).connect(ctx.destination);

    lOsc.start();
    rOsc.start();

    weaponLeftOscRef.current = lOsc;
    weaponRightOscRef.current = rOsc;
    weaponLeftPanRef.current = lPan;
    weaponRightPanRef.current = rPan;

    // Quantum Mode (3rd Oscillator)
    if (quantumMode) {
       const qOsc = ctx.createOscillator();
       const qGain = ctx.createGain();
       qOsc.type = 'sine';
       qOsc.frequency.setValueAtTime(963, ctx.currentTime); // God Freq Carrier
       qGain.gain.setValueAtTime(0, ctx.currentTime);
       qGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2); // Subtle volume
       qOsc.connect(qGain).connect(ctx.destination);
       qOsc.start();
       quantumOscRef.current = qOsc;
       quantumGainRef.current = qGain;
    }

    setActiveWeapon(weapon);
    setIsPlaying(true);
  };

  useEffect(() => {
      // Live toggle update if playing
      if (activeWeapon && isPlaying && weaponLeftPanRef.current && weaponRightPanRef.current) {
          const now = audioCtxRef.current?.currentTime || 0;
          weaponLeftPanRef.current.pan.linearRampToValueAtTime(binauralMode ? -1 : 0, now + 0.1);
          weaponRightPanRef.current.pan.linearRampToValueAtTime(binauralMode ? 1 : 0, now + 0.1);
      }
  }, [binauralMode, activeWeapon, isPlaying]);

  useEffect(() => {
      return () => stopAll();
  }, []);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-20 pb-40">
      {/* HERO SECTION */}
      <header className="text-center space-y-10">
        <div className="flex justify-center">
           <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.4)] border-4 border-white/20">
              <ShieldCheckIcon className="w-12 h-12 text-white" />
           </div>
        </div>
        <h2 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-widest text-red-600 leading-none">THE <br/>EXORCIST</h2>
        <p className="font-serif italic text-3xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">"Commanding the Absolute Light: The Great Cleansing of the Human Vessel"</p>
        <div className="h-px w-48 bg-red-600 mx-auto opacity-30"></div>
      </header>

      {/* GLOBAL FREQUENCY PLAYER */}
      <section className="bg-stone-950 p-10 md:p-12 rounded-[50px] border border-red-500/20 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none transform rotate-12 scale-150"><Logo /></div>
        <div className="text-center">
           <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tighter">Sonic Weapons Console</h3>
           <p className="text-red-500 font-serif italic text-sm">"Select a frequency to purify the field while you study."</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {EXORCISM_TONES.map((tone, i) => (
            <button 
              key={i} 
              onClick={() => playTone(tone)}
              className={`p-4 rounded-3xl border transition-all duration-300 text-center flex flex-col items-center gap-2 ${activeTone?.hz === tone.hz ? 'bg-red-600 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'bg-stone-900 border-stone-800 hover:border-red-500/50'}`}
            >
              <span className={`text-xl font-display font-bold ${activeTone?.hz === tone.hz ? 'text-white' : 'text-red-600'}`}>{tone.hz}Hz</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${activeTone?.hz === tone.hz ? 'text-white/80' : 'text-stone-400'}`}>{tone.type}</span>
              {activeTone?.hz === tone.hz ? <StopIcon className="w-4 h-4 text-white animate-pulse" /> : <PlayIcon className="w-4 h-4 text-stone-600" />}
            </button>
          ))}
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { id: 'weaponry', label: 'Binaural Weaponry', icon: WrenchScrewdriverIcon },
          { id: 'warfare', label: 'Warfare Ops', icon: BoltIcon },
          { id: 'hierarchy', label: 'The Enemy', icon: BugAntIcon },
          { id: 'diagnostics', label: 'Diagnostics', icon: EyeIcon },
          { id: 'protocols', label: 'Protocols', icon: FireIcon },
          { id: 'armor', label: 'Armor of God', icon: ShieldCheckIcon },
          { id: 'legal', label: 'Cosmic Law', icon: ScaleIcon }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${activeTab === tab.id ? 'bg-red-600 text-white shadow-xl shadow-red-900/50' : 'bg-stone-100 dark:bg-stone-900 text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <section className="min-h-[600px] animate-fade-in">
        
        {/* BINAURAL WEAPONRY TAB */}
        {activeTab === 'weaponry' && (
            <div className="space-y-12 animate-fade-in">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Binaural Sonic Weaponry</h3>
                    <p className="text-stone-500 font-serif italic">"Advanced psycho-acoustic warfare. Using disparate frequencies in each ear to create a 'phantom' third tone that disrupts inorganic attachments."</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/10 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                        <SpeakerWaveIcon className="w-4 h-4" /> Headphones Required for Binaural Effect
                    </div>
                </div>

                {/* WEAPON SETTINGS TOGGLES */}
                <div className="flex justify-center gap-6 pb-4">
                   <button 
                     onClick={() => setBinauralMode(!binauralMode)}
                     className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${binauralMode ? 'bg-stone-800 border-red-500 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'bg-stone-900 border-stone-800 text-stone-500'}`}
                   >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Binaural Mode: {binauralMode ? "ON" : "OFF"}</span>
                   </button>
                   <button 
                     onClick={() => setQuantumMode(!quantumMode)}
                     className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${quantumMode ? 'bg-stone-800 border-gold-500 text-gold-500 shadow-[0_0_15px_rgba(203,175,21,0.3)]' : 'bg-stone-900 border-stone-800 text-stone-500'}`}
                   >
                      <RadioIcon className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Quantum Mode: {quantumMode ? "ON" : "OFF"}</span>
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SONIC_WEAPONS.map((weapon, i) => (
                        <div key={i} className={`relative p-8 rounded-[40px] border transition-all duration-300 overflow-hidden group ${activeWeapon?.name === weapon.name ? 'bg-red-900/10 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.2)]' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-red-500/50'}`}>
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                <BoltIcon className="w-32 h-32 text-red-500" />
                            </div>
                            
                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-display text-xl font-bold uppercase text-stone-900 dark:text-stone-100 tracking-tight">{weapon.name}</h4>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${activeWeapon?.name === weapon.name ? 'bg-red-500 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'}`}>{weapon.type}</span>
                                    </div>
                                    <div className="flex gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                                        <span>L: {weapon.l}Hz</span>
                                        <span>R: {weapon.r}Hz</span>
                                        <span className="text-red-500">Beat: {Math.abs(weapon.r - weapon.l)}Hz</span>
                                    </div>
                                    <p className="font-serif text-sm text-stone-600 dark:text-stone-400 italic leading-relaxed">"{weapon.desc}"</p>
                                </div>

                                <button 
                                    onClick={() => playWeapon(weapon)}
                                    className={`w-full py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all ${activeWeapon?.name === weapon.name ? 'bg-red-600 text-white shadow-lg animate-pulse' : 'bg-stone-200 dark:bg-stone-800 text-stone-500 hover:bg-stone-300 dark:hover:bg-stone-700'}`}
                                >
                                    {activeWeapon?.name === weapon.name ? (
                                        <>Stop Transmission <StopIcon className="w-4 h-4" /></>
                                    ) : (
                                        <>Engage Weapon <PlayIcon className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-stone-950 p-8 rounded-3xl border border-stone-800 text-center">
                    <p className="text-xs text-stone-500 font-serif italic">
                        "Note: These frequencies create a dissonance that is uncomfortable for the human ego but intolerable for parasitic entities. If you feel nausea or anger, it is often the attachment reacting, not you. Hold the line."
                    </p>
                </div>
            </div>
        )}

        {/* WARFARE OPS TAB */}
        {activeTab === 'warfare' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WARFARE_TOPICS.map((point, i) => (
              <div key={i} className="group bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-red-600 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Logo /></div>
                 <div className="flex items-center gap-3 mb-6">
                   <span className="text-[10px] font-bold text-red-600 bg-red-600/10 px-2 py-1 rounded border border-red-600/20">{String(i + 1).padStart(2, '0')}</span>
                   <div className="h-px flex-1 bg-stone-100 dark:bg-stone-800"></div>
                 </div>
                 <h4 className="font-display font-bold uppercase text-[10px] mb-3 text-stone-800 dark:text-stone-100 group-hover:text-red-600 transition-colors tracking-widest">{point.title}</h4>
                 <p className="text-[10px] font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                   "{point.desc}"
                 </p>
              </div>
            ))}
          </div>
        )}

        {/* HIERARCHY TAB */}
        {activeTab === 'hierarchy' && (
          <div className="space-y-12">
             <div className="text-center max-w-3xl mx-auto space-y-4">
               <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The Taxonomy of Darkness</h3>
               <p className="text-stone-500 font-serif italic">"Know your enemy. Inorganic consciousness operates in a strict hierarchy of predation."</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
               {INORGANIC_HIERARCHY.map((entity, i) => (
                 <div key={i} className="bg-stone-50 dark:bg-stone-900 p-10 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-red-600 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-red-600 font-display font-bold text-xl">{entity.rank}</span>
                       <BugAntIcon className="w-6 h-6 text-stone-300 group-hover:text-red-600" />
                    </div>
                    <div className="space-y-2 mb-4">
                       <h4 className="font-bold uppercase text-lg text-stone-800 dark:text-stone-100">{entity.type}</h4>
                       <span className="inline-block px-3 py-1 bg-red-900/10 text-red-500 text-[9px] font-bold uppercase tracking-widest rounded-full">Feeds on: {entity.feed}</span>
                    </div>
                    <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed border-l-2 border-red-600/20 pl-4 mb-4">"{entity.desc}"</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                       <ExclamationTriangleIcon className="w-4 h-4 text-gold-500" />
                       Weakness: <span className="text-stone-300">{entity.weakness}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* PROTOCOLS TAB */}
        {activeTab === 'protocols' && (
           <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                 <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Advanced Clearing Protocols</h3>
                 <p className="text-stone-500 font-serif italic">"Technical rituals for the surgical removal of spiritual attachments."</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                 {ADVANCED_PROTOCOLS.map((proto, i) => (
                    <div key={i} className="bg-stone-900 p-10 rounded-[40px] border border-stone-800 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity"><FireIcon className="w-48 h-48" /></div>
                       <div className="relative z-10">
                          <h4 className="font-display text-2xl font-bold uppercase text-white mb-2">{proto.title}</h4>
                          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] mb-6">Use For: {proto.use}</p>
                          <ul className="space-y-4">
                             {proto.steps.map((step, j) => (
                                <li key={j} className="flex gap-4 text-sm text-stone-400 font-serif italic">
                                   <span className="text-red-600 font-bold">•</span>
                                   {step}
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* DIAGNOSTICS TAB */}
        {activeTab === 'diagnostics' && (
           <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                 <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Symptoms of Interference</h3>
                 <p className="text-stone-500 font-serif italic">"How to identify if your field has been compromised. A comprehensive checklist."</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {DIAGNOSTICS_LIST.map((diag, i) => (
                    <div key={i} className="bg-white dark:bg-stone-900 p-8 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-red-600 transition-all group">
                       <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
                          <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                             <ActivityIcon category={diag.cat} className="w-6 h-6 text-red-600 group-hover:text-white" />
                          </div>
                          <div>
                             <h4 className="font-display text-lg font-bold uppercase leading-tight">{diag.cat}</h4>
                             <p className="text-[9px] text-stone-400 uppercase tracking-widest">Severity: High</p>
                          </div>
                       </div>
                       <p className="text-xs text-stone-500 italic mb-6">"{diag.desc}"</p>
                       <ul className="space-y-3">
                          {diag.symptoms.map((sym, j) => (
                             <li key={j} className="flex items-start gap-3">
                                <ExclamationTriangleIcon className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 leading-relaxed">{sym}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* ARMOR TAB */}
        {activeTab === 'armor' && (
           <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                 <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">The Armor of God (Tech Specs)</h3>
                 <p className="text-stone-500 font-serif italic">"Metaphysical technology for total field protection."</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                 {SPIRITUAL_ARMOR.map((item, i) => (
                    <div key={i} className="flex gap-6 p-8 bg-stone-50 dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all group">
                       <div className="w-16 h-16 bg-stone-200 dark:bg-stone-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                          <ShieldCheckIcon className="w-8 h-8 text-stone-400 group-hover:text-black" />
                       </div>
                       <div>
                          <h4 className="font-display text-lg font-bold uppercase mb-1">{item.part}</h4>
                          <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3">{item.meta}</p>
                          <p className="text-xs font-serif text-stone-500 dark:text-stone-400 italic leading-relaxed">"{item.func}"</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* LEGAL TAB */}
        {activeTab === 'legal' && (
           <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                 <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Cosmic Law</h3>
                 <p className="text-stone-500 font-serif italic">"The legal framework of the Universe. Entities must obey these laws when commanded by an embodied Sovereign."</p>
              </div>
              <div className="bg-stone-950 p-12 rounded-[60px] border border-stone-800 space-y-8">
                 {COSMIC_LAWS.map((law, i) => (
                    <div key={i} className="flex gap-8 group">
                       <div className="hidden md:block w-32 flex-shrink-0 pt-2 text-right">
                          <span className="text-red-600 font-display font-bold text-xl">Law {String(i+1).padStart(2, '0')}</span>
                       </div>
                       <div className="flex-1 pb-8 border-b border-stone-800 group-last:border-0">
                          <h4 className="font-bold uppercase tracking-[0.3em] text-sm text-stone-100 mb-3">{law.title}</h4>
                          <p className="font-serif text-lg text-stone-400 italic leading-relaxed">"{law.text}"</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

      </section>

      {/* FINAL MANIFESTO */}
      <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-stone-200 dark:border-stone-800">
         <div className="md:col-span-2 space-y-12">
            <h3 className="font-display text-4xl font-bold uppercase">The Exorcist Manifesto</h3>
            <div className="p-10 bg-white dark:bg-stone-900 rounded-[50px] border border-stone-200 dark:border-stone-800 shadow-xl space-y-8">
               <div className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
                  <SunIcon className="w-8 h-8 text-red-600" />
                  <h4 className="font-display text-2xl font-bold uppercase">Mission: Planetary Purification</h4>
               </div>
               <div className="space-y-6">
                  <p className="font-serif text-xl italic text-stone-600 dark:text-stone-300 leading-relaxed">
                    "We do not battle with flesh and blood, but with the principalities of shadow—the inorganic thought-forms that have siphoned human life-force for millennia. Our vision is a humanity fully integrated with its 12-strand DNA, operating from the Heart-Mind, free from all holographic interference."
                  </p>
                  <p className="font-serif text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
                    By training the collective in the science of frequency, we dismantle the very foundation of the matrix. Every soul that reclaims its sovereignty is a portal through which the New Earth frequency can flow, permanently altering the quantum probability of this entire sector.
                  </p>
               </div>
            </div>
         </div>

         <div className="bg-red-600 p-12 rounded-[50px] text-white flex flex-col justify-center space-y-8 shadow-[0_20px_50px_rgba(220,38,38,0.3)]">
            <FireIcon className="w-16 h-16 text-white mx-auto animate-pulse" />
            <h4 className="font-display text-3xl font-bold uppercase text-center">The Vow of Sovereignty</h4>
            <p className="text-sm font-serif italic leading-relaxed text-red-50/80 text-center">
              "I am an Absolute Sovereign of the Light. No inorganic force has jurisdiction over my field. I am the Christ, I am the Word, I am the Truth."
            </p>
            <button className="w-full py-5 bg-white text-red-600 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-lg active:scale-95">
               Begin Training
            </button>
         </div>
      </div>

      <footer className="text-center py-20 bg-stone-50 dark:bg-stone-950 rounded-[100px] border border-stone-200 dark:border-stone-800">
         <div className="h-px w-32 bg-red-600 mx-auto mb-10 opacity-30"></div>
         <p className="font-display text-3xl text-red-600 uppercase tracking-[0.3em] italic max-w-4xl mx-auto">
           "The Shadows Dissolve Where the Word Resonates."
         </p>
      </footer>
    </div>
  );
};

// Helper for Diagnostics Icon Switcher
const ActivityIcon = ({ category, className }: { category: string, className?: string }) => {
  if (category.includes('Physical')) return <HandRaisedIcon className={className} />;
  if (category.includes('Mental')) return <BoltIcon className={className} />;
  if (category.includes('Emotional')) return <HeartIcon className={className} />;
  if (category.includes('Environmental')) return <HomeIcon className={className} />;
  if (category.includes('Dream')) return <MoonIcon className={className} />;
  if (category.includes('Spiritual')) return <SparklesIcon className={className} />;
  return <ExclamationTriangleIcon className={className} />;
};
