import Link from "next/link"
import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { allPlugins } from "../../lib/skills"

export const metadata: Metadata = {
  title: `All Claude Code plugins | ${siteConfig.name}`,
  description: `Every Claude Code plugin indexed. ${allPlugins().length} total, sorted by verified then stars.`,
  alternates: { canonical: `${siteConfig.baseUrl}/plugins` },
}

export default function PluginsIndex() {
  const plugins = allPlugins()
  return (
    <main className="plugins-index">
      <h1 className="idx-h1">All plugins</h1>
      <p className="idx-sub">
        <span className="amber">{plugins.length}</span> indexed // sorted by verified then stars
      </p>
      <ul className="plugin-list">
        {plugins.map(p => (
          <li key={p.slug}>
            <Link href={`/plugins/${p.slug}`}>{p.slug}</Link>
            {p.verified
              ? <span className="tag tag-ok">OK</span>
              : <span className="tag tag-community">community</span>}
            <span className="p-meta">
              {p.skills.length} item{p.skills.length === 1 ? "" : "s"} · <span className="p-stars">★ {p.stars}</span>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
