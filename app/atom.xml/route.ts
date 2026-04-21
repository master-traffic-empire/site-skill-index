import { siteConfig } from "../../site.config"
import { allSkills, generatedAt } from "../../lib/skills"

export async function GET() {
  const items = allSkills()
    .slice()
    .sort((a, b) => (b.github.last_commit_at ?? "").localeCompare(a.github.last_commit_at ?? ""))
    .slice(0, 50)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>${siteConfig.name}</title>
<link href="${siteConfig.baseUrl}"/>
<updated>${new Date(generatedAt()).toISOString()}</updated>
<id>${siteConfig.baseUrl}/</id>
${items.map(s => `<entry>
  <title>${s.plugin_slug}/${s.name}</title>
  <link href="${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}"/>
  <id>${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}</id>
  <updated>${s.github.last_commit_at ?? generatedAt()}</updated>
  <summary><![CDATA[${s.description ?? ""}]]></summary>
</entry>`).join("\n")}
</feed>`
  return new Response(xml, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } })
}
