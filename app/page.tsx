// app/page.tsx — Builder agent replaces this with the actual homepage
import { siteConfig } from "@/site.config"

export default function Home() {
  return (
    <main>
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.tagline}</p>
    </main>
  )
}
