import { Reveal } from "@/components/reveal"
import { VISION_CELLS } from "@/lib/data"

export function VisionSection() {
  return (
    <section id="vision" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-24 md:px-8">
      <div className="bg-secondary relative overflow-hidden rounded-3xl border px-7 py-14 md:px-16 md:py-20">
        <div className="bg-primary/20 pointer-events-none absolute -top-40 -right-40 size-[480px] rounded-full blur-3xl" />

        <p className="label-mono relative mb-6">§03 — Vision & positionnement</p>
        <blockquote className="font-display relative max-w-[26ch] text-balance text-3xl sm:text-4xl lg:text-5xl">
          Devenir un acteur{" "}
          <em className="font-serif text-primary italic">majeur</em> du digital
          et du divertissement — reconnu pour la qualité, l&apos;innovation et
          son impact.
        </blockquote>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {VISION_CELLS.map((cell, i) => (
            <Reveal key={cell.label} delay={i * 100}>
              <div className="border-t pt-6">
                <p className="label-mono">{cell.label}</p>
                <h4 className="font-heading mt-3 text-lg font-medium tracking-tight">
                  {cell.title}
                </h4>
                <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                  {cell.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
