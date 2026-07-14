import { CtaSection } from "@/components/sections/cta-section"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { PolesSection } from "@/components/sections/poles-section"
import { ProcessSection } from "@/components/sections/process-section"
import { VisionSection } from "@/components/sections/vision-section"
import { WorksSection } from "@/components/sections/works-section"
import { getSiteConfig } from "@/lib/site-config"

export default async function HomePage() {
  const config = await getSiteConfig()

  return (
    <>
      <Hero />
      <Marquee />
      <PolesSection />
      <WorksSection config={config} />
      <VisionSection />
      <ProcessSection />
      <CtaSection config={config} />
    </>
  )
}
