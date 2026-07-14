import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 md:px-8 md:pt-16">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Badge
          variant="outline"
          className="gap-2.5 px-3.5 py-1.5 text-xs font-normal"
        >
          <span className="relative flex size-1.75">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-primary relative inline-flex size-1.75 rounded-full" />
          </span>
          Disponible pour de nouveaux projets · {new Date().getFullYear()}
        </Badge>
        <p className="text-muted-foreground text-xs leading-relaxed sm:text-right">
          ESN · Agence digitale · Gaming & Location · SaaS
          <br />
          Construire un écosystème digital intégré.
        </p>
      </div>

      <h1 className="font-display text-[clamp(46px,8.4vw,132px)]">
        <span className="block">
          Le <em className="font-serif text-primary pr-1 italic">digital,</em>
        </span>
        <span className="block">pensé pour</span>
        <span className="text-primary block font-medium">
          votre croissance.
        </span>
      </h1>

      <div className="mt-12 grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty">
          SOUBA DIGITAL est un{" "}
          <b className="text-foreground font-medium">groupe entrepreneurial</b>{" "}
          qui combine prestation de services numériques, exploitation de salles
          de jeu modernes et développement d&apos;un SaaS de gestion. Trois
          pôles, une mission&nbsp;: rendre la transformation digitale et le
          divertissement{" "}
          <b className="text-foreground font-medium">
            accessibles, rentables et durables
          </b>{" "}
          pour les PME et les nouvelles générations.
        </p>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/#poles">
              Découvrir nos pôles
              <ArrowRightIcon />
            </Link>
          </Button>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">
              Démarrer un projet
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
