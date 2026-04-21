// Inline SVG grid of mono character fragments — subtle hero background.
// Server-rendered, ~6% opacity via container CSS. Tiny byte cost.
export function HeroGrid({ slugs }: { slugs: string[] }) {
  const cols = 10
  const rows = 20
  const cellW = 100 / cols
  const cellH = 100 / rows
  const items: { x: number; y: number; t: string }[] = []
  let i = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const slug = slugs[i % slugs.length] ?? "skill"
      const t = slug.length > 14 ? slug.slice(0, 14) : slug
      items.push({ x: c * cellW + cellW / 2, y: r * cellH + cellH / 2 + 2, t })
      i++
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="#F5F0E8" fontFamily="JetBrains Mono, monospace" fontSize="1.8" textAnchor="middle">
        {items.map((it, idx) => (
          <text key={idx} x={it.x} y={it.y}>{it.t}</text>
        ))}
      </g>
    </svg>
  )
}
