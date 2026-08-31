import { getMessages } from "@/i18n"
import { projectHighlights } from "@/data/projectHighlights"
import { data as projects } from "@/data/projects"
import {
  AUTHOR_COUNTRY,
  AUTHOR_LOCATION_LOCALITY,
  AUTHOR_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL
} from "@/data/site"
import { absoluteUrl } from "@/lib/sectionMeta"
import type { Locale } from "@/lib/locale"

const personId = `${SITE_URL}/#person`
const websiteId = `${SITE_URL}/#website`

export const personJsonLd = (locale: Locale) => {
  const messages = getMessages(locale)

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: AUTHOR_NAME,
    url: absoluteUrl("/", locale),
    image: `${SITE_URL}${SITE_OG_IMAGE.url}`,
    jobTitle: messages.jsonLd.jobTitle,
    description: messages.jsonLd.description,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      addressLocality: AUTHOR_LOCATION_LOCALITY,
      addressCountry: AUTHOR_COUNTRY
    },
    knowsLanguage: ["en", "es"],
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Full stack development",
      "Legacy modernization"
    ],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    }
  }
}

export const websiteJsonLd = (locale: Locale) => {
  const messages = getMessages(locale)

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_NAME,
    url: absoluteUrl("/", locale),
    description: messages.site.description,
    inLanguage: locale === "es" ? ["es", "en"] : ["en", "es"],
    publisher: { "@id": personId }
  }
}

export const projectJsonLd = (id: string, locale: Locale) => {
  const project = projects.find(item => String(item.id) === id)
  const messages = getMessages(locale)
  const copy = messages.projects[id]

  if (!project) {
    return null
  }

  const highlights = copy?.highlights ?? projectHighlights[id] ?? []
  const url = absoluteUrl(`/portfolio/${id}`, locale)

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: copy?.description ?? project.description,
    url,
    image: project.img.startsWith("http") ? project.img : `${SITE_URL}${project.img}`,
    creator: { "@id": personId },
    inLanguage: locale,
    keywords: project.tech.map(item =>
      typeof item === "string" ? item : item.tech
    ),
    about: highlights.map(item => item.title)
  }
}

export const breadcrumbJsonLd = (
  items: { name: string; path: string }[],
  locale: Locale
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path, locale)
  }))
})
