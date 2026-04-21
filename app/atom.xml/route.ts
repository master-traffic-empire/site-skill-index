// app/atom.xml/route.ts — Atom feed for feed readers + aggregators
import { createAtomFeed } from "@base/geo/rss"
import { siteConfig } from "@/site.config"
import { getAllArticles } from "@/lib/articles"

export const GET = createAtomFeed({
  siteConfig,
  getArticles: getAllArticles,
})
