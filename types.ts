
export interface JournalEntry {
  id: string;
  timestamp: number;
  text: string;
}

export interface Prayer {
  id: string;
  title: string;
  topic: string;
  englishText: string;
  latinText: string;
  italianText: string;
  metrics: {
    power: number;
    faith: number;
  };
  createdAt: number;
  categories: string[];
  journalEntries: JournalEntry[];
}

export interface GeneratedPrayerResponse {
  title: string;
  englishText: string;
  latinText: string;
  italianText: string;
  metrics: {
    power: number;
    faith: number;
  };
  categories: string[];
}

export interface MeditationStage {
  startTime: number; // in seconds
  frequency: number; // base frequency in Hz
  offset: number; // binaural beat offset in Hz
  label: string;
  description: string;
}

export interface MeditationSequence {
  id: string;
  name: string;
  totalTime: number; // 1800 for 30 mins
  shortDesc: string;
  fullDesc: string;
  stages: MeditationStage[];
}
