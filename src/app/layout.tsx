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
