import type { Skill } from "../lib/skills"

export function TrustSignals({ skill }: { skill: Skill }) {
  if (skill.verified) return null
  const ts = skill.trust_signals
  const readmeBucket = ts.readme_length < 400 ? "short" : ts.readme_length < 1500 ? "medium" : "thorough"
  const age = ts.age_days == null ? "unknown" : ts.age_days < 30 ? "fresh" : ts.age_days < 180 ? "recent" : `${Math.round(ts.age_days / 30)}mo old`
  return (
    <aside className="trust-signals" aria-label="Trust signals for community-tier skill">
      <span>★ {ts.stars}</span>
      <span>updated {age}</span>
      <span>readme: {readmeBucket}</span>
    </aside>
  )
}
