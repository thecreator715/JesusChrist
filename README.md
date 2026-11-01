# Jesus Christ of Atlantis · Sanctus Oratio

Prayer Book, Sovereign Book Club and PDF library, built with React, Vite and Tailwind (CDN).

- **Prayer Book:** $1 per prayer, donated through PayPal. Prayers are composed in English, Latin and Italian.
- **Sovereign Book Club:** $1 membership. Club books are free to read; paid books are sold one by one.
- **Reader:** mobile-first. Swipe to turn pages, bookmarks, read/completed tracking, themes and text controls.
- **Badges and usernames** for paid members.

## Books are PDFs
Each book lives in `public/books/<book-id>.pdf`. The reader pulls text from the PDF in the browser with pdf.js, so book text is never bundled into the app. Chapter titles come from the PDF's own headings (larger font than body text).

| id | file |
| --- | --- |
| `christ-of-atlantis` | `public/books/christ-of-atlantis.pdf` |
| `samurai-matrix` | `public/books/samurai-matrix.pdf` |
| `binaural-healing` | `public/books/binaural-healing.pdf` |
| `natural-wellness` | `public/books/natural-wellness.pdf` |

To add a book: put the PDF in `public/books/`, then add an entry (id, title, subtitle, author, description, coverColor, pageCount) to `LIBRARY` in `data/bookContent.ts`.

## Develop
```
npm install
npm run dev
npm run typecheck
npm run build:github      # set VITE_PDF_BASE=./books/ so PDFs load from /books
```
CI (`.github/workflows/build.yml`) type-checks and builds on every push.

## Where it runs
The app was built as a claude.ai artifact. There it gets its backend from the artifact runtime (`window.claude`):

| Feature | Artifact runtime | On your own host |
| --- | --- | --- |
| Prayers, Atlantis AI | `sample` (Claude) | needs your own AI API: `services/geminiService.ts` |
| Membership, purchases, reviews, badges, reading progress | `db` | needs your own database and API: `components/useClub.ts` |
| Book PDFs | uploaded assets (`ASSET_IDS` in `data/bookContent.ts`) | `public/books/` via `VITE_PDF_BASE` |
| Sign-in | `user` | needs your own auth |

Hosted as plain static files (for example GitHub Pages) the pages, reader and PDFs work, but prayers, membership and reviews need the backend pieces above.

## Payments
Payment links go to PayPal with a unique invoice reference on every payment, so a payment can be matched to a claim. The page cannot see PayPal. Claims unlock access straight away and are verified against PayPal afterwards (see "prayer donations" in Club Admin). Automatic verification needs a server that receives PayPal webhooks.
