import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARES Business League 2026 - Nation Builders Edition",
  description: "A high-stakes, one-month business tournament bringing together 30 elite business owners competing in 4 iconic teams. Strategy. Leadership. Execution. One Winner.",
  keywords: "ARES Business League, ABL 2026, Nation Builders, BNI, business tournament",
  openGraph: {
    title: "ARES Business League 2026 - Nation Builders Edition",
    description: "4 Teams. 4 Leaders. 1 Mission. June 24 - July 22, 2026",
    type: "website",
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
      <body className="min-h-full flex flex-col antialiased bg-[#000000] text-[#F2F2F2]">
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
