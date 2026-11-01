
import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';

interface HomeProps {
  onStartPrayer: (topic: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartPrayer }) => {
  return (
    <div className="space-y-12 md:space-y-16 animate-fade-in max-w-5xl mx-auto pb-20 px-4 md:px-0">
      <header className="text-center py-10 md:py-16 space-y-4 md:space-y-6">
        <div className="flex justify-center mb-2 md:mb-4">
          <Logo />
        </div>
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-stone-900 dark:text-stone-100 tracking-tighter uppercase leading-none">
          JESUS CHRIST<br/><span className="text-gold-500">OF ATLANTIS</span>
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto px-4">
          "The Future Testament of the New World Heaven on Earth"
        </p>
        <div className="h-px w-24 md:w-32 bg-gold-500 mx-auto opacity-50"></div>
      </header>

      <section className="grid md:grid-cols-3 gap-8 md:px-6">
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-white dark:bg-stone-900/50 p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-2xl relative overflow-hidden group">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gold-600 uppercase tracking-widest flex items-center gap-3">
              <ClockIcon className="w-6 h-6 md:w-8 md:h-8" /> The Awakening Call
            </h2>
            <div className="space-y-4 md:space-y-6 text-stone-600 dark:text-stone-400">
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed dark:text-stone-200 border-l-4 border-gold-500/30 pl-6 md:pl-8">
                "In this pivotal moment of human history, as the old paradigms crumble and new possibilities emerge, a profound truth reveals itself..."
              </p>
              <p className="font-serif leading-relaxed text-base md:text-lg">
                The return of the Christ Consciousness, not as a single individual but as a collective awakening, marks the beginning of humanity's greatest transformation. We are shifting from the Age of Separation to the Age of Unity.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 md:pt-6">
                <button 
                  onClick={() => onStartPrayer('Collective Awakening and Matrix Dissolution')} 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-8 md:px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all shadow-xl shadow-gold-500/20 active:scale-95"
                >
                  Generate Prayer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-gold-500/5 dark:bg-gold-500/10 p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-gold-500/20 shadow-xl">
            <h3 className="font-display font-bold text-base md:text-lg mb-6 md:mb-8 text-gold-600 uppercase tracking-widest text-center">Prophetic Timeline</h3>
            <div className="space-y-6 md:space-y-8">
              {[
                { year: '2012-2027', label: 'Great Awakening', desc: 'Wave of rapid consciousness expansion.' },
                { year: '2027-2035', label: 'The Transition', desc: 'Dismantling old systems, building unity.' },
                { year: '2035-2050', label: 'The New Earth', desc: 'Establishing heaven on earth principles.' }
              ].map((step, i) => (
                <div key={i} className="relative pl-6 md:pl-8 pb-6 md:pb-8 border-l-2 border-gold-500/20 last:border-0 last:pb-0">
                  <div className="absolute left-[-11px] top-0 w-[20px] h-[20px] bg-gold-500 rounded-full border-4 border-stone-50 dark:border-stone-950"></div>
                  <p className="text-[9px] font-bold text-gold-600 uppercase mb-1 md:mb-2 tracking-[0.3em]">{step.year}</p>
                  <h4 className="text-xs md:text-sm font-display font-bold uppercase text-stone-800 dark:text-stone-200 mb-1 md:mb-2">{step.label}</h4>
                  <p className="text-[11px] md:text-xs text-stone-500 dark:text-stone-400 font-serif italic">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
