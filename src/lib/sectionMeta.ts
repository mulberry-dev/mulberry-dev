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
    "Full Stack Developer from Mexico. I build what you see — interfaces people feel — and the systems that make them last.",
  "/skills":
    "Product interfaces, the systems behind them, modernization, and the stack I use to ship complete products.",
  "/portfolio":
    "Selected work that solved real problems and delivered impact.",
  "/certifications":
    "Certifications and continuous learning that back the work I ship.",
  "/contact":
    "Available for new projects. Let's talk about building something great."
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
