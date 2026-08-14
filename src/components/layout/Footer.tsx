"use client"

import { SITE_NAME } from "@/data/site"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link href="/" className="site-footer__brand">
          <Image
            src="/images/Icons/MouseArrow.webp"
            width={22}
            height={22}
            alt=""
          />
          <span>{SITE_NAME}</span>
        </Link>
        <p className="site-footer__copy">
          © {year} Mulberry Software. All rights reserved.
        </p>
        <p className="site-footer__note">Built with care and lots of coffee</p>
      </div>
    </footer>
  )
}

export default Footer
