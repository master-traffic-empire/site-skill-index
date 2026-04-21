// app/blog/[slug]/page.tsx — Individual article page (Google Discover optimized)
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/site.config"
import { getAllArticles, getArticleBySlug } from "@/lib/articles"
import { generateArticleMetadata } from "@base/lib/metadata"
import { ArticlePage } from "@base/components/ArticlePage"

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

export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <ArticlePage
      article={article}
      siteConfig={siteConfig}
      contentHtml={article.content}
    />
  )
}
