import { data as projects } from "@/data/projects"
import { links } from "@/data/navegation"
import { SITE_URL } from "@/data/site"
import { languageAlternates } from "@/lib/sectionMeta"
import { localizePath } from "@/lib/locale"
import type { MetadataRoute } from "next"

const lastModified = new Date()

const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => {
  const localized = localizePath(path, "en")
  const url = localized === "/" ? SITE_URL : `${SITE_URL}${localized}`

  return {
    url,
    lastModified,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: languageAlternates(path)
    }
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = links.map(link =>
    entry(link.path, link.path === "/" ? 1 : 0.7)
  )
  const projectPages = projects.map(project =>
    entry(`/portfolio/${project.id}`, 0.6)
  )

  return [...sections, ...projectPages]
}
