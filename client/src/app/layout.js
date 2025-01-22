import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Common/Footer/Footer";
import Navbar from "@/components/Common/NavBar/NavBar";
import FirstLoadPage from "@/components/Common/Others/FirstLoadPage";
import NextTopLoader from "nextjs-toploader";
import { AuthUserProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASEURL),
  title: "IIEC",
  description: "Incubation Innovation and Entrepreneurship Center",
  generator: "Next.js",
  applicationName: "IIEC",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IIEC",
    "sandip",
    "sharad",
    "kamal",
    "darlame",
    "Next.js",
    "React",
  ],

  authors: [
    { name: "Sandip Katel" },
    { name: "Sandp Katel", url: "https://iiec.vercel.app" },
  ],
  creator: "Sandip Katel",
  publisher: "Kamal Darlame",

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#431d7a" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} min-h-screen `}>
        <AuthUserProvider>
          {/* <div>
            <img src="/background.png" className=" h-screen w-full fixed top-0 left-0 -z-50" />
          </div> */}
          <div className=" h-screen w-full fixed top-0 left-0 -z-50 bg-gradient-to-b from-white to-blue-100"></div>
          <NextTopLoader
            color="#050447"
            initialPosition={0.08}
            height={4}
            crawl={true}
            showSpinner={false}
          />
          <Navbar />

          {/* <div className=" min-h-screen overflow-x-hidden">
        {children}
        </div>
        <Footer /> */}

          <FirstLoadPage children={children} />
        </AuthUserProvider>
      </body>
    </html>
  );
}
