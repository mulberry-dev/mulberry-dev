import { links } from "@/data/navegation"

export const getContextualCta = (pathname: string) => {
  const index = links.findIndex((link) => {
    if (link.path === "/") {
      return pathname === "/"
    }

    return pathname === link.path || pathname.startsWith(`${link.path}/`)
  })

  if (index < 1) {
    return null
  }

  const current = links[index]
  const next = links[index + 1]
  const previous = links[index - 1]

  if (current.path === "/contact" || (!previous && !next)) {
    return null
  }

  return {
    featured: true as const,
    backHref: previous?.path,
    backName: previous?.name,
    nextHref: next?.path,
    nextName: next?.name
  }
}
