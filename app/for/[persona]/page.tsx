import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "../../../site.config"
import { PERSONAS, skillsForPersona } from "../../../lib/skills"
import { SkillCard } from "../../../components/SkillCard"
import { personaCopy } from "../../../content/persona-copy"

interface Props { params: Promise<{ persona: string }> }

export async function generateStaticParams() {
  return PERSONAS.map(p => ({ persona: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona } = await params
  const p = PERSONAS.find(x => x.slug === persona)
  if (!p) return { title: "Not found" }
  const skills = skillsForPersona(persona)
  const copy = personaCopy[persona]
  return {
    title: `Claude Code skills for ${p.label.toLowerCase()} | ${siteConfig.name}`,
    description: copy?.tagline ?? `${skills.length} Claude Code skills tailored for ${p.label.toLowerCase()}.`,
    alternates: { canonical: `${siteConfig.baseUrl}/for/${persona}` },
  }
}

export default async function PersonaPage({ params }: Props) {
  const { persona } = await params
  const p = PERSONAS.find(x => x.slug === persona)
  if (!p) notFound()
  const skills = skillsForPersona(persona)
  const copy = personaCopy[persona]
  return (
    <main>
      <nav className="breadcrumb">
        <Link href="/">home</Link>
        <span className="sep">/</span>
        <Link href="/for">for</Link>
        <span className="sep">/</span>
        {p.label.toLowerCase()}
      </nav>
      <div className="persona-hero">
        <div>
          <h1>For {p.label.toLowerCase()}</h1>
          <p className="mono-sub">
            <span className="amber">{skills.length}</span> skills // {copy?.tagline ?? `curated for ${p.slug}`}
          </p>
        </div>
        <img
          src={`/images/personas/${p.slug}.webp`}
          alt={`Illustration for ${p.label}`}
          className="persona-hero-img"
          width={160}
          height={160}
        />
      </div>

      {copy && (
        <>
          <ul className="persona-outcomes">
            {copy.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <blockquote className="persona-quote">{copy.quote}</blockquote>
        </>
      )}

      <div className="skill-grid">
        {skills.map(s => <SkillCard key={s.slug} skill={s} />)}
      </div>
    </main>
  )
}
