"use client"

import {
  applySiteTheme,
  persistSiteTheme,
  readStoredTheme,
  type SiteTheme
} from "@/lib/theme"
import { Tooltip } from "antd"
import { useEffect, useState } from "react"

const AquaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="26"
    height="26"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 3.1C9.1 6.9 6.6 10.2 6.6 13.4a5.4 5.4 0 0 0 10.8 0C17.4 10.2 14.9 6.9 12 3.1Z"
    />
    <path
      fill="var(--color-purple)"
      d="M17.7 5.2 18.4 7l1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"
    />
  </svg>
)

const OriginalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="26"
    height="26"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 3.1 13.3 8l5 .9-3.9 3.1 1.3 4.9L12 14.3 8.3 16.9 9.6 12 5.7 8.9l5-.9L12 3.1Z"
    />
    <path
      fill="var(--color-teal)"
      d="M18.2 13.1 18.8 15.4 21.1 16l-2.3.6-.6 2.3-.6-2.3-2.3-.6 2.3-.6.6-2.3Z"
    />
  </svg>
)

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
            <AquaIcon />
          </span>
          <span className="icon icon--classic">
            <OriginalIcon />
          </span>
        </span>
      </label>
    </Tooltip>
  )
}

export default ThemeIcon
