import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Labubu Geometry Dash - Play Free Online Game",
  description:
    "Play Labubu Geometry Dash online - An exciting rhythm-based platformer featuring the adorable Labubu character. Jump, fly, and flip your way through dangerous passages!",
  keywords: "Labubu Geometry Dash, Labubu game, geometry dash, online game, free game",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://labubugames.games/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
