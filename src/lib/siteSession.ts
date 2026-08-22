let hasLeftHome = false
let navIntroPlayed = false
let homeChromeRevealed = false

export const markLeftHome = () => {
  hasLeftHome = true
}

export const didLeaveHome = () => hasLeftHome

export const shouldPlayNavIntro = () => {
  if (navIntroPlayed) {
    return false
  }

  navIntroPlayed = true
  return true
}

export const isHomeChromeRevealed = () => homeChromeRevealed

export const markHomeChromeRevealed = () => {
  homeChromeRevealed = true
}

export const shouldRevealHomeChrome = () =>
  homeChromeRevealed || hasLeftHome
