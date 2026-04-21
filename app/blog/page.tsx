// app/blog/page.tsx — Editorial blog index for skills.thicket.sh
import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "@/site.config"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: `Skill Index Blog — Curated Claude Code skill picks`,
  description:
    "Listicles, comparisons, and picks from the Claude Code skills ecosystem.",
  alternates: { canonical: `${siteConfig.baseUrl}/blog` },
}

export default async function BlogIndex() {
  const all = await getAllArticles()
  const articles = all
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const [featured, ...rest] = articles
  return (
    <main className="blog-index">
      <header className="blog-masthead">
        <div className="blog-masthead-num">№ 01</div>
        <h1>Skill Index, the blog</h1>
        <p className="lede">
          Listicles, comparisons, and curated picks from the Claude Code skills
          ecosystem. Published as we ship new indexes.
        </p>
      </header>

      {featured && (
        <article className="blog-featured">
          <div className="blog-meta-row">
            <span className="amber">FEATURED</span>
            <span>{featured.publishedAt}</span>
            <span>#{featured.category}</span>
          </div>
          <h2>
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.description}</p>
          <Link className="read-link" href={`/blog/${featured.slug}`}>
            read →
          </Link>
        </article>
      )}

      <div className="blog-list">
        {rest.map((a) => (
          <article key={a.slug} className="blog-row">
            <div className="blog-row-meta">
              <span>{a.publishedAt}</span>
              <span className="amber">⌗</span>
              <span className="muted">#{a.category}</span>
            </div>
            <div className="blog-row-body">
              <h3>
                <Link href={`/blog/${a.slug}`}>{a.title}</Link>
              </h3>
              <p>{a.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
