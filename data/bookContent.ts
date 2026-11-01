export interface BookPage {
  page: number;
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  coverColor: string;
  /** Inline pages (books added in Club Admin). PDF books leave this empty and load from their PDF. */
  pages: BookPage[];
  /** Page count of the PDF, so cards can show it without loading the file. */
  pageCount?: number;
}

export const pagesOf = (b: Book) => b.pageCount ?? b.pages.length;

/**
 * Where each built-in book's PDF lives.
 * - Artifact build: uploaded assets, served at /_blob/<id>.
 * - GitHub / static build: set VITE_PDF_BASE=/books/ and keep public/books/<id>.pdf in the repo.
 */
const ASSET_IDS: Record<string, string> = {
  "christ-of-atlantis": "8623db894780c59b9dea5001e2197a0d",
  "samurai-matrix": "7a45eb2695b6e70f3f6ef0d113dbb558",
  "binaural-healing": "ae99ee37bcc43afdb88ef8bee8c9ae84",
  "natural-wellness": "44eee5a016d9e5de260cc805a8819366"
};
export const pdfUrlFor = (id: string): string | null => {
  const base = (import.meta as any).env?.VITE_PDF_BASE as string | undefined;
  if (base) return `${base.replace(/\/?$/, '/')}${id}.pdf`;
  return ASSET_IDS[id] ? `/_blob/${ASSET_IDS[id]}` : null;
};

export const LIBRARY: Record<string, Book> = {
  'christ-of-atlantis': {
    id: 'christ-of-atlantis',
    title: "The Christ of Atlantis",
    subtitle: "A Complete Guide to Transformation",
    author: "Jesus Christ of Atlantis",
    description: "The Future Testament of the New World Heaven on Earth. Unsealing the hidden records of the Master's journey, technology, and methods.",
    coverColor: "bg-gold-500",
    pages: [],
    pageCount: 34,
  },
  'samurai-matrix': {
    id: 'samurai-matrix',
    title: "The Samurai Matrix",
    subtitle: "Mastering the Human System",
    author: "Ancient & Modern Synthesis",
    description: "An Advanced Handbook for Physical, Mental, and Spiritual Mastery. Integrating ancient warrior philosophy with modern systems thinking.",
    coverColor: "bg-red-700",
    pages: [],
    pageCount: 77,
  },
  'binaural-healing': {
    id: 'binaural-healing',
    title: "Binaural Healing Frequencies",
    subtitle: "The Complete Guide",
    author: "Sonic Alchemy",
    description: "A Comprehensive Handbook for Understanding and Applying Therapeutic Sound. Mastering brainwave entrainment for healing and consciousness expansion.",
    coverColor: "bg-blue-600",
    pages: [],
    pageCount: 15,
  },
  'natural-wellness': {
    id: 'natural-wellness',
    title: "Complete Natural Wellness",
    subtitle: "Understanding the Human System",
    author: "Holistic Health Collective",
    description: "A definitive guide to integrating physical biology, energy medicine, nutrition, and spiritual alignment for total systemic health.",
    coverColor: "bg-green-600",
    pages: [],
    pageCount: 28,
  },
};

// Runtime registry: books added by the club owner (stored in the artifact database).
export const CUSTOM_BOOKS: Record<string, Book> = {};
export const getBook = (id: string): Book | undefined => LIBRARY[id] || CUSTOM_BOOKS[id];
