"use client"

import ThemeIcon from "@/components/ThemeIcon"
import { SITE_NAME } from "@/data/site"
import { links } from "@/data/navegation"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="site-nav">
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
  )
}

export default Navigation
