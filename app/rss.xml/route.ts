// app/rss.xml/route.ts — RSS 2.0 feed for Google Discover + feed readers
import { createRssFeed } from "@base/geo/rss"
import { siteConfig } from "@/site.config"
import { getAllArticles } from "@/lib/articles"

export const GET = createRssFeed({
  siteConfig,
  getArticles: getAllArticles,
})
