import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KALESHPHILE - Your Dramatic AI Girlfriend",
  description:
    "Experience playful arguments and Bollywood-level drama with your AI girlfriend who overthinks everything!",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#e11d48",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
