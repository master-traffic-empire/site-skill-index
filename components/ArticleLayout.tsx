// components/ArticleLayout.tsx
// Editorial article layout for skills.thicket.sh blog.
// Replaces the shared base-site ArticlePage for this site — drops the broken
// hero image, adds a terminal-ls metadata header, drop cap lede, and converts
// numbered listicle sections into ArticleSkillCard components.

import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import type { Article, SiteConfig } from "../base-site/types"
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "../base-site/lib/jsonld"
import { ArticleSkillCard } from "./ArticleSkillCard"

interface Props {
  article: Article
  siteConfig: SiteConfig
  contentHtml: string
  related?: Array<{ slug: string; title: string }>
}

/** Very small HTML segmenter — splits content into blocks keyed by top-level tag. */
function splitIntoBlocks(html: string): string[] {
  // Match top-level block tags. Content authored by our writer agents is a
  // flat sequence of <p>, <h2>, <h3>, <ul>, <ol>, <blockquote>, <pre>.
  const blocks: string[] = []
  const re = /<(p|h2|h3|h4|ul|ol|blockquote|pre|figure)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi
  let m: RegExpExecArray | null
  let last = 0
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) {
      const leftover = html.slice(last, m.index).trim()
      if (leftover) blocks.push(leftover)
    }
    blocks.push(m[0])
    last = m.index + m[0].length
  }
  if (last < html.length) {
    const trailing = html.slice(last).trim()
    if (trailing) blocks.push(trailing)
  }
  return blocks
}

/** Parse an H2 like "1. skill-name — plugin" into rank + skill label. */
function parseNumberedHeading(h2Html: string): { rank: number; text: string } | null {
  const inner = h2Html.replace(/^<h2[^>]*>/i, "").replace(/<\/h2>$/i, "")
  // Strip tags for matching
  const plain = inner.replace(/<[^>]+>/g, "").trim()
  const m = /^(\d+)\.\s*(.+)$/.exec(plain)
  if (!m) return null
  return { rank: parseInt(m[1], 10), text: m[2] }
}

/** Find the first /skills/PLUGIN/NAME link inside a chunk of HTML. */
function extractSkillRef(html: string): { plugin: string; name: string } | null {
  const m = /href="\/skills\/([^/"]+)\/([^"]+)"/.exec(html)
  if (!m) return null
  return { plugin: m[1], name: m[2] }
}

type RenderedBlock = { type: "html"; html: string } | { type: "card"; plugin: string; name: string; rank: number; extraHtml: string }

/** Walk the blocks and collapse (H2 numbered) + following paragraphs into a skill card. */
function buildBlocks(html: string): RenderedBlock[] {
  const raw = splitIntoBlocks(html)
  const out: RenderedBlock[] = []
  let i = 0
  while (i < raw.length) {
    const b = raw[i]
    if (/^<h2/i.test(b)) {
      const heading = parseNumberedHeading(b)
      if (heading) {
        // Collect following blocks until next h2
        const group: string[] = []
        let j = i + 1
        while (j < raw.length && !/^<h2/i.test(raw[j])) {
          group.push(raw[j])
          j++
        }
        const groupHtml = group.join("")
        const ref = extractSkillRef(groupHtml)
        if (ref) {
          // Strip the "Learn more →" trailing link + any pure `<p><code>/plugin install ...</code></p>`
          // from extra prose (avoid redundancy with the card's own install line).
          const trimmed = group
            .filter(
              (p) =>
                !/href="\/skills\/[^"]+"/.test(p) &&
                !/\/plugin\s+install/.test(p.replace(/<[^>]+>/g, "")),
            )
            .join("")
          out.push({
            type: "card",
            plugin: ref.plugin,
            name: ref.name,
            rank: heading.rank,
            extraHtml: trimmed,
          })
          i = j
          continue
        }
      }
    }
    out.push({ type: "html", html: b })
    i++
  }
  return out
}

function RenderBlocks({ blocks }: { blocks: RenderedBlock[] }): ReactNode {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "card") {
          return (
            <Fragment key={i}>
              <ArticleSkillCard pluginSlug={b.plugin} name={b.name} rank={b.rank} />
              {b.extraHtml && (
                <div dangerouslySetInnerHTML={{ __html: b.extraHtml }} />
              )}
            </Fragment>
          )
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />
      })}
    </>
  )
}

function formatPublished(d: string): string {
  const date = new Date(d)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function ArticleLayout({ article, siteConfig, contentHtml, related = [] }: Props) {
  const blogPath = siteConfig.blog?.basePath ?? "/blog"

  // JSON-LD: keep the schema intact, but strip the broken hero image.
  const articleJsonLd = generateArticleJsonLd(article, siteConfig) as Record<string, unknown>
  articleJsonLd.image = [`${siteConfig.baseUrl}/og-image.png`]

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.baseUrl },
    { name: "Blog", url: `${siteConfig.baseUrl}${blogPath}` },
    { name: article.title, url: `${siteConfig.baseUrl}${blogPath}/${article.slug}` },
  ])

  const blocks = buildBlocks(contentHtml)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="article art-editorial">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href={blogPath}>Blog</Link>
          <span className="sep">/</span>
          <span>{article.category}</span>
        </nav>

        <div className="art-meta">
          <div className="art-meta-cmd">$ cat {article.slug}.md</div>
          <div className="art-meta-stat">
            <span className="amber">-rw-r--r--</span>{" "}
            <span>editorial</span>{" "}
            <span>{article.publishedAt}</span>{" "}
            <span className="muted">#{article.category.toLowerCase().replace(/\s+/g, "-")}</span>{" "}
            <span className="muted">{article.readingTime}min read</span>
          </div>
        </div>

        <header className="art-head">
          <h1 className="art-title">{article.title}</h1>
          <time className="art-timestamp" dateTime={article.publishedAt}>
            {formatPublished(article.publishedAt)}
          </time>
        </header>

        <div className="article-body art-body">
          <RenderBlocks blocks={blocks} />
        </div>

        {related.length > 0 && (
          <section className="art-related">
            <h2>More from the Skill Index</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`${blogPath}/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="article-footer">
          <div className="article-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="badge">
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </>
  )
}
