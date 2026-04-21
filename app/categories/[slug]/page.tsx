import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "../../../site.config"
import { CATEGORIES, skillsForCategory } from "../../../lib/skills"
import { SkillCard } from "../../../components/SkillCard"

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = CATEGORIES.find(x => x.slug === slug)
  if (!c) return { title: "Not found" }
  const skills = skillsForCategory(slug)
  return {
    title: `${c.label} Claude Code skills | ${siteConfig.name}`,
    description: `${skills.length} Claude Code ${c.label.toLowerCase()} skills. Install with one command.`,
    alternates: { canonical: `${siteConfig.baseUrl}/categories/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const c = CATEGORIES.find(x => x.slug === slug)
  if (!c) notFound()
  const skills = skillsForCategory(slug)
  return (
    <main>
      <nav className="breadcrumb"><Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / {c.label}</nav>
      <h1>{c.label} skills</h1>
      <p className="lede">{skills.length} Claude Code {c.label.toLowerCase()} skill{skills.length === 1 ? "" : "s"}.</p>
      <div className="skill-grid">
        {skills.map(s => <SkillCard key={s.slug} skill={s} />)}
      </div>
    </main>
  )
}
