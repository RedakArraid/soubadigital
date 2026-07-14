import type { Metadata } from "next"
import {
  Bricolage_Grotesque,
  Geist,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/data"
import { getSiteConfig } from "@/lib/site-config"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Agence digitale, Gaming & SaaS`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const config = await getSiteConfig()

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontHeading.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter config={config} />
        </ThemeProvider>
      </body>
    </html>
  )
}
