import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Labubu Geometry Dash - Play Free Online Game",
  description:
    "Play Labubu Geometry Dash online - An exciting rhythm-based platformer featuring the adorable Labubu character. Jump, fly, and flip your way through dangerous passages!",
  keywords: ["Labubu Geometry Dash", "Labubu game", "geometry dash", "online game", "free game"],
  alternates: {
    canonical: "https://labubugames.games/",
  },
  openGraph: {
    title: "Labubu Geometry Dash - Play Free Online Game",
    description:
      "Play Labubu Geometry Dash online - An exciting rhythm-based platformer featuring the adorable Labubu character.",
    url: "https://labubugames.games/",
    siteName: "Labubu Games",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
