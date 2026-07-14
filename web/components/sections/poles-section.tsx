import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { POLES } from "@/lib/data"

export function PolesSection() {
  return (
    <section id="poles" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8">
      <SectionHeading
        label="§01 — Services"
        title="Trois pôles, un écosystème intégré."
        kicker="Chacun de nos pôles fonctionne en autonomie opérationnelle, mais partage la même infrastructure, la même équipe technique et la même ambition : une rentabilité scalable et durable."
      />

      <div className="border-t">
        {POLES.map((pole) => (
          <Reveal key={pole.slug}>
            <Link
              href={`/poles/${pole.slug}`}
              className="group hover:bg-accent/40 grid gap-5 border-b py-10 transition-colors md:grid-cols-[90px_1.05fr_1.4fr_1fr] md:gap-8 md:py-12"
            >
              <div className="font-heading text-muted-foreground text-4xl font-medium tracking-tight md:text-5xl">
                {pole.number}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
                  {pole.name}
                </h3>
                <p className="label-mono mt-2.5">{pole.role}</p>
              </div>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
                {pole.lead}
              </p>
              <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                <ul className="space-y-2 text-sm md:text-right">
                  {pole.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 md:flex-row-reverse">
                      <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary grid size-11 shrink-0 place-items-center rounded-full border transition-all">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
