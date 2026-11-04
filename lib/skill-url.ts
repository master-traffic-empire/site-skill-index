// URL form of a skill's name. Kept free of the skills-index.json import so client
// components (SkillCard inside SkillSearch) can use it without bundling the index.
//
// Names that are already URL-safe are returned unchanged, so the existing
// /skills/<plugin>/<name> URLs keep working byte-for-byte. Only display names with
// spaces, "&", ":" etc. (e.g. "Paper Q&A") are kebab-cased ("paper-q-a"). Before
// this, those names went into URLs raw: the pages 404'd and the unescaped "&" made
// sitemap.xml unparseable, hiding every URL on the site from Google (#94).
const URL_SAFE = /^[A-Za-z0-9._-]+$/

export function skillUrlName(name: string): string {
  if (URL_SAFE.test(name)) return name
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function skillPath(s: { plugin_slug: string; name: string }): string {
  return `/skills/${s.plugin_slug}/${skillUrlName(s.name)}`
}

/** Escape a value for an XML text node / attribute. */
export function xmlEscape(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
