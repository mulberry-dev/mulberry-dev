"use client"

import CtaBanner from "@/components/ui/CtaBanner"
import IconBox from "@/components/ui/IconBox"
import { getContextualCta } from "@/data/pageCta"
import { usePathname } from "next/navigation"

const PageCta = () => {
  const pathname = usePathname()
  const cta = getContextualCta(pathname)

  if (!cta) {
    return null
  }

  return (
    <CtaBanner
      icon={<IconBox round>→</IconBox>}
      title={cta.title}
      subtitle={cta.subtitle}
      actionHref={cta.actionHref}
      actionLabel={cta.actionLabel}
      backHref={cta.backHref}
      backLabel={cta.backLabel}
    />
  )
}

export default PageCta
