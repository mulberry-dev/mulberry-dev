import Navigation from "@/components/navigation"
import SiteShell from "@/components/SiteShell"
import { ParticlesProvider } from "@/components/particles"
import {
  COPYRIGHT_NAME,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL
} from "@/data/site"
import "@/styles/scss/styles.scss"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { JetBrains_Mono } from "next/font/google"
import type { Metadata } from "next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap"
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Developer",
    "Full Stack",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Santiago Morera"
  ],
  icons: {
    icon: [{ url: SITE_LOGO, type: "image/png" }],
    shortcut: SITE_LOGO,
    apple: SITE_LOGO
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [SITE_OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO]
  },
  other: {
    copyright: COPYRIGHT_NAME
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <GoogleAnalytics gaId="G-HP85BC1BKY" />
      <body className="dark" suppressHydrationWarning>
        <a className="skip-link" href="#site-main">
          Skip to content
        </a>
        <div className="site-atmosphere" aria-hidden="true" />
        <ParticlesProvider>
          <Navigation />
          <div className="site-shell">
            <SiteShell>{children}</SiteShell>
          </div>
        </ParticlesProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
