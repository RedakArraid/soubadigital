import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { PROCESS_STEPS } from "@/lib/data"

export function ProcessSection() {
  return (
    <section
      id="methode"
      className="mx-auto max-w-7xl scroll-mt-20 border-t px-5 py-24 md:px-8"
    >
      <SectionHeading
        label="§04 — Méthode"
        title="Comment nous livrons."
        kicker="Un processus court, transparent et itératif. Pas de jargon, pas de mois perdus — des livraisons rapides, mesurables et adaptées à votre réalité terrain."
      />

      <div className="grid border-y md:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 80}>
            <div className="flex min-h-56 flex-col gap-4 border-t px-1 py-8 first:border-t-0 md:min-h-64 md:border-t-0 md:border-l md:px-6 md:first:border-l-0">
              <span className="font-heading text-muted-foreground text-2xl font-medium tracking-tight">
                {step.number}
              </span>
              <h4 className="font-heading text-xl font-medium tracking-tight">
                {step.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
