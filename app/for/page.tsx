import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { PERSONAS, skillsForPersona } from "../../lib/skills"
import { PersonaGlyph } from "../../components/PersonaGlyph"

export const metadata: Metadata = {
  title: `Claude Code skills by audience | ${siteConfig.name}`,
  description: "Skill collections curated for different roles — from graphic designers to founders.",
  alternates: { canonical: `${siteConfig.baseUrl}/for` },
}

export default function PersonasIndex() {
  return (
    <main>
      <h1 className="idx-h1">Skills by audience</h1>
      <p className="idx-sub">
        <span className="amber">{PERSONAS.length}</span> personas // curated collections per role
      </p>
      <ul className="persona-grid">
        {PERSONAS.map(p => {
          const count = skillsForPersona(p.slug).length
          return (
            <li key={p.slug}>
              <Link href={`/for/${p.slug}`} className="persona-card">
                <PersonaGlyph persona={p.slug} size={44} className="persona-glyph" />
                <span className="persona-text">
                  <span className="persona-name">{p.label}</span>
                  <span className="persona-count">{count} skills</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
