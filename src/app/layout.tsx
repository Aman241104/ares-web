import type { Metadata } from "next";
import { Anton, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTARenderer from "@/components/CTARenderer";

const cinzel = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// aresbusinessleague.com is not yet connected in Vercel (DNS doesn't resolve) — link
// previews (WhatsApp, etc.) need metadataBase to point at a URL that actually resolves,
// otherwise og:image resolves to a dead domain and the preview shows no image. Swap
// SITE_URL back to the custom domain once it's connected.
const SITE_URL = "https://ares-web-nine.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARES Business League 2026 — Nation Builders Edition",
    template: "%s | ARES Business League 2026",
  },
  description: "A high-stakes, one-month business tournament featuring 30 elite BNI business owners competing in 4 iconic teams. Strategy. Leadership. Execution. One Winner.",
  keywords: "ARES Business League, ABL 2026, Nation Builders, BNI, business tournament, India",
  openGraph: {
    title: "ARES Business League 2026 — Nation Builders Edition",
    description: "4 Teams. 4 Leaders. 1 Mission. July 1st – July 29th, 2026",
    type: "website",
    url: SITE_URL,
    siteName: "ARES Business League",
    images: [{ url: "/images/hero_trophy_stadium.png", width: 1600, height: 854, alt: "ARES Business League 2026 Trophy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARES Business League 2026 — Nation Builders Edition",
    description: "4 Teams. 4 Leaders. 1 Mission. July 1st – July 29th, 2026",
    images: ["/images/hero_trophy_stadium.png"],
  },
};

export const viewport = {
  themeColor: '#000000',
};

import SmoothScroll from "@/components/SmoothScroll";
import CommandMenu from "@/components/CommandMenu";
import MobileDock from "@/components/MobileDock";
import SplashLoader from "@/components/SplashLoader";
import AIChatWidget from "@/components/AIChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${cinzel.variable} ${montserrat.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-[#000000] text-white">
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02]" style={{ backgroundImage: "url('/images/noise.svg')" }} />
        <SplashLoader />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 pb-24 xl:pb-0">{children}</main>
          <CTARenderer />
          <Footer />
        </SmoothScroll>
        <CommandMenu />
        <MobileDock />
        <AIChatWidget />
      </body>
    </html>
  );
}
