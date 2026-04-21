import { siteConfig } from "../../site.config"
import { allSkills, generatedAt } from "../../lib/skills"

export async function GET() {
  const items = allSkills()
    .slice()
    .sort((a, b) => (b.github.last_commit_at ?? "").localeCompare(a.github.last_commit_at ?? ""))
    .slice(0, 50)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${siteConfig.name}</title>
<link>${siteConfig.baseUrl}</link>
<description>${siteConfig.description}</description>
<lastBuildDate>${new Date(generatedAt()).toUTCString()}</lastBuildDate>
${items.map(s => `<item>
  <title><![CDATA[${s.plugin_slug}/${s.name}]]></title>
  <link>${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}</link>
  <guid>${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}</guid>
  <description><![CDATA[${s.description}]]></description>
  <pubDate>${s.github.last_commit_at ? new Date(s.github.last_commit_at).toUTCString() : new Date(generatedAt()).toUTCString()}</pubDate>
</item>`).join("\n")}
</channel></rss>`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
