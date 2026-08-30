"use client"

import Footer from "@/components/layout/Footer"
import PageTransition from "@/components/PageTransition"
import SiteExperience from "@/components/SiteExperience"
import { isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

const SiteShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const onSite = isSectionPath(pathname)

  return (
    <PageTransition>
      <main
        id={onSite ? "site-main" : undefined}
        className="site-main"
        tabIndex={onSite ? -1 : undefined}
        hidden={!onSite}
        aria-hidden={onSite ? undefined : true}
      >
        <SiteExperience />
      </main>
      {onSite ? null : (
        <main id="site-main" tabIndex={-1}>
          {children}
        </main>
      )}
      <Footer />
    </PageTransition>
  )
}

export default SiteShell
