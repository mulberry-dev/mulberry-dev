import { links } from "@/data/navegation"
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL
} from "@/data/site"
import type { Metadata } from "next"

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  "/": SITE_DESCRIPTION,
  "/about":
    "Senior Full Stack Engineer based in Mexico City. I came to software through design.",
  "/skills":
    "Frontend, backend, modernization, and the STAR method I use to prove the work.",
  "/portfolio": "Selected projects across web, landing pages, APIs, and stores.",
  "/certifications":
    "Certificates in security, English, and development.",
  "/contact": "Available for new projects. I usually respond within 24 hours."
}

export const sectionPageMetadata = (path: string): Metadata => {
  const link = links.find((item) => item.path === path)
  const description = SECTION_DESCRIPTIONS[path]
  const isHome = path === "/"
  const canonical = `${SITE_URL}${isHome ? "" : path}`

  return {
    title: isHome ? { absolute: SITE_TITLE } : link?.name,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: isHome ? SITE_TITLE : `${link?.name} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [SITE_OG_IMAGE]
    }
  }
}
