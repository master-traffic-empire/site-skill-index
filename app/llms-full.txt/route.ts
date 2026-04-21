import { siteConfig } from "../../site.config"
import { allSkills } from "../../lib/skills"

export async function GET() {
  const all = allSkills()
  const body = `# ${siteConfig.name} — full index

${all.map(s => `## ${s.plugin_slug}/${s.name} ${s.verified ? "[verified]" : ""}

URL: ${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}
Install: \`/plugin install ${s.plugin_slug}\`
Type: ${s.type}
Description: ${s.description}
`).join("\n")}`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
