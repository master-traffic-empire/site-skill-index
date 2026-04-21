// Minimal stub — required by base-site/components/CategoryCard.tsx for TS build.
// skill-index doesn't use categories; this prevents unresolved-import errors.
export function CategoryIcon({ name, size = 24 }: { name: string; size?: number }) {
  return <span aria-hidden style={{ width: size, height: size, display: "inline-block" }}>{name?.charAt(0) ?? "?"}</span>
}
