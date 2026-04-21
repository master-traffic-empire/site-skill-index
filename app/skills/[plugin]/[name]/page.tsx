import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../../../site.config"
import { allSkills, getSkill, type Skill } from "../../../../lib/skills"
import { InstallCommand } from "../../../../components/InstallCommand"
import { TrustSignals } from "../../../../components/TrustSignals"
import { Markdown } from "../../../../components/Markdown"

interface Props { params: Promise<{ plugin: string; name: string }> }

export async function generateStaticParams() {
  return allSkills().map(s => ({ plugin: s.plugin_slug, name: s.name }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { plugin, name } = await params
  const skill = getSkill(plugin, name)
  if (!skill) return { title: "Not found" }
  const title = `${skill.name} — ${skill.type === "command" ? "Claude Code slash command" : "Claude Code skill"}`
  return {
    title: `${title} | ${siteConfig.name}`,
    description: skill.description ?? "",
    alternates: { canonical: `${siteConfig.baseUrl}/skills/${plugin}/${name}` },
    openGraph: { title, description: skill.description ?? "", type: "article" },
  }
}

export default async function SkillPage({ params }: Props) {
  const { plugin, name } = await params
  const skill = getSkill(plugin, name)
  if (!skill) notFound()

  const installCmd = `/plugin install ${skill.plugin_slug}`
  const related: Skill[] = skill.related_slugs
    .map(slug => allSkills().find(s => s.slug === slug))
    .filter((s): s is Skill => !!s)

  return (
    <main className="skill-detail">
      <nav className="breadcrumb">
        <Link href="/">home</Link>
        <span className="sep">/</span>
        <Link href="/skills">skills</Link>
        <span className="sep">/</span>
        <Link href={`/plugins/${skill.plugin_slug}`}>{skill.plugin_slug}</Link>
        <span className="sep">/</span>
        {skill.name}
      </nav>

      <p className="meta-line">{skill.plugin_slug}/</p>
      <h1>{skill.name}</h1>
      <div className="tag-row">
        {skill.verified
          ? <span className="tag tag-ok">OK · verified</span>
          : <span className="tag tag-community">community</span>}
        <span className="tag tag-type">[{skill.type}]</span>
      </div>
      <p className="lede">{skill.description ?? ""}</p>

      <InstallCommand cmd={installCmd} />

      {skill.invocation_triggers && (
        <section aria-label="When it runs">
          <h2 className="sec-h">when to use</h2>
          {Array.isArray(skill.invocation_triggers)
            ? <ul className="when-list">{skill.invocation_triggers.map(t => <li key={t}>{t}</li>)}</ul>
            : <p>{skill.invocation_triggers}</p>}
        </section>
      )}

      <section aria-label="Details">
        <h2 className="sec-h">details</h2>
        <Markdown>{skill.readme_markdown}</Markdown>
      </section>

      <TrustSignals skill={skill} />

      <section aria-label="Technical">
        <h2 className="sec-h">technical</h2>
        <dl className="tech-dl">
          <dt>github</dt>
          <dd>
            <a href={`https://github.com/${skill.repo}/blob/HEAD/${skill.file_path}`} rel="noopener">
              {skill.repo}
            </a>
          </dd>
          <dt>stars</dt><dd>{skill.github.stars}</dd>
          <dt>license</dt><dd>{skill.github.license ?? "unspecified"}</dd>
          <dt>contributors</dt><dd>{skill.github.contributors_count}</dd>
          <dt>last commit</dt><dd>{skill.github.last_commit_at ?? "unknown"}</dd>
          <dt>file</dt><dd>{skill.file_path}</dd>
        </dl>
      </section>

      {related.length > 0 && (
        <section aria-label="Related">
          <h2 className="sec-h">related</h2>
          <ul className="related-list">
            {related.map(r => (
              <li key={r.slug}>
                <Link href={`/skills/${r.plugin_slug}/${r.name}`}>{r.plugin_slug}/{r.name}</Link>
                <span className="related-desc">— {r.description ?? ""}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": skill.name,
            "description": skill.description ?? "",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Cross-platform",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": `${siteConfig.baseUrl}/skills/${skill.plugin_slug}/${skill.name}`,
            ...(skill.github.stars > 0 && {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 5,
                "ratingCount": skill.github.stars,
              },
            }),
          }),
        }}
      />
    </main>
  )
}
