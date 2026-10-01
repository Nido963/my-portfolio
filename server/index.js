import express from 'express';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(__dirname, 'data', 'site.json');
const DIST = path.join(ROOT, 'dist');

const isProd = process.argv.includes('--prod') || process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || (isProd ? 3000 : process.env.API_PORT || 3001));

const app = express();
app.disable('x-powered-by');

// Content is read on every request so edits to site.json show up without a restart.
async function loadSite() {
  return JSON.parse(await readFile(DATA_FILE, 'utf8'));
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/site', async (_req, res, next) => {
  try {
    res.json(await loadSite());
  } catch (err) {
    next(err);
  }
});

// Single section, e.g. /api/site/press or /api/site/shows
app.get('/api/site/:section', async (req, res, next) => {
  try {
    const site = await loadSite();
    if (!(req.params.section in site)) return res.status(404).json({ error: 'Not found' });
    res.json(site[req.params.section]);
  } catch (err) {
    next(err);
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

if (isProd) {
  if (!existsSync(DIST)) {
    console.error('No dist/ folder found. Run "npm run build" first.');
    process.exit(1);
  }
  app.use(express.static(DIST, { maxAge: '7d', index: false }));
  // SPA fallback: every non-API route returns index.html
  app.get('/{*splat}', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(
    isProd
      ? `Nafass site running at http://localhost:${PORT}`
      : `Nafass API running at http://localhost:${PORT}/api/site`
  );
});
