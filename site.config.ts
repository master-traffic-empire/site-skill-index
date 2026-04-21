import type { SiteConfig } from "@base/types"

export const siteConfig: SiteConfig = {
  slug: "skill-index",
  name: "Skill Index",
  tagline: "Every Claude Code skill, one install command away",
  description: "Browse and install Claude Code skills and slash commands. 500+ plugins indexed from GitHub — verified official plugins plus the wider community, with trust signals, source links, and copy-paste install commands.",
  domain: "skills.thicket.sh",
  baseUrl: "https://skills.thicket.sh",
  category: "content",

  primaryKeyword: "claude code skills",
  targetKeywords: [
    "claude code skills",
    "claude code plugins",
    "claude code skill install",
    "install claude skill",
    "claude skill directory",
    "superpowers skill",
  ],
  twitterHandle: "",

  colors: {
    primary: "#0B0F19",
    secondary: "#7C3AED",
    accent: "#22D3EE",
    surface: "#F8FAFC",
    surfaceDark: "#0B0F19",
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
    enabled: false,
    basePath: "/blog",
  },

  monetization: {
    adsenseEnabled: false,
    adsenseClientId: "",
    affiliateEnabled: false,
  },
}
