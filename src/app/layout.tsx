import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aresbusinessleague.com"),
  title: {
    default: "ARES Business League 2026 — Nation Builders Edition",
    template: "%s | ARES Business League 2026",
  },
  description: "A high-stakes, one-month business tournament featuring 30 elite BNI business owners competing in 4 iconic teams. Strategy. Leadership. Execution. One Winner.",
  keywords: "ARES Business League, ABL 2026, Nation Builders, BNI, business tournament, India",
  openGraph: {
    title: "ARES Business League 2026 — Nation Builders Edition",
    description: "4 Teams. 4 Leaders. 1 Mission. June 24 – July 22, 2026",
    type: "website",
    url: "https://aresbusinessleague.com",
    siteName: "ARES Business League",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARES Business League 2026 — Nation Builders Edition",
    description: "4 Teams. 4 Leaders. 1 Mission. June 24 – July 22, 2026",
  },
};

export const viewport = {
  themeColor: '#000000',
};

import SmoothScroll from "@/components/SmoothScroll";
import CommandMenu from "@/components/CommandMenu";
import MobileDock from "@/components/MobileDock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${cinzel.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-[#080600] text-[#F0EAD6]">
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02]" style={{ backgroundImage: "url('/images/noise.svg')" }} />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 pb-24 xl:pb-0">{children}</main>
          <Footer />
        </SmoothScroll>
        <CommandMenu />
        <MobileDock />
      </body>
    </html>
  );
}
