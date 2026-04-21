import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { CATEGORIES, skillsForCategory } from "../../lib/skills"

export const metadata: Metadata = {
  title: `All Claude Code skill categories | ${siteConfig.name}`,
  description: "Browse Claude Code skills by category.",
  alternates: { canonical: `${siteConfig.baseUrl}/categories` },
}

export default function CategoriesIndex() {
  return (
    <main>
      <h1 className="idx-h1">Skill categories</h1>
      <p className="idx-sub">
        <span className="amber">{CATEGORIES.length}</span> categories // browse by topic
      </p>
      <ul className="cat-idx-grid">
        {CATEGORIES.map(c => {
          const count = skillsForCategory(c.slug).length
          return (
            <li key={c.slug}>
              <Link href={`/categories/${c.slug}`} className="cat-idx-card">
                <img
                  src={`/images/categories/${c.slug}.webp`}
                  alt={`Illustration for ${c.label}`}
                  className="cat-idx-banner"
                  width={800}
                  height={450}
                  loading="lazy"
                />
                <span className="cat-idx-meta">
                  <span className="idx-card-name">{c.label}</span>
                  <span className="idx-card-count">{count} skills</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
