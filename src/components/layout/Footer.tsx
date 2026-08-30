"use client"

import StatusDot from "@/components/terminal/StatusDot"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { COPYRIGHT_NAME } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  if (!isSectionPath(pathname)) {
    return null
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <TerminalPrompt path={WORKSPACE.home.path} cursor className="site-footer__prompt" />
        <p className="site-footer__copy">
          © {year} {COPYRIGHT_NAME}
        </p>
        <p className="site-footer__note">
          <span>System online</span>
          <StatusDot pulse />
        </p>
      </div>
    </footer>
  )
}

export default Footer
