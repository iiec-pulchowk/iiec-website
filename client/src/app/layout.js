import React from "react";
import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000"
  ),
  title: "IIEC",
  description: "Incubation Innovation and Entrepreneurship Center",
  generator: "Next.js",
  applicationName: "IIEC",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IIEC",
    "Kamal",
    "Darlami",
    "Pulchowk",
    "IOE"
  ],

  authors: [
    { name: "Sandip Katel", url: "https://www.skatel.com.np/" },
    { name: "Kamal Darlami", url: "https://sites.google.com/pcampus.edu.np/kamaldarlami/" },
  ],
  creator: "Kamal Darlami",
  publisher: "IIEC Pulchowk",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },

  openGraph: {
    title: "IIEC",
    description: "IIEC",
    url: "/logo.png",
    siteName: "IIEC",
    images: [
      {
        url: "/logo.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "/logo.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "IIEC",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}