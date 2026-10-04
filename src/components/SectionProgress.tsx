"use client"

import { navLabel } from "@/i18n"
import { useI18n } from "@/i18n/useI18n"
import { stripLocale } from "@/lib/locale"
import { SECTIONS } from "@/lib/sectionNav"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SectionProgress = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const current = stripLocale(pathname)

  return (
    <nav className="section-progress" aria-label={t.nav.onThisPage}>
      {SECTIONS.map((section) => {
        const active = current === section.path

        return (
          <Link
            key={section.path}
            href={href(section.path)}
            scroll={false}
            className={
              active
                ? "section-progress__link is-active"
                : "section-progress__link"
            }
            aria-label={navLabel(t, section.path)}
            aria-current={active ? "true" : undefined}
          />
        )
      })}
    </nav>
  )
}

export default SectionProgress
