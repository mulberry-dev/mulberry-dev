"use client";

import "@/styles/css/styles.css";
import Navigation from "@/components/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import Particles from "@/components/particles";
import { useEffect } from "react";

import Providers from "@/components/providers";

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
        </Providers>
        <Particles />
      </body>
    </html>
  );
}
