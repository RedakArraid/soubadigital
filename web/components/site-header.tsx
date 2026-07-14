"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { POLES } from "@/lib/data"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/#poles", label: "Pôles" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#vision", label: "Vision" },
  { href: "/#methode", label: "Méthode" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="bg-foreground dark:bg-secondary grid size-9 place-items-center rounded-lg p-1.5">
            <Image
              src="/logo-mark.png"
              alt=""
              width={28}
              height={24}
              className="h-auto w-full"
            />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            SOUBA <span className="text-muted-foreground font-normal">Digital</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link href="/contact">
              <span className="bg-primary-foreground/70 size-1.5 rounded-full" />
              Démarrer un projet
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Ouvrir le menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left text-sm font-semibold">
                  SOUBA Digital
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2.5 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="bg-border my-3 h-px" />
                {POLES.map((pole) => (
                  <Link
                    key={pole.slug}
                    href={`/poles/${pole.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2.5 text-sm transition-colors",
                      pathname === `/poles/${pole.slug}` &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    {pole.name}
                  </Link>
                ))}
                <div className="bg-border my-3 h-px" />
                <Button asChild className="mt-1 rounded-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Démarrer un projet
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
