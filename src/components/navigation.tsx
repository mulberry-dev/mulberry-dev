"use client"

import ThemeIcon from "@/components/ThemeIcon"
import { SITE_NAME } from "@/data/site"
import { links } from "@/data/navegation"
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock"
import { markLeftHome, shouldPlayNavIntro } from "@/lib/siteSession"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type TransitionEvent } from "react"

type MenuPhase = "closed" | "open" | "closing"

const isActivePath = (pathname: string, path: string) => {
  if (path === "/") {
    return pathname === "/"
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

const Navigation = () => {
  const pathname = usePathname()
  const menuId = useId()
  const [menu, setMenu] = useState<MenuPhase>("closed")
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)
  const menuWasOpenRef = useRef(false)

  if (pathname !== "/") {
    markLeftHome()
  }

  const [playNavIntro] = useState(() => shouldPlayNavIntro())
  const [isCompact, setIsCompact] = useState(false)
  const menuOpen = menu !== "closed"

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const sync = () => setIsCompact(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const node = navRef.current

    if (!node) {
      return
    }

    if (isCompact && menu !== "open") {
      node.setAttribute("inert", "")
    } else {
      node.removeAttribute("inert")
    }
  }, [isCompact, menu])

  useEffect(() => {
    if (!isCompact && menu !== "closed") {
      setMenu("closed")
    }
  }, [isCompact, menu])

  useEffect(() => {
    if (pathname !== "/") {
      document.body.classList.add("nav-intro-done")
    }

    setMenu((current) => (current === "open" ? "closing" : current))
  }, [pathname])

  useEffect(() => {
    if (!playNavIntro) {
      document.body.classList.add("nav-intro-done")
      return
    }

    const timeoutId = window.setTimeout(() => {
      document.body.classList.add("nav-intro-done")
    }, 1850)

    return () => window.clearTimeout(timeoutId)
  }, [playNavIntro])

  useLayoutEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove("nav-menu-open")
      return
    }

    document.body.classList.add("nav-menu-open")
    lockBodyScroll()

    return () => {
      document.body.classList.remove("nav-menu-open")
      unlockBodyScroll()
    }
  }, [menuOpen])

  useEffect(() => {
    if (menu !== "open") {
      return
    }

    lastFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : toggleRef.current
    menuWasOpenRef.current = true

    const getFocusable = () => {
      const items = [
        toggleRef.current,
        ...(navRef.current
          ? Array.from(
              navRef.current.querySelectorAll<HTMLElement>("a[href], button")
            )
          : [])
      ]
      return items.filter((item): item is HTMLElement => Boolean(item))
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMenu("closing")
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const focusable = getFocusable()

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    const firstLink = navRef.current?.querySelector<HTMLElement>("a[href]")
    firstLink?.focus()

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menu])

  useEffect(() => {
    if (menu !== "closed" || !menuWasOpenRef.current) {
      return
    }

    const restore = lastFocusRef.current || toggleRef.current
    restore?.focus()
  }, [menu])

  useEffect(() => {
    if (menu !== "closing") {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setMenu("closed")
      return
    }

    const fallbackId = window.setTimeout(() => {
      setMenu("closed")
    }, 480)

    return () => window.clearTimeout(fallbackId)
  }, [menu])

  const closeMenu = () => {
    if (menu === "open") {
      setMenu("closing")
    }
  }

  const onMenuTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.propertyName !== "opacity") {
      return
    }

    if (menu === "closing") {
      setMenu("closed")
    }
  }

  return (
    <>
      <svg className="site-nav__filters" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="siteNavRefract"
            x="0%"
            y="-55%"
            width="100%"
            height="210%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0065 0.028"
              numOctaves="2"
              seed="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="0.7" result="waves" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="waves"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter
            id="siteNavRefractSoft"
            x="0%"
            y="-35%"
            width="100%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.04"
              numOctaves="1"
              seed="4"
              stitchTiles="stitch"
              result="waves"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="waves"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="site-nav__lens" aria-hidden="true" />

      <header className="site-nav">
        <div
          className={`site-nav__backdrop${menuOpen ? " is-visible" : ""}${menu === "open" ? " is-open" : ""}`}
          aria-hidden="true"
          onClick={closeMenu}
          onTransitionEnd={(event) => {
            if (event.propertyName === "opacity" && menu === "closing") {
              setMenu("closed")
            }
          }}
        />
        <div className="site-nav__chrome" aria-hidden="true" />
        <div className="site-nav__inner">
          <div className="site-nav__brand">
            <Link href="/" className="site-nav__logo">
              <Image
                src="/images/Icons/MouseArrow.webp"
                width={28}
                height={28}
                alt=""
              />
              <span>{SITE_NAME}</span>
            </Link>
          </div>

          <nav
            ref={navRef}
            id={menuId}
            className={`site-nav__links${menuOpen ? " is-open" : ""}${menu === "closing" ? " is-closing" : ""}`}
            aria-label="Primary"
            onTransitionEnd={onMenuTransitionEnd}
          >
            {links.map((link, index) =>
              <Link
                key={link.id}
                href={link.path}
                className={`site-nav__link${playNavIntro ? ` menuitem-${index}` : ""}${isActivePath(pathname, link.path) ? " is-active" : ""}`}
                style={{ "--i": index } as CSSProperties}
                onClick={() => {
                  if (menu === "open") {
                    setMenu("closing")
                  }
                }}
              >
                {link.name}
              </Link>
            )}
          </nav>

          <div className="site-nav__actions">
            <ThemeIcon />
            <button
              ref={toggleRef}
              className={`site-nav__toggle${menu === "open" ? " is-open" : ""}`}
              type="button"
              aria-label={menu === "open" ? "Close menu" : "Open menu"}
              aria-expanded={menu === "open"}
              aria-controls={menuId}
              onClick={() => setMenu((value) => (value === "open" ? "closing" : "open"))}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navigation
