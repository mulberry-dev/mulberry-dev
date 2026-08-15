"use client"

import ThemeIcon from "@/components/ThemeIcon"
import { SITE_NAME } from "@/data/site"
import { links } from "@/data/navegation"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

let hasLeftHome = false

export const didLeaveHome = () => hasLeftHome

const isActivePath = (pathname: string, path: string) => {
  if (path === "/") {
    return pathname === "/"
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

const Navigation = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (pathname !== "/") {
      hasLeftHome = true
    }

    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <svg className="site-nav__filters" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="siteNavRefract"
            x="-8%"
            y="-55%"
            width="116%"
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
            x="-5%"
            y="-35%"
            width="110%"
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

          <nav className={`site-nav__links${open ? " is-open" : ""}`} aria-label="Primary">
            {links.map((link, index) =>
              <Link
                key={link.id}
                href={link.path}
                className={`site-nav__link menuitem-${index}${isActivePath(pathname, link.path) ? " is-active" : ""}`}
              >
                {link.name}
              </Link>
            )}
          </nav>

          <div className="site-nav__actions">
            <ThemeIcon />
            <button
              className={`site-nav__toggle${open ? " is-open" : ""}`}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(value => !value)}
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
