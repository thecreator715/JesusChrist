
import React, { useState, useEffect, useRef } from 'react';
import { generatePrayer } from './services/geminiService';
import { Prayer, GeneratedPrayerResponse } from './types';
import { Logo } from './components/Logo';
import { Home } from './components/Home';
import { PrayerBuilder } from './components/PrayerBuilder';
import { Chakras, CHAKRAS } from './components/Chakras';
import { AboutJesus } from './components/AboutJesus';
import { AboutAtlantis } from './components/AboutAtlantis';
import { TheCollective } from './components/TheCollective';
import { BibleStudy } from './components/BibleStudy';
import { BookReader } from './components/BookReader';
import { AtlantisAI } from './components/AtlantisAI';
import { Donate } from './components/Donate';
import { Exorcist } from './components/Exorcist';
import { Meditate } from './components/Meditate';
import { RitualAbuseAct } from './components/RitualAbuseAct';
import { EarthAngel } from './components/EarthAngel';
import { HighPriest } from './components/HighPriest';
import { BookClub, BadgePill } from './components/BookClub';
import { useClub, PREVIEW_PAGES } from './components/useClub';
import { PrayerPaywall } from './components/PrayerPaywall';

import { 
  BookOpenIcon, SparklesIcon, XMarkIcon, SunIcon, MoonIcon, HomeIcon, 
  UserIcon, GlobeAltIcon, DocumentTextIcon, Bars3Icon, BoltIcon, 
  AcademicCapIcon, ChatBubbleBottomCenterIcon, HeartIcon, ShieldCheckIcon,
  StarIcon, MusicalNoteIcon, UserGroupIcon, ScaleIcon
} from '@heroicons/react/24/outline';

type Tab = 'home' | 'builder' | 'meditate' | 'atlantis-ai' | 'the-collective' | 'earth-angel' | 'high-priest' | 'about-jesus' | 'about-atlantis' | 'chakras' | 'bible-study' | 'donate' | 'exorcist' | 'bradley-act' | 'book-club';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const club = useClub();
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeStart, setActiveStart] = useState<number | null>(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<Prayer | null>(null);
  const [savedPrayers, setSavedPrayers] = useState<Prayer[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prayerLength, setPrayerLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [showLiveTranscriber, setShowLiveTranscriber] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showArchive, setShowArchive] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paying, setPaying] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  
  const [activeHz, setActiveHz] = useState<number | null>(null);
  const [meditatingChakra, setMeditatingChakra] = useState<typeof CHAKRAS[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sanctus_oratio_saved');
    if (saved) setSavedPrayers(JSON.parse(saved));
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme !== 'light');
    return () => {
      stopTone();
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sanctus_oratio_saved', JSON.stringify(savedPrayers));
  }, [savedPrayers]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            setIsTimerRunning(false);
            stopTone();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [isTimerRunning]);

  const stopTone = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setActiveHz(null);
  };

  const playTone = (hz: number) => {
    if (activeHz === hz) {
      stopTone();
      return;
    }
    stopTone();
    
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(hz, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
    setActiveHz(hz);
  };

  const handleStartMeditation = (chakra: typeof CHAKRAS[0]) => {
    setMeditatingChakra(chakra);
    setTimeLeft(300);
    setIsTimerRunning(true);
    playTone(chakra.hz);
  };

  const isFreePrayer = club.isOwner || club.canEdit;
  const runGenerate = async () => {
    setLoading(true);
    setCurrentPrayer(null);
    setShowArchive(false);
    try {
      const resp: GeneratedPrayerResponse = await generatePrayer(topic, prayerLength);
      const newP: Prayer = { id: crypto.randomUUID(), ...resp, topic, createdAt: Date.now(), journalEntries: [] };
      setCurrentPrayer(newP);
      setSavedPrayers(prev => [newP, ...prev]);
      if (!isFreePrayer) club.consumePrayerCredit();
    } catch (err: any) {
      console.error(err);
      setGenError('The prayer could not be composed just now. Your $1 credit is kept. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;
    setGenError(null);
    if (!isFreePrayer && club.prayerCredits < 1) { setShowPaywall(true); return; }
    await runGenerate();
  };

  const handlePrayerPaid = async (invoice: string) => {
    setPaying(true);
    await club.claimPrayerPayment(invoice);
    setPaying(false);
    setShowPaywall(false);
    await runGenerate();
  };

  const savePrayer = (p: Prayer) => {
    if (savedPrayers.some(existing => existing.id === p.id)) return;
    setSavedPrayers(prev => [p, ...prev]);
  };

  const deletePrayer = (id: string) => {
    setSavedPrayers(prev => prev.filter(p => p.id !== id));
    if (currentPrayer?.id === id) setCurrentPrayer(null);
  };

  const updatePrayer = (p: Prayer) => {
    setSavedPrayers(prev => prev.map(existing => existing.id === p.id ? p : existing));
    if (currentPrayer?.id === p.id) setCurrentPrayer(p);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleOpenBook = (bookId?: string, page?: number) => {
    setActiveStart(typeof page === 'number' ? page : null);
    setActiveBookId(bookId || 'christ-of-atlantis');
  };

  const navItems = [
    { id: 'home', name: 'Home', icon: HomeIcon },
    { id: 'builder', name: 'Prayer Book', icon: BookOpenIcon },
    { id: 'meditate', name: 'Meditate', icon: MusicalNoteIcon },
    { id: 'atlantis-ai', name: 'Atlantis AI', icon: ChatBubbleBottomCenterIcon },
    { id: 'book-club', name: 'Book Club', icon: BookOpenIcon },
    { id: 'exorcist', name: 'The Exorcist', icon: ShieldCheckIcon },
    { id: 'the-collective', name: 'The Collective', icon: UserGroupIcon },
    { id: 'earth-angel', name: 'Earth Angel', icon: HeartIcon },
    { id: 'high-priest', name: 'High Priest', icon: SparklesIcon },
    { id: 'chakras', name: 'Chakras', icon: BoltIcon },
    { id: 'about-jesus', name: 'About Jesus', icon: UserIcon },
    { id: 'about-atlantis', name: 'About Atlantis', icon: GlobeAltIcon },
    { id: 'bible-study', name: 'Bible Study', icon: AcademicCapIcon },
    { id: 'donate', name: 'Sacred Giving', icon: HeartIcon },
    { id: 'bradley-act', name: 'The Bradley Act', icon: ScaleIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStartPrayer={(t) => { setTopic(t); setActiveTab('builder'); }} />;
      case 'builder':
        return (
          <PrayerBuilder 
            topic={topic} setTopic={setTopic} loading={loading} 
            currentPrayer={currentPrayer} setCurrentPrayer={setCurrentPrayer} 
            savedPrayers={savedPrayers} showArchive={showArchive} 
            setShowArchive={setShowArchive} handleGenerate={handleGenerate} 
            savePrayer={savePrayer} deletePrayer={deletePrayer} updatePrayer={updatePrayer} 
            prayerLength={prayerLength} setPrayerLength={setPrayerLength} 
            setShowLiveTranscriber={setShowLiveTranscriber}
            prayerCredits={club.prayerCredits} isFree={isFreePrayer} genError={genError}
          />
        );
      case 'meditate':
        return <Meditate />;
      case 'atlantis-ai':
        return <AtlantisAI />;
      case 'book-club':
        return <BookClub club={club} onReadBook={handleOpenBook} />;
      case 'the-collective':
        return <TheCollective onViewBook={() => handleOpenBook('christ-of-atlantis')} onNavigateToAngel={() => setActiveTab('earth-angel')} />;
      case 'earth-angel':
        return <EarthAngel />;
      case 'high-priest':
        return <HighPriest />;
      case 'exorcist':
        return <Exorcist />;
      case 'chakras':
        return (
          <Chakras 
            meditatingChakra={meditatingChakra} handleStartMeditation={handleStartMeditation} 
            timeLeft={timeLeft} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} 
            resetMeditation={() => { setIsTimerRunning(false); setTimeLeft(300); stopTone(); }} 
            formatTime={formatTime} 
          />
        );
      case 'about-jesus':
        return <AboutJesus onStartPrayer={() => setActiveTab('builder')} onNavigateToScriptures={() => setActiveTab('book-club')} onViewBook={() => handleOpenBook('christ-of-atlantis')} />;
      case 'about-atlantis':
        return <AboutAtlantis onViewBook={() => handleOpenBook('christ-of-atlantis')} />;
      case 'bible-study':
        return <BibleStudy />;
      case 'donate':
        return <Donate />;
      case 'bradley-act':
        return <RitualAbuseAct />;
    }
  };

  return (
    <div className="min-h-screen flex bg-stone-50 dark:bg-stone-950 transition-colors duration-500 overflow-x-hidden">
      {activeBookId && (
        <BookReader
          key={activeBookId + (club.canRead(activeBookId) ? '-full' : '-preview')}
          bookId={activeBookId}
          onClose={() => setActiveBookId(null)}
          previewPages={club.canRead(activeBookId) ? undefined : PREVIEW_PAGES}
          startPage={club.canRead(activeBookId) ? (activeStart ?? club.reader.progress[activeBookId] ?? 0) : 0}
          onProgress={club.canRead(activeBookId) ? club.recordPage : undefined}
          bookmarks={club.canRead(activeBookId) ? (club.reader.bookmarks[activeBookId] || []) : undefined}
          onToggleBookmark={club.canRead(activeBookId) ? (pg: number) => club.toggleBookmark(activeBookId, pg) : undefined}
          readPages={club.canRead(activeBookId) ? (club.reader.read[activeBookId] || []) : undefined}
          onJoin={() => { const paid = club.accessOf(activeBookId) === 'paid'; setActiveBookId(null); if (paid) { setActiveTab('book-club'); return; } setActiveTab('book-club'); setTimeout(() => document.getElementById('join-club')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
        />
      )}
      
      {showPaywall && <PrayerPaywall topic={topic} uid={club.uid} busy={paying} onClose={() => setShowPaywall(false)} onPaid={handlePrayerPaid} />}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 transition-transform md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl`}>
        <div className="p-8 md:p-10 border-b border-stone-100 dark:border-stone-800 flex flex-col items-center gap-4 text-center">
          <Logo />
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl md:text-2xl text-stone-900 dark:text-stone-100 tracking-tighter uppercase leading-tight">Jesus Christ</h2>
            <h2 className="font-display font-bold text-[9px] md:text-[10px] text-gold-500 tracking-[0.4em] uppercase opacity-80">Of Atlantis</h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute top-6 right-6 p-2"><XMarkIcon className="w-6 h-6 text-stone-300" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 md:p-6 space-y-1 md:space-y-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id as Tab); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 md:gap-5 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-sans font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] transition-all group ${activeTab === item.id ? 'bg-gold-500 text-white shadow-xl shadow-gold-500/20 translate-x-2' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === item.id ? 'text-white' : 'text-stone-300 dark:text-stone-600'}`} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-8 md:p-10 border-t border-stone-100 dark:border-stone-800 space-y-4">
          {club.uid && club.badgesOf(club.uid).length > 0 && (
            <button onClick={() => { setActiveTab('book-club'); setIsSidebarOpen(false); }} className="w-full flex flex-col items-center gap-2 p-3 rounded-2xl border border-gold-500/30 bg-gold-500/5">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-200 truncate max-w-full">{club.usernameOf(club.uid) || 'Choose a username'}</span>
              <span className="flex flex-wrap justify-center gap-1">{club.badgesOf(club.uid).map(k => <BadgePill key={k} kind={k} small />)}</span>
            </button>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center justify-center gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border border-stone-100 dark:border-stone-800 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-gold-500 transition-all">
            {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            {darkMode ? "Vibrational Light" : "Vibrational Dark"}
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen relative overflow-y-auto bg-stone-50 dark:bg-stone-950 flex flex-col md:pl-80">
        <header className="sticky top-0 z-40 flex items-center justify-between p-4 md:hidden bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-stone-600 dark:text-stone-300"><Bars3Icon className="w-7 h-7" /></button>
          <div className="text-center">
            <h1 className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 dark:text-stone-100">Jesus Christ</h1>
            <p className="font-display text-[7px] font-bold uppercase tracking-[0.5em] text-gold-500">Of Atlantis</p>
          </div>
          <button onClick={() => setActiveTab('builder')} className="p-2 text-gold-500"><SparklesIcon className="w-6 h-6" /></button>
        </header>
        
        <div className="relative flex-1">
          {renderContent()}
        </div>

        {activeTab !== 'builder' && activeTab !== 'atlantis-ai' && activeTab !== 'meditate' && (
          <button onClick={() => { setActiveTab('builder'); setShowArchive(false); }} className="fixed bottom-6 right-6 md:bottom-10 md:right-10 p-4 md:p-6 bg-gold-500 text-white rounded-full shadow-2xl hover:bg-gold-600 transition-all z-40 transform hover:scale-110 active:scale-95">
            <SparklesIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
