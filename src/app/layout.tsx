import Head from "@/components/Head"
import Footer from "@/components/layout/Footer"
import Navigation from "@/components/navigation"
import PageTransition from "@/components/PageTransition"
import { ParticlesProvider } from "@/components/particles"
import { SITE_NAME, SITE_URL } from "@/data/site"
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme"
import "@/styles/scss/styles.scss"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"

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
    type: "website"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <Head />
      </head>
      <GoogleAnalytics gaId="G-HP85BC1BKY" />
      <body className="dark" suppressHydrationWarning>
        <ParticlesProvider>
          <Navigation />
          <div className="site-shell">
            <PageTransition>
              <main>{children}</main>
              <Footer />
            </PageTransition>
          </div>
        </ParticlesProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
