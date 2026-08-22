export const THEME_STORAGE_KEY = "theme-preference"
export const THEME_ORIGINAL_CLASS = "theme-original"

export type SiteTheme = "original" | "aqua"

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.classList.remove("theme-aqua");document.documentElement.classList.toggle("${THEME_ORIGINAL_CLASS}",t==="original");}catch(e){}})();`

export const readStoredTheme = (): SiteTheme => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "original"
      ? "original"
      : "aqua"
  } catch {
    return "aqua"
  }
}

export const applySiteTheme = (theme: SiteTheme) => {
  document.documentElement.classList.toggle(
    THEME_ORIGINAL_CLASS,
    theme === "original"
  )
  document.documentElement.classList.remove("theme-aqua")
  document.body.classList.add("dark")
}

export const persistSiteTheme = (theme: SiteTheme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}
