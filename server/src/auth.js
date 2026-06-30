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
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${secure}`;
}

export function clearAuthCookieHeader() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
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
