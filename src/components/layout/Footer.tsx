"use client"

import LanguageSwitch from "@/components/LanguageSwitch"
import TypeCopy from "@/components/terminal/TypeCopy"
import StatusDot from "@/components/terminal/StatusDot"
import TerminalPrompt from "@/components/terminal/TerminalPrompt"
import { COPYRIGHT_NAME } from "@/data/site"
import { WORKSPACE } from "@/data/workspace"
import { useI18n } from "@/i18n/useI18n"
import { isSectionPath } from "@/lib/sectionNav"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  const { t, href } = useI18n()
  const year = new Date().getFullYear()

  if (!isSectionPath(pathname)) {
    return null
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <TerminalPrompt path={WORKSPACE.home.path} cursor className="site-footer__prompt" />
        <div className="site-footer__copy">
          <p>
            © {year} {COPYRIGHT_NAME}
          </p>
          <a href={href("/contact")} className="site-footer__cta">
            <TypeCopy text={t.footer.cta} caret={false} />
          </a>
          <LanguageSwitch className="language-switch language-switch--footer" />
        </div>
        <p className="site-footer__note">
          <TypeCopy text={t.footer.systemOnline} />
          <StatusDot pulse />
        </p>
      </div>
    </footer>
  )
}

export default Footer
