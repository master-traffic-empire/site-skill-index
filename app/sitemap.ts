import type { MetadataRoute } from "next"
import { siteConfig } from "../site.config"
import { allSkills, allPlugins, generatedAt } from "../lib/skills"

export default function sitemap(): MetadataRoute.Sitemap {
  const gen = new Date(generatedAt())
  const base = siteConfig.baseUrl
  const out: MetadataRoute.Sitemap = [
    { url: base, lastModified: gen, priority: 1.0 },
    { url: `${base}/skills`, lastModified: gen, priority: 0.9 },
    { url: `${base}/plugins`, lastModified: gen, priority: 0.9 },
  ]
  for (const s of allSkills()) {
    out.push({
      url: `${base}/skills/${s.plugin_slug}/${s.name}`,
      lastModified: gen,
      priority: s.verified ? 1.0 : 0.6,
    })
  }
  for (const p of allPlugins()) {
    out.push({
      url: `${base}/plugins/${p.slug}`,
      lastModified: gen,
      priority: p.verified ? 0.9 : 0.5,
    })
  }
  return out
}
