import type { Metadata } from "next"
import { siteConfig } from "../../site.config"
import { allSkills } from "../../lib/skills"
import { SkillSearch } from "../../components/SkillSearch"

export const metadata: Metadata = {
  title: `All Claude Code skills | ${siteConfig.name}`,
  description: `Every Claude Code skill and slash command indexed from GitHub. ${allSkills().length} total.`,
  alternates: { canonical: `${siteConfig.baseUrl}/skills` },
}

export default function SkillsIndex() {
  const skills = allSkills()
  return (
    <main className="skills-index">
      <h1 className="idx-h1">All skills</h1>
      <p className="idx-sub">
        <span className="amber">{skills.length}</span> indexed // every claude code skill &amp; slash command
      </p>
      <SkillSearch skills={skills} />
    </main>
  )
}
