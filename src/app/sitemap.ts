import { data as projects } from "@/data/projects"
import { links } from "@/data/navegation"
import { languageAlternates, absoluteUrl } from "@/lib/sectionMeta"
import { LOCALES, type Locale } from "@/lib/locale"
import type { MetadataRoute } from "next"

const lastModified = new Date()

const entry = (
  path: string,
  locale: Locale,
  priority: number
): MetadataRoute.Sitemap[number] => ({
  url: absoluteUrl(path, locale),
  lastModified,
  changeFrequency: "monthly",
  priority,
  alternates: {
    languages: languageAlternates(path)
  }
})

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    ...links.map(link => ({
      path: link.path,
      priority: link.path === "/" ? 1 : 0.7
    })),
    ...projects.map(project => ({
      path: `/portfolio/${project.id}`,
      priority: 0.6
    }))
  ]

  return paths.flatMap(({ path, priority }) =>
    LOCALES.map(locale => entry(path, locale, priority))
  )
}
