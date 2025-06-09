// import React from "react";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { ThemeProvider } from "@/components/theme-provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   metadataBase: new URL(
//     process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000"
//   ),
//   title: "IIEC Pulchowk - Incubation, Innovation and Entrepreneurship Center", // More specific title
//   description:
//     "Official page of the Incubation, Innovation and Entrepreneurship Center (IIEC) at Pulchowk Campus, IOE, Nepal.", // More descriptive
//   generator: "Next.js",
//   applicationName: "IIEC Pulchowk", // Added Pulchowk for specificity
//   referrer: "origin-when-cross-origin",
//   keywords: [
//     "IIEC",
//     "Incubation",
//     "Innovation",
//     "Entrepreneurship",
//     "Pulchowk Campus",
//     "IOE",
//     "Nepal",
//     "Startups",
//   ],

//   authors: [
//     { name: "Sandip Katel", url: "https://github.com/sandipkatel" },
//     { name: "Saphal Rimal", url: "https://github.com/saphalr" },
//     { name: "Sijan Joshi", url: "https://github.com/SijanJ" },
//     {
//       name: "Kamal Darlami",
//       url: "https://sites.google.com/pcampus.edu.np/kamaldarlami/",
//     },
//   ],
//   creator: "Kamal Darlami",
//   publisher: "Pulchowk Campus",

//   icons: {
//     icon: "/logo.png",
//     shortcut: "/logo.png",
//     apple: "/logo.png",
//     other: {
//       rel: "apple-touch-icon-precomposed",
//       url: "/logo.png",
//     },
//   },

//   openGraph: {
//     title: "IIEC Pulchowk - Incubation, Innovation and Entrepreneurship Center", // Consistent and specific title
//     description:
//       "Official page of the Incubation, Innovation and Entrepreneurship Center (IIEC) at Pulchowk Campus, IOE, Nepal.", // Consistent and descriptive
//     url: process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000", // Canonical URL of the website
//     siteName: "IIEC Pulchowk", // Site name
//     images: [
//       {
//         url: "/logo.png", // Ensure this is a good preview image, ideally a banner like SEDS
//         width: 1200, // Standard OG image width
//         height: 630, // Standard OG image height
//         alt: "IIEC Pulchowk Campus Logo",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <div className="flex min-h-screen flex-col">
//             <Navbar />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000"
  ),
  title: "IIEC Pulchowk - Incubation, Innovation and Entrepreneurship Center", 
  description:
    "Official page of the Incubation, Innovation and Entrepreneurship Center (IIEC) at Pulchowk Campus, IOE, Nepal.", 
  generator: "Next.js",
  applicationName: "IIEC Pulchowk",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IIEC",
    "Incubation",
    "Innovation",
    "Entrepreneurship",
    "Pulchowk Campus",
    "IOE",
    "Nepal",
    "Startups",
  ],

  authors: [
    { name: "Sandip Katel", url: "https://github.com/sandipkatel" },
    { name: "Saphal Rimal", url: "https://github.com/saphalr" },
    { name: "Sijan Joshi", url: "https://github.com/SijanJ" },
    {
      name: "Kamal Darlami",
      url: "https://sites.google.com/pcampus.edu.np/kamaldarlami/",
    },
  ],
  creator: "Kamal Darlami",
  publisher: "Pulchowk Campus",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },

  // Google Search Console Verification
  verification: {
    google: "2b71dcaab36d2888",
  },

  openGraph: {
    title: "IIEC Pulchowk - Incubation, Innovation and Entrepreneurship Center", // Consistent and specific title
    description:
      "Official page of the Incubation, Innovation and Entrepreneurship Center (IIEC) at Pulchowk Campus, IOE, Nepal.", // Consistent and descriptive
    url: process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000", // Canonical URL of the website
    siteName: "IIEC Pulchowk", // Site name
    images: [
      {
        url: "/logo.png", 
        width: 1200, 
        height: 630,
        alt: "IIEC Pulchowk Campus Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
