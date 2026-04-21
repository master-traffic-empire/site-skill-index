// Builder agent extends this with site-specific routes
import { siteConfig } from "@/site.config"
import { getAllArticles } from "@/lib/articles"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPath = siteConfig.blog?.basePath ?? "/blog"
  const articles = await getAllArticles()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Blog listing page
  if (siteConfig.blog?.enabled) {
    staticRoutes.push({
      url: `${siteConfig.baseUrl}${blogPath}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    })
  }

  // Individual article pages
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.baseUrl}${blogPath}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...articleRoutes]
}
