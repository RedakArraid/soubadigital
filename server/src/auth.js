import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const COOKIE_NAME = 'souba_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function getAuthToken(req) {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);

  const cookie = req.headers.cookie || '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function authCookieHeader(token) {
  // SameSite=None : l’iframe /pdf doit envoyer le cookie sur les POST API Stirling.
  // Lax bloque parfois les POST cross-context même en same-site selon le navigateur.
  const secure = '; Secure';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=None; Max-Age=${COOKIE_MAX_AGE}${secure}`;
}

export function clearAuthCookieHeader() {
  const secure = '; Secure';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=None; Max-Age=0${secure}`;
}

function attachUser(req, res, next, onFail) {
  const token = getAuthToken(req);
  if (!token) return onFail();

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    onFail();
  }
}

export function authMiddleware(req, res, next) {
  attachUser(req, res, next, () => res.status(401).json({ error: 'Non authentifié' }));
}

export function pageAuthMiddleware(req, res, next) {
  attachUser(req, res, next, () => {
    const redirect = encodeURIComponent(req.originalUrl);
    res.redirect(`/admin/?redirect=${redirect}`);
  });
}

/** Assets PWA/static Stirling : sans cookie le navigateur reçoit 302→HTML → "Manifest: Syntax error". */
function isPdfPublicAsset(uri) {
  const path = String(uri || '').split('?')[0];
  return (
    path === '/pdf/manifest.json' ||
    path === '/pdf/manifest-classic.json' ||
    path === '/pdf/favicon.ico' ||
    path === '/pdf/robots.txt' ||
    path.startsWith('/pdf/assets/') ||
    path.startsWith('/pdf/modern-logo/') ||
    path.startsWith('/pdf/classic-logo/') ||
    path.startsWith('/pdf/icons/') ||
    path.startsWith('/pdf/og_images/')
  );
}

/** Traefik ForwardAuth: 200 si cookie JWT valide, sinon 401 (API) ou redirect login */
export function forwardAuthHandler(req, res) {
  const token = getAuthToken(req);
  const uri = req.headers['x-forwarded-uri'] || '/pdf/';
  const accept = String(req.headers.accept || '');
  const isApi = uri.includes('/api/') || accept.includes('application/json') || accept.includes('multipart/');

  // Manifest / JS / CSS / logos : publics (l’HTML et les API restent protégés)
  if (isPdfPublicAsset(uri)) {
    return res.status(200).end();
  }

  const fail = () => {
    if (isApi) {
      // Ne jamais renvoyer du HTML admin aux appels API Stirling (sinon "No job ID")
      return res.status(401).json({ error: 'Non authentifié', login: '/admin/' });
    }
    const base = (process.env.ADMIN_PUBLIC_URL || 'https://admin.soubadigital.com').replace(/\/$/, '');
    res.status(302).set('Location', `${base}/admin/?redirect=${encodeURIComponent(uri)}`).end();
  };

  if (!token) return fail();
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.setHeader('X-Forwarded-User', user.sub || 'admin');
    return res.status(200).end();
  } catch {
    return fail();
  }
}
