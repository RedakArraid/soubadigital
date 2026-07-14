import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { CtaSection } from "@/components/sections/cta-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPole, POLES } from "@/lib/data"
import { getSiteConfig } from "@/lib/site-config"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return POLES.map((pole) => ({ slug: pole.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const pole = getPole((await params).slug)
  if (!pole) return {}
  return {
    title: pole.name,
    description: pole.lead,
  }
}

export default async function PolePage({ params }: { params: Params }) {
  const { slug } = await params
  const pole = getPole(slug)
  if (!pole) notFound()

  const config = await getSiteConfig()
  const Icon = pole.icon
  const currentIndex = POLES.findIndex((p) => p.slug === pole.slug)
  const nextPole = POLES[(currentIndex + 1) % POLES.length]

  return (
    <>
      {/* Hero du pôle */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:px-8">
        <Link
          href="/#poles"
          className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Tous les pôles
        </Link>

        <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="bg-accent text-accent-foreground grid size-12 place-items-center rounded-xl">
                <Icon className="size-6" />
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[11px] tracking-wider uppercase"
              >
                {pole.role}
              </Badge>
            </div>
            <h1 className="font-display text-balance text-4xl sm:text-5xl lg:text-6xl">
              {pole.name.split(" ")[0]}{" "}
              <em className="font-serif text-primary italic">
                {pole.name.split(" ").slice(1).join(" ")}
              </em>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {pole.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href={`tel:${config.phoneTel}`}>{config.phone}</a>
              </Button>
            </div>
          </div>

          <Card className="bg-secondary">
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{pole.description}</p>
              <ul className="space-y-2.5 border-t pt-4">
                {pole.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckIcon className="text-primary mt-0.5 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {pole.stats.map((stat) => (
            <div key={stat.label} className="bg-card border-b p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="font-heading text-primary text-3xl font-medium tracking-tight">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offres */}
      <section className="mx-auto max-w-7xl border-t px-5 py-20 md:px-8">
        <SectionHeading
          label={`Pôle ${pole.number} — Offres`}
          title="Ce que nous proposons."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pole.offerings.map((offering, i) => (
            <Reveal key={offering.title} delay={(i % 3) * 80}>
              <Card className="hover:border-ring h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <span className="font-heading text-muted-foreground text-sm">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <CardTitle className="font-heading text-lg font-medium tracking-tight">
                    {offering.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {offering.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl border-t px-5 py-20 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label-mono mb-4">FAQ</p>
            <h2 className="font-display text-balance text-3xl sm:text-4xl">
              Questions fréquentes.
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Une autre question&nbsp;? Écrivez-nous, nous répondons sous
              48&nbsp;heures.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/contact">
                Poser une question
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {pole.faq.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pôle suivant */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <Link
          href={`/poles/${nextPole.slug}`}
          className="group hover:bg-accent/40 flex items-center justify-between gap-6 rounded-2xl border p-7 transition-colors md:p-10"
        >
          <div>
            <p className="label-mono mb-2">Pôle suivant</p>
            <p className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
              {nextPole.name}
            </p>
          </div>
          <span className="border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary grid size-12 shrink-0 place-items-center rounded-full border transition-all">
            <ArrowRightIcon className="size-5" />
          </span>
        </Link>
      </section>

      <CtaSection config={config} />
    </>
  )
}
