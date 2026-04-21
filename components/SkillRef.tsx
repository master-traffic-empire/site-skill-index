import Link from "next/link"
import { getSkill } from "../lib/skills"

export function SkillRef({ pluginSlug, name }: { pluginSlug: string; name: string }) {
  const skill = getSkill(pluginSlug, name)
  if (!skill) return <code>{pluginSlug}/{name}</code>
  return (
    <Link href={`/skills/${pluginSlug}/${name}`} className="skill-ref">
      <span className="sref-plugin">{pluginSlug}</span>
      <span className="sref-sep">/</span>
      <span className="sref-name">{name}</span>
      {skill.verified && <span className="sref-ok">OK</span>}
    </Link>
  )
}
