export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://admin.soubadigital.com"

// URL interne (réseau Docker) pour le fetch côté serveur ; les URLs
// d'assets rendues au navigateur utilisent API_BASE.
const API_BASE_INTERNAL = process.env.API_BASE_INTERNAL || API_BASE

export type SocialLink = {
  id: string
  platform: "linkedin" | "instagram" | "facebook" | "x"
  label: string
  url: string
}

export type ClientLogo = {
  id: string
  name: string
  imageUrl: string
  linkUrl?: string
  fullLogo?: boolean
  darkBg?: boolean
}

export type SiteConfig = {
  phone: string
  phoneTel: string
  email: string
  whatsapp: string
  social: SocialLink[]
  clientLogos: ClientLogo[]
}

const DEFAULT_CONFIG: SiteConfig = {
  phone: "+225 07 15 29 63 84",
  phoneTel: "+2250715296384",
  email: "contact@soubadigital.com",
  whatsapp: "https://wa.me/message/CQM7YSAJHQKWC1",
  social: [],
  clientLogos: [
    {
      id: "colisdirect",
      name: "ColisDirect",
      imageUrl: "/colisdirect-logo.png",
      linkUrl: "https://colisdirect.com",
      fullLogo: true,
    },
    {
      id: "controlplay",
      name: "ControlPlay",
      imageUrl: "/controlplay-icon.svg",
      fullLogo: false,
    },
    {
      id: "mastercota",
      name: "MasterCota",
      imageUrl: "/mastercota-logo.png",
      fullLogo: true,
    },
  ],
}

export function resolveAssetUrl(url: string): string {
  if (!url) return ""
  if (url.startsWith("http")) return url
  if (url.startsWith("/uploads/") || url.startsWith("/assets/")) {
    return API_BASE + url
  }
  return url
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${API_BASE_INTERNAL}/api/public/config`, {
      next: { revalidate: 120 },
    })
    if (!res.ok) return DEFAULT_CONFIG
    const cfg = await res.json()
    return {
      ...DEFAULT_CONFIG,
      ...cfg,
      social: Array.isArray(cfg.social)
        ? cfg.social.filter((s: SocialLink) => s.url && s.url.trim())
        : [],
      clientLogos: Array.isArray(cfg.clientLogos)
        ? cfg.clientLogos
        : DEFAULT_CONFIG.clientLogos,
    }
  } catch {
    return DEFAULT_CONFIG
  }
}
