import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { resolveAssetUrl, type SiteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function WorksSection({ config }: { config: SiteConfig }) {
  return (
    <section
      id="realisations"
      className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8"
    >
      <SectionHeading
        label="§02 — Réalisations"
        title="Notre produit phare et nos partenaires."
        kicker="Notre principale réalisation à ce jour est notre plateforme SaaS de gestion. Elle s'accompagne d'une croissance régulière de clients et partenaires qui nous font confiance."
      />

      <Reveal>
        <Link href="/poles/saas-technologie" className="group block">
          <Card className="hover:border-ring overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="bg-secondary relative flex aspect-[21/9] items-center justify-center border-b">
              <div className="bg-primary/15 absolute -top-16 right-10 size-64 rounded-full blur-2xl" />
              <div className="bg-primary/10 absolute -bottom-20 left-16 size-72 rounded-full blur-3xl" />
              <span className="font-display text-primary/60 group-hover:text-primary text-6xl transition-colors md:text-8xl">
                SaaS
              </span>
            </div>
            <CardContent className="space-y-3 p-6 md:p-7">
              <div className="flex items-center gap-2">
                <Badge className="font-mono text-[11px] tracking-wider uppercase">
                  Pôle 03 · Produit
                </Badge>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] tracking-wider uppercase"
                >
                  {new Date().getFullYear()}
                </Badge>
              </div>
              <h3 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
                Plateforme SaaS de gestion
              </h3>
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
                Logiciel de gestion temps réel pour salles de jeu et opérateurs
                — sessions, caisse, fidélité et reporting consolidé. Notre
                produit interne, conçu et éprouvé dans nos propres salles.
              </p>
            </CardContent>
          </Card>
        </Link>
      </Reveal>

      {config.clientLogos.length > 0 && (
        <div className="mt-14">
          <div className="mb-7 flex items-center gap-4">
            <span className="label-mono">Ils nous font confiance</span>
            <span className="bg-border h-px flex-1" />
          </div>
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border sm:grid-cols-3">
            {config.clientLogos.map((logo) => {
              const inner = (
                <div
                  className={cn(
                    "flex aspect-[5/2] flex-col items-center justify-center gap-2 p-5 transition-colors sm:aspect-[5/3]",
                    logo.darkBg
                      ? "bg-foreground dark:bg-secondary"
                      : "bg-card hover:bg-accent/40"
                  )}
                >
                  {logo.imageUrl && (
                    <Image
                      src={resolveAssetUrl(logo.imageUrl)}
                      alt={logo.name}
                      width={160}
                      height={64}
                      className={cn(
                        "w-auto object-contain",
                        logo.fullLogo ? "max-h-14" : "max-h-16"
                      )}
                      unoptimized
                    />
                  )}
                  {!logo.fullLogo && (
                    <span
                      className={cn(
                        "font-mono text-xs tracking-[0.12em] uppercase",
                        logo.darkBg
                          ? "text-background/70 dark:text-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {logo.name}
                    </span>
                  )}
                </div>
              )
              return logo.linkUrl ? (
                <a
                  key={logo.id}
                  href={logo.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.name}
                  className="border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={logo.id}
                  aria-label={logo.name}
                  className="border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
