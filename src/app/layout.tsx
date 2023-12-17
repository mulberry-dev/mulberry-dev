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
import Script from "next/script"

export default function RootLayout({
  children,
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
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-HP85BC1BKY'
        ></Script>
        <script>
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HP85BC1BKY');
      `}
        </script>
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
        </Providers>
        <Particles />
        <ToastContainer />
        <Info />
        {/* <TraceIP /> */}
      </body>
    </html>
  )
}
