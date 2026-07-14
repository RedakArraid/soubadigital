import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-28 md:px-8">
      <p className="label-mono">Erreur 404</p>
      <h1 className="font-display text-balance text-4xl sm:text-5xl">
        Cette page n&apos;existe{" "}
        <em className="font-serif text-primary italic">pas</em>.
      </h1>
      <p className="text-muted-foreground max-w-md leading-relaxed">
        Le lien que vous avez suivi est peut-être obsolète, ou la page a été
        déplacée.
      </p>
      <Button asChild className="rounded-full">
        <Link href="/">
          <ArrowLeftIcon />
          Retour à l&apos;accueil
        </Link>
      </Button>
    </section>
  )
}
