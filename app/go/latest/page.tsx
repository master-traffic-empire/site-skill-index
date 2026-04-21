import { redirect } from "next/navigation"
import { getAllArticles } from "../../../lib/articles"

/**
 * /go/latest — evergreen redirect to the most recently published article.
 *
 * Purpose: a stable URL to drop in social bios (Instagram, LinkedIn, etc.)
 * that always points at the newest blog post. Regenerated at each build,
 * so it stays fresh as long as we deploy weekly.
 */
export const dynamic = "force-static"

export default async function GoLatest() {
  const articles = await getAllArticles()
  if (!articles.length) {
    redirect("/blog")
  }
  redirect(`/blog/${articles[0].slug}`)
}
