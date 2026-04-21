import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../site.config"
import { allSkills, allPlugins } from "../lib/skills"
import { SkillCard } from "../components/SkillCard"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.baseUrl },
}

export default function Home() {
  const featured = allSkills().filter(s => s.verified).slice(0, 6)
  const pluginCount = allPlugins().length
  const skillCount = allSkills().length
  return (
    <main className="home">
      <section className="hero">
        <h1>{siteConfig.tagline}</h1>
        <p>{skillCount} skills and slash commands across {pluginCount} plugins — verified and community.</p>
        <div className="cta-row">
          <Link href="/skills" className="cta">Browse skills</Link>
          <Link href="/plugins" className="cta cta-secondary">Browse plugins</Link>
        </div>
      </section>
      <section aria-label="Featured verified">
        <h2>Featured verified</h2>
        <div className="skill-grid">
          {featured.map(s => <SkillCard key={s.slug} skill={s} />)}
        </div>
      </section>
    </main>
  )
}
