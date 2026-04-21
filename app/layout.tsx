// app/layout.tsx — Builder agent customizes fonts per site
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { siteConfig } from "@/site.config"
import { RootLayout } from "@base/layouts/RootLayout"
import { generateSiteMetadata } from "@base/lib/metadata"
import "@base/styles/globals.css"

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
})

const displayFont = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
})

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

export const viewport: Viewport = {
  themeColor: siteConfig.colors.primary,
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = generateSiteMetadata(siteConfig)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      siteConfig={siteConfig}
      fontVariables={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      {children}
    </RootLayout>
  )
}
