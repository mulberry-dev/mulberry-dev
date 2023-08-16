"use client";

import Navigation from "@/components/navigation";
import Particles from "@/components/particles";
import Providers from "@/components/providers";
import "@/styles/css/styles.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Footer from "@/components/footer";
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
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
