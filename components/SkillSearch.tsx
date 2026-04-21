"use client"
import { useState, useMemo } from "react"
import type { Skill } from "../lib/skills"
import { SkillCard } from "./SkillCard"

export function SkillSearch({ skills }: { skills: Skill[] }) {
  const [q, setQ] = useState("")
  const filtered = useMemo(() => {
    if (!q.trim()) return skills
    const needle = q.toLowerCase().trim()
    return skills.filter(s =>
      (s.name ?? "").toLowerCase().includes(needle) ||
      (s.description ?? "").toLowerCase().includes(needle) ||
      (s.plugin_slug ?? "").toLowerCase().includes(needle)
    )
  }, [q, skills])
  return (
    <>
      <input
        type="search"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="$ search skills by name, description, or plugin…"
        className="search-input"
        aria-label="Search skills"
      />
      <p className="search-count">
        <span className="amber">{filtered.length}</span> of {skills.length} skills
      </p>
      <div className="skill-grid">
        {filtered.map(s => <SkillCard key={s.slug} skill={s} />)}
      </div>
    </>
  )
}
