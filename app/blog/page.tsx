// app/blog/page.tsx — Blog listing page
import type { Metadata } from "next"
import { siteConfig } from "@/site.config"
import { getAllArticles } from "@/lib/articles"
import { generateBlogPageMetadata } from "@base/lib/metadata"
import { ArticleCard } from "@base/components/ArticleCard"

export const metadata: Metadata = generateBlogPageMetadata(siteConfig)

export default async function BlogPage() {
  const articles = await getAllArticles()
  const blogPath = siteConfig.blog?.basePath ?? "/blog"

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Latest articles, guides, and insights.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {articles.length === 0 ? (
            <p>No articles yet. Check back soon!</p>
          ) : (
            <div className="grid">
              {articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  blogPath={blogPath}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
