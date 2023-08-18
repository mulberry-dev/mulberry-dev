"use client";

import Navigation from "@/components/navigation";
import Particles from "@/components/particles";
import Providers from "@/components/providers";
import "@/styles/css/styles.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Info from "@/components/info";

import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <head>
        {/* FavIcon */}
        <link
          rel="shortcut icon"
          href="https://cdn-icons-png.flaticon.com/512/7914/7914802.png"
          type="image"
        />
        <title>ThisIsSanti.dev | Web Programmer</title>
        {/* Meta */}
        <meta
          name="description"
          content="Programmer who loves code and technology, comitted to developing specialized and scalable technology in new projects."
        />
        <meta
          name="keywords"
          content="Developer, web, wordpress, app, ecommerce, SEO, ux,ui, css, JavaScript, Santiago, Morera, dev, Full Stack, Node.js, React.js, Next.js, Nest.js, TypeScript"
        />
        <meta name="copyright" content="© 2006 MDC"></meta>
        {/* OpenGraph */}
        <meta property="og:type" content="Portfolio" />
        <meta property="og:title" content="Web Developer" />
        <meta
          property="og:description"
          content="Full Stack Developer JavaScript/TypeScript"
        />
        <meta property="og:url" content="https://thisissanti.dev" />
        <meta
          property="og:image"
          content="https://i.ibb.co/Fk1d2V3/santi-iztli-github-io-portfolio.png"
        />
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
        <Script src="//s2.tracemyip.org/vLg/lgUrl.php?pidnVar2=98642&amp;prtVar2=11&amp;stlVar2=1500~1667766073~14*2~0F5999*F7FFE6*537899*000000~1*1*0*0*0&amp;rgtype=4684NR-IPIB&amp;scvVar2=12" />
      </body>
    </html>
  );
}
