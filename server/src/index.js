import cors from 'cors';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware, signToken } from './auth.js';
import {
  DATA_DIR,
  UPLOADS_DIR,
  ensureAdminUser,
  getSiteConfig,
  saveSiteConfig,
  verifyAdmin
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_DIR = process.env.ADMIN_DIR || path.join(__dirname, '../../admin');
const ASSETS_DIR = process.env.ASSETS_DIR || path.join(__dirname, '../../assets');
const PUBLIC_ORIGINS = (process.env.CORS_ORIGINS || 'https://soubadigital.com,https://www.soubadigital.com,http://localhost:8090')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || PUBLIC_ORIGINS.includes(origin)) return callback(null, true);
    if (origin.includes('admin.soubadigital.com') || origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(null, false);
  }
}));
app.use(express.json({ limit: '2mb' }));

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename(_req, file, cb) {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (/^image\/(png|jpeg|jpg|gif|webp|svg\+xml|svg)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Format image non supporté'));
    }
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/public/config', (_req, res) => {
  res.json(getSiteConfig());
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Identifiants requis' });
  }

  const valid = await verifyAdmin(username, password);
  if (!valid) {
    return res.status(401).json({ error: 'Identifiants incorrects' });
  }

  const token = signToken({ sub: username });
  res.json({ token, user: username });
});

app.get('/api/admin/config', authMiddleware, (_req, res) => {
  res.json(getSiteConfig());
});

app.put('/api/admin/config', authMiddleware, (req, res) => {
  const current = getSiteConfig();
  const next = {
    ...current,
    ...req.body,
    clientLogos: Array.isArray(req.body?.clientLogos) ? req.body.clientLogos : current.clientLogos,
    social: Array.isArray(req.body?.social) ? req.body.social : current.social
  };
  saveSiteConfig(next);
  res.json(next);
});

app.post('/api/admin/upload', authMiddleware, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'Fichier manquant' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d' }));

if (fs.existsSync(ASSETS_DIR)) {
  app.use('/assets', express.static(ASSETS_DIR, { maxAge: '7d' }));
}

if (fs.existsSync(ADMIN_DIR)) {
  app.use('/admin', express.static(ADMIN_DIR, { index: 'index.html' }));
  app.get('/admin/*', (_req, res) => {
    res.sendFile(path.join(ADMIN_DIR, 'index.html'));
  });
}

app.get('/', (_req, res) => {
  res.redirect('/admin');
});

await ensureAdminUser();

app.listen(PORT, () => {
  console.log(`SOUBA DIGITAL admin API sur :${PORT}`);
  console.log(`Data: ${DATA_DIR}`);
});
