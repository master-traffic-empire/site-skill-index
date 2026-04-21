import { siteConfig } from "../../site.config"
import { allSkills, PERSONAS, CATEGORIES, skillsForPersona, skillsForCategory } from "../../lib/skills"

export async function GET() {
  const verified = allSkills().filter(s => s.verified)
  const personaLines = PERSONAS.map(p => {
    const count = skillsForPersona(p.slug).length
    return `- [${p.label}](${siteConfig.baseUrl}/for/${p.slug}): ${count} skills curated for ${p.label.toLowerCase()}`
  }).join("\n")
  const categoryLines = CATEGORIES.map(c => {
    const count = skillsForCategory(c.slug).length
    return `- [${c.label}](${siteConfig.baseUrl}/categories/${c.slug}): ${count} ${c.label.toLowerCase()} skills`
  }).join("\n")
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Verified Claude Code skills & commands

${verified.map(s => `- [${s.plugin_slug}/${s.name}](${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}): ${s.description ?? ""} (install: \`/plugin install ${s.plugin_slug}\`)`).join("\n")}

## Collections

### By audience

${personaLines}

### By category

${categoryLines}
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
