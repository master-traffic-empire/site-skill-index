import { siteConfig } from "../../site.config"
import { allSkills } from "../../lib/skills"
import { getAllArticles } from "../../lib/articles"

export async function GET() {
  const all = allSkills()
  const articles = await getAllArticles()
  const skillBody = all.map(s => `## ${s.plugin_slug}/${s.name} ${s.verified ? "[verified]" : ""}

URL: ${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}
Install: \`/plugin install ${s.plugin_slug}\`
Type: ${s.type}
Description: ${s.description ?? ""}
`).join("\n")

  const articleBody = articles.length
    ? `\n# Blog articles\n\n${articles.map(a => `## ${a.title}

URL: ${siteConfig.baseUrl}/blog/${a.slug}
Published: ${a.publishedAt}
Category: ${a.category}
Description: ${a.description}
`).join("\n")}`
    : ""

  const body = `# ${siteConfig.name} — full index

${skillBody}${articleBody}`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
