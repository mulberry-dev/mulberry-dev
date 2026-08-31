import DeferredAnalytics from "@/components/DeferredAnalytics"
import JsonLd from "@/components/JsonLd"
import Navigation from "@/components/navigation"
import SiteShell from "@/components/SiteShell"
import { ParticlesProvider } from "@/components/particles"
import { getMessages } from "@/i18n"
import { personJsonLd, websiteJsonLd } from "@/lib/jsonLd"
import { isLocale } from "@/lib/locale"
import {
  AUTHOR_NAME,
  COPYRIGHT_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL
} from "@/data/site"
import "@/styles/scss/styles.scss"
import { JetBrains_Mono, Sora, Space_Grotesk } from "next/font/google"
import { headers } from "next/headers"
import type { Metadata, Viewport } from "next"

const sora = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "optional",
  preload: false
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "optional",
  preload: false
})

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["es_MX"],
    type: "website",
    images: [SITE_OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  other: {
    copyright: COPYRIGHT_NAME
  }
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const headerLocale = headers().get("x-locale")
  const locale = isLocale(headerLocale) ? headerLocale : "en"
  const messages = getMessages(locale)

  return (
    <html
      lang={messages.htmlLang}
      className={`${sora.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="dark" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname;document.documentElement.lang=(p==="/es"||p.indexOf("/es/")===0)?"es":"en";if(p==="/"||p===""||p==="/es"||p==="/es/")document.documentElement.classList.add("home-nav-wait")})()`
          }}
        />
        <JsonLd data={[personJsonLd(locale), websiteJsonLd(locale)]} />
        <a className="skip-link" href="#site-main">
          {messages.skipToContent}
        </a>
        <div className="site-atmosphere" aria-hidden="true" />
        <ParticlesProvider>
          <Navigation />
          <div className="site-shell">
            <SiteShell>{children}</SiteShell>
          </div>
        </ParticlesProvider>
        <DeferredAnalytics gaId="G-HP85BC1BKY" />
      </body>
    </html>
  )
}
