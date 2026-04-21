import Link from "next/link"
import type { Skill } from "../lib/skills"

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/skills/${skill.plugin_slug}/${skill.name}`} className="skill-card">
      <div className="skill-card-header">
        <h3>{skill.name}</h3>
        {skill.verified && <span className="badge badge-verified">Verified</span>}
        <span className="skill-card-type">{skill.type}</span>
      </div>
      <p>{skill.description}</p>
      <div className="skill-card-meta">
        <span>{skill.plugin_slug}</span>
        <span>★ {skill.github.stars}</span>
      </div>
    </Link>
  )
}
