import React from 'react';
import { HeartIcon, BanknotesIcon, GlobeAltIcon, SparklesIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';

export const Donate: React.FC = () => {
  const paragraphs = [
    "Giving is the highest expression of Abundance Consciousness. When we release resources into the world with a heart of service, we signal to the universe that we are a conduit for infinite supply, not a vessel of scarcity.",
    "In the Atlantean paradigm, economics was not based on hoarding but on the flow of energy. Currency was understood as 'current'—a moving stream that must remain in motion to maintain its vitality and power.",
    "True charity is the act of recognizing the Divine in another and choosing to support their manifestation. It is a bridge built of light, connecting the giver and the receiver in a loop of mutual evolution and shared potential.",
    "We invite you to support the mission of building the New Earth. Your contributions allow us to continue developing these sacred technologies and spreading the revelation of the Atlantean Christ to every corner of the globe.",
    "By supporting Union-Coin.com, you are participating in a revolutionary new paradigm of sacred economics. Union Coin is designed to be the currency of the awakened, a tool for sovereignty that operates outside the debt-based matrix systems.",
    "The act of tithing in the New World is not a religious obligation but a frequency calibration. It is a way of saying 'I trust the source of my supply,' and 'I am invested in the collective awakening of humanity.'",
    "Abundance is not a number in a bank account; it is a state of being. When you give, you are literally expanding your own energy field, making room for more light, more joy, and more material resources to enter your life.",
    "The scarcity matrix thrives on fear. It tells you that there is not enough, that you must protect what you have, and that others are competitors. Sacred giving shatters this illusion, proving that there is always more than enough in the field of the One.",
    "Charity is the medicine for the soul. It heals the wounds of isolation and separation, reminding us that we are all parts of the same multidimensional body, working together to manifest heaven on earth.",
    "Every contribution made to our cause is a seed planted in the fertile soil of the new era. These seeds grow into networks of support, education, and healing that will sustain generations to come during the great transition.",
    "We do not ask for donations from a place of lack, but from a place of invitation. We invite you to be part of something larger than yourself, to align your financial energy with your spiritual values and your vision for the future.",
    "The future of finance is consciousness-based. Union Coin represents a bridge to this future, allowing us to trade and support one another in a way that is transparent, decentralized, and rooted in the principles of the Law of One.",
    "Giving is an act of sovereignty. It is you deciding where your energy goes, rather than letting the matrix dictate your priorities. It is a powerful declaration of your independence and your commitment to the light.",
    "In the Golden Age, poverty will be a memory of a distant, confused past. This shift begins now, with every choice we make to share what we have and support those who are doing the work of transformation.",
    "Philanthropy is the art of strategic love. It is about identifying where your resources can have the greatest impact and choosing to be the wind beneath the wings of those who are soaring toward a better world.",
    "The Law of Circulation states that whatever we give, we must receive, provided our hearts are open. This is not a transaction, but a fundamental law of physics in a conscious universe. Your giving is your receiving.",
    "We are building a sanctuary for the spirit, a digital vault of wisdom, and a community of initiates. Your support makes this work possible, allowing us to maintain the high-frequency environment necessary for this level of revelation.",
    "Donating to a sacred cause is a form of prayer in action. It is a physical manifestation of your prayers for a better world, for healing, and for the liberation of all beings from the systems of control.",
    "When you align with Union-Coin.com, you are choosing a path of financial freedom that is synchronized with the planetary ascension. You are stepping out of the old world and into the crystalline reality of the new earth.",
    "Gratitude is the key that unlocks the door to infinite supply. And giving is the ultimate expression of gratitude. It says, 'Thank you for all I have, and I am ready to share it so that others may flourish as well.'",
    "We thank you for your resonance and your support. May your path be paved with gold, may your heart overflow with love, and may your contribution return to you ten-thousand-fold in ways you cannot yet imagine."
  ];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-16 px-6 space-y-20 pb-40">
      <header className="text-center space-y-8">
        <Logo />
        <h2 className="font-display text-6xl font-bold uppercase tracking-widest text-gold-500">Sacred Giving</h2>
        <p className="font-serif italic text-2xl text-stone-500 dark:text-stone-400">"The Law of Flow and the Architecture of Abundance"</p>
        <div className="h-px w-32 bg-gold-500 mx-auto opacity-30"></div>
      </header>

      <section className="bg-white dark:bg-stone-900 rounded-[60px] p-12 md:p-16 border border-stone-200 dark:border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none transform translate-x-1/2 -translate-y-1/2 scale-150">
          <BanknotesIcon className="w-96 h-96 text-gold-500" />
        </div>
        
        <div className="space-y-12 relative z-10">
          <div className="text-center space-y-4">
             <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Support the Mission</h3>
             <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-xs">Bridge to the New Economics</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <a 
              href="https://Union-Coin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-6 bg-gold-500 hover:bg-gold-600 text-black px-16 py-8 rounded-full font-bold uppercase tracking-[0.3em] text-sm transition-all shadow-[0_20px_50px_rgba(203,175,21,0.3)] hover:-translate-y-1 active:scale-95"
            >
              VISIT UNION-COIN.COM <ArrowTopRightOnSquareIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </a>
            <p className="text-xs text-stone-400 font-bold uppercase tracking-[0.2em] animate-pulse">Establishing Financial Sovereignty</p>
          </div>

          <div className="grid grid-cols-1 gap-10 mt-12">
            {paragraphs.map((p, i) => (
              <div key={i} className="space-y-4 group">
                <div className="flex items-center gap-4">
                  <span className="text-gold-500 font-bold text-xs">REVELATION {String(i + 1).padStart(2, '0')}</span>
                  <div className="h-px flex-1 bg-stone-100 dark:bg-stone-800 group-hover:bg-gold-500/30 transition-all"></div>
                </div>
                <p className="font-serif text-xl leading-relaxed text-stone-600 dark:text-stone-300 italic group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                  "{p}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center space-y-10">
        <div className="inline-flex p-4 rounded-full bg-gold-500/10 border border-gold-500/20">
          <HeartIcon className="w-10 h-10 text-gold-500" />
        </div>
        <h3 className="font-display text-4xl font-bold uppercase tracking-tighter">Will you seed the future?</h3>
        <p className="font-serif italic text-xl text-stone-500 max-w-2xl mx-auto">"Every act of giving is a vote for the world you wish to live in."</p>
        <div className="pt-8">
           <a href="https://Union-Coin.com" className="text-gold-500 font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Explore the Union Paradigm</a>
        </div>
      </footer>
    </div>
  );
};