"use client"

import Head from "@/components/Head"
import Info from "@/components/info"
import Navigation from "@/components/navigation"
import Particles from "@/components/particles"
import Providers from "@/components/providers"
import "@/styles/scss/styles.scss"
import { Analytics } from "@vercel/analytics/react"
import "animate.css"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import ThemeIcon from "@/components/ThemeIcon"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@next/third-parties/google"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])
  return (
    <html lang='en'>
      <head>
        <Head />
      </head>
      <GoogleAnalytics gaId='G-HP85BC1BKY' />
      <body /* className='dark' */>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
        </Providers>
        <Particles />
        <ToastContainer />
        <Info />
         <ThemeIcon /> 
        <SpeedInsights />
      </body>
    </html>
  )
}
