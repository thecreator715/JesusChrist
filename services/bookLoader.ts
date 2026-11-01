import { Book, BookPage, pdfUrlFor } from '../data/bookContent';

// pdf.js is loaded from cdnjs by index.html and exposed as window.pdfjsLib.
const WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const cache = new Map<string, Promise<BookPage[]>>();

const getPdfJs = async (): Promise<any> => {
  for (let i = 0; i < 100; i++) {
    const lib = (window as any).pdfjsLib;
    if (lib) { lib.GlobalWorkerOptions.workerSrc = WORKER_SRC; return lib; }
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error('The PDF reader could not be loaded. Check your connection and try again.');
};

export interface Line { text: string; y: number; h: number }

/** Text items of one PDF page merged into visual lines, each with its font height. */
export async function extractLines(page: any): Promise<Line[]> {
  const tc = await page.getTextContent();
  const lines: Line[] = [];
  for (const it of tc.items as any[]) {
    if (typeof it.str !== 'string') continue;
    const y = it.transform[5];
    const h = Math.abs(it.transform[3]) || it.height || 12;
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - y) <= Math.max(h, last.h) * 0.5) { last.text += it.str; last.h = Math.max(last.h, it.str.trim() ? h : 0); }
    else if (it.str.trim()) lines.push({ text: it.str, y, h });
  }
  return lines;
}

const modalHeight = (all: Line[][]): number => {
  const count = new Map<number, number>();
  all.forEach(ls => ls.forEach(l => { const k = Math.round(l.h * 2) / 2; count.set(k, (count.get(k) || 0) + l.text.length); }));
  let best = 12, n = 0;
  count.forEach((v, k) => { if (v > n) { n = v; best = k; } });
  return best;
};

/**
 * Builds reader pages from every page's lines. Headings are detected by font size (larger than body text)
 * so chapter titles come from the PDF itself, never from guesses about the first line.
 * Heading lines are written as "## Title" blocks; paragraphs are joined, with blank lines between blocks.
 */
export function buildBookPages(all: Line[][], bookTitle: string): BookPage[] {
  const body = modalHeight(all);
  const isHeading = (l: Line) => l.h >= body * 1.1 && l.text.trim().length <= 90;
  let carried = '';
  return all.map((lines, idx) => {
    const n = idx + 1;
    if (!lines.length) return { page: n, title: carried ? `${carried} (cont.)` : bookTitle, content: '' };
    const bodyLens = lines.filter(l => !isHeading(l)).map(l => l.text.trim().length);
    const maxLen = bodyLens.length ? Math.max(...bodyLens) : 0;
    type Block = { heading: boolean; text: string };
    const blocks: Block[] = [];
    let prev: Line | null = null;
    for (const l of lines) {
      const t = l.text.trim();
      if (isHeading(l)) {
        const last = blocks[blocks.length - 1];
        if (last && last.heading && prev && Math.abs(prev.y - l.y) < l.h * 1.9) last.text += ' ' + t;
        else blocks.push({ heading: true, text: t });
      } else {
        const last = blocks[blocks.length - 1];
        const gap = prev ? Math.abs(prev.y - l.y) : 0;
        if (!last || last.heading || gap > l.h * 1.9) blocks.push({ heading: false, text: t });
        else {
          const wrapped = !!prev && prev.text.trim().length >= maxLen * 0.8 && !/^([•\-*·]|\d+[.)]|Chapter\b|Part\b|Step\b|Day\b)/.test(t);
          last.text += (wrapped ? ' ' : '\n') + t;
        }
      }
      prev = l;
    }
    const firstHeading = blocks.find(b => b.heading);
    const lastHeading = [...blocks].reverse().find(b => b.heading);
    let title: string;
    if (blocks[0]?.heading) { title = blocks[0].text; blocks.shift(); }
    else if (firstHeading) title = firstHeading.text;
    else title = carried ? `${carried} (cont.)` : bookTitle;
    if (lastHeading) carried = lastHeading.text.replace(/\s*\(cont\.\)$/, '');
    else if (blocks.length === 0 && title) carried = carried || title;
    return { page: n, title, content: blocks.map(b => (b.heading ? '## ' : '') + b.text).join('\n\n') };
  });
}

export function loadBookPages(book: Book, onProgress?: (done: number, total: number) => void): Promise<BookPage[]> {
  if (book.pages.length) return Promise.resolve(book.pages);
  const url = pdfUrlFor(book.id);
  if (!url) return Promise.reject(new Error('This book has no PDF yet.'));
  let p = cache.get(book.id);
  if (!p) {
    p = (async () => {
      const lib = await getPdfJs();
      const doc = await lib.getDocument({ url, isEvalSupported: false }).promise;
      const all: Line[][] = [];
      for (let n = 1; n <= doc.numPages; n++) {
        all.push(await extractLines(await doc.getPage(n)));
        onProgress?.(n, doc.numPages);
      }
      return buildBookPages(all, book.title);
    })();
    p.catch(() => cache.delete(book.id));
    cache.set(book.id, p);
  }
  return p;
}
