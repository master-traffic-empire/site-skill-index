import type { MetadataRoute } from "next"
import { siteConfig } from "../site.config"
import { allSkills, allPlugins, generatedAt, PERSONAS, CATEGORIES, BUSINESS_CATEGORIES } from "../lib/skills"
import { getAllArticles } from "../lib/articles"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  for (const p of PERSONAS) out.push({ url: `${base}/for/${p.slug}`, lastModified: gen, priority: 0.8 })
  for (const c of CATEGORIES) out.push({ url: `${base}/categories/${c.slug}`, lastModified: gen, priority: 0.8 })
  for (const b of BUSINESS_CATEGORIES) out.push({ url: `${base}/biz/${b.slug}`, lastModified: gen, priority: 0.8 })
  out.push({ url: `${base}/for`, lastModified: gen, priority: 0.8 })
  out.push({ url: `${base}/categories`, lastModified: gen, priority: 0.8 })
  out.push({ url: `${base}/biz`, lastModified: gen, priority: 0.8 })

  // Blog
  const articles = await getAllArticles()
  if (articles.length) {
    out.push({ url: `${base}/blog`, lastModified: gen, priority: 0.8 })
    for (const a of articles) {
      out.push({
        url: `${base}/blog/${a.slug}`,
        lastModified: new Date(a.updatedAt || a.publishedAt),
        priority: 0.7,
      })
    }
  }
  return out
}
