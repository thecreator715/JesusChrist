
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  PlayIcon, PauseIcon, StopIcon, SpeakerWaveIcon, 
  BoltIcon, SparklesIcon, FireIcon, ClockIcon,
  ChevronRightIcon, ChevronLeftIcon, ArrowPathIcon,
  ForwardIcon, BackwardIcon, MagnifyingGlassIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { MEDITATION_SEQUENCES } from '../data/meditationData';
import { MeditationSequence, MeditationStage } from '../types';

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

export const Meditate: React.FC = () => {
  const [activeSession, setActiveSession] = useState<MeditationSequence | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentStage, setCurrentStage] = useState<MeditationStage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const categories = useMemo(() => {
    return [
      { id: 'matrix', label: 'Matrix Clearing', icon: FireIcon },
      { id: 'dna', label: 'DNA Activation', icon: SparklesIcon },
      { id: 'atlantis', label: 'Atlantean Wisdom', icon: BoltIcon },
      { id: 'galactic', label: 'Galactic Connection', icon: TagIcon },
      { id: 'healing', label: 'Sacred Healing', icon: HeartIcon }
    ];
  }, []);

  const filteredSequences = useMemo(() => {
    return MEDITATION_SEQUENCES.filter(seq => {
      const matchesSearch = seq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            seq.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || seq.id.includes(selectedCategory) || seq.name.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAudio = () => {
    if (leftOscRef.current) { try { leftOscRef.current.stop(); leftOscRef.current.disconnect(); } catch(e) {} leftOscRef.current = null; }
    if (rightOscRef.current) { try { rightOscRef.current.stop(); rightOscRef.current.disconnect(); } catch(e) {} rightOscRef.current = null; }
    if (leftGainRef.current) { leftGainRef.current.disconnect(); leftGainRef.current = null; }
    if (rightGainRef.current) { rightGainRef.current.disconnect(); rightGainRef.current = null; }
    setIsPlaying(false);
  };

  const updateTones = (stage: MeditationStage) => {
    if (!audioCtxRef.current || !isPlaying) return;

    const baseFreq = stage.frequency;
    const offset = stage.offset;

    if (!leftOscRef.current) {
      const leftOsc = audioCtxRef.current.createOscillator();
      const rightOsc = audioCtxRef.current.createOscillator();
      const leftGain = audioCtxRef.current.createGain();
      const rightGain = audioCtxRef.current.createGain();
      const pannerL = audioCtxRef.current.createStereoPanner();
      const pannerR = audioCtxRef.current.createStereoPanner();

      leftOsc.type = 'sine';
      rightOsc.type = 'sine';
      pannerL.pan.value = -1;
      pannerR.pan.value = 1;

      leftGain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      rightGain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      leftGain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 2);
      rightGain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 2);

      leftOsc.connect(pannerL).connect(leftGain).connect(audioCtxRef.current.destination);
      rightOsc.connect(pannerR).connect(rightGain).connect(audioCtxRef.current.destination);

      leftOsc.start();
      rightOsc.start();

      leftOscRef.current = leftOsc;
      rightOscRef.current = rightOsc;
      leftGainRef.current = leftGain;
      rightGainRef.current = rightGain;
    }

    const now = audioCtxRef.current.currentTime;
    leftOscRef.current!.frequency.exponentialRampToValueAtTime(baseFreq - offset / 2, now + 1);
    rightOscRef.current!.frequency.exponentialRampToValueAtTime(baseFreq + offset / 2, now + 1);
  };

  const handleStart = (seq: MeditationSequence) => {
    initAudio();
    setActiveSession(seq);
    setTimeLeft(seq.totalTime);
    setIsPlaying(true);
    setCurrentStage(seq.stages[0]);
  };

  const seekTo = (seconds: number) => {
    if (!activeSession) return;
    const boundedSeconds = Math.max(0, Math.min(seconds, activeSession.totalTime));
    const newTimeLeft = activeSession.totalTime - boundedSeconds;
    setTimeLeft(newTimeLeft);
    const stage = [...activeSession.stages].reverse().find(s => boundedSeconds >= s.startTime);
    if (stage) setCurrentStage(stage);
  };

  const handleStageJump = (stage: MeditationStage) => {
    seekTo(stage.startTime);
  };

  useEffect(() => {
    if (isPlaying && activeSession) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            stopAudio();
            return 0;
          }
          const elapsed = activeSession.totalTime - (prev - 1);
          const stage = [...activeSession.stages].reverse().find(s => elapsed >= s.startTime);
          if (stage && stage.startTime !== currentStage?.startTime) {
            setCurrentStage(stage);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [isPlaying, activeSession, currentStage]);

  useEffect(() => {
    if (isPlaying && currentStage) {
      updateTones(currentStage);
    }
  }, [isPlaying, currentStage]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!activeSession) return 0;
    return ((activeSession.totalTime - timeLeft) / activeSession.totalTime) * 100;
  };

  if (activeSession) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6 pb-40 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-stone-50 dark:bg-stone-900 rounded-[40px] md:rounded-[60px] p-6 md:p-16 border border-stone-200 dark:border-stone-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-2xl space-y-8 md:space-y-10 relative overflow-hidden transition-all duration-700">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-20'}`}></div>

          <button onClick={() => { stopAudio(); setActiveSession(null); }} className="absolute top-6 right-6 md:top-8 md:right-8 text-stone-400 hover:text-red-500 transition-colors z-20">
            <StopIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="text-center space-y-3 md:space-y-4 relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto border border-gold-500/20 shadow-inner">
               <SparklesIcon className={`w-8 h-8 md:w-10 md:h-10 text-gold-500 ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-stone-900 dark:text-stone-100 tracking-tighter">{activeSession.name}</h2>
            <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Divine Frequency Integration</p>
          </div>

          <div className="p-6 md:p-8 bg-stone-100 dark:bg-black/40 rounded-[30px] md:rounded-[40px] border border-stone-200 dark:border-stone-800/50 text-center space-y-3 md:space-y-4 relative z-10 transition-all duration-500">
             <h4 className="text-[8px] md:text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em]">Current Healing Stage</h4>
             <h3 className="font-display text-xl md:text-2xl font-bold text-gold-500 uppercase tracking-widest">{currentStage?.label}</h3>
             <p className="font-serif text-base md:text-lg italic text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm mx-auto">
               "{currentStage?.description}"
             </p>
          </div>

          <div className="text-center space-y-6 md:space-y-10 relative z-10">
             <div className="text-6xl sm:text-7xl md:text-9xl font-display font-bold text-stone-900 dark:text-stone-100 tracking-tighter tabular-nums select-none">
                {formatTime(timeLeft)}
             </div>

             <div className="space-y-6">
                <div className="relative group px-2 md:px-4">
                  <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gold-500 transition-all duration-300" style={{ width: `${getProgress()}%` }}></div>
                  </div>
                  {activeSession.stages.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStageJump(s)}
                      className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-stone-50 dark:border-stone-900 transition-all z-10 ${currentStage?.startTime === s.startTime ? 'bg-gold-500 scale-125' : 'bg-stone-400 dark:bg-stone-700 hover:bg-gold-500'}`}
                      style={{ left: `${(s.startTime / activeSession.totalTime) * 100}%` }}
                      title={s.label}
                    />
                  ))}
                  <input 
                    type="range"
                    min="0"
                    max={activeSession.totalTime}
                    value={activeSession.totalTime - timeLeft}
                    onChange={(e) => seekTo(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                </div>

                <div className="flex justify-center items-center gap-6 md:gap-10">
                  <button onClick={() => seekTo(activeSession.totalTime - timeLeft - 30)} className="text-stone-400 hover:text-gold-500 transition-colors">
                    <BackwardIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-[0_20px_50px_rgba(203,175,21,0.4)] hover:scale-110 active:scale-95 transition-all group">
                    {isPlaying ? <PauseIcon className="w-10 h-10 md:w-12 md:h-12" /> : <PlayIcon className="w-10 h-10 md:w-12 md:h-12 ml-2" />}
                  </button>
                  <button onClick={() => seekTo(activeSession.totalTime - timeLeft + 30)} className="text-stone-400 hover:text-gold-500 transition-colors">
                    <ForwardIcon className="w-7 h-7 md:w-8 md:h-8" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <SpeakerWaveIcon className={`w-5 h-5 md:w-6 md:h-6 ${isPlaying ? 'text-gold-500 animate-bounce' : 'text-stone-300'}`} />
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-stone-500">{currentStage?.frequency} Hz Active Resonance</span>
                </div>
             </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-stone-100 dark:border-stone-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                <span className="text-[8px] md:text-[9px] font-bold text-stone-400 uppercase tracking-widest">Binaural Synthesis Engine Active</span>
             </div>
             <p className="text-[8px] md:text-[9px] font-serif italic text-stone-500">Anchor into the New Earth Frequency</p>
          </div>
        </div>

        <div className="mt-8 md:mt-12 w-full max-w-3xl flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in [animation-delay:0.3s]">
           {activeSession.stages.map((s, i) => (
             <button 
               key={i} 
               onClick={() => handleStageJump(s)}
               className={`px-6 py-4 md:px-8 md:py-5 rounded-[20px] md:rounded-[24px] border transition-all text-left flex-1 min-w-[140px] md:min-w-[180px] flex flex-col items-start gap-1 shadow-sm ${currentStage?.startTime === s.startTime ? 'bg-gold-500 text-black border-gold-500 shadow-[0_10px_30px_rgba(203,175,21,0.3)]' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400 hover:border-gold-500/50'}`}
             >
                <div className={`text-[8px] md:text-[10px] font-bold uppercase opacity-60 ${currentStage?.startTime === s.startTime ? 'text-black' : 'text-stone-500'}`}>{formatTime(s.startTime)}</div>
                <div className={`text-[10px] md:text-[12px] font-bold uppercase tracking-wider ${currentStage?.startTime === s.startTime ? 'text-black' : 'text-stone-100'}`}>{s.label}</div>
             </button>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-8 md:py-16 px-4 md:px-6 pb-40">
      <header className="text-center space-y-4 md:space-y-8 mb-12 md:mb-20">
        <h2 className="font-display text-4xl sm:text-6xl md:text-9xl font-bold uppercase tracking-widest text-gold-500 leading-none">MEDITATE</h2>
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">"High-Frequency Sequences for Divine Alchemical Transformation"</p>
        <div className="h-px w-24 md:w-48 bg-gold-500 mx-auto opacity-30"></div>
      </header>

      <div className="max-w-5xl mx-auto mb-10 md:mb-16 space-y-6 md:space-y-8">
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-amber-500/20 rounded-full blur opacity-50 group-focus-within:opacity-100 transition duration-500"></div>
           <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-stone-400" />
           <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by intention..."
              className="relative w-full p-4 md:p-6 pl-14 md:pl-16 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-base md:text-lg font-serif outline-none focus:ring-4 focus:ring-gold-500/10 shadow-xl"
           />
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
           <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
           >
              All Sequences
           </button>
           {categories.map(cat => (
             <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
             >
                <cat.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {cat.label}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredSequences.length > 0 ? filteredSequences.map((seq, i) => (
          <div key={seq.id} className="group bg-white dark:bg-stone-900 p-6 md:p-10 rounded-[40px] md:rounded-[50px] border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-stone-50 dark:bg-stone-950 rounded-2xl flex items-center justify-center border border-stone-100 dark:border-stone-800 group-hover:border-gold-500/30 transition-all">
                   <BoltIcon className="w-6 h-6 md:w-7 md:h-7 text-stone-300 group-hover:text-gold-500" />
                </div>
                <div className="text-right">
                  <span className="text-[8px] md:text-[9px] font-bold text-stone-400 uppercase tracking-widest">Protocol {String(i+1).padStart(2, '0')}</span>
                  <p className="text-[9px] md:text-[10px] font-bold text-gold-500 uppercase mt-1">30:00 Duration</p>
                </div>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-stone-900 dark:text-stone-100 group-hover:text-gold-500 transition-colors leading-tight tracking-tight">{seq.name}</h3>
              <p className="font-serif text-sm md:text-base text-stone-500 dark:text-stone-400 leading-relaxed italic line-clamp-3">
                "{seq.shortDesc}"
              </p>
            </div>
            
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-stone-50 dark:border-stone-800 space-y-4 md:space-y-6">
               <div className="flex flex-wrap gap-1.5 md:gap-2">
                 {seq.stages.map((s, idx) => (
                   <span key={idx} className="text-[7px] md:text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 md:px-2 md:py-1 bg-stone-50 dark:bg-stone-800 rounded border border-stone-100 dark:border-stone-700 text-stone-400">
                     {s.frequency}Hz
                   </span>
                 ))}
               </div>
               <button 
                onClick={() => handleStart(seq)}
                className="w-full py-4 md:py-5 bg-gold-500 hover:bg-gold-600 text-white rounded-full font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-gold-500/20 active:scale-95 group-hover:translate-x-1"
               >
                 Begin Immersion <ChevronRightIcon className="w-4 h-4" />
               </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-24 text-center">
             <p className="font-serif italic text-xl md:text-2xl text-stone-500">"No frequency found matching your search. Try another intention..."</p>
          </div>
        )}
      </div>

      <footer className="mt-20 md:mt-32 text-center bg-stone-900 rounded-[60px] md:rounded-[100px] py-16 md:py-20 border border-gold-500/10">
         <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 px-6 md:px-10">
           <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">The Alchemical Return</h3>
           <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-stone-400">"As you vibrate at the frequencies of the New Earth, you become a living bridge for others to follow."</p>
           <div className="flex justify-center gap-8 md:gap-12">
              <div className="text-center">
                 <p className="text-gold-500 font-display text-3xl md:text-4xl font-bold">25</p>
                 <p className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold">Active Sessions</p>
              </div>
              <div className="text-center">
                 <p className="text-gold-500 font-display text-3xl md:text-4xl font-bold">174-1550</p>
                 <p className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold">Solfeggio Range</p>
              </div>
           </div>
         </div>
      </footer>
    </div>
  );
};
