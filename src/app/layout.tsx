import Head from "@/components/Head"
import Info from "@/components/info"
import Footer from "@/components/layout/Footer"
import Navigation from "@/components/navigation"
import Particles from "@/components/particles"
import { SITE_NAME, SITE_URL } from "@/data/site"
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
    description: "Full Stack Developer JavaScript/TypeScript",
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
    <html lang="en">
      <head>
        <Head />
      </head>
      <GoogleAnalytics gaId="G-HP85BC1BKY" />
      <body className="dark">
        <Particles />
        <div className="site-shell">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Info />
        <SpeedInsights />
      </body>
    </html>
  )
}
