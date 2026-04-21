import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../site.config"
import {
  allSkills,
  allPlugins,
  PERSONAS,
  CATEGORIES,
  skillsForPersona,
  skillsForCategory,
} from "../lib/skills"
import { SkillCard } from "../components/SkillCard"
import { SkillSearch } from "../components/SkillSearch"
import { HeroGrid } from "../components/HeroGrid"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.baseUrl },
}

// Letters for the staggered reveal (split by word, wrap each char in a span
// with animation-delay so the reveal cascades).
function RevealTitle({ text }: { text: string }) {
  const words = text.split(" ")
  let globalIdx = 0
  return (
    <h1 className="hero-title">
      {words.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(w).map((ch, ci) => {
            const d = globalIdx * 35
            globalIdx++
            return (
              <span key={ci} style={{ animationDelay: `${d}ms` }}>
                {ch}
              </span>
            )
          })}
          {wi < words.length - 1 && (
            <span style={{ animationDelay: `${globalIdx++ * 35}ms` }}>&nbsp;</span>
          )}
        </span>
      ))}
    </h1>
  )
}

export default function Home() {
  const skills = allSkills()
  const plugins = allPlugins()
  const featured = skills.filter(s => s.verified).slice(0, 6)

  // Recent: sorted by last_commit_at desc, take 10
  const recent = [...skills]
    .filter(s => s.github.last_commit_at)
    .sort((a, b) => (b.github.last_commit_at ?? "").localeCompare(a.github.last_commit_at ?? ""))
    .slice(0, 10)

  // Hero bg slugs (200 sample)
  const bgSlugs = skills.slice(0, 200).map(s => s.name)

  const skillCount = skills.length
  const pluginCount = plugins.length
  const personaCount = PERSONAS.length

  return (
    <main className="home">
      {/* HERO */}
      <section className="home-hero">
        <div
          className="hero-img-bg"
          aria-hidden="true"
          style={{ backgroundImage: "url(/images/hero.webp)" }}
        />
        <div className="hero-bg">
          <HeroGrid slugs={bgSlugs} />
        </div>
        <div className="hero-inner">
          <RevealTitle text="The archive of Claude Code skills." />
          <p className="hero-sub">
            $ grep -r &quot;claude skill&quot; . | wc -l <span className="amber">// {skillCount}</span>
          </p>
          <div className="hero-stats">
            <div>
              <span className="stat-n">{skillCount}</span>
              <span className="stat-l">skills &amp; commands</span>
            </div>
            <div>
              <span className="stat-n">{pluginCount}</span>
              <span className="stat-l">plugins</span>
            </div>
            <div>
              <span className="stat-n">{personaCount}</span>
              <span className="stat-l">personas</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="home-search" aria-label="Search">
        <h2>search the index</h2>
        <SkillSearchInline />
      </section>

      {/* PERSONAS */}
      <section aria-label="By audience">
        <h3 className="section-h">for / audience</h3>
        <ul className="persona-grid">
          {PERSONAS.map(p => {
            const n = skillsForPersona(p.slug).length
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
                    <span className="persona-count">{n} skills</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* CATEGORIES */}
      <section aria-label="By category">
        <h3 className="section-h">by category</h3>
        <ul className="cat-row">
          {CATEGORIES.map(c => {
            const n = skillsForCategory(c.slug).length
            return (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="cat-chip">
                  {c.label} <span className="c">{n}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* FEATURED */}
      <section aria-label="Featured verified">
        <h3 className="section-h">featured verified</h3>
        <div className="featured">
          {featured.map(s => <SkillCard key={s.slug} skill={s} />)}
        </div>
      </section>

      {/* RECENT */}
      <section aria-label="Recent additions">
        <h3 className="section-h">recent additions</h3>
        <ul className="recent-list">
          {recent.map(s => {
            const d = s.github.last_commit_at?.slice(0, 10) ?? "—"
            return (
              <li key={s.slug}>
                <div className="recent-item">
                  <Link href={`/skills/${s.plugin_slug}/${s.name}`}>{s.name}</Link>
                  <span className="recent-plugin">{s.plugin_slug}</span>
                </div>
                <span className="recent-date">{d}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

// Wrapper to avoid recomputing allSkills() server-side twice with the client
// component — pass a trimmed list.
function SkillSearchInline() {
  const skills = allSkills()
  return <SkillSearch skills={skills} />
}
