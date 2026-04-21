import type { SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {
  persona: string
  size?: number
}

export function PersonaGlyph({ persona, size = 48, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  }
  switch (persona) {
    case "graphic-designers":
      return (
        <svg {...common}>
          <circle cx="19" cy="24" r="11" />
          <circle cx="29" cy="24" r="11" />
        </svg>
      )
    case "architects":
      return (
        <svg {...common}>
          <path d="M8 40 V8 h32 v32 Z" />
          <path d="M8 18 h32 M8 28 h32 M18 8 v32 M28 8 v32" />
        </svg>
      )
    case "content-creators":
      return (
        <svg {...common}>
          <path d="M12 18 c0 -4 2 -6 6 -6 v4 c-2 0 -3 1 -3 3 h3 v7 h-6 Z" fill="currentColor" stroke="none" />
          <path d="M25 18 c0 -4 2 -6 6 -6 v4 c-2 0 -3 1 -3 3 h3 v7 h-6 Z" fill="currentColor" stroke="none" />
          <path d="M17 36 c0 4 -2 6 -6 6 v-4 c2 0 3 -1 3 -3 h-3 v-7 h6 Z" fill="currentColor" stroke="none" />
          <path d="M30 36 c0 4 -2 6 -6 6 v-4 c2 0 3 -1 3 -3 h-3 v-7 h6 Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case "frontend-developers":
      return (
        <svg {...common}>
          <path d="M18 14 L8 24 L18 34" />
          <path d="M30 14 L40 24 L30 34" />
          <path d="M27 12 L21 36" />
        </svg>
      )
    case "backend-engineers":
      return (
        <svg {...common}>
          <rect x="8" y="10" width="32" height="8" />
          <rect x="8" y="20" width="32" height="8" />
          <rect x="8" y="30" width="32" height="8" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="24" r="1" fill="currentColor" />
          <circle cx="12" cy="34" r="1" fill="currentColor" />
        </svg>
      )
    case "ml-engineers":
      return (
        <svg {...common}>
          <circle cx="10" cy="14" r="2" fill="currentColor" />
          <circle cx="10" cy="34" r="2" fill="currentColor" />
          <circle cx="24" cy="10" r="2" fill="currentColor" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <circle cx="24" cy="38" r="2" fill="currentColor" />
          <circle cx="38" cy="14" r="2" fill="currentColor" />
          <circle cx="38" cy="34" r="2" fill="currentColor" />
          <path d="M10 14 L24 10 M10 14 L24 24 M10 14 L24 38 M10 34 L24 10 M10 34 L24 24 M10 34 L24 38 M24 10 L38 14 M24 24 L38 14 M24 24 L38 34 M24 38 L38 34" />
        </svg>
      )
    case "devops-engineers":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="7" />
          <path d="M24 8 v5 M24 35 v5 M8 24 h5 M35 24 h5 M12.5 12.5 l3.5 3.5 M32 32 l3.5 3.5 M12.5 35.5 l3.5 -3.5 M32 16 l3.5 -3.5" />
        </svg>
      )
    case "data-analysts":
      return (
        <svg {...common}>
          <rect x="8" y="28" width="6" height="12" />
          <rect x="17" y="20" width="6" height="20" />
          <rect x="26" y="14" width="6" height="26" />
          <rect x="35" y="22" width="6" height="18" />
          <path d="M6 40 h36" />
        </svg>
      )
    case "founders":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <path d="M24 12 L28 24 L24 36 L20 24 Z" fill="currentColor" stroke="none" />
          <path d="M12 24 L24 28 L36 24 L24 20 Z" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </svg>
      )
    case "marketers":
      return (
        <svg {...common}>
          <path d="M8 22 L8 30 L14 30 L26 38 L26 14 L14 22 Z" />
          <path d="M30 20 q4 4 0 12" />
          <path d="M34 17 q8 7 0 20" />
        </svg>
      )
    case "students":
      return (
        <svg {...common}>
          <path d="M8 14 L24 10 L40 14 L24 18 Z" />
          <path d="M8 14 L8 32 L24 36 L40 32 L40 14" />
          <path d="M24 18 L24 36" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="10" y="10" width="28" height="28" />
        </svg>
      )
  }
}
