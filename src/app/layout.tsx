import Head from "@/components/Head"
import Navigation from "@/components/navigation"
import SiteShell from "@/components/SiteShell"
import { ParticlesProvider } from "@/components/particles"
import { SITE_NAME, SITE_URL } from "@/data/site"
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme"
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
  title: {
    default: `${SITE_NAME} | Web Programmer`,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Programmer who loves code and technology, committed to developing specialized and scalable technology in new projects.",
  keywords: [
    "Developer",
    "Full Stack",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js"
  ],
  openGraph: {
    title: SITE_NAME,
    description: "Senior Full Stack Engineer specialized in JavaScript/TypeScript",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/BwtSfMG/Captura-de-pantalla-2023-09-24-161329.png"
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <Head />
      </head>
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
