import Link from "next/link"
import type { SkillCardData } from "../lib/skills"
import { skillPath } from "../lib/skill-url"

export function SkillCard({ skill }: { skill: SkillCardData }) {
  return (
    <Link href={skillPath(skill)} className="card">
      <div className="card-head">
        <span className="card-name">{skill.name}</span>
        {skill.verified && <span className="tag tag-ok">OK</span>}
      </div>
      <p className="card-desc">{skill.description ?? ""}</p>
      <div className="card-foot">
        <span className="card-plugin">{skill.plugin_slug}</span>
        <span className="card-stars">★ {skill.github.stars}</span>
        <span className="card-type">[{skill.type}]</span>
      </div>
    </Link>
  )
}
