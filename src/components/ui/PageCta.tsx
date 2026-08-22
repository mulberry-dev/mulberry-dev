"use client"

import CtaBanner from "@/components/ui/CtaBanner"
import Reveal from "@/components/ui/Reveal"
import { getContextualCta } from "@/data/pageCta"
import { usePathname } from "next/navigation"

const PageCta = () => {
  const pathname = usePathname()
  const cta = getContextualCta(pathname)

  if (!cta) {
    return null
  }

  return (
    <Reveal type="nav" mode="scroll">
      <CtaBanner
        backHref={cta.backHref}
        backName={cta.backName}
        actionHref={cta.nextHref}
        nextName={cta.nextName}
        featured
      />
    </Reveal>
  )
}

export default PageCta
