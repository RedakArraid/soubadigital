import fs from 'fs';
import path from 'path';
import { DATA_DIR } from './db.js';

export const DOCUMENTS_DIR = path.join(DATA_DIR, 'documents');
const META_PATH = path.join(DATA_DIR, 'documents.json');

fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });

function readMeta() {
  try {
    if (!fs.existsSync(META_PATH)) return [];
    return JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function writeMeta(docs) {
  fs.writeFileSync(META_PATH, JSON.stringify(docs, null, 2));
}

function newId(prefix = 'doc') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function listDocuments() {
  return readMeta().sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
}

export function getDocument(id) {
  return readMeta().find((d) => d.id === id) || null;
}

export function addDocument({ originalName, storedName, mimeType, size, note = '', kind = 'file' }) {
  const docs = readMeta();
  const doc = {
    id: newId('doc'),
    name: originalName,
    storedName,
    mimeType: mimeType || 'application/octet-stream',
    size: size || 0,
    note: note || '',
    kind: kind || 'file',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  docs.push(doc);
  writeMeta(docs);
  return doc;
}

export function updateDocument(id, patch) {
  const docs = readMeta();
  const idx = docs.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  const next = {
    ...docs[idx],
    ...patch,
    id: docs[idx].id,
    storedName: patch.storedName || docs[idx].storedName,
    kind: docs[idx].kind || 'file',
    updatedAt: new Date().toISOString()
  };
  docs[idx] = next;
  writeMeta(docs);
  return next;
}

export function deleteDocument(id) {
  const docs = readMeta();
  const doc = docs.find((d) => d.id === id);
  if (!doc) return false;
  const filePath = path.join(DOCUMENTS_DIR, doc.storedName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  writeMeta(docs.filter((d) => d.id !== id));
  return true;
}

export function documentFilePath(doc) {
  return path.join(DOCUMENTS_DIR, doc.storedName);
}

export function readDevisPayload(doc) {
  if (!doc || doc.kind !== 'devis') return null;
  const filePath = documentFilePath(doc);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export function saveDevisDocument({ id, name, note, payload }) {
  const safeName = (name || 'Devis').trim() || 'Devis';
  const body = JSON.stringify(payload || {}, null, 2);

  if (id) {
    const existing = getDocument(id);
    if (!existing || existing.kind !== 'devis') return null;
    const filePath = documentFilePath(existing);
    fs.writeFileSync(filePath, body);
    return updateDocument(id, {
      name: safeName,
      note: note ?? existing.note,
      size: Buffer.byteLength(body),
      mimeType: 'application/json'
    });
  }

  const storedName = `${newId('devis')}.json`;
  fs.writeFileSync(path.join(DOCUMENTS_DIR, storedName), body);
  return addDocument({
    originalName: safeName,
    storedName,
    mimeType: 'application/json',
    size: Buffer.byteLength(body),
    note: note || 'Devis SOUBA',
    kind: 'devis'
  });
}
