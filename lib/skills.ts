import indexData from "../content/skills-index.json"

export interface Skill {
  slug: string
  name: string
  plugin_slug: string
  type: "skill" | "command"
  description: string
  invocation_triggers: string | string[] | null
  readme_markdown: string
  frontmatter_raw: Record<string, unknown>
  file_path: string
  repo: string
  verified: boolean
  github: {
    stars: number
    last_commit_at: string | null
    license: string | null
    contributors_count: number
  }
  trust_signals: {
    readme_length: number
    frontmatter_completeness: number
    stars: number
    age_days: number | null
  }
  related_slugs: string[]
  personas: string[]
  category: string | null
  business_category: string | null
}

export interface Plugin {
  slug: string
  repo: string
  verified: boolean
  skills: Skill[]
  stars: number
  last_commit_at: string | null
}

const index = indexData as { generated_at: string; count: number; records: Skill[] }

export function allSkills(): Skill[] {
  return index.records
}

export function getSkill(pluginSlug: string, name: string): Skill | undefined {
  return index.records.find(r => r.plugin_slug === pluginSlug && r.name === name)
}

export function allPlugins(): Plugin[] {
  const bySlug = new Map<string, Plugin>()
  for (const r of index.records) {
    const existing = bySlug.get(r.plugin_slug)
    if (existing) {
      existing.skills.push(r)
      continue
    }
    bySlug.set(r.plugin_slug, {
      slug: r.plugin_slug,
      repo: r.repo,
      verified: r.verified,
      skills: [r],
      stars: r.github?.stars ?? 0,
      last_commit_at: r.github?.last_commit_at ?? null,
    })
  }
  return [...bySlug.values()].sort((a, b) =>
    Number(b.verified) - Number(a.verified) || b.stars - a.stars
  )
}

export function getPlugin(slug: string): Plugin | undefined {
  return allPlugins().find(p => p.slug === slug)
}

export function generatedAt(): string {
  return index.generated_at
}

export const PERSONAS = [
  { slug: "graphic-designers", label: "Graphic designers" },
  { slug: "architects", label: "Architects" },
  { slug: "content-creators", label: "Content creators" },
  { slug: "frontend-developers", label: "Frontend developers" },
  { slug: "backend-engineers", label: "Backend engineers" },
  { slug: "ml-engineers", label: "ML engineers" },
  { slug: "devops-engineers", label: "DevOps engineers" },
  { slug: "data-analysts", label: "Data analysts" },
  { slug: "founders", label: "Founders" },
  { slug: "marketers", label: "Marketers" },
  { slug: "students", label: "Students" },
] as const

export const CATEGORIES = [
  { slug: "development", label: "Development" },
  { slug: "design", label: "Design" },
  { slug: "writing", label: "Writing" },
  { slug: "data", label: "Data" },
  { slug: "devops", label: "DevOps" },
  { slug: "learning", label: "Learning" },
  { slug: "productivity", label: "Productivity" },
  { slug: "research", label: "Research" },
  { slug: "marketing", label: "Marketing" },
  { slug: "fun", label: "Fun" },
] as const

export const BUSINESS_CATEGORIES = [
  { slug: "content-copywriting", label: "Content & copywriting" },
  { slug: "email-marketing", label: "Email marketing" },
  { slug: "social-media", label: "Social media" },
  { slug: "seo-search", label: "SEO & search" },
  { slug: "ads-paid-media", label: "Ads & paid media" },
  { slug: "sales-funnels", label: "Sales & funnels" },
  { slug: "branding-design-biz", label: "Branding & design" },
  { slug: "finance-pricing", label: "Finance & pricing" },
  { slug: "legal-compliance", label: "Legal & compliance" },
  { slug: "operations-systems", label: "Operations & systems" },
  { slug: "hr-team", label: "HR & team" },
  { slug: "client-consulting", label: "Client & consulting" },
  { slug: "courses-education", label: "Courses & education" },
  { slug: "events-speaking", label: "Events & speaking" },
  { slug: "launch-growth", label: "Launch & growth" },
  { slug: "analytics-data-biz", label: "Analytics & data" },
  { slug: "ecommerce-products", label: "Ecommerce & products" },
  { slug: "industry-specific", label: "Industry-specific" },
  { slug: "ai-technology-biz", label: "AI & technology" },
  { slug: "nonprofit-community", label: "Nonprofit & community" },
] as const

export function skillsForPersona(slug: string): Skill[] {
  return allSkills().filter(s => s.personas?.includes(slug))
}
export function skillsForCategory(slug: string): Skill[] {
  return allSkills().filter(s => s.category === slug)
}
export function skillsForBusinessCategory(slug: string): Skill[] {
  return allSkills().filter(s => s.business_category === slug)
}
