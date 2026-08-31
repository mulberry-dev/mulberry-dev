export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"
export const LOCALE_PREFIX = "es"

export const isLocale = (value: string | null | undefined): value is Locale =>
  value === "en" || value === "es"

export const getLocale = (pathname: string): Locale => {
  const first = pathname.split("/").filter(Boolean)[0]
  return first === LOCALE_PREFIX ? "es" : DEFAULT_LOCALE
}

export const stripLocale = (pathname: string): string => {
  if (pathname === `/${LOCALE_PREFIX}` || pathname === `/${LOCALE_PREFIX}/`) {
    return "/"
  }

  if (pathname.startsWith(`/${LOCALE_PREFIX}/`)) {
    const stripped = pathname.slice(LOCALE_PREFIX.length + 1)
    return stripped.startsWith("/") ? stripped : `/${stripped}`
  }

  return pathname || "/"
}

export const localizePath = (path: string, locale: Locale): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`

  if (locale === DEFAULT_LOCALE) {
    return normalized
  }

  return normalized === "/" ? `/${LOCALE_PREFIX}` : `/${LOCALE_PREFIX}${normalized}`
}

export const isHomePath = (pathname: string) => stripLocale(pathname) === "/"

export const localeHrefLang = (locale: Locale) => (locale === "es" ? "es" : "en")

export const ogLocale = (locale: Locale) => (locale === "es" ? "es_MX" : "en_US")
