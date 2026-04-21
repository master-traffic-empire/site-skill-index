// site.config.ts — Builder agent populates this per site
// All other files import from here — never hardcode values.

import type { SiteConfig } from "@base/types"

export const siteConfig: SiteConfig = {
  slug: "PLACEHOLDER",
  name: "PLACEHOLDER",
  tagline: "PLACEHOLDER",
  description: "PLACEHOLDER",
  domain: "PLACEHOLDER.thicket.sh",
  baseUrl: "https://PLACEHOLDER.thicket.sh",
  category: "PLACEHOLDER",

  primaryKeyword: "PLACEHOLDER",
  targetKeywords: [],
  twitterHandle: "",

  colors: {
    primary: "#0F172A",
    secondary: "#6366F1",
    accent: "#22D3EE",
    surface: "#F8FAFC",
    surfaceDark: "#0F172A",
    text: "#1E293B",
    textMuted: "#64748B",
    border: "#E2E8F0",
  },

  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  gaMeasurementId: "G-E0CF8H2DGH",

  itemsPerPage: 24,
  featuredCount: 6,

  geo: {
    llmsTxtEnabled: true,
    llmsFullTxtEnabled: true,
    mdRoutesEnabled: true,
    structuredApiEnabled: true,
  },

  blog: {
    enabled: true,
    basePath: "/blog",
  },

  monetization: {
    adsenseEnabled: false,
    adsenseClientId: "",
    affiliateEnabled: false,
  },
}
