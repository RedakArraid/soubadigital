import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { WhatsAppIcon } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import type { SiteConfig } from "@/lib/site-config"

export function CtaSection({ config }: { config: SiteConfig }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
      <div className="bg-accent relative overflow-hidden rounded-3xl border px-7 py-14 md:px-16 md:py-20">
        <div className="bg-primary/20 pointer-events-none absolute -bottom-48 -left-32 size-[480px] rounded-full blur-3xl" />

        <div className="relative grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <h2 className="font-display max-w-[14ch] text-balance text-4xl sm:text-5xl lg:text-7xl">
            Parlons de votre{" "}
            <em className="font-serif text-primary italic">projet</em>.
          </h2>
          <div className="space-y-5">
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Vous êtes une PME, un porteur de projet, une salle de jeu ou un
              investisseur&nbsp;? Écrivez-nous — nous répondons sous
              48&nbsp;heures.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Nous contacter
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href={`tel:${config.phoneTel}`}>{config.phone}</a>
              </Button>
              <Button
                asChild
                size="icon-lg"
                className="rounded-full border-[#25D366] bg-[#25D366] text-white hover:bg-[#20bd5a]"
              >
                <a
                  href={config.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nous contacter sur WhatsApp"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
