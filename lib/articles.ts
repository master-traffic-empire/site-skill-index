// lib/articles.ts — Load articles from content/blog/*.json
// Builder/content agents write article JSON files to content/blog/
// This module reads them at build time for static generation.

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import type { Article } from "@base/types"

const CONTENT_DIR = join(process.cwd(), "content", "blog")

/**
 * Get all published articles, sorted by date (newest first).
 */
export async function getAllArticles(): Promise<Article[]> {
  let files: string[]
  try {
    files = await readdir(CONTENT_DIR)
  } catch {
    return [] // No blog content yet
  }

  const articles: Article[] = []

  for (const file of files) {
    if (!file.endsWith(".json")) continue
    const raw = await readFile(join(CONTENT_DIR, file), "utf-8")
    const article: Article = JSON.parse(raw)
    articles.push(article)
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Get a single article by slug.
 */
export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  try {
    const raw = await readFile(join(CONTENT_DIR, `${slug}.json`), "utf-8")
    return JSON.parse(raw) as Article
  } catch {
    return null
  }
}
