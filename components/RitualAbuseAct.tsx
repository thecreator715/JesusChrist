
import React from 'react';
import { 
  ScaleIcon, ShieldExclamationIcon, BanknotesIcon, 
  BuildingLibraryIcon, UserGroupIcon, HeartIcon, 
  ArrowTopRightOnSquareIcon, LockClosedIcon, 
  ExclamationTriangleIcon, BookOpenIcon
} from '@heroicons/react/24/outline';
import { Logo } from './Logo';

export const RitualAbuseAct: React.FC = () => {
  const externalLink = "https://bradley-act-legal-explorer-859357043486.us-west1.run.app/";

  const offenses = [
    {
      degree: "First Degree",
      penalty: "Life Imprisonment",
      acts: ["Ritual torture resulting in severe injury", "Sexual abuse of minors in ritual contexts", "Attempted human sacrifice", "Systematic mind control programming"]
    },
    {
      degree: "Second Degree",
      penalty: "10-25 Years Imprisonment",
      acts: ["Psychological abuse via black magic", "Forced blood rituals or animal sacrifice", "Use of drugs to induce altered states", "Sensory deprivation"]
    },
    {
      degree: "Organized Abuse (RICO)",
      penalty: "30 Years to Life",
      acts: ["Network leadership", "Pattern of ritual abuse activity", "Conspiracy to commit organized abuse", "Financial operations of covens/cults"]
    }
  ];

  const supportSystems = [
    { title: "Compensation Fund", amount: "$50,000,000", desc: "Annual appropriation for medical, therapy, and relocation costs.", icon: BanknotesIcon },
    { title: "Treatment Centers", amount: "$10M/Center", desc: "Specialized inpatient facilities for complex trauma and deprogramming.", icon: BuildingLibraryIcon },
    { title: "Legal Advocacy", amount: "$25,000,000", desc: "Free specialized legal representation for survivors in all proceedings.", icon: ScaleIcon },
    { title: "Public Education", amount: "$20,000,000", desc: "Campaigns to recognize signs of occult recruitment and abuse.", icon: UserGroupIcon }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-16 px-6 space-y-24 pb-40">
      {/* HERO */}
      <header className="text-center space-y-8">
        <div className="flex justify-center mb-6"><Logo /></div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/10 border border-red-900/20 rounded-full text-red-600 dark:text-red-400 font-bold uppercase text-[10px] tracking-[0.3em]">
          Legislative Bill [Number To Be Assigned]
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100 leading-none">
          The Bradley <br/><span className="text-gold-500">Ritual Abuse Act</span>
        </h2>
        <p className="font-serif italic text-2xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">
          "A comprehensive legal framework addressing the systematic crime of ritual abuse, torture, and spiritual manipulation."
        </p>
        
        <div className="pt-8">
          <a 
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 bg-gold-500 hover:bg-gold-600 text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs transition-all shadow-[0_20px_50px_rgba(203,175,21,0.3)] hover:-translate-y-1"
          >
            Read Full Interactive Document <ArrowTopRightOnSquareIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </header>

      {/* FINDINGS & DEFINITIONS */}
      <section className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
            <BookOpenIcon className="w-8 h-8 text-gold-500" /> Legislative Findings
          </h3>
          <div className="bg-stone-50 dark:bg-stone-900 p-10 rounded-[40px] border border-stone-200 dark:border-stone-800 space-y-6">
            <p className="font-serif text-lg text-stone-600 dark:text-stone-300 italic leading-relaxed border-l-4 border-gold-500 pl-6">
              "Ritual abuse constitutes a distinct category of severe crime involving systematic torture, psychological manipulation, and spiritual harm inflicted through occult practices and ritualistic ceremonies."
            </p>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400 font-medium">
              <li className="flex gap-3"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" /> Victims suffer complex trauma including DID and spiritual devastation.</li>
              <li className="flex gap-3"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" /> Existing statutes fail to address the organized, occult nature of these crimes.</li>
              <li className="flex gap-3"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" /> Organized networks exploit children through mind control programming.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100 flex items-center gap-4">
            <ScaleIcon className="w-8 h-8 text-gold-500" /> Legal Definitions
          </h3>
          <div className="space-y-4">
            {[
              { term: "Ritual Abuse", def: "Any act involving physical, sexual, or spiritual harm inflicted through practices associated with ritualistic, occult, satanic, or ceremonial activities." },
              { term: "Black Magic Practices", def: "Deliberate acts intended to cause harm or control another person through curses, hexes, demonic invocation, or blood magic." },
              { term: "Mind Control", def: "Systematic use of trauma, drugs, or hypnosis to create dissociative states, alter personalities, or implant commands." }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-white dark:bg-stone-950 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-gold-500 transition-colors">
                <h4 className="font-bold uppercase text-xs text-gold-600 mb-2 tracking-widest">{item.term}</h4>
                <p className="text-sm font-serif text-stone-600 dark:text-stone-300 italic leading-relaxed">"{item.def}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRIMINAL OFFENSES GRID */}
      <section className="bg-stone-900 dark:bg-black p-12 md:p-16 rounded-[60px] border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none"><Logo /></div>
        <div className="text-center mb-16 relative z-10">
          <h3 className="font-display text-4xl font-bold uppercase text-white tracking-widest">Criminal Offenses & Penalties</h3>
          <p className="text-stone-400 font-serif italic mt-4">Article II: Establishing specialized classifications for ritual crimes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {offenses.map((off, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <ShieldExclamationIcon className="w-10 h-10 text-red-500" />
                <span className="text-[10px] font-bold bg-red-900/30 text-red-400 px-3 py-1 rounded-full border border-red-500/20">{off.degree}</span>
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase mb-2">{off.penalty}</h4>
              <div className="h-px w-full bg-white/10 my-4"></div>
              <ul className="space-y-3">
                {off.acts.map((act, j) => (
                  <li key={j} className="text-[11px] text-stone-400 font-serif leading-relaxed">• {act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SURVIVOR SUPPORT SYSTEM */}
      <section className="space-y-16">
        <div className="text-center">
          <h3 className="font-display text-4xl font-bold uppercase text-stone-900 dark:text-stone-100">Survivor Support Infrastructure</h3>
          <p className="text-stone-500 font-serif italic text-xl mt-4">"Restoring dignity, safety, and wholeness to the victims."</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportSystems.map((sys, i) => (
            <div key={i} className="p-8 bg-stone-50 dark:bg-stone-900 rounded-[40px] border border-stone-200 dark:border-stone-800 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-white dark:bg-stone-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100 dark:border-stone-800 group-hover:border-gold-500 transition-colors">
                <sys.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="font-bold uppercase text-sm text-stone-800 dark:text-stone-200 tracking-widest mb-1">{sys.title}</h4>
              <p className="text-xs font-bold text-gold-600 mb-4">{sys.amount}</p>
              <p className="text-[10px] font-serif text-stone-500 italic leading-relaxed">"{sys.desc}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ADDITIONAL PROTECTIONS */}
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="p-10 bg-white dark:bg-stone-900 rounded-[50px] border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center gap-4">
            <LockClosedIcon className="w-8 h-8 text-gold-500" />
            <h4 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-stone-100">Statute of Limitations</h4>
          </div>
          <p className="font-serif text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong className="text-gold-600 uppercase tracking-wider text-xs">Eliminated.</strong> There shall be no time limit for prosecution of ritual abuse offenses. Claims barred by previous statutes are revived for a 5-year window.
          </p>
          <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Delayed Discovery Rule</p>
            <p className="text-[10px] text-stone-400 mt-1">Clock starts only when survivor recovers memory or is free from network influence.</p>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-stone-900 rounded-[50px] border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-center gap-4">
            <HeartIcon className="w-8 h-8 text-gold-500" />
            <h4 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-stone-100">Spiritual Protection</h4>
          </div>
          <p className="font-serif text-stone-600 dark:text-stone-300 leading-relaxed">
            Protective orders specifically prohibit "Spiritual Harassment," including attempts to place curses, hexes, or demonic dedications on survivors.
          </p>
          <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">No Religious Defense</p>
            <p className="text-[10px] text-stone-400 mt-1">The First Amendment does not protect criminal acts committed under the guise of spiritual practice.</p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <footer className="text-center pt-16">
        <div className="h-px w-32 bg-gold-500 mx-auto mb-12 opacity-30"></div>
        <h3 className="font-display text-3xl font-bold uppercase text-stone-900 dark:text-stone-100 mb-8">Empower the Legislation</h3>
        <a 
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 text-gold-600 hover:text-gold-500 font-bold uppercase tracking-[0.3em] text-sm transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1"
        >
          Explore the Full Act <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </a>
      </footer>
    </div>
  );
};
