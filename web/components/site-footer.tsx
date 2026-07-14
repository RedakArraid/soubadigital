import Image from "next/image"
import Link from "next/link"

import { SOCIAL_ICONS } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { POLES } from "@/lib/data"
import type { SiteConfig } from "@/lib/site-config"

const COMPANY_LINKS = [
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#vision", label: "Vision" },
  { href: "/#methode", label: "Méthode" },
]

export function SiteFooter({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="bg-foreground dark:bg-secondary mb-4 grid w-20 place-items-center rounded-xl p-3.5">
            <Image
              src="/logo-mark.png"
              alt="SOUBA DIGITAL"
              width={52}
              height={44}
              className="h-auto w-full"
            />
          </div>
          <p className="font-heading text-2xl tracking-tight">
            SOUBA <span className="text-muted-foreground">Digital</span>
          </p>
          <p className="text-muted-foreground mt-2.5 max-w-xs text-sm leading-relaxed">
            Groupe entrepreneurial dédié au digital, au gaming et au SaaS.
            Trois pôles, un écosystème intégré.
          </p>
        </div>

        <div>
          <h5 className="label-mono mb-4 font-medium">Pôles</h5>
          <ul className="space-y-2 text-sm">
            {POLES.map((pole) => (
              <li key={pole.slug}>
                <Link
                  href={`/poles/${pole.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {pole.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="label-mono mb-4 font-medium">Entreprise</h5>
          <ul className="space-y-2 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="label-mono mb-4 font-medium">Contact</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${config.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {config.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${config.phoneTel}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {config.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-xs tracking-wide md:px-8">
          <span>© SOUBA DIGITAL · {new Date().getFullYear()}</span>
          {config.social.length > 0 && (
            <div className="flex items-center gap-2">
              {config.social.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.platform] ?? SOCIAL_ICONS.linkedin
                return (
                  <Button
                    key={social.id}
                    asChild
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full"
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label || social.platform}
                    >
                      <Icon className="size-4" />
                    </a>
                  </Button>
                )
              })}
            </div>
          )}
          <span>Tous droits réservés</span>
        </div>
      </div>
    </footer>
  )
}
