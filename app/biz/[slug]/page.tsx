import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "../../../site.config"
import { BUSINESS_CATEGORIES, skillsForBusinessCategory } from "../../../lib/skills"
import { SkillCard } from "../../../components/SkillCard"

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BUSINESS_CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = BUSINESS_CATEGORIES.find(x => x.slug === slug)
  if (!c) return { title: "Not found" }
  const skills = skillsForBusinessCategory(slug)
  return {
    title: `${c.label} Claude Code skills | ${siteConfig.name}`,
    description: `${skills.length} Claude Code skills for ${c.label.toLowerCase()}. Install with one command.`,
    alternates: { canonical: `${siteConfig.baseUrl}/biz/${slug}` },
  }
}

export default async function BizCategoryPage({ params }: Props) {
  const { slug } = await params
  const c = BUSINESS_CATEGORIES.find(x => x.slug === slug)
  if (!c) notFound()
  const skills = skillsForBusinessCategory(slug)
  return (
    <main>
      <nav className="breadcrumb">
        <Link href="/">home</Link>
        <span className="sep">/</span>
        <Link href="/biz">biz</Link>
        <span className="sep">/</span>
        {c.label.toLowerCase()}
      </nav>
      <div className="cat-hero">
        <div className="cat-hero-text">
          <h1 className="idx-h1">{c.label}</h1>
          <p className="idx-sub">
            <span className="amber">{skills.length}</span> skills // {c.label.toLowerCase()} business function
          </p>
        </div>
      </div>
      <div className="skill-grid">
        {skills.map(s => <SkillCard key={s.slug} skill={s} />)}
      </div>
    </main>
  )
}
