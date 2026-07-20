import cors from 'cors';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware, authCookieHeader, clearAuthCookieHeader, getAuthToken, pageAuthMiddleware, signToken } from './auth.js';
import {
  DATA_DIR,
  UPLOADS_DIR,
  ensureAdminUser,
  getSiteConfig,
  saveSiteConfig,
  verifyAdmin
} from './db.js';
import {
  DOCUMENTS_DIR,
  addDocument,
  deleteDocument,
  documentFilePath,
  getDocument,
  listDocuments,
  updateDocument
} from './documents.js';

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
  res.setHeader('Set-Cookie', authCookieHeader(token));
  res.json({ token, user: username });
});

app.post('/api/auth/logout', (_req, res) => {
  res.setHeader('Set-Cookie', clearAuthCookieHeader());
  res.json({ ok: true });
});

app.post('/api/auth/sync-cookie', authMiddleware, (req, res) => {
  const jwt = getAuthToken(req);
  if (jwt) res.setHeader('Set-Cookie', authCookieHeader(jwt));
  res.json({ ok: true });
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

const docStorage = multer.diskStorage({
  destination: DOCUMENTS_DIR,
  filename(_req, file, cb) {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
    cb(null, `${Date.now()}-${safe}`);
  }
});
const uploadDocument = multer({
  storage: docStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const ok = /^(application\/pdf|image\/(png|jpeg|jpg|webp|gif)|application\/msword|application\/vnd\.|text\/plain)/.test(file.mimetype)
      || /\.(pdf|png|jpe?g|webp|gif|doc|docx|txt)$/i.test(file.originalname);
    if (ok) cb(null, true);
    else cb(new Error('Type de fichier non supporté'));
  }
});

app.get('/api/admin/documents', authMiddleware, (_req, res) => {
  res.json(listDocuments());
});

app.post('/api/admin/documents', authMiddleware, (req, res) => {
  uploadDocument.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'Fichier manquant' });
    const doc = addDocument({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      note: typeof req.body?.note === 'string' ? req.body.note : ''
    });
    res.status(201).json(doc);
  });
});

app.patch('/api/admin/documents/:id', authMiddleware, (req, res) => {
  const patch = {};
  if (typeof req.body?.name === 'string' && req.body.name.trim()) patch.name = req.body.name.trim();
  if (typeof req.body?.note === 'string') patch.note = req.body.note;
  const doc = updateDocument(req.params.id, patch);
  if (!doc) return res.status(404).json({ error: 'Document introuvable' });
  res.json(doc);
});

app.delete('/api/admin/documents/:id', authMiddleware, (req, res) => {
  if (!deleteDocument(req.params.id)) return res.status(404).json({ error: 'Document introuvable' });
  res.json({ ok: true });
});

app.get('/api/admin/documents/:id/download', authMiddleware, (req, res) => {
  const doc = getDocument(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document introuvable' });
  const filePath = documentFilePath(doc);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Fichier manquant sur le disque' });
  res.download(filePath, doc.name);
});

app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d' }));

if (fs.existsSync(ASSETS_DIR)) {
  app.use('/assets', express.static(ASSETS_DIR, { maxAge: '7d' }));
}

if (fs.existsSync(ADMIN_DIR)) {
  app.get('/admin/deviseur.html', pageAuthMiddleware, (_req, res) => {
    res.sendFile(path.join(ADMIN_DIR, 'deviseur.html'));
  });

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
