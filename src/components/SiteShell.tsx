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
      {onSite ? (
        <>
          <main id="site-main" className="site-main" tabIndex={-1}>
            <SiteExperience />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main id="site-main" tabIndex={-1}>{children}</main>
          <Footer />
        </>
      )}
    </PageTransition>
  )
}

export default SiteShell
