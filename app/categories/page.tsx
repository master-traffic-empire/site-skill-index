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
      <h1>Skill categories</h1>
      <ul className="persona-list">
        {CATEGORIES.map(c => {
          const count = skillsForCategory(c.slug).length
          return (
            <li key={c.slug}>
              <Link href={`/categories/${c.slug}`}>{c.label}</Link>
              <span>— {count} skill{count === 1 ? "" : "s"}</span>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
