type ScrollLockSnapshot = {
  scrollY: number
  htmlOverflow: string
  bodyOverflow: string
  bodyPosition: string
  bodyTop: string
  bodyLeft: string
  bodyRight: string
  bodyWidth: string
  bodyPaddingRight: string
}

let snapshot: ScrollLockSnapshot | null = null
let lockCount = 0

export const lockBodyScroll = () => {
  lockCount += 1

  if (snapshot) {
    return
  }

  const html = document.documentElement
  const { body } = document
  const scrollY = window.scrollY
  const scrollbar = window.innerWidth - html.clientWidth

  snapshot = {
    scrollY,
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyPaddingRight: body.style.paddingRight
  }

  html.style.overflow = "hidden"
  body.style.overflow = "hidden"
  body.style.position = "fixed"
  body.style.top = `-${scrollY}px`
  body.style.left = "0"
  body.style.right = "0"
  body.style.width = "100%"

  if (scrollbar > 0) {
    body.style.paddingRight = `${scrollbar}px`
  }
}

export const unlockBodyScroll = () => {
  lockCount = Math.max(0, lockCount - 1)

  if (lockCount > 0 || !snapshot) {
    return
  }

  const html = document.documentElement
  const { body } = document
  const { scrollY } = snapshot

  html.style.overflow = snapshot.htmlOverflow
  body.style.overflow = snapshot.bodyOverflow
  body.style.position = snapshot.bodyPosition
  body.style.top = snapshot.bodyTop
  body.style.left = snapshot.bodyLeft
  body.style.right = snapshot.bodyRight
  body.style.width = snapshot.bodyWidth
  body.style.paddingRight = snapshot.bodyPaddingRight
  snapshot = null

  window.scrollTo(0, scrollY)
}
