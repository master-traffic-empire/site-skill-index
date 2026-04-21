// app/blog/[slug]/page.tsx — Individual article page
// Uses local ArticleLayout (editorial redesign) instead of the shared
// base-site ArticlePage. Preserves SEO (canonical, meta, JSON-LD, breadcrumb).
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/site.config"
import { getAllArticles, getArticleBySlug } from "@/lib/articles"
import { generateArticleMetadata } from "@base/lib/metadata"
import { ArticleLayout } from "../../../components/ArticleLayout"
import type { Article } from "@base/types"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return generateArticleMetadata(article, siteConfig)
}

function pickRelated(current: Article, all: Article[]): Array<{ slug: string; title: string }> {
  const others = all.filter((a) => a.slug !== current.slug)
  const tagSet = new Set(current.tags)
  const scored = others.map((a) => {
    const tagOverlap = a.tags.filter((t) => tagSet.has(t)).length
    const sameCategory = a.category === current.category ? 1 : 0
    return { a, score: tagOverlap * 2 + sameCategory }
  })
  scored.sort((x, y) => y.score - x.score)
  return scored.slice(0, 3).map(({ a }) => ({ slug: a.slug, title: a.title }))
}

export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const all = await getAllArticles()
  const related = pickRelated(article, all)

  return (
    <ArticleLayout
      article={article}
      siteConfig={siteConfig}
      contentHtml={article.content}
      related={related}
    />
  )
}
