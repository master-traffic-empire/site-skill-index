import type { Metadata } from "next"
import Link from "next/link"
import { Inter, JetBrains_Mono } from "next/font/google"
import { siteConfig } from "../site.config"
import { generateSiteMetadata } from "@base/lib/metadata"
import "./globals.css"

const displayFont = Inter({ subsets: ["latin"], variable: "--font-display" })
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" })
const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const baseMetadata = generateSiteMetadata(siteConfig)

export const metadata: Metadata = {
  ...baseMetadata,
  verification: {
    google: "imc5M3WIqJ7_32AR3Sf27VpNBQ32iHfU92VhObkdyKY",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="logo">{siteConfig.name}</Link>
          <nav>
            <Link href="/skills">Skills</Link>
            <Link href="/plugins">Plugins</Link>
            <a href={`https://github.com/master-traffic-empire/site-skill-index`} rel="noopener">GitHub</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>Skill data aggregated from GitHub. Page content © respective authors.</p>
          <p>Part of the <a href="https://thicket.sh">Thicket</a> network.</p>
        </footer>
      </body>
    </html>
  )
}
