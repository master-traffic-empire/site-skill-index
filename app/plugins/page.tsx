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
      <h1>All plugins ({plugins.length})</h1>
      <ul>
        {plugins.map(p => (
          <li key={p.slug}>
            <Link href={`/plugins/${p.slug}`}>{p.slug}</Link>
            {p.verified && <span className="badge badge-verified">Verified</span>}
            <span>— {p.skills.length} item{p.skills.length === 1 ? "" : "s"} • ★ {p.stars}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
