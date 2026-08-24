"use client"

import SiteIcon from "@/components/ui/SiteIcon"
import {
  applySiteTheme,
  persistSiteTheme,
  readStoredTheme,
  type SiteTheme
} from "@/lib/theme"
import { Tooltip } from "antd"
import { useEffect, useState } from "react"

const ThemeIcon = () => {
  const [theme, setTheme] = useState<SiteTheme>("original")
  const [ready, setReady] = useState(false)
  const isAqua = theme === "aqua"

  useEffect(() => {
    const next = readStoredTheme()
    applySiteTheme(next)
    persistSiteTheme(next)
    setTheme(next)

    const frame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-accent-ready")
      setReady(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const onChange = () => {
    const next: SiteTheme = isAqua ? "original" : "aqua"
    applySiteTheme(next)
    persistSiteTheme(next)
    setTheme(next)
  }

  return (
    <Tooltip
      title={isAqua ? "Original accents" : "Aqua accents"}
      placement="bottom"
      trigger="hover"
    >
      <label
        className={`theme-toggle theme-icon${ready ? " is-ready" : ""}`}
        htmlFor="switch"
        title="Toggle accent theme"
        aria-label={
          isAqua ? "Switch to original accent theme" : "Switch to aqua accent theme"
        }
      >
        <span className="toggle">
          <input
            type="checkbox"
            className="input"
            checked={isAqua}
            id="switch"
            onChange={onChange}
          />
          <span className="icon icon--aqua">
            <SiteIcon name="star" />
          </span>
          <span className="icon icon--classic">
            <SiteIcon name="star" />
          </span>
        </span>
      </label>
    </Tooltip>
  )
}

export default ThemeIcon
