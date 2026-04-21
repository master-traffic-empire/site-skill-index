import { siteConfig } from "../../site.config"
import { allSkills } from "../../lib/skills"

export async function GET() {
  const verified = allSkills().filter(s => s.verified)
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Verified Claude Code skills & commands

${verified.map(s => `- [${s.plugin_slug}/${s.name}](${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}): ${s.description} (install: \`/plugin install ${s.plugin_slug}\`)`).join("\n")}
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
