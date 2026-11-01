import React from 'react';
import { AcademicCapIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const BibleStudy: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-16 px-6 pb-32 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center">
      <header className="space-y-6 mb-16">
        <AcademicCapIcon className="w-20 h-20 text-gold-500 mx-auto mb-4" />
        <h2 className="font-display text-6xl font-bold uppercase tracking-widest text-gold-500">Bible Study App</h2>
        <p className="font-serif italic text-2xl text-stone-500 dark:text-stone-400">"Deep Diving the Sacred Texts of Antiquity"</p>
        <div className="h-px w-24 bg-gold-500 mx-auto"></div>
      </header>
      <div className="max-w-2xl bg-white dark:bg-stone-900 p-12 rounded-[50px] border border-stone-200 dark:border-stone-800 shadow-2xl space-y-10">
        <p className="font-serif text-xl text-stone-600 dark:text-stone-300 leading-relaxed italic">
          "Our specialized Bible Study companion allows for rigorous exploration of the scriptures through the lens of Logos Frequency Analysis."
        </p>
        <div className="flex justify-center p-6 bg-stone-50 dark:bg-stone-800 rounded-2xl">
           <span className="font-display text-lg font-bold uppercase tracking-widest text-gold-500">Logos Frequency Analysis</span>
        </div>
        <div className="pt-6">
          <a 
            href="https://spiffy-wisp-6615bc.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-600 text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-gold-500/40"
          >
            OPEN BIBLE STUDY APP <ArrowTopRightOnSquareIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};