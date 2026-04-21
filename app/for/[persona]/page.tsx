import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "../../../site.config"
import { PERSONAS, skillsForPersona } from "../../../lib/skills"
import { SkillCard } from "../../../components/SkillCard"

interface Props { params: Promise<{ persona: string }> }

export async function generateStaticParams() {
  return PERSONAS.map(p => ({ persona: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona } = await params
  const p = PERSONAS.find(x => x.slug === persona)
  if (!p) return { title: "Not found" }
  const skills = skillsForPersona(persona)
  return {
    title: `Claude Code skills for ${p.label.toLowerCase()} | ${siteConfig.name}`,
    description: `${skills.length} Claude Code skills tailored for ${p.label.toLowerCase()}. Install with one command.`,
    alternates: { canonical: `${siteConfig.baseUrl}/for/${persona}` },
  }
}

export default async function PersonaPage({ params }: Props) {
  const { persona } = await params
  const p = PERSONAS.find(x => x.slug === persona)
  if (!p) notFound()
  const skills = skillsForPersona(persona)
  return (
    <main>
      <nav className="breadcrumb"><Link href="/">Home</Link> / <Link href="/for">For</Link> / {p.label}</nav>
      <h1>Claude Code skills for {p.label.toLowerCase()}</h1>
      <p className="lede">{skills.length} skill{skills.length === 1 ? "" : "s"} and command{skills.length === 1 ? "" : "s"} curated for {p.label.toLowerCase()}.</p>
      <div className="skill-grid">
        {skills.map(s => <SkillCard key={s.slug} skill={s} />)}
      </div>
    </main>
  )
}
