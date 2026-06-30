import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const CONFIG_PATH = path.join(DATA_DIR, 'site-config.json');
const ADMIN_PATH = path.join(DATA_DIR, 'admin.json');
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const DEFAULT_CONFIG = {
  phone: '+225 07 15 29 63 84',
  phoneTel: '+2250715296384',
  email: 'contact@soubadigital.com',
  social: [
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: '' },
    { id: 'instagram', platform: 'instagram', label: 'Instagram', url: '' },
    { id: 'facebook', platform: 'facebook', label: 'Facebook', url: '' },
    { id: 'x', platform: 'x', label: 'X', url: '' }
  ],
  clientLogos: [
    {
      id: 'colisdirect',
      name: 'ColisDirect',
      imageUrl: '/assets/colisdirect-logo.png',
      linkUrl: 'https://colisdirect.com',
      fullLogo: true,
      darkBg: false
    },
    {
      id: 'controlplay',
      name: 'ControlPlay',
      imageUrl: '/assets/controlplay-icon.svg',
      linkUrl: '',
      fullLogo: false,
      darkBg: false
    },
    {
      id: 'mastercota',
      name: 'MasterCota',
      imageUrl: '/assets/mastercota-logo.png',
      linkUrl: '',
      fullLogo: true,
      darkBg: false
    }
  ]
};

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function getSiteConfig() {
  const config = readJson(CONFIG_PATH, null);
  if (!config) {
    writeJson(CONFIG_PATH, DEFAULT_CONFIG);
    return structuredClone(DEFAULT_CONFIG);
  }
  return config;
}

export function saveSiteConfig(config) {
  writeJson(CONFIG_PATH, config);
  return config;
}

export async function ensureAdminUser() {
  const user = process.env.ADMIN_USER || 'admin';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn('[auth] ADMIN_PASSWORD non défini — connexion admin désactivée.');
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  writeJson(ADMIN_PATH, { user, hash });
}

export async function verifyAdmin(username, password) {
  const admin = readJson(ADMIN_PATH, null);
  if (!admin) return false;
  if (admin.user !== username) return false;
  return bcrypt.compare(password, admin.hash);
}

export { DATA_DIR };
