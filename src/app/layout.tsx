"use client";

import Head from "@/components/Head";
import TraceIP from "@/components/TraceIP";
import Info from "@/components/info";
import Navigation from "@/components/navigation";
import Particles from "@/components/particles";
import Providers from "@/components/providers";
import "@/styles/css/styles.css";
import { Analytics } from "@vercel/analytics/react";
import "animate.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang='en'>
      <head>
        <Head />
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
  );
}
