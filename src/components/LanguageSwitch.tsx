"use client"

import { useI18n } from "@/i18n/useI18n"
import { localizePath, writeStoredLocale, type Locale } from "@/lib/locale"
import Link from "next/link"
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"

const US_STARS: Array<[number, number]> = [
  [6, 5],
  [12, 5],
  [18, 5],
  [6, 10.6],
  [12, 10.6],
  [18, 10.6],
  [6, 16.2],
  [12, 16.2],
  [18, 16.2]
]

const STAR_PATH = "M0-1.15.27-.35 1.05-.35.42.13.64.95 0 .42-.64.95-.42.13-1.05-.35-.27-.35Z"

const FlagUnitedStates = () => (
  <svg className="language-switch__flag" viewBox="0 0 60 40" aria-hidden="true">
    <rect width="60" height="40" fill="#fff" />
    {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
      <rect key={stripe} y={(40 / 13) * stripe} width="60" height={40 / 13 + 0.2} fill="#B22234" />
    ))}
    <rect width="24" height={(40 / 13) * 7} fill="#3C3B6E" />
    {US_STARS.map(([x, y]) => (
      <path
        key={`${x}-${y}`}
        fill="#fff"
        d={STAR_PATH}
        transform={`translate(${x} ${y}) scale(2.05)`}
      />
    ))}
  </svg>
)

const FlagMexico = () => (
  <svg className="language-switch__flag" viewBox="0 0 60 40" aria-hidden="true">
    <rect width="20" height="40" fill="#006847" />
    <rect x="20" width="20" height="40" fill="#fff" />
    <rect x="40" width="20" height="40" fill="#CE1126" />
    <g transform="translate(30 20)">
      <circle r="6.5" fill="#8C6A2F" />
      <circle r="5.55" fill="#F4E7C5" />
      <path fill="#1B7A3D" d="M-.65 1.15h1.3v3.7h-1.3z" />
      <path fill="#1B7A3D" d="M-.65 2.05c-1.55.05-2.45.75-2.45 1.55v1.15h2.45z" />
      <path fill="#1B7A3D" d="M.65 2.35c1.4.1 2.15.8 2.15 1.5v.9H.65z" />
      <path
        fill="#4A2C14"
        d="M.15-3.15c1.7.35 2.85 1.7 2.45 3.05-.35 1.15-1.6 1.7-2.65 1.4.15.55-.25.95-.75.75-.5.3-1.35-.05-1.55-.95-.55-.15-1.9-.35-2.1-1.5-.35-1.35.95-2.7 2.7-2.95.4-.75 1.15-1.1 1.9.2z"
      />
      <path fill="#E2B34A" d="M2.35-1.15c.65.1.95.55.65.95-.35.25-.85 0-1.05-.4z" />
    </g>
  </svg>
)

const Chevron = () => (
  <svg className="language-switch__chevron" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 6.25 8 10.25 12 6.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Check = () => (
  <svg className="language-switch__check" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3.5 8.4 6.4 11.3 12.5 4.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const OPTIONS: Array<{
  locale: Locale
  hrefLang: "en" | "es"
  Flag: typeof FlagUnitedStates
}> = [
  { locale: "en", hrefLang: "en", Flag: FlagUnitedStates },
  { locale: "es", hrefLang: "es", Flag: FlagMexico }
]

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { locale, sectionPath, t, pathname } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const listId = useId()
  const enHref = localizePath(sectionPath, "en")
  const esHref = localizePath(sectionPath, "es")
  const hrefFor = (value: Locale) => (value === "en" ? enHref : esHref)
  const labelFor = (value: Locale) => (value === "en" ? t.language.en : t.language.es)
  const ActiveFlag = locale === "es" ? FlagMexico : FlagUnitedStates

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const focusOption = (index: number) => {
    const next = (index + OPTIONS.length) % OPTIONS.length
    optionRefs.current[next]?.focus()
  }

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return
    }

    event.preventDefault()
    setOpen(true)
    const selected = OPTIONS.findIndex((option) => option.locale === locale)
    const index = event.key === "ArrowUp" ? OPTIONS.length - 1 : Math.max(selected, 0)
    requestAnimationFrame(() => focusOption(index))
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const current = optionRefs.current.findIndex((node) => node === document.activeElement)

    if (event.key === "ArrowDown") {
      event.preventDefault()
      focusOption(current + 1)
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      focusOption(current <= 0 ? -1 : current - 1)
    }

    if (event.key === "Tab") {
      setOpen(false)
    }
  }

  return (
    <nav
      ref={rootRef}
      className={`${className ?? "language-switch"}${open ? " is-open" : ""}`}
      aria-label={t.language.label}
    >
      <button
        ref={triggerRef}
        type="button"
        className="language-switch__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        <ActiveFlag />
        <span>{t.language.label}</span>
        <Chevron />
      </button>
      <ul
        id={listId}
        className="language-switch__panel"
        role="listbox"
        aria-label={t.language.label}
        aria-hidden={open ? undefined : true}
        onKeyDown={onListKeyDown}
      >
        {OPTIONS.map((option, index) => {
          const selected = locale === option.locale
          const Flag = option.Flag

          return (
            <li key={option.locale} role="presentation">
              <Link
                ref={(node) => {
                  optionRefs.current[index] = node
                }}
                href={hrefFor(option.locale)}
                hrefLang={option.hrefLang}
                lang={option.hrefLang}
                scroll={false}
                prefetch={false}
                role="option"
                aria-selected={selected}
                tabIndex={open ? 0 : -1}
                data-locale-switch=""
                className="language-switch__option"
                style={{ "--i": index } as CSSProperties}
                onClick={(event) => {
                  writeStoredLocale(option.locale)
                  setOpen(false)

                  if (selected) {
                    event.preventDefault()
                  }
                }}
              >
                <Flag />
                <span className="language-switch__name">{labelFor(option.locale)}</span>
                <Check />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default LanguageSwitch
