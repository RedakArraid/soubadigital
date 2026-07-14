import type { Metadata } from "next"
import { MailIcon, PhoneIcon } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { WhatsAppIcon } from "@/components/social-icons"
import { getSiteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet — nous répondons sous 48 heures. E-mail, téléphone ou WhatsApp.",
}

export default async function ContactPage() {
  const config = await getSiteConfig()

  const channels = [
    {
      icon: MailIcon,
      label: "E-mail",
      value: config.email,
      href: `mailto:${config.email}`,
      external: false,
    },
    {
      icon: PhoneIcon,
      label: "Téléphone",
      value: config.phone,
      href: `tel:${config.phoneTel}`,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Discuter maintenant",
      href: config.whatsapp,
      external: true,
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="label-mono mb-5">Contact</p>
          <h1 className="font-display text-balance text-4xl sm:text-5xl lg:text-6xl">
            Parlons de votre{" "}
            <em className="font-serif text-primary italic">projet</em>.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">
            Vous êtes une PME, un porteur de projet, une salle de jeu ou un
            investisseur&nbsp;? Écrivez-nous — nous répondons sous
            48&nbsp;heures.
          </p>

          <div className="mt-10 space-y-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group hover:bg-accent/40 flex items-center gap-4 rounded-2xl border p-4 transition-colors"
              >
                <span className="bg-accent text-accent-foreground grid size-11 shrink-0 place-items-center rounded-xl">
                  <channel.icon className="size-5" />
                </span>
                <span>
                  <span className="label-mono block">{channel.label}</span>
                  <span className="group-hover:text-primary mt-0.5 block text-sm font-medium transition-colors">
                    {channel.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm email={config.email} />
      </div>
    </section>
  )
}
