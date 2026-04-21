import type { Metadata } from "next"
import Link from "next/link"
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google"
import { siteConfig } from "../site.config"
import { generateSiteMetadata } from "@base/lib/metadata"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
})
const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
})
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
})

const baseMetadata = generateSiteMetadata(siteConfig)

export const metadata: Metadata = {
  ...baseMetadata,
  verification: {
    google: "imc5M3WIqJ7_32AR3Sf27VpNBQ32iHfU92VhObkdyKY",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmsans.variable} ${jbmono.variable}`}>
      <body>
        <header className="chrome">
          <Link href="/" className="brand">
            <span className="brand-mark">▊</span>
            <span className="brand-name">Skill Index</span>
          </Link>
          <nav className="chrome-nav">
            <Link href="/skills">skills</Link>
            <Link href="/plugins">plugins</Link>
            <Link href="/for">for</Link>
            <Link href="/biz">biz</Link>
            <Link href="/categories">categories</Link>
            <Link href="/blog">blog</Link>
          </nav>
        </header>
        {children}
        <footer className="chrome-foot">
          <p>skills.thicket.sh // aggregated from github // data © respective authors</p>
          <p>part of the <a href="https://thicket.sh">thicket</a> network</p>
        </footer>
      </body>
    </html>
  )
}
