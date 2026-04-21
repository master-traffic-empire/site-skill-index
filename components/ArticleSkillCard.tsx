import Link from "next/link"
import { getSkill } from "../lib/skills"

export function ArticleSkillCard({
  pluginSlug,
  name,
  rank,
}: {
  pluginSlug: string
  name: string
  rank?: number
}) {
  const skill = getSkill(pluginSlug, name)
  if (!skill) return null
  return (
    <aside className="art-skill-card">
      {rank !== undefined && (
        <span className="art-skill-rank">№ {rank.toString().padStart(2, "0")}</span>
      )}
      <div className="art-skill-head">
        <h3>
          <Link href={`/skills/${pluginSlug}/${name}`}>
            <span className="sref-plugin">{pluginSlug}</span>
            <span className="sref-sep">/</span>
            <span className="sref-name">{name}</span>
          </Link>
        </h3>
        {skill.verified && <span className="tag tag-ok">OK</span>}
        <span className="art-skill-stars">★ {skill.github.stars.toLocaleString()}</span>
      </div>
      <p className="art-skill-desc">{skill.description}</p>
      <div className="art-skill-install">
        <span className="amber">$</span> /plugin install {pluginSlug}
      </div>
    </aside>
  )
}
