import { links } from "@/data/navegation"

export const PAGE_CTA_COPY: Record<
  string,
  { title: string; subtitle: string; actionLabel: string }
> = {
  "/about": {
    title: "What I can take on",
    subtitle: "A clear look at the product work I do — then the proof in production.",
    actionLabel: "What I Do →"
  },
  "/skills": {
    title: "See how this looks in production",
    subtitle: "The portfolio is the proof — not another description of the work.",
    actionLabel: "View my work →"
  },
  "/portfolio": {
    title: "Credentials behind the work",
    subtitle: "Certifications and continued learning that keep the craft sharp.",
    actionLabel: "View certifications →"
  },
  "/certifications": {
    title: "If this is the right fit, let's talk",
    subtitle: "The next step is a conversation about what you need built.",
    actionLabel: "Contact →"
  }
}

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

  if (!next || current.path === "/" || current.path === "/contact") {
    return null
  }

  const copy = PAGE_CTA_COPY[current.path]

  if (!copy) {
    return null
  }

  return {
    title: copy.title,
    subtitle: copy.subtitle,
    actionHref: next.path,
    actionLabel: copy.actionLabel,
    backHref: previous?.path,
    backLabel: previous ? `← ${previous.name}` : undefined
  }
}
