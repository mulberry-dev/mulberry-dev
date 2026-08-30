import DeferredAnalytics from "@/components/DeferredAnalytics"
import Navigation from "@/components/navigation"
import SiteShell from "@/components/SiteShell"
import { ParticlesProvider } from "@/components/particles"
import {
  COPYRIGHT_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL
} from "@/data/site"
import "@/styles/scss/styles.scss"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { JetBrains_Mono, Sora, Space_Grotesk } from "next/font/google"
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
    follow: true
  },
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
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="dark" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname;if(p==="/"||p==="")document.documentElement.classList.add("home-nav-wait")})()`
          }}
        />
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
        {process.env.NEXT_PUBLIC_VERCEL_ENV ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
        <DeferredAnalytics gaId="G-HP85BC1BKY" />
      </body>
    </html>
  )
}
