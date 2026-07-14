"use client"

import * as React from "react"
import { SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { POLES } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = React.useState("")
  const [pole, setPole] = React.useState<string>("")
  const [message, setMessage] = React.useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Demande de projet${pole ? ` — ${pole}` : ""}${name ? ` (${name})` : ""}`
    )
    const body = encodeURIComponent(
      `Bonjour SOUBA DIGITAL,\n\n${message}\n\n— ${name}`
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Votre nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom et prénom, ou nom de votre entreprise"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Quel pôle vous intéresse&nbsp;?</Label>
            <div className="flex flex-wrap gap-2">
              {POLES.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setPole(pole === p.name ? "" : p.name)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    pole === p.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Votre projet</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez votre projet, vos délais, votre budget approximatif…"
              rows={6}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full">
            Envoyer par e-mail
            <SendIcon />
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            Le formulaire ouvre votre messagerie avec le message pré-rempli.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
