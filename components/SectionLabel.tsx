export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="seclabel">
      <span className="seclabel-sym">§</span>
      <span className="seclabel-num">{num}</span>
      <span className="seclabel-dot">·</span>
      <span className="seclabel-name">{label}</span>
    </div>
  )
}
