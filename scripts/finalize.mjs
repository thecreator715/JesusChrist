// After `vite build`: dist/app.html -> dist/index.html.
// With --root, also write the built page to ./index.html so GitHub Pages
// "Deploy from a branch" (root) serves the built site instead of the raw source.
import { copyFileSync, renameSync, existsSync } from 'node:fs';

if (existsSync('dist/app.html')) renameSync('dist/app.html', 'dist/index.html');
if (process.argv.includes('--root')) {
  copyFileSync('dist/index.html', 'index.html');
  console.log('Wrote built site to ./index.html');
}
