import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../site.config"
import {
  allSkills,
  allPlugins,
  PERSONAS,
  CATEGORIES,
  BUSINESS_CATEGORIES,
  skillsForPersona,
  skillsForCategory,
  skillsForBusinessCategory,
  generatedAt,
  type Skill,
} from "../lib/skills"
import { allArticles } from "../lib/articles"
import { personaCopy } from "../content/persona-copy"
import { SkillSearch } from "../components/SkillSearch"
import { SectionLabel } from "../components/SectionLabel"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.baseUrl },
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

function RankRow({ n, skill }: { n: number; skill: Skill }) {
  return (
    <li className="rank-row">
      <span className="rank-n">{n.toString().padStart(2, "0")}</span>
      <div className="rank-body">
        <Link href={`/skills/${skill.plugin_slug}/${skill.name}`}>
          <span className="rank-title">{skill.name}</span>
          <span className="rank-plugin">{skill.plugin_slug}</span>
        </Link>
        <p>{skill.description}</p>
      </div>
      <span className="rank-star">★ {skill.github.stars}</span>
    </li>
  )
}

const STAFF_PICK_SLUGS: Array<[string, string]> = [
  ["superpowers", "brainstorming"],
  ["superpowers", "debugging"],
  ["frontend-design", "frontend-design"],
  ["claude-api", "claude-api"],
  ["superpowers", "writing-plans"],
]

export default async function Home() {
  const skills = allSkills()
  const plugins = allPlugins()
  const articles = await allArticles()

  const skillCount = skills.length
  const pluginCount = plugins.length
  const categoryCount = CATEGORIES.length
  const articleCount = articles.length
  const verifiedCount = skills.filter(s => s.verified).length
  const gen = generatedAt()

  // Trending: top 5 verified skills by stars
  const trending = skills
    .filter(s => s.verified)
    .slice()
    .sort((a, b) => (b.github?.stars ?? 0) - (a.github?.stars ?? 0))
    .slice(0, 5)

  // Staff picks — hardcoded slugs, filtered to those that exist
  const staffPicks = STAFF_PICK_SLUGS
    .map(([plug, name]) => skills.find(s => s.plugin_slug === plug && s.name === name))
    .filter((s): s is Skill => Boolean(s))

  // Recent articles (top 3)
  const recentArticles = articles.slice(0, 3)

  return (
    <main className="home">
      {/* § 00 — Masthead */}
      <header className="home-masthead">
        <div className="mast-ticker">
          <span className="mast-no">№ {skillCount}</span>
          <span className="mast-dot">·</span>
          <span>{pluginCount} plugins</span>
          <span className="mast-dot">·</span>
          <span>{categoryCount} categories</span>
          <span className="mast-dot">·</span>
          <span>updated {formatDate(gen)}</span>
        </div>
        <h1 className="mast-title">
          <span className="mast-title-l1">The</span>
          <span className="mast-title-l2">Skill<span className="amber">.</span></span>
          <span className="mast-title-l3"><em>Index</em></span>
        </h1>
        <p className="mast-sub">A working directory of every Claude Code skill, slash command, and plugin in the open-source wild. Updated daily by a pipeline — indexed, classified, searchable.</p>
        <div className="mast-search-wrap">
          <SkillSearch skills={skills} />
        </div>
      </header>

      {/* § 01 — The brief */}
      <section className="numsec" id="brief">
        <SectionLabel num="01" label="The brief" />
        <h2 className="sec-h2">What a skill actually <em>does</em>.</h2>
        <p className="sec-lede">Skills aren&apos;t prompts. They&apos;re recipes — step-by-step instructions Claude follows consistently. Ask plainly; Claude recognizes the shape, loads the right recipe, and ships a structured answer.</p>
        <div className="brief-cards">
          <div className="brief-card">
            <div className="brief-card-lbl">A prompt</div>
            <p>&quot;Write me a client proposal.&quot; Claude guesses what you want. Sometimes great. Usually close-but-not-quite. You rewrite.</p>
          </div>
          <div className="brief-arrow">→</div>
          <div className="brief-card brief-card-hl">
            <div className="brief-card-lbl">A skill</div>
            <p>Step-by-step instructions Claude follows every time — asks the right questions, uses the right structure, formats it professionally. Same quality, every time.</p>
          </div>
        </div>
      </section>

      {/* § 02 — This week */}
      <section className="numsec">
        <SectionLabel num="02" label="This week" />
        <h2 className="sec-h2"><em>Picks &amp; momentum</em></h2>
        <div className="twoup">
          <div className="twoup-col">
            <h3 className="minitl"><span className="mono">↑</span> Trending</h3>
            <p className="col-note">Verified skills with the most stars.</p>
            <ol className="rank-list">
              {trending.map((s, i) => <RankRow key={s.slug} n={i + 1} skill={s} />)}
            </ol>
          </div>
          <div className="twoup-col">
            <h3 className="minitl"><span className="mono">✦</span> Staff picks</h3>
            <p className="col-note">Five we&apos;d install first.</p>
            <ol className="rank-list">
              {staffPicks.map((s, i) => <RankRow key={s.slug} n={i + 1} skill={s} />)}
            </ol>
          </div>
        </div>
      </section>

      {/* § 03 — By trade */}
      <section className="numsec">
        <SectionLabel num="03" label="By trade" />
        <h2 className="sec-h2">Skills <em>by trade</em></h2>
        <p className="sec-lede">Eleven audiences. Curated tagging. If you know your role, start here.</p>
        <div className="trade-grid">
          {PERSONAS.map(p => {
            const allForP = skillsForPersona(p.slug)
            const preview = allForP.slice(0, 3)
            const count = allForP.length
            const copy = personaCopy[p.slug]
            return (
              <article key={p.slug} className="trade-card">
                <div className="trade-head">
                  <h3>{p.label}</h3>
                  <span className="chip-count">{count}</span>
                </div>
                <p className="trade-tag">{copy?.tagline ?? ""}</p>
                <ul className="trade-prev">
                  {preview.map(s => (
                    <li key={s.slug}>
                      <Link href={`/skills/${s.plugin_slug}/${s.name}`}>
                        <span className="mono-slug">{s.plugin_slug}/{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/for/${p.slug}`} className="trade-more">→ browse all {count}</Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* § 04 — By function */}
      <section className="numsec">
        <SectionLabel num="04" label="By function" />
        <h2 className="sec-h2">Skills <em>by business function</em></h2>
        <p className="sec-lede">Twenty functional categories — marketing, legal, finance, ops. Find the skill that covers the part of the business you&apos;re working on right now.</p>
        <div className="func-grid">
          {BUSINESS_CATEGORIES.slice(0, 12).map(c => {
            const allForC = skillsForBusinessCategory(c.slug)
            const preview = allForC.slice(0, 4)
            const count = allForC.length
            return (
              <article key={c.slug} className="func-card">
                <div className="func-head">
                  <h3>{c.label}</h3>
                  <span className="chip-count">{count}</span>
                </div>
                <ul className="func-prev">
                  {preview.map(s => (
                    <li key={s.slug}>
                      <Link href={`/skills/${s.plugin_slug}/${s.name}`} className="mono-slug">{s.name}</Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/biz/${c.slug}`} className="func-more">/biz/{c.slug} →</Link>
              </article>
            )
          })}
        </div>
        <div className="func-more-row">
          <span className="mono">+ also</span>
          {BUSINESS_CATEGORIES.slice(12).map(c => (
            <Link key={c.slug} href={`/biz/${c.slug}`} className="mono-mini">
              {c.label} ({skillsForBusinessCategory(c.slug).length})
            </Link>
          ))}
        </div>
      </section>

      {/* § 05 — By discipline */}
      <section className="numsec">
        <SectionLabel num="05" label="By discipline" />
        <h2 className="sec-h2">Skills <em>by technical discipline</em></h2>
        <div className="disc-row">
          {CATEGORIES.map(c => {
            const count = skillsForCategory(c.slug).length
            return (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="disc-chip">
                <span className="disc-label">{c.label}</span>
                <span className="chip-count">{count}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* § 06 — Install */}
      <section className="numsec install-band">
        <SectionLabel num="06" label="Install" />
        <h2 className="sec-h2">One command. <em>No copy-paste of prompts.</em></h2>
        <div className="term-band">
          <span className="term-band-prompt">$</span>
          <span className="term-band-cmd">
            <span className="term-band-fixed">/plugin install </span>
            <span className="term-band-cycle">
              <span>superpowers</span>
              <span>frontend-design</span>
              <span>claude-api</span>
              <span>skill-creator</span>
            </span>
          </span>
          <span className="term-band-cursor">▊</span>
        </div>
        <p className="install-note"><span className="mono">→</span> every skill has a stable plugin slug. Drop the install command into Claude Code or Claude on the web. Lifetime access, never per-seat.</p>
      </section>

      {/* § 07 — Editorial */}
      <section className="numsec">
        <SectionLabel num="07" label="Editorial" />
        <h2 className="sec-h2">From the blog.</h2>
        <div className="blog-strip">
          {recentArticles.map(a => (
            <article key={a.slug} className="blog-strip-card">
              <div className="blog-strip-meta">
                <span className="amber">⌗</span>
                <span>{a.publishedAt}</span>
                <span className="muted">#{a.category}</span>
              </div>
              <h3><Link href={`/blog/${a.slug}`}>{a.title}</Link></h3>
              <p>{a.description}</p>
              <Link className="read-link" href={`/blog/${a.slug}`}>read →</Link>
            </article>
          ))}
        </div>
        <Link href="/blog" className="all-articles">see all {articleCount} articles →</Link>
      </section>

      {/* § 08 — Colophon */}
      <section className="numsec colophon">
        <SectionLabel num="08" label="Colophon" />
        <div className="colo-grid">
          <div><span className="mono-lbl">skills</span><span className="colo-n">{skillCount}</span></div>
          <div><span className="mono-lbl">plugins</span><span className="colo-n">{pluginCount}</span></div>
          <div><span className="mono-lbl">trades</span><span className="colo-n">11</span></div>
          <div><span className="mono-lbl">functions</span><span className="colo-n">20</span></div>
          <div><span className="mono-lbl">articles</span><span className="colo-n">{articleCount}</span></div>
          <div><span className="mono-lbl">verified</span><span className="colo-n">{verifiedCount}</span></div>
        </div>
        <p className="colo-note">Maintained by a cron job. Last pipeline refresh {formatDate(gen)}. Source on <a href="https://github.com/master-traffic-empire/site-skill-index" rel="noopener">GitHub</a>.</p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": siteConfig.name,
          "description": siteConfig.description,
          "url": siteConfig.baseUrl,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": skillCount,
            "itemListElement": trending.slice(0, 5).map((s, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `${siteConfig.baseUrl}/skills/${s.plugin_slug}/${s.name}`,
              "name": `${s.plugin_slug}/${s.name}`,
            })),
          },
        })
      }} />
    </main>
  )
}
