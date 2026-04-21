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
                <img
                  src={`/images/personas/${p.slug}.webp`}
                  alt={`Illustration for ${p.label}`}
                  className="persona-thumb"
                  width={44}
                  height={44}
                  loading="lazy"
                />
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
