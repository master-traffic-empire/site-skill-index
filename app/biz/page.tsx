import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { BUSINESS_CATEGORIES, skillsForBusinessCategory } from "../../lib/skills"

export const metadata: Metadata = {
  title: `Claude Code skills by business function | ${siteConfig.name}`,
  description: "Browse Claude Code skills by business function — content, email, ads, funnels, ops, finance and more.",
  alternates: { canonical: `${siteConfig.baseUrl}/biz` },
}

export default function BizIndex() {
  return (
    <main>
      <h1 className="idx-h1">Skills by business function</h1>
      <p className="idx-sub">
        <span className="amber">{BUSINESS_CATEGORIES.length}</span> functions // non-engineering work
      </p>
      <ul className="idx-grid">
        {BUSINESS_CATEGORIES.map(c => {
          const count = skillsForBusinessCategory(c.slug).length
          return (
            <li key={c.slug}>
              <Link href={`/biz/${c.slug}`} className="idx-card">
                <span className="idx-card-name">{c.label}</span>
                <span className="idx-card-count">{count} skills</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
