import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../../site.config"
import { allPlugins, getPlugin } from "../../../lib/skills"
import { InstallCommand } from "../../../components/InstallCommand"
import { SkillCard } from "../../../components/SkillCard"

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allPlugins().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const plugin = getPlugin(slug)
  if (!plugin) return { title: "Not found" }
  return {
    title: `${slug} plugin — ${plugin.skills.length} Claude Code skills | ${siteConfig.name}`,
    description: `${slug} bundles ${plugin.skills.length} Claude Code ${plugin.skills.length === 1 ? "skill" : "skills and commands"}. Install with one command.`,
    alternates: { canonical: `${siteConfig.baseUrl}/plugins/${slug}` },
  }
}

export default async function PluginPage({ params }: Props) {
  const { slug } = await params
  const plugin = getPlugin(slug)
  if (!plugin) notFound()

  return (
    <main className="plugin-detail">
      <nav className="breadcrumb"><Link href="/">Home</Link> / <Link href="/plugins">Plugins</Link> / {slug}</nav>
      <header>
        <h1>{slug}</h1>
        {plugin.verified
          ? <span className="badge badge-verified">Verified</span>
          : <span className="badge badge-community">Community</span>}
        <a href={`https://github.com/${plugin.repo}`} rel="noopener">{plugin.repo}</a>
      </header>

      <section aria-label="Install">
        <h2>Install</h2>
        <InstallCommand cmd={`/plugin install ${slug}`} />
      </section>

      <section aria-label="Contents">
        <h2>{plugin.skills.length} item{plugin.skills.length === 1 ? "" : "s"}</h2>
        <div className="skill-grid">
          {plugin.skills.map(s => <SkillCard key={s.slug} skill={s} />)}
        </div>
      </section>
    </main>
  )
}
