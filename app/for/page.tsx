import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { PERSONAS, skillsForPersona } from "../../lib/skills"

export const metadata: Metadata = {
  title: `Claude Code skills by audience | ${siteConfig.name}`,
  description: "Skill collections curated for different roles — from graphic designers to founders.",
  alternates: { canonical: `${siteConfig.baseUrl}/for` },
}

export default function PersonasIndex() {
  return (
    <main>
      <h1>Skill collections by audience</h1>
      <ul className="persona-list">
        {PERSONAS.map(p => {
          const count = skillsForPersona(p.slug).length
          return (
            <li key={p.slug}>
              <Link href={`/for/${p.slug}`}>{p.label}</Link>
              <span>— {count} skill{count === 1 ? "" : "s"}</span>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
